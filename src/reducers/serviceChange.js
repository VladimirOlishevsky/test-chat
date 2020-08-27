import {
    CHANGE_SERVICE_REQUEST,
    CHANGE_SERVICE_FAILURE,
    CHANGE_SERVICE_SUCCESS,
    CHANGE_SERVICE_FIELD,
} from '../actions/actionTypes'


const initialState = {
    items: {
        id: '',
        name: '',
        price: '',
        content: ''
    },
    loading: false,
    error: null,
};

export default function serviceChangeReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_SERVICE_FIELD:
            console.log(action.payload)
            const { name, value } = action.payload;

            return {...state,
                items: {
                    ...state.items,
                    [name]: value
                }
            }
        case CHANGE_SERVICE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case CHANGE_SERVICE_FAILURE:
            const { error } = action.payload;
            return {
                ...state,
                loading: false,
                error,
            };
        case CHANGE_SERVICE_SUCCESS:
            const { items } = action.payload;
            console.log(items)
            return {
                ...state,
                items,
                loading: false,
                error: null,
            };
        default:
            return state;
    }
}