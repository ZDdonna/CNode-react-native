/**
 * React Native App
 * https://github.com/ztplz/CNode-react-native
 * email: mysticzt@gmail.com
 */

import { fromJS } from 'immutable';
import {
  HAVEREAD_MESSAGE_REPLY_TEXTINPUT_SHOW,
  HAVEREADMESSAGE_REPLY,
  HAVEREAD_MESSAGE_REPLY_TEXT_CHANGE,
  FETCH_HAVEREADMESSAGE_DATA,
  FETCH_HAVEREADMESSAGE_DATA_SUCCESS,
  FETCH_HAVEREADMESSAGE_DATA_FAILURE,
  REFRESH_HAVEREADMESSAGE_DATA,
  REFRESH_HAVEREADMESSAGE_DATA_SUCCESS,
  REFRESH_HAVEREADMESSAGE_DATA_FAILURE,
} from '../constants/actionTypes';

const initialState = fromJS({
  isLoading: false,
  isLoaded: false,
  isRefreshing: false,
  isReply: false,
  replyName: '',
  replyId: '',
  replyTopicId: '',
  replyText: '',
  error: '',
  data: [],
});

export default function UnreadMessageState(state=initialState, action) {
  switch (action.type) {
    case HAVEREAD_MESSAGE_REPLY_TEXTINPUT_SHOW:
      return state.set('isReply', action.payload.isReply)
                  .set('replyName', action.payload.replyName)
                  .set('replyId', action.payload.replyId)
                  .set('replyTopicId', action.payload.replyTopicId)
                  .set('replyText', action.payload.text);
    case HAVEREAD_MESSAGE_REPLY_TEXT_CHANGE:
      return state.set('replyText', action.payload.text);
    case FETCH_HAVEREADMESSAGE_DATA:
      return state.set('isLoading', action.payload.isLoading)
                  .set('isLoaded', action.payload.isLoaded)
                  .set('error', action.payload.error);
    case FETCH_HAVEREADMESSAGE_DATA_SUCCESS:
      return state.set('isLoading', action.payload.isLoading)
                  .set('isLoaded', action.payload.isLoaded)
                  .set('data', action.payload.data);
    case FETCH_HAVEREADMESSAGE_DATA_FAILURE:
      return state.set('isLoading', action.payload.isLoading)
                  .set('error', action.payload.error);
    case REFRESH_HAVEREADMESSAGE_DATA:
      return state.set('isRefreshing', action.payload.isRefreshing)
                  .set('error', action.payload.error);
    case REFRESH_HAVEREADMESSAGE_DATA_SUCCESS:
      return state.set('isRefreshing', action.payload.isRefreshing)
                  .set('data', action.payload.data);
    case REFRESH_HAVEREADMESSAGE_DATA_FAILURE:
      return state.set('isRefreshing', action.payload.isRefreshing)
                  .set('error', action.payload.error);
    default:
      return state;
  }
}
