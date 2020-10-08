# zoo redux test

nuomi / dva 类似封装 redux

path: /src/zoo

- api 和写法类似 dva
- 添加类似 mobx 的 effects 注入

```js
const onAdd = () => {
  dispatch({
    type: 'zoo/addAnimal',
    payload: value
  });

  // effects 注入写法
  zooEffects.addAnimal(value);
};
```

> 基础功能，细节忽略

# start

```shell
yarn install
yarn start
```

> 示例中实现了 todo list 基本功能，可对比 redux 原生代码
