import { combineReducers } from "redux";
import userReducer from "./userReducer";
import selectedChatReducer from "./selectedChatReducer";

const rootReducer = combineReducers({
    userReducer,
    selectedChatReducer
})

export default rootReducer