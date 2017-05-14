/**
 * React Native App
 * https://github.com/ztplz/CNode-react-native
 * email: mysticzt@gmail.com
 */

import {put, take, call, fork, race, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  FETCH_HAVEREADMESSAGE_DATA,
  FETCH_HAVEREADMESSAGE_DATA_SUCCESS,
  FETCH_HAVEREADMESSAGE_DATA_FAILURE,
  REFRESH_HAVEREADMESSAGE_DATA,
  REFRESH_HAVEREADMESSAGE_DATA_SUCCESS,
  REFRESH_HAVEREADMESSAGE_DATA_FAILURE,
} from '../constants/actionTypes';
import { getFetch } from '../utils/fetchUtils';
import { getMessageUrl } from '../constants/api';

function* fetchHavereadMessage(action) {
  console.log(action.payload);
  try {
    const url = getMessageUrl +'?accesstoken=' + action.payload.accesstoken;
    const data = yield call(getFetch, action.payload.timeout, url);
    console.log(data);
    yield put({
      type: FETCH_HAVEREADMESSAGE_DATA_SUCCESS,
      payload: {
        isLoading: false,
        isLoaded: true,
        data: data.has_read_messages,
      }
    });
  } catch(error) {
    yield put({
      type: FETCH_HAVEREADMESSAGE_DATA_FAILURE,
      payload: {
        isLoading: false,
        error: error,
      }
    });
  }
}

function* refreshHavereadMessage(action) {
  try {
    const url = getMessageUrl +'?accesstoken=' + action.payload.accesstoken;
    const data = yield call(getFetch, action.payload.timeout, url);
    console.log(data);
    yield put({
      type: REFRESH_HAVEREADMESSAGE_DATA_SUCCESS,
      payload: {
        isRefreshing: false,
        data: data.has_read_messages,
      }
    });
  } catch(error) {
    Toast.show('刷新失败，请重试...', {position: 80});
    yield put({
      type: REFRESH_HAVEREADMESSAGE_DATA_FAILURE,
      payload: {
        isRefreshing: false,
        error
      }
    });
  }
}


export function* watchFetchHavereadMessage() {
  while(true) {
    const action = yield take(FETCH_HAVEREADMESSAGE_DATA);
    yield call(fetchHavereadMessage, action);
  }
}

export function* watchRefreshHavereadMessage() {
  while(true) {
    const action = yield take(REFRESH_HAVEREADMESSAGE_DATA);
    yield call(refreshHavereadMessage, action);
  }
}
