import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import axios from 'axios';

import socket from './socket';
import JoinBlock from './components/JoinBlock';
import Chat from './components/Chat';
import { joinUser, setData, setAllUsers, newMessage, getRooms, setRoomId } from './actions/actionCreators';

function App() {

  const state = useSelector((state) => state.reducerChat);
  const dispatch = useDispatch();

  const onLogin = async (obj) => {

    console.log(socket.id)
    dispatch(joinUser(obj))
    dispatch(setRoomId(socket.id))
    socket.emit('ROOM_JOIN', obj);
    socket.emit('GET_ROOMS');

    dispatch(getRooms())
    const { data } = await axios.get(`/rooms/${socket.id}`);

    dispatch(setData(data))
  };

  const setUsers = (users) => {
    dispatch(setAllUsers(users))
  };

  const addMessage = (message) => {
    dispatch(newMessage(message));
  };

  useEffect(() => {
    socket.on('ROOM_SET_USERS', setUsers);
    socket.on('ROOM_NEW_MESSAGE', addMessage);
  }, []);

  window.socket = socket;

  return (
    <div className="wrapper">
      {!state.joined ? (
        <JoinBlock onLogin={onLogin} />
      ) : (
          <Chat {...state} onAddMessage={addMessage} />
        )}
    </div>
  );
}

export default App;
