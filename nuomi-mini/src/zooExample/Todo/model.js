export default {
  namespace: 'todo',
  state: {
    list: [{ title: 'bug', status: 0 }],
    listStatus: 'all',
    loading: false
  },
  effects: {
    setState(payload) {
      const state = this.getState();
      this.dispatch({ type: 'setState', payload });
    },
    finishTodo(index) {
      const { list } = this.getState().todo;
      // async request

      // 直接通过 setState 修改
      // this.setState({ loading: true });
      // 新增 reducer
      this.dispatch({ type: 'setLoading', payload: true });

      setTimeout(() => {
        const newList = [...list];
        newList[index].status = 1;

        this.setState({ list: newList, loading: false });
      }, 1000);
    }
  },
  reducer: {
    // state 参数是当前 model 的 state，自动传入
    setState: (payload, state) => ({ ...state, ...payload }),
    setLoading: (payload, state) => ({ ...state, loading: payload })
  }
};
