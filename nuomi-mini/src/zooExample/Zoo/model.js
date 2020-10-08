export default {
  namespace: 'zoo',
  state: {
    list: []
  },
  effects: {
    setState(payload) {
      const state = this.getState();
      this.dispatch({ type: 'setState', payload: payload });
    },
    getAnimal(name) {
      setTimeout(() => {
        const requestRes = ['duck', 'dog', 'fish'];
        this.setState({ list: requestRes });
      }, 1000);
    },
    addAnimal(name) {
      const { list } = this.getState().zoo;
      this.setState({ list: [...list, name] });
    },
    deleteOne() {
      const { list } = this.getState().zoo;
      const res = [...list];
      res.pop();

      this.setState({ list: res });
    }
  },
  reducer: {
    setState: (payload, state) => ({ ...state, ...payload })
  }
};
