import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import ReduxTodo from './reduxExample/components/App';
import rootReducer from './reduxExample/reducers';

import zoo from './zoo';

import todoModel from './zooExample/Todo/model';
import zooModel from './zooExample/Zoo/model';

import ZooExample from './zooExample/index';

// redux
const store = createStore(rootReducer);

// zoo
const zooStore = zoo.init({
  todoModel,
  zooModel
});

render(
  <Provider store={zooStore}>
    <ZooExample />
  </Provider>,
  document.getElementById('root')
);

render(
  <Provider store={store}>
    <ReduxTodo />
  </Provider>,
  document.getElementById('root2')
);
