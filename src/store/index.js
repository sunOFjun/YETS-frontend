import { createStore } from 'vuex'

export default createStore({
  state: {
    // data역할
    cities: [
      { cityCode: '02', title: '서울' },
      { cityCode: '051', title: '부산' },
      { cityCode: '064', title: '제주' }
    ],
    dongList: [
      { cityCode: '', dongCode: '', dongTitle: '==동 선택==' },
      { cityCode: '02', dongCode: '1', dongTitle: '서울 1동' },
      { cityCode: '02', dongCode: '2', dongTitle: '서울 2동' },
      { cityCode: '02', dongCode: '3', dongTitle: '서울 3동' },
      { cityCode: '02', dongCode: '4', dongTitle: '서울 4동' },
      { cityCode: '051', dongCode: '1', dongTitle: '부산 1동' },
      { cityCode: '051', dongCode: '2', dongTitle: '부산 2동' },
      { cityCode: '051', dongCode: '3', dongTitle: '부산 3동' },
      { cityCode: '064', dongCode: '1', dongTitle: '제주 1동' },
      { cityCode: '064', dongCode: '2', dongTitle: '제주 2동' },
      { cityCode: '064', dongCode: '3', dongTitle: '제주 3동' },
      { cityCode: '064', dongCode: '4', dongTitle: '제주 4동' }
    ],
    name: '',
    jumin: ''
  },
  getters: {
    // computed역할, function param으로 state써줘야한다.
    dongListCount: (state) => {
      return state.dongList.length
    },
    cityCount: (state) => {
      return state.cities.length
    },
    percent: (state, getters) => {
      return Math.round(getters.dongListCount / getters.cityCount)
    }
  },
  mutations: {
    addCityToState: (state, payload) => {
      state.cities.push(payload)
    },
    addDongToState: (state, payload) => {
      state.dongList.push(payload)
    },
    getSelectedCitysDongCount: (state, payload) => {
      const selectedDongList = state.dongList.filter(
        (dong) => dong.cityCode === payload
      )

      return selectedDongList.length
    },
    updateName: (state, payload) => {
      state.name = payload
    },
    updateJumin: (state, payload) => {
      state.jumin = payload
    }
  },
  actions: {},
  modules: {}
})
