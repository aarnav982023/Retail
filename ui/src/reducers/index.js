import { combineReducers } from "redux";

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

export default combineReducers({
  sections: sectionsReducer
});
