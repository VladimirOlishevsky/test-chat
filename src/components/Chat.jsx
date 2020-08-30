import React, { useRef, useState, useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch } from 'react-redux';

import socket from '../socket';
import LinkRef from './LinkRef';
import { joinUser, setData, getRooms, setRoomId } from '../actions/actionCreators';
import axios from 'axios';
import moment from 'moment';

function Chat(props) {

  const { users, messages, userName, roomId, onAddMessage } = props;
  const dispatch = useDispatch()
  const [messageValue, setMessageValue] = useState('');
  const messagesRef = useRef(null);

  const joinRoom = async (obj) => {
    const newObj = {
      roomId: obj,
      userName,
    }
    dispatch(joinUser(newObj));
    dispatch(setRoomId(socket.id));

    socket.emit('ROOM_JOIN', newObj);
    socket.emit('GET_ROOMS');

    dispatch(getRooms())
    const { data } = await axios.get(`/rooms/${socket.id}`);
    
    dispatch(setData(data))
  };

  const onSendMessage = (type) => {

    if (type) {
      socket.emit('ROOM_NEW_MESSAGE', {
        userName,
        roomId,
        text: {
          type: type,
          number: roomId,
          date: moment().format('D:MM H:mm')
        },
      });
      onAddMessage({ userName, text: roomId, date: moment().format('D:MM H:mm') });
    } else {
      socket.emit('ROOM_NEW_MESSAGE', {
        userName,
        roomId,
        text: messageValue,
        date: moment().format('D:MM H:mm')
      });
      onAddMessage({ userName, text: messageValue, date: moment().format('D:MM H:mm') });
      setMessageValue('');
    }
  };

  const enterSendMessage = (e) => {

    if (e.key === 'Enter') {
      e.preventDefault()
      return onSendMessage()
    }
  }

  useEffect(() => {
    messagesRef.current.scrollTo(0, 99999);
  }, [messages]);

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
                    <span className='message-date'>{message.text.date}</span>
                    <span className='message-name'>{message.userName}</span>
                  </div>
                </div>
                : <div key={index} className="message">
                  <p>{message.text}</p>
                  <div>
                    <span className='message-date'>{message.date}</span>
                    <span className='message-name'>{message.userName}</span>
                  </div>
                </div>

            ))}
          </div>
          <form>
            <textarea
              onKeyDown={enterSendMessage}
              value={messageValue}
              onChange={(e) => setMessageValue(e.target.value)}
              className="form-control"
              rows="3"></textarea>
            <button onClick={onSendMessage} type="button" className="btn btn-primary">
              Отправить
          </button>
            <button onClick={() => onSendMessage('join to my room')} type="button" className="btn btn-primary">
              Отправить ссылку на комнату
          </button>
          </form>
        </div>
      </div>
    </Router>
  );
}

export default Chat;
