import { userConstants } from '../constants';
import ifridgeApi from '../apis/ifridgeApi';

// export const login = (values, callback) => {
//   const user = {}

//   return {
//     type: userConstants.LOGIN_REQUEST,
//     payload: user
//   };
// };

export const signin = (formProps, callback) => async dispatch => {
  dispatch({ type: userConstants.LOGIN_REQUEST });

  try {
    const response = await ifridgeApi.post('/signin', formProps);

    dispatch({ type: userConstants.LOGIN_SUCCESS, payload: response.data.token });
    localStorage.setItem('token', response.data.token);
    callback();
  } catch (e) {
    dispatch({ type: userConstants.LOGIN_FAILURE, payload: 'Invalid login credentials' });
  }
};