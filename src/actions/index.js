/* global API */
import { emit } from './websocket';

export const setStream = (...args) => (dispatch, getState) => {
  emit('setStream', ...args);
};

// TODO - actually do things with these events in the reducer
export const STREAMER_FETCH = Symbol('STREAMER_FETCH');
export const STREAMER_FETCH_FAILURE = Symbol('STREAMER_FETCH_FAILURE');
export const fetchStreamer = (name) => async (dispatch) => {
  const res = await fetch(`${API}/streamer/${name}`);
  if (res.status !== 200) {
    const err = await res.json();
    return dispatch({
      type: STREAMER_FETCH_FAILURE,
      error: err,
    });
  }
  const streamer = await res.json();
  return dispatch({
    type: STREAMER_FETCH,
    payload: streamer,
  });
};

export const SET_CHAT_SIZE = Symbol('SET_CHAT_SIZE');
export const setChatSize = size => (dispatch, getState) => {
  if (size < 320) {
    size = 320;
  }
  if (localStorage) {
    localStorage.setItem('chatSize', size);
  }
  dispatch({
    type: SET_CHAT_SIZE,
    payload: size,
  });
};
