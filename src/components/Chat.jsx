import React, { useRef, useState, useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch } from 'react-redux';

import socket from '../socket';
import LinkRef from './LinkRef';
import { joinUser, setData, getRooms, setRoomId } from '../actions/actionCreators';
import axios from 'axios';


function Chat(props) {

  const { users, messages, userName, roomId, onAddMessage } = props;
  const dispatch = useDispatch()
  const [messageValue, setMessageValue] = useState('');
  const messagesRef = useRef(null);


  const sendRoomLink =() => {
    socket.emit('ROOM_NEW_MESSAGE', {
      userName,
      roomId,
      text: {
        type: 'join my room',
        number: roomId
      },
    });
    onAddMessage({ userName, text: roomId });
  }
  
  const joinRoom = async (obj) => {
    const newObj = {
      roomId: obj,
      userName,
    }
    
    onAddMessage({ userName, text: 'Вы присоедиились к чату' });
    dispatch(joinUser(newObj));
    dispatch(setRoomId(socket.id));

    socket.emit('ROOM_JOIN', newObj);
    socket.emit('GET_ROOMS');

    dispatch(getRooms())
    //await axios.post('/rooms', newObj);
    const { data } = await axios.get(`/rooms/${socket.id}`);
    //const arr = await axios.get(`/rooms/getrooms`);

    console.log(data)
    dispatch(setData(data))

    

  };

  const onSendMessage = () => {
    socket.emit('ROOM_NEW_MESSAGE', {
      userName,
      roomId,
      text: messageValue,
    });
    onAddMessage({ userName, text: messageValue });
    setMessageValue('');
  };

  useEffect(() => {
    messagesRef.current.scrollTo(0, 99999);
  }, [messages]);


  // const getMes = () => {
  //   socket.emit('join', roomId)
  // }
  // const sendRef = (ref) => {
  //   //socket.emit('join', '999');
  //   socket.emit('ROOM_NEW_MESSAGE', {
  //     userName,
  //     roomId,
  //     text: {
  //       type: 'join my room ',
  //       number: roomId
  //     },
  //   });
  //   onAddMessage({ userName, text: <LinkRef /> });
  //   setMessageValue('');
  // }

  return (
    <Router>
      <div className="chat">
        <div className="chat-users">
          Комната: <b>{roomId}</b>
          <hr />
          <b>Онлайн ({users.length}):</b>
          <ul>
            {users.map((name, index) => (
              <li key={name + index}>{name}</li>
            ))}
          </ul>
        </div>
        <div className="chat-messages">
          <div ref={messagesRef} className="messages">
            {messages.map((message, index) => (
              message.text.type ?
                <div key={index} className="message">
                  <LinkRef obj={message.text.number} get={joinRoom} />
                  <div>
                    <span>{message.userName}</span>
                  </div>
                </div>
                : <div key={index} className="message">
                  <p>{message.text}</p>
                  <div>
                    <span>{message.userName}</span>
                  </div>
                </div>

            ))}
          </div>
          <form>
            <textarea
              value={messageValue}
              onChange={(e) => setMessageValue(e.target.value)}
              className="form-control"
              rows="3"></textarea>
            <button onClick={onSendMessage} type="button" className="btn btn-primary">
              Отправить
          </button>
            <button onClick={sendRoomLink} type="button" className="btn btn-primary">
              Отправить
          </button>
          </form>
        </div>
      </div>
    </Router>
  );
}

export default Chat;
