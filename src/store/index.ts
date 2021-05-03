import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import lineApi, { ILine } from '@/api/line';
import stationApi, { IStation } from '@/api/station';

interface State {
  lines: ILine[],
  stations: IStation[],
  loading: boolean,
}

export const key: InjectionKey<Store<State>> = Symbol()

export function useStore(): Store<State> {
  return baseUseStore(key);
}

export enum Mutation {
  SET_LINES = 'SET_LINES',
  SET_STATIONS = 'SET_STATIONS',
  SET_LOADING = 'SET_LOADING',
}

export enum Action {
  LOAD_DATA = 'LOAD_DATA',
  ADD_STATION = 'ADD_STATION',
  UPDATE_STATION = 'UPDATE_STATION',
  DELETE_STATION = 'DELETE_STATION',
}

export const store = createStore<State>({

  state: {
    lines: [],
    stations: [],
    loading: false,
  },

  getters: {
    getStationById: (state) => (id: number) => {
      return state.stations.find(station => station.id === id);
    },
  },

  mutations: {
    [Mutation.SET_LINES](state, lines: ILine[]) {
      state.lines = lines;
    },
    [Mutation.SET_STATIONS](state, stations: IStation[]) {
      state.stations = stations;
    },
    [Mutation.SET_LOADING](state, loading: boolean) {
      state.loading = loading;
    },
  },

  actions: {
    async [Action.LOAD_DATA]({ commit }) {
      commit(Mutation.SET_LOADING, true);
      try {
        const [lines, stations] = await Promise.all([lineApi.getList(), stationApi.getList()]);
        commit(Mutation.SET_LINES, lines);
        commit(Mutation.SET_STATIONS, stations);
      } finally {
        commit(Mutation.SET_LOADING, false);
      }
    },
    async [Action.ADD_STATION]({ dispatch }, station: IStation) {
      await stationApi.add(station);
      dispatch(Action.LOAD_DATA);
    },
    async [Action.UPDATE_STATION]({ dispatch }, station: IStation) {
      await stationApi.update(station);
      dispatch(Action.LOAD_DATA);
    },
    async [Action.DELETE_STATION]({ dispatch }, id: number) {
      await stationApi.remove(id);
      dispatch(Action.LOAD_DATA);
    },
  },

})
