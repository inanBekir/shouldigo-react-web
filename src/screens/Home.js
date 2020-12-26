import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebase.utils';
import './scss/Home.scss'
import { useHistory } from "react-router-dom";
import Slider from "react-slick";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red, grey } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import VisibilityIcon from '@material-ui/icons/Visibility';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import GradeIcon from '@material-ui/icons/Grade';
import CommentIcon from '@material-ui/icons/Comment';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Tooltip from '@material-ui/core/Tooltip';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { UpdateExperience } from './components/experiences/ItemService';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 325,
    backgroundColor: grey[800],
    borderRadius:'1.2rem',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function Home() {
    const history = useHistory();
    const [experiences, setExperiences] = useState([]);
    const classes = useStyles();
    const [indexNumber, setIndexNumber] = useState(0);
    const large = useMediaQuery('(max-width:991px)');
    const medium = useMediaQuery('(max-width:767px)');
    const xLarge = useMediaQuery('(max-width:1200px)');


    function SliderNextArrow(props) {
      const { className, style, onClick } = props;
      return (
       <ArrowForwardIosIcon  className={className}
        style={{ ...style, display: "block", height:'100%' }}
        onClick={onClick} fontSize="large" />
      );
    }

    function SliderPrevArrow(props) {
      const { className, style, onClick } = props;
      return (
       <ArrowBackIosIcon  className={className}
        style={{ ...style, display: "block", height:'100%' }}
        onClick={onClick} fontSize="large" />
      );
    }
   
    if (medium) {
      var settings = {
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SliderNextArrow />,
        prevArrow: <SliderPrevArrow />,
      };
    } else if (large) {
      var settings = {
        dots: false,
        slidesToShow: 2,
        slidesToScroll: 2,
        nextArrow: <SliderNextArrow />,
        prevArrow: <SliderPrevArrow />,
      };
    } else if (xLarge) {
      var settings = {
        dots: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        nextArrow: <SliderNextArrow />,
        prevArrow: <SliderPrevArrow />,
      };
    } else {
      var settings = {
        dots: false,
        slidesToShow: 4,
        slidesToScroll: 4,
        nextArrow: <SliderNextArrow />,
        prevArrow: <SliderPrevArrow />,
      };
    }

    useEffect(() => {
        db.collection('Experiences').get()
        .then(querySnapshot => {
        const allExperiences = [];
        querySnapshot.forEach( doc => {

            allExperiences.push({
                ...doc.data(),
                key: doc.id,
              });
        })
        setExperiences(allExperiences);
        setIndexNumber(allExperiences.length);
      })
      .catch(err => {
        console.log(err.message)
      })
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      const SaveCountGoExperience = (item) => {
        UpdateExperience(item);
        history.push('experience',{param: item.key})
      };
    
  return (
    <div className="home-content">
      <div className="card-content">
        <div className="text-content">
          <p className="head-text">Most Popular</p>
          <p className="index-text">({indexNumber})</p>
        </div>
        <div className="slider-content">
        <Slider {...settings}>
          {experiences.map((item, index) => (
          <Card key={item.key} className={classes.root}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                 <img
                src={item.experience_owner_photo}
                width="40"
                height="40"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
            />
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={<p>{item.name}</p>}
            subheader={<p>{new Date(item.createdAt.toDate()).toDateString()}</p>}
          />
          <CardMedia
            className={classes.media}
            image={item.image}
          />
          <CardContent>
            <div className="card-icons-content-col">
              <div className="card-icons-content-row">
                <VisibilityIcon/>
                <p className="card-left-text">{item.viewedCount} views</p>
              </div>
              <div className="card-icons-content-row">
                <p className="card-right-text">{item.adress}</p>
                <LocationOnIcon/>
              </div>
            </div>
            <div className="card-icons-content-col">
              <div className="card-icons-content-row">
                <ThumbUpAltIcon/>
                <p className="card-left-text">{item.like} likes</p>
              </div>
              <div className="card-icons-content-row">
                <p className="card-right-text">{item.unlike} unlikes</p>
                <ThumbDownIcon/>
              </div>
            </div>
            <div className="card-icons-content-col">
              <div className="card-icons-content-row">
                <CommentIcon/>
                <p className="card-left-text">{item.commentedCount} comments</p>
              </div>
              <div className="card-icons-content-row">
                <p className="card-right-text">{item.ratedCount} times rated</p>
                <GradeIcon/>
              </div>
            </div>
          </CardContent>
          <CardActions disableSpacing>
            <div>
            <Tooltip title="Add to favorites">
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              </Tooltip>
              <Tooltip title="Share">
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
              </Tooltip>
            </div>
            <Tooltip title="Click to view">
              <IconButton onClick={() => { SaveCountGoExperience(item) }} aria-label="view">
                <ArrowForwardIcon fontSize="large" />
              </IconButton>
            </Tooltip>
          </CardActions>
        </Card>
          ))}
        </Slider>
        </div>
        </div>
      </div>
  );
}

export default Home;
