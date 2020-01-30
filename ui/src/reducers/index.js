import { combineReducers } from "redux";
import { REGISTER_USER } from "../actions/types";
import { registerUser } from "../actions";

const sectionsReducer = () => {
  return [
    "Electronics",
    "Appliances",
    "Fashion",
    "Furniture",
    "Sports",
    "Books"
  ];
};

export const registrationReducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  sections: sectionsReducer,
  user: registrationReducer
});
