import { ADMIN_LOGIN,ADMIN_LOG_OUT } from '../actions/types';

const initialState = {
  data: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADMIN_LOGIN:
      return {
        ...state,
        data: action.payload
      };
    case ADMIN_LOG_OUT:{
      return {
        ...state,
        data: null
      };
    }  
    default:
      return state;
  }
}
