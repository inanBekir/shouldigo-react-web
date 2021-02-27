import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase/firebase.utils'
import { Carousel, Badge } from 'react-bootstrap';
import '../../scss/Experience.scss'
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import { orange } from '@material-ui/core/colors';
import MessageIcon from '@material-ui/icons/Message';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { grey } from '@material-ui/core/colors';
import MoodIcon from '@material-ui/icons/Mood';
import MoodBadIcon from '@material-ui/icons/MoodBad';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import Rating from '@material-ui/lab/Rating';
import Modal from '@material-ui/core/Modal';
import { Image } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import VisibilityIcon from '@material-ui/icons/Visibility';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ChatIcon from '@material-ui/icons/Chat';
import { GetExperience, AddRating, AddLikeOrUnlike } from '../experiences/ItemService';
import {useDispatch, useSelector} from 'react-redux';

const experienceLikesCollection = db.collection('Experience_likes');
const experienceRatingsCollection = db.collection(
  'Experience_ratings',
);
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
         <Typography>
         {value === 1 || value === 2?
         <React.Fragment>
          {children.map(tag => (
            tag + ',  '
          ))}
      </React.Fragment> : children}
      </Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: grey[900],
  },
  paper: {
    position: 'absolute',
    width: '25rem',
    height:'10rem',
    backgroundColor: 'rgba(0, 0, 0, 0.83)',
    border: '1px solid #000',
    borderRadius: '1rem',
    boxShadow: theme.shadows[5],
  },
}));

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

function Shouldigo(props) {
  if (props.experience.like >= 100) {
    return (
      <div className="voting-content">
               <p className="voting-text1">shouldigo: </p>
               <p className="voting-text2-yes">yes</p>
      </div>
    );
  } else if (props.experience.unlike >= 100) {
    return (
      <div className="voting-content">
               <p className="voting-text1">shouldigo: </p>
               <p className="voting-text2-no">no</p>
      </div>
    );
  } else {
    return (
      <div className="voting-content">
               <p className="voting-text1">shouldigo: </p>
               <p className="voting-text2-voting">voting</p>
      </div>
    );
  }
}

function LikedButtons(props) {
  const [userUID] = useState(localStorage.getItem('userUID'));
  var likeCount, iconName, disabled;
  if (props.likeStatus.used === 'liked') {
    iconName = <ThumbUpAltIcon style={{ color: orange[900] }} fontSize="large" />;
    disabled = true;
  } else if (props.likeStatus.used === 'unliked') {
    iconName = <ThumbUpAltOutlinedIcon style={{ color: orange[900] }} fontSize="large" />;
    disabled = true;
  } else {
    likeCount = props.experience.like + 1;
    iconName = <ThumbUpAltOutlinedIcon style={{ color: orange[900] }} fontSize="large" />;
    disabled = false;
  }
  return (
    <Tooltip title="Like">
        <IconButton disabled={disabled} 
          onClick={() => {props.addLikeStatus('liked', likeCount, props.experienceId, userUID);}} aria-label="like">
                    {iconName}
        </IconButton>
   </Tooltip>
  );
}

function UnLikedButtons(props) {
  const [userUID] = useState(localStorage.getItem('userUID'));
  var unLikeCount, iconName, disabled;
  if (props.likeStatus.used === 'unliked') {
    iconName = <ThumbDownAltIcon style={{ color: orange[900] }} fontSize="large" />;
    disabled = true;
  } else if (props.likeStatus.used === 'liked') {
    iconName = <ThumbDownAltOutlinedIcon style={{ color: orange[900] }} fontSize="large" />;
    disabled = true;
  } else {
    unLikeCount = props.experience.unlike + 1;
    iconName = <ThumbDownAltOutlinedIcon style={{ color: orange[900] }} fontSize="large" />;
    disabled = false;
  }
  return (
    <Tooltip title="Unlike">
    <IconButton disabled={disabled} onClick={() => {
        props.addLikeStatus(
          'unliked',
          unLikeCount,
          props.experienceId,
          userUID,
        );
      }} aria-label="unlike">
      {iconName}
    </IconButton>
  </Tooltip>
  );
}

