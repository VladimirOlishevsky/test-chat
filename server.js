const express = require('express');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.json());

const rooms = new Map();
const messages = [];


app.get('/rooms/:id', (req, res) => {

    console.log('HELLO EVERYONE')
    const { id: roomId } = req.params;

    console.log(messages)

    const obj = {
        users: [...rooms.get(roomId).get('users').values()],
        messages: messages
    }
    res.json(obj);
});

app.post('/rooms', (req, res) => {
    const { roomId, userName } = req.body;
    if (!rooms.has(roomId)) {
        rooms.set(
            roomId,
            new Map([
                ['users', new Map()],
                ['messages', []],
            ]),
        );
    }
    res.send();
});

io.on('connection', (socket) => {

    socket.on('ROOM_JOIN', ({ roomId, userName }) => {
        socket.join(roomId);
        rooms.get(roomId).get('users').set(socket.id, userName);
        const users = [...rooms.get(roomId).get('users').values()];
        socket.to(roomId).broadcast.emit('ROOM_SET_USERS', users);

    });

    socket.on('ROOM_NEW_MESSAGE', ({ roomId, userName, text, date }) => {
        const obj = {
            userName,
            text,
            date
        };
        rooms.get(roomId).get('messages').push(obj);
        socket.broadcast.emit('ROOM_NEW_MESSAGE', obj)
        messages.push(obj);
    });

    socket.on('GET_ROOMS', () => {
        const keys = [...rooms.keys()]
        console.log(JSON.stringify(keys))
        const ttt = JSON.stringify(keys);
        //socket.to(roomId).broadcast.emit('GET_ROOMS', rooms);
        io.sockets.emit('GET_ROOMS', ttt)

    });

    socket.on('disconnect', () => {
        rooms.forEach((value, roomId) => {
            if (value.get('users').delete(socket.id)) {
                const users = [...value.get('users').values()];
                socket.to(roomId).broadcast.emit('ROOM_SET_USERS', users);
            }
        });
    });

    console.log('user connected', socket.id);
});

server.listen(9999, (err) => {
    if (err) {
        throw Error(err);
    }
    console.log('Сервер запущен!');
});