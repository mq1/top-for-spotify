import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

export interface State {
  timeRange: string
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    timeRange: 'short_term'
  },
  mutations: {
    changeTimeRange(state, newTimeRange: string) {
      state.timeRange = newTimeRange;
    }
  }
})

// define your own `useStore` composition function
export function useStore() {
  return baseUseStore(key)
}
