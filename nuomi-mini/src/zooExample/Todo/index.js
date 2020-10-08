import React, { useState } from 'react';
import connect from '../../zoo/connect';
import './style.css';

const TestTodo = props => {
  const {
    dispatch,
    list,
    listStatus,
    loading,
    todoEffects,
    zooEffects
  } = props;

  const [value, setValue] = useState('');

  const onAdd = () => {
    dispatch({
      type: 'todo/setState',
      payload: { list: [...list, { title: value, status: 0 }] }
    });
  };

  const onAddAnimal = () => {
    // dispatch 实现
    // dispatch({
    //   type: 'zoo/addAnimal',
    //   payload: value
    // });

    // effects 方法实现
    // zooEffects.addAnimal(value);

    // 扩展 dispatch
    dispatch.zooEffects.addAnimal(value);
  };

  const onShowActived = () => {
    dispatch({
      type: 'todo/setState',
      payload: { listStatus: listStatus === 0 ? 'all' : 0 }
    });
  };

  const onShowFinished = () => {
    todoEffects.setState({
      listStatus: listStatus === 1 ? 'all' : 1
    });
  };

  const onShowAll = () => {
    todoEffects.setState({ listStatus: 'all' });
  };

  const onFinish = i => {
    todoEffects.finishTodo(i);
  };

  const showList =
    listStatus === 'all'
      ? list
      : list.filter(item => item.status === listStatus);

  return (
    <div>
      <input onChange={e => setValue(e.target.value)} />
      <button onClick={onAdd}>add todo</button>
      <button onClick={onAddAnimal}>add animal</button>

      <button onClick={onShowActived}>actived</button>
      <button onClick={onShowFinished}>finished</button>
      <button onClick={onShowAll}>all</button>

      <br />
      <h4>{loading ? 'loading...' : null}</h4>
      <ul>
        {showList &&
          showList.length > 0 &&
          showList.map((item, i) => {
            const { title, status } = item;
            return (
              <li
                key={item + i}
                style={{ color: status === 1 ? 'red' : '#000' }}
                onClick={() => onFinish(i)}
              >
                {item.title}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default connect(
  ({ todo: { list, listStatus, loading } }) => {
    return {
      list,
      listStatus,
      loading
    };
  },
  {},
  ['todo', 'zoo']
)(TestTodo);
