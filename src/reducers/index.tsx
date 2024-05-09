import { combineReducers } from "redux";
import counter from "./counter";
import todos from "./todos";
import posts from "./posts";

// 여러개를 쓰고 싶을 때
// combineReducers
// 각각 원하는 동작이나 쓰고 싶은 state를 생성하고 rootReducer에 넣어주면 전역으로 state를 쓸 수 있다
const rootReducer = combineReducers({
  counter,
  todos,
  posts,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
