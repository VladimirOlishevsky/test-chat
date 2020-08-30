const initial = {
    joined: false,
    roomId: null,
    userName: null,
    users: [],
    messages: [],
}


export default (state = initial, action) => {
    switch (action.type) {
        case 'JOIN_USER':
            return {
                ...state,
                joined: true,
                userName: action.payload.userName,
                roomId: action.payload.roomId,
            };

        case 'SET_DATA':
            console.log(action.payload.messages)
            return {
                ...state,
                users: action.payload.users,
                messages: action.payload.messages,
            };

        case 'SET_USERS':
            return {
                ...state,
                users: action.payload,
            };
        case 'SET_ROOM_ID':
            return {
                ...state,
                roomId: action.payload,
            };

        case 'NEW_MESSAGE':
            return {
                ...state,
                messages: [...state.messages, action.payload],
            };

        default:
            return state;
    }
};