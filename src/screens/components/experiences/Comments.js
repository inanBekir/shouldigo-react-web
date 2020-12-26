import React, { useState, useEffect } from 'react';
import '../../scss/Comments.scss'
import { Jumbotron, Image, Dropdown } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import { GetProfile, GetComments, AddComment, GetExperience, UpdateExperienceCommentedCount, DeleteComment } from './ItemService';
import {useDispatch, useSelector} from 'react-redux';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

function Comments(props) {
    const classes = useStyles();
    const history = useHistory();
    const experienceId = props.location.state.param;
    const [userUID] = useState(localStorage.getItem('userUID'));
    const [comment, setComment] = useState('');
    const [counter, setCounter] = useState(0);
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.profile);
    const [page, setPage] = useState(10);
    const comments = useSelector((state) => state.comments);
    const experience = useSelector((state) => state.experience);

    const getComments = () => {
      setPage(page + 10);
      GetComments(dispatch, page, experienceId);
    };

    useEffect(() => {
            getComments();
            GetProfile(dispatch, userUID);
            GetExperience(dispatch, experienceId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [counter]);

      const saveComment = () => {
        if (comment === '') {
          console.log('no')
        } else {
          AddComment(
            comment,
            userUID,
            profile.photoURL,
            experienceId,
            profile.name,
          );
          setComment('');
          UpdateExperienceCommentedCount(experienceId, experience.commentedCount);
          setCounter(counter + 1);
        }
      };

      const handleChange = (event) => {
        setComment(event.target.value);
      };

      const loadMore = () => {
        getComments();
      };

      const removeComment = (id) => {
        DeleteComment(id);
        setCounter(counter + 1);
      };

      function CommentsList({ items }) {
        return items.map(item => (
            <Jumbotron key={item.key}>
                <div className="comment-top-content">
                    <div className="top-left">
                      <Image src={item.comment_own_image} roundedCircle />
                      <div className="name-date-content">
                          <p>{userUID === item.comment_owner_id
                          ? 'You'
                          : item.comment_owner_name}</p>
                          <p>{new Date(item.comment_date.toDate()).toDateString()}</p>
                      </div>
                    </div>
                    <Dropdown>
                    <Dropdown.Toggle className="more-button" id="dropdown-basic">
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <div className="comment-btn-div">
                          <Dropdown.Item href="/profile"> <EditIcon  />Edit</Dropdown.Item>
                      </div>
                      <div className="comment-btn-div">
                          <Dropdown.Item onClick={() => { removeComment(item.key) }}> <DeleteIcon  />Delete</Dropdown.Item>
                      </div>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="comment-bottom-content"> 
                <p>
                    {item.comment_line}
                </p>
                </div>
          </Jumbotron>
        ));
      }
    
  return (
    <div>
        <div className="container conta-comments">
            <CommentsList items={comments} />
            <div className="load-more-btn-div">
                <Tooltip title="Load more comments">
                  <IconButton onClick={() => { loadMore() }} aria-label="loadMore">
                    <p>Load more</p>
                  </IconButton>
                </Tooltip>  
            </div>
        </div>
        <div className="comment-input-div">
            <div className="container bottom-input-div">
            <div className="form-div">
            <form className={classes.root} noValidate autoComplete="off">
                <TextField 
                id="standard-multiline-flexible"
                label="Your comment..."
                placeholder="Type your comment here..."
                multiline
                fullWidth
                color="secondary"
                rowsMax={4} 
                variant="outlined" 
                onChange={handleChange}
                value={comment}
                />
            </form>
            </div>
            <div className="add-comment-btn">
            <Tooltip title="Add comment">
              <IconButton onClick={() => { saveComment() }} aria-label="add">
                <AddIcon fontSize="large" style={{ color: '#FAFAFA' }} />
              </IconButton>
              </Tooltip>
              </div>
            </div>
        </div>
    </div>
  );
}

export default Comments;
