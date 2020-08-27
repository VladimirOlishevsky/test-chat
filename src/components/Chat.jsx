import React, { useRef,useState,useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import socket from '../socket';
import LinkRef from './LinkRef';

function Chat(props) {

  const { users, messages, userName, roomId, onAddMessage } = props;
  const state = useSelector((state) => state.reducerChat);
  console.log(state)

  const [messageValue, setMessageValue] = useState('');
  const messagesRef = useRef(null);

  //socket.on('ROOM_SET_USERS', console.log({rooms}));

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


  const getMes = () => {
    socket.emit('join', 999)
  }
  const sendRef = (ref) => {
    //socket.emit('join', '999');
    onAddMessage({ userName, text: <LinkRef get={getMes}/> });
    setMessageValue('');
    // console.log(`http://localhost:3000/${roomId}`)
    // const abc = () => {
    //   socket.emit('join', `http://localhost:3000/${roomId}`);
    // }
    // console.log(<Link onClick={abc}/>)
    // return <Link to={abc} />
    // socket.emit('join', {
    //   `http://localhost:3000/`
    // });
  }

  //console.log(users)
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
            <div key={index} className="message">
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
          <button onClick={sendRef} type="button" className="btn btn-primary">
            Отправить
          </button>
        </form>
      </div>
    </div>
    </Router>
  );
}

export default Chat;
