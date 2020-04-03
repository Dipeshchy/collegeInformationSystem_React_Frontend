import axios from "axios";

import {
  ADMIN_LOGIN,
  ADMIN_LOG_OUT
} from "../types";

const baseUrl = "http://localhost:8080"
// Admin Login
export const adminLogin = (admin) => dispatch => {

  return axios
    .post(baseUrl + "/api/admin/login", admin)
    .then(res => {
      if (res.data) {
        // localStorage.setItem('loggedInData', res.data)
        dispatch({
          type: ADMIN_LOGIN,
          payload: res.data
        })
      }
      return res;
    }
    )
    .catch(err => {
      dispatch({
        type: ADMIN_LOGIN,
        payload: null
      })
      return err;
    }
    );
};

export const adminLogOut = () => dispatch => {
  localStorage.removeItem('loggedInData')
  dispatch({
    type: ADMIN_LOG_OUT
  })
}