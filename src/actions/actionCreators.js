import {
    JOIN_USER,
    SET_USERS,
    NEW_MESSAGE,
    SET_DATA,
    GET_ROOMS,
    SET_ROOM_ID
} from './actionTypes';

export const joinUser = userObj => ({
    type: JOIN_USER,
    payload: userObj
});

export const setAllUsers = users => ({
    type: SET_USERS,
    payload: users,

});

export const newMessage = message => ({
    type: NEW_MESSAGE,
    payload: message,
});

export const setData = data => ({
    type: SET_DATA,
    payload: data,
})

export const getRooms = data => ({
    type: GET_ROOMS,
    payload: data
})

export const setRoomId = data => ({
    type: SET_ROOM_ID,
    payload: data
})