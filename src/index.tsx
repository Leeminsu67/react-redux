import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { applyMiddleware, createStore } from "redux";
import rootReducer, { RootState } from "./reducers";
import { Provider } from "react-redux";
import { thunk } from "redux-thunk";

// provider로 둘러 쌓인 컴포넌트에서 store 접근
// 리엑트에 Hooks가 있듯이 리덕스에도 Hooks가 있는데 그게 바로
// useSelector와 useDispatch입니다. 이 두 개를 이용해서 provider로 둘러싸인 컴포넌트에서 store에 접근 가능합니다.

// useSelector
// Hooks를 이용해서 스토어의 값을 가져올 수 있습니다.
// useDispatch
// setState같은거

// redux middleware
// 미들웨어는 액션을 dispatch에 전달하고 리듀서에 도달하는 순간 사이에 사전에 지정된 작업을 실행할 수 있게 해주는 중간자
// 로깅, 충돌 보고, 비동기 API 통신, 라우팅 등

// redux Thunk
// 리덕스를 사용하는 앱에서 비동기 작업을 할 때 많이 사용하는 방법이 redux-thunk
// 이것도 앞서 만들어본 미들웨어 처럼 리덕스 미들웨어
// 일부 지연된 작업을 수행하는 코드 조각, 지금 일부 논리를 실행하는 대신 나중에 작업을 수행하는데
// 사용할 수 있는 함수 본문이나 코드를 작성할 수 있음

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const loggerMiddleware = (store: any) => (next: any) => (action: any) => {
  console.log("store", store);
  console.log("action", action);
  next(action);
};

// redux 5.0.1버전 이상에서는 createStore를 쓸려면 preloadedState를 넣어줘야함
// 초기값이 먼저 설정이 되어 있어야 할 수 있음
const preloadedState = {
  counter: 0,
};

const middleware = applyMiddleware(thunk, loggerMiddleware);

const store = createStore(rootReducer, preloadedState, middleware);
// store.dispatch({
//   type: "ADD_TODO",
//   text: "USE REDUX",
// });

// console.log("store.getState", store.getState());

const render = () =>
  root.render(
    <React.StrictMode>
      {/* Provider는 store 속성에 store를 넣어줘야한다 */}
      <Provider store={store}>
        <App
          value={store.getState()}
          onIncrement={() => store.dispatch({ type: "INCREMENT" })}
          onDecrement={() => store.dispatch({ type: "DECREMENT" })}
        />
      </Provider>
    </React.StrictMode>
  );

render();

store.subscribe(render);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
