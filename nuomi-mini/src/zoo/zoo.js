import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { combineReducers } from 'redux';

const addNamespace = (obj, name) => {
  const newObj = {};
  Object.keys(obj).forEach(item => {
    newObj[`${name}/${item}`] = obj[item];
  });
  return newObj;
};

class Zoo {
  constructor() {
    this.state = {};
    this.models = {};
    this.reducers = {};
    this.effects = {};
    this.store = {};
    this.allReducers = {};
  }

  init(models) {
    Object.values(models).forEach(item => {
      this.model(item);
    });

    return this.createStore();
  }

  // 加载模块 model 方法
  model(modelObj) {
    const { state, reducer, effects, namespace } = modelObj;
    this.state[namespace] = state;
    this.models[namespace] = modelObj;

    const newReducer = addNamespace(reducer, namespace);
    this.reducers[namespace] = newReducer;
    this.allReducers = { ...this.allReducers, ...newReducer };

    this.effects[namespace] = effects;
  }

  createStore() {
    // 全部 state
    const allState =
      (this.store.getState && this.store.getState()) || this.state;

    // 合并 reducer
    const reducer = (state = allState, action) => {
      let newState = state;

      const { type, payload } = action;
      const [namespace, typeName] = type.split('/');

      // 根据 namespace 获取对应 model 中 reducer 函数对象
      const currentState = newState[namespace];
      const currentReducer = this.reducers[namespace];

      // 如果 action 对应 reducer 存在，则根据函数修改 state，否则直接返回原 state
      if (currentReducer && currentReducer[type] && currentState) {
        newState[namespace] = currentReducer[type](payload, currentState);
        // 修改后的 state 必须是新的对象，这样才不会覆盖旧的 state，才可以修改生效
        newState = { ...newState };
      }

      return newState;
    };

    // 创建 store
    this.store = createStore(reducer);

    const { dispatch, getState } = this.store;

    // 给每个 model 的 effects 对象添加 dispatch、getState 方法
    Object.keys(this.effects).forEach(namespace => {
      this.effects[namespace].dispatch = ({ type, payload }) =>
        // 修改 action type，添加 namespace
        dispatch({ type: `${namespace}/${type}`, payload });
      this.effects[namespace].getState = getState;
    });

    return this.store;
  }
}

export default new Zoo();
