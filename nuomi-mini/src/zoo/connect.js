import React from 'react';
import { connect } from 'react-redux';
import zoo from './zoo';

export default (mapState, mapDispatch = {}, effectsArr = []) => {
  return Component => {
    const { getState, dispatch } = zoo.store;

    // 修改组件中 dispatch 触发 effects 中对应方法，而不是 reducer
    const myDispatch = ({ type, payload }) => {
      const [typeId, typeName] = type.split('/');
      const { effects } = zoo;

      if (effects[typeId] && effects[typeId][typeName]) {
        return effects[typeId][typeName](payload);
      }
    };

    const NewComponent = props => {
      const { effects } = zoo;
      const effectsProps = {};

      effectsArr.forEach(item => {
        if (effects[item]) {
          effectsProps[`${item}Effects`] = effects[item];
          myDispatch[`${item}Effects`] = effects[item];
        }
      });

      return <Component {...props} dispatch={myDispatch} {...effectsProps} />;
    };

    return connect(mapState, mapDispatch)(NewComponent);
  };
};
