import React, { useState, useEffect } from 'react';
import '../scss/Profile.scss'
import { useHistory } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {GetProfile} from '../components/experiences/ItemService';
import ChatIcon from '@material-ui/icons/Chat';
import PersonIcon from '@material-ui/icons/Person';
import TodayIcon from '@material-ui/icons/Today';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import DescriptionIcon from '@material-ui/icons/Description';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';

const chatActiveStatus = {color:'#399E5A'};
const chatInactiveStatus = {color:'#D80032'};
function Profile() {
    const history = useHistory();
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.profile);
    const [userUID] = useState(localStorage.getItem('userUID'));

    useEffect(() => {
        GetProfile(dispatch, userUID);
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [dispatch, userUID]);
    
  return (
    <div className="container conta-profile">
       <div className="top-div">
        <div className="left-img-div">
            {console.log(profile)}
            <img src={profile.photoURL} alt="experienceimage"/>
        </div>
        <div className="right-content-div">
            <div className="right-content-inside">
                <ChatIcon style={{ color: '#FE5D26' }} fontSize="small" />
                <p className="orange-tag">chat status : </p>
                <p className="bio-text" style={ profile.isChatOpen
                  ? chatActiveStatus
                  : chatInactiveStatus
              }>{profile.isChatOpen ? 'active' : 'inactive'} </p>
            </div>
            <div className="right-content-inside">
                <PersonIcon style={{ color: '#FE5D26' }} fontSize="small" />
                <p className="orange-tag">name : </p>
                <p className="bio-text">{profile.name} </p>
            </div>
            <div className="right-content-inside">
                <TodayIcon style={{ color: '#FE5D26' }} fontSize="small" />
                <p className="orange-tag">birthdate : </p>
                <p className="bio-text">{profile.name} </p>
            </div>
            <div className="right-content-inside">
                <EmojiEmotionsIcon style={{ color: '#FE5D26' }} fontSize="small" />
                <p className="orange-tag">age : </p>
                <p className="bio-text">{profile.name} </p>
            </div>
        </div>
       </div>
       <div className="bottom-div">
           <div className="bottom-div-inside">
                <DescriptionIcon style={{ color: '#FE5D26' }} fontSize="small" />
                <p className="orange-tag">bio: </p>
                <p className="bio-text">{profile.bio} </p>
            </div>
            <div className="bottom-div-inside2">
            <Tooltip title="Edit profile">
                  <IconButton aria-label="edit">
                    <EditIcon style={{ color: '#FE5D26' }} fontSize="large" />
                  </IconButton>
              </Tooltip>
            </div>
       </div>
    </div>
  );
}

export default Profile;
