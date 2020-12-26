import React, { useState, useEffect } from 'react';
import '../../scss/Chat.scss'
import { useHistory } from "react-router-dom";
import { Input, Button ,MessageList} from 'react-chat-elements'
import 'react-chat-elements/dist/main.css';
import { db } from '../../../firebase/firebase.utils'
import { GetProfile, AddMessage } from './ItemService';
import {useDispatch, useSelector} from 'react-redux';

function Chat(props) {
    const history = useHistory();
    const experienceId = props.location.state.param;
    const [messages, setMessages] = useState([]);
    const [yourMessage, setYourMessage] = useState('');
    const dispatch = useDispatch();
    const [userUID] = useState(localStorage.getItem('userUID'));
    const profile = useSelector((state) => state.profile);

    useEffect(() => {
      GetProfile(dispatch, userUID);
       db.collection('Messages')
      .where('experienceId', '==', experienceId)
      .orderBy('createdAt', 'asc')
      .get()
      .then(function (querySnapshot) {
        var messagesAll = [];
        querySnapshot.forEach(function (documentSnapshot) {
          messagesAll.push({
            _id: documentSnapshot.data()._id,
            text: documentSnapshot.data().text,
            createdAt: new Date(documentSnapshot.data().createdAt.toDate()),
            user: documentSnapshot.data().user,
          });
        });
        setMessages(messagesAll);
      });
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [yourMessage]);

      const onSend = () => {
        AddMessage(
          userUID,
          yourMessage,
          experienceId,
          userUID,
          profile.photoURL,
        );
        setYourMessage('');
        window.location.reload(false)
      };
    
      function ChatList({ items }) {
        return items.map(item => (
            <MessageList
            className='message-list'
            lockable={true}
            toBottomHeight={'100%'}
            dataSource={[
                {
                    avatar:item.user.avatar,
                    position: item.user._id === userUID ? 'right': 'left',
                    type: 'text',
                    text: item.text,
                    date: new Date(item.createdAt),
                }
            ]} />
        ));
      }

      const handleChange = (event) => {
        setYourMessage(event.target.value);
      };

  return (
    <div className="container conta-chat">
        <ChatList items={messages}/>
        <div className="chat-input-div">
        <Input
            defaultValue={yourMessage}
            onChange={handleChange}
            placeholder="Type here..."
            multiline={true}
            rightButtons={
            <Button
                onClick={() => { onSend() }}
                color='white'
                backgroundColor='#FE5D26'
                text='Send'/>
            }
        />
              </div>
       
    </div>
  );
}

export default Chat;