function Experience(props) {
    const history = useHistory();
    const id = props.location.state.param;
    const dispatch = useDispatch();
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [rate, setRate] = useState(0);
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const experience = useSelector((state) => state.experience);
    const [userUID] = useState(localStorage.getItem('userUID'));
    const [experienceRatings, setExperienceRatings] = useState([]);
    const [experienceLikes, setExperienceLikes] = useState([]);

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const goProfile = (param) => history.push('profile',{param: param});
    const goComments = (param) => history.push('comments',{param: param});
    const goChat = (param) => history.push('chat',{param: param});

    useEffect(() => {
        GetExperience(dispatch, id);
        getRated(id);
        getLiked(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [rate]);

      const getLiked = (experienceKey) => {
        experienceLikesCollection
          .where('experience_id', '==', experienceKey)
          .where('user_id', '==', userUID)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((documentSnapshot) => {
              setExperienceLikes(documentSnapshot.data());
            });
          });
      };

      const getRated = (experienceKey) => {
        experienceRatingsCollection
          .where('experience_id', '==', experienceKey)
          .where('user_id', '==', userUID)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((documentSnapshot) => {
              setExperienceRatings(documentSnapshot.data());
            });
          });
      };

      const addRating = (rating) => {
        AddRating(
          rating,
          experience,
          id,
          userUID,
        );
        setRate(rating);
      };

  return (
   <div className="show-content">
      <div className="carousel-content">
        <Shouldigo experience={experience} />
        <div className="viewed-content">
              <Tooltip title="Who viewed">
                  <IconButton aria-label="viewed">
                    <VisibilityIcon style={{ color: orange[900] }} fontSize="large" />
                  </IconButton>
              </Tooltip>
                <Badge variant="warning">{experience.viewedCount}</Badge>
        </div>
        <div className="location-content">
                <LocationOnIcon style={{ color: orange[900] }} fontSize="large" />
                <p className="voting-text2">{experience.location ? experience.location.adress : null}</p>
        </div>
        <div className="chat-content">
              <Tooltip title="Chat">
                  <IconButton onClick={() => { goChat(id) }} aria-label="chat">
                    <ChatIcon style={{ color: orange[900] }} fontSize="large" />
                    <p className="voting-text2">Chat</p>
                  </IconButton>
              </Tooltip>
        </div>
       <Carousel>
            <Carousel.Item>
                <img
                className="d-block w-100 carousel-image"
                src={experience.images ? experience.images.url0 : null}
                alt={experience.name}
                />
            </Carousel.Item>
        </Carousel>
      </div>
        <div className="container">
            <div className="top-content">
              <div className="left-content">
              <div className="like-button-content">
                <LikedButtons
                      likeStatus={experienceLikes}
                      addLikeStatus={AddLikeOrUnlike}
                      experience={experience}
                      experienceId={id}
                />
                <Badge variant="success">{experience.like}</Badge>
              </div>
              <div className="unlike-button-content">
                <UnLikedButtons
                      likeStatus={experienceLikes}
                      addLikeStatus={AddLikeOrUnlike}
                      experience={experience}
                      experienceId={id}
                    />
                <Badge variant="danger">{experience.unlike}</Badge>
              </div>
              </div>
              <div className="right-content">
                  <Tooltip title="Comment">
                    <IconButton onClick={() => { goComments(id) }} aria-label="comment">
                      <MessageIcon style={{ color: orange[900] }} />
                      <p style={{ color: orange[900] }} className="comment-button-text">See Comments ({experience.commentedCount})</p>
                    </IconButton>
                  </Tooltip>
              </div>
          </div>
          <div className="tab-content">
            <div className={classes.root}>
              <AppBar position="static" color="default">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons="on"
                  indicatorColor="secondary"
                  textColor="secondary"
                  aria-label="scrollable force tabs example"
                >
                  <Tab label="Feel" icon={<FavoriteIcon />} {...a11yProps(0)} />
                  <Tab label="Best thing" icon={<MoodIcon />} {...a11yProps(1)} />
                  <Tab label="Worst thing" icon={<MoodBadIcon />} {...a11yProps(2)} />
                  <Tab label="Advice" icon={<RecordVoiceOverIcon />} {...a11yProps(3)} />
                </Tabs>
              </AppBar>
              <TabPanel value={value} index={0}>
                {experience.feel}
              </TabPanel>
              <TabPanel value={value} index={1}>
                {experience.best_thing}
              </TabPanel>
              <TabPanel value={value} index={2}>
                {experience.worst_thing}
              </TabPanel>
              <TabPanel value={value} index={3}>
                {experience.advice}
              </TabPanel>
            </div>
          </div>
          <div className="rating-content">
              <Tooltip title="Rating">
                <IconButton disabled={experienceRatings.status} onClick={() => { handleOpen() }} aria-label="rating">
                  <div>
                    <div className="rate-div">
                      <Rating name="read-only" value={experience.rating ? experience.rating : 2} readOnly />
                      <p className="rate-text">({experience.rating ? experience.rating.toFixed(2) : 1})</p>
                    </div>
                    <div className="rate-div">
                      <p className="times-rated-text">({experience.ratedCount}) times rated</p>
                      <p className="click-rate-text">{experienceRatings.status ? 'You rated' : 'Click to rate'}</p>
                    </div>
                  </div>
                </IconButton>
              </Tooltip>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
              >
                <div style={modalStyle} className={classes.paper}>
                <div className="modal-content-rate">
                {experienceRatings.status ? <Rating
                    size="large"
                    name="simple-controlled"
                    value={rate}
                    readOnly
                  /> : <Rating
                    size="large"
                    name="simple-controlled"
                    value={rate}
                    onChange={(event, newValue) => {
                      addRating(newValue);
                    }}
                  />}
                    <IconButton onClick={() => { handleClose() }} aria-label="cancel">
                          <p className="close-rate-text">{experienceRatings.status ? 'Ok' : 'Cancel'}</p>
                    </IconButton>
                </div>
                </div>
            </Modal>
          </div>
          <div className="bottom-content">
              <Tooltip title="Go profile">
                    <IconButton onClick={() => { goProfile() }} aria-label="go-profile">
                      <Image src={experience.experience_owner_photo} roundedCircle />
                    </IconButton>
              </Tooltip>
            <p className="bottom-orange-text">Posted by:</p>
            <p className="bottom-white-text">{experience.experience_owner_name}</p>
            <p className="bottom-orange-text">- Created at:</p>
            <p className="bottom-white-text">{experience.createdAt ? new Date(experience.createdAt.toDate()).toDateString() : null}</p>
          </div>
        </div>
    </div>
  );
}

export default Experience;
