const commentReducer = (
  state = {comments: [], uploading:false, loading:false, error: false},
  action
) => {
  switch (action.type) {
    case "COMMENT_START":
      return { ...state, uploading:true, error: false };
    case "COMMENT_SUCCESS":
      return { ...state, comments: [action.data, ...state.comments], uploading:false, error: false };
    case "COMMENT_FAIL":
      return { ...state, uploading:false, error: true };
    case "GET_COMMENTS_START":
    case "DELETE_COMMENT_START":
      return { ...state, loading:true, error: false };
    case "GET_COMMENTS_SUCCESS":
    case "DELETE_COMMENT_SUCCESS":
      return { ...state, comments: action.data, loading:false, error: false };
    case "GET_COMMENTS_FAIL":
    case "DELETE_COMMENT_FAIL":
      return { ...state, loading:false, error: true };
    default:
      return state
  }
}

export default commentReducer;
