const postReducer = (
  state = { posts: [], loading: false, error: false, uploading: false },
  action
) => {
  switch (action.type) {
    case 'UPLOAD_START':
      return {...state, uploading: true, error: false};
    case 'UPLOAD_SUCCESS':
      return {...state, posts: [...state.posts, action.data], uploading: false, error: false};
    case "UPLOAD_FAIL":
      return {...state, uploading: false, error: true};
    case "RETRIEVING_START":
    case "UPDATE_START":
    case "DELETE_START":
      return { ...state, loading: true, error: false };
    case "RETRIEVING_SUCCESS":
    case "UPDATE_SUCCESS":
    case "DELETE_SUCCESS":
      return { ...state, posts: action.data, loading: false, error: false };
    case "RETRIEVING_FAIL":
    case "UPDATE_FAIL":
    case "DELETE_FAIL":
      return { ...state, loading: false, error: true };
    default:
      return state
  }
}

export default postReducer;