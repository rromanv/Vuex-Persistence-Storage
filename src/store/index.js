import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";

const ls = new SecureLS({ isCompression: false });

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    string: ""
  },
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: key => ls.remove(key)
      }
    })
  ],
  mutations: {
    increment: state => state.count++,
    decrement: state => state.count--,
    myString: (state, value) =>
      value ? (state.string = value) : (state.string = "")
  }
});
