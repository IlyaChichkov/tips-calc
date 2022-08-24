import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
    state () {
        return {
            percent: 0,
        }
    },
    mutations: {
        setPercent (state, val) {
            state.percent = val;
        }
    }
})

export default store;