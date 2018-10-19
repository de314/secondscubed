import { combineReducers } from "redux";
import { reducer as toastr } from "react-redux-toastr";
import history from "./history";

export default combineReducers({
  history,
  toastr
});

export * from "./history";
