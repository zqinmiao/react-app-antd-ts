import { applyMiddleware, createStore } from "redux";
// import createSagaMiddleware from "redux-saga";
// redux-thunk可以将action变为异步的
import thunk from "redux-thunk";
// import sagas from "../sagas/index";
import rootReducer from "./reducers/index";

// 创建saga中间件
// const sagaMiddleware = createSagaMiddleware();

// 将中间件挂载到store上
const store = createStore(rootReducer, applyMiddleware(thunk));

// 运行saga
// sagaMiddleware.run(sagas);

export default store;
