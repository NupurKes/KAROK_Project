import * as PostApi from '../API/PostRequest'

export const getTimelinePosts = (id) => async (dispatch) => {
  dispatch({ type: "RETRIEVING_START"})
  
  try {
    const {data} = await PostApi.getTimelinePosts(id);
    dispatch({ type: "RETRIEVING_SUCCESS", data: data})
  } catch (e) {
    dispatch({ type: "RETRIEVING_FAIL"})
    console.log(e);
  }
};

export const getAllPosts = () => async (dispatch) => {
  dispatch({ type: "RETRIEVING_START"})

  try {
    const {data} = await PostApi.getAllPosts();
    console.log(data)
    dispatch({ type: "RETRIEVING_SUCCESS", data: data})
  } catch (e) {
    dispatch({ type: "RETRIEVING_FAIL"})
    console.log(e);
  }
};

export const updatePost = (id, data) => async (dispatch) => {
  dispatch({type: "UPDATE_START"})
  
  try {
    const updatePost = await PostApi.updatePost(id, data);
    dispatch({ type: "UPDATE_SUCCESS", data: updatePost.data})
  } catch (e) {
    console.log(e);
    dispatch({type: "UPDATE_FAIL"})
  }
}

export const deletePost = (id, user) => async (dispatch) => {
  dispatch({type: "DELETE_START"})
  try {
    const { data } = await PostApi.deletePost(id, user);
    console.log('delete' + data)
    dispatch({ type: "DELETE_SUCCESS", data: data })
  } catch (e) {
    console.log(e);
    dispatch({type: "DELETE_FAIL"})
  }
}
