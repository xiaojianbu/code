import React, { useState, useEffect } from 'react';
import { connect } from '../../zoo';

const TestTodo = props => {
  const { dispatch, list, zooEffects } = props;

  useEffect(() => {
    dispatch({ type: 'zoo/getAnimal' });
  }, []);

  const [value, setValue] = useState('');

  const onAdd = () => {
    dispatch({
      type: 'zoo/addAnimal',
      payload: value
    });
  };

  const onDelete = () => {
    zooEffects.deleteOne();
  };

  return (
    <div>
      <input onChange={e => setValue(e.target.value)} />
      <button onClick={onAdd}>add animal</button>
      <button onClick={onDelete}>delete animal</button>
      <br />
      <ul>
        {list &&
          list.length > 0 &&
          list.map((item, i) => {
            return <li key={item + i}>{item}</li>;
          })}
      </ul>
    </div>
  );
};

export default connect(
  state => {
    return {
      list: state.zoo.list
    };
  },
  {},
  // effects 注入
  ['todo', 'zoo']
)(TestTodo);
