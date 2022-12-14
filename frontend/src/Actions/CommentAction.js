import * as PostApi from '../API/PostRequest'

export const commentPost = (id, username, userId, comment, commentId) => async (dispatch) => {
  dispatch({type: "COMMENT_START"})
  
  try {
    const { data } = await PostApi.commentPost(id, username, userId, comment, commentId);
    dispatch({ type: "COMMENT_SUCCESS", data: data})
  } catch (e) {
    console.log(e);
    dispatch({type: "COMMENT_FAIL"})
  }
}

export const getCommentsPost = (id) => async (dispatch) => {
  dispatch({type: "GET_COMMENTS_START"})
  
  try {
    const { data } = await PostApi.getCommentsPost(id);
    dispatch({ type: "GET_COMMENTS_SUCCESS", data: data})
  } catch (e) {
    console.log(e);
    dispatch({type: "GET_COMMENTS_FAIL"})
  }
}

export const deleteCommentsPost = (id, commendId, userId) => async (dispatch) => {
  dispatch({type: "DELETE_COMMENT_START"})
  
  try {
    const { data } = await PostApi.deleteCommentPost(id, commendId, userId);
    dispatch({ type: "DELETE_COMMENT_SUCCESS", data: data})
  } catch (e) {
    console.log(e);
    dispatch({type: "DELETE_COMMENT_FAIL"})
  }
}
