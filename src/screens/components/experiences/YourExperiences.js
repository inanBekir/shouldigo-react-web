import React, { useState, useEffect } from 'react';
import '../../scss/YourExperiences.scss'
import { useHistory } from "react-router-dom";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { deleteExperience, GetAllYourExperiences} from './ItemService';
import {useDispatch, useSelector} from 'react-redux';

function YourExperiences() {
    const history = useHistory();
    const [open, setOpen] = useState(false)
    const [tempExpKey, setTempExpKey] = useState('')
    const [counter, setCounter] = useState(0);
    const [userUID] = useState(localStorage.getItem('userUID'));
    const dispatch = useDispatch();
    const experiences = useSelector((state) => state.allYourExperiences);

    const goExperience = (param) => history.push('experience',{param: param});

    const getExperiences = () => {
      GetAllYourExperiences(dispatch, 10, userUID);
    };

    useEffect(() => {
        getExperiences();
      
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [counter]);

      const openSheet = (key) => {
        setOpen(true);
        setTempExpKey(key)
      };

      const removeExperience = () => {
              deleteExperience(tempExpKey);
              setCounter(counter + 1);
              setOpen(false);
      };
    
      function ExperiencesList({ items }) {
        return items.map(item => (
            <div onClick={() => { openSheet(item.key) }} className="card-conta" key={item.key} style={{ width: '18rem' }}>
              <p>{item.name}</p>
              <img src={item.image} alt="experienceimage"/>
              <div className="loc-conta">
                <LocationOnIcon />
                <p>{item.adress}</p>
              </div>
            </div>
        ));
      }
    
  return (
    <div className="your-experiences-content">
        <ExperiencesList items={experiences} />
        <BottomSheet open={open}>
            <div className="modal-btn-group">
              <Tooltip title="Go experience">
                <IconButton onClick={() => { goExperience(tempExpKey) }} aria-label="view">
                  <p>go</p>
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit experience">
                <IconButton aria-label="view">
                  <p>edit</p>
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete experience">
                <IconButton onClick={() => { removeExperience(tempExpKey) }} id="delete-btn" aria-label="view">
                  <p>delete</p>
                </IconButton>
              </Tooltip>
              <Tooltip title="Cancel">
                <IconButton onClick={() => { setOpen(false) }} aria-label="view">
                  <p>cancel</p>
                </IconButton>
              </Tooltip>
            </div>
        </BottomSheet>
    </div>
  );
}

export default YourExperiences;
