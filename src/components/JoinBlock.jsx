import React, { useState } from 'react';
import axios from 'axios';
import socket from '../socket';


function JoinBlock({ onLogin }) {
  const [userName, setUserName] = useState('');
  const [isLoading, setLoading] = useState(false);

  const onEnter = async () => {
    if (!userName) {
      return alert('Неверный логин или пароль');
    }
    console.log(userName)
    const obj = {
      roomId: socket.id,
      userName,
    };
    setLoading(true);
    await axios.post('/rooms', obj);
    onLogin(obj);
  };


  const onLoginChat = (e) => {

    if (e.key === 'Enter') {
      e.preventDefault()
      return onEnter()
    }
  }

  return (
    <div id="range5">

      <div className="outer">
        <div className="middle">
          <div className="inner">

            <div className="login-wr">
              <h2>Вход</h2>
              <div className="form">
                <input
                  onKeyDown={onLoginChat}
                  className='password'
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Пользователь" />
                <button disabled={isLoading} onClick={onEnter} className="btn btn-success"> Авторизоваться </button>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}

export default JoinBlock;
