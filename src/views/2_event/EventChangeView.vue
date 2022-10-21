<template>
  <div>
    <select name="" id="" @change="changeCity($event)" v-model="selectedCity">
      <option value="">==도시선택==</option>
      <option
        :value="city.cityCode"
        :key="city.cityCode"
        v-for="city in cities"
      >
        {{ city.title }}
      </option>
    </select>

    <select name="" id="">
      <option
        :value="dong.dongCode"
        :key="dong.dongCode"
        v-for="dong in selectedDongList"
      >
        {{ dong.dongTitle }}
      </option>
    </select>
    <p>{{ dongListCount }}</p>
    <p>{{ cityCount }}</p>
    <p>{{ percent }}</p>

    <br />
    <div>
      <label for="cityCode"> 도시 번호</label>
      <input type="text" name="cityCode" v-model="inputCityCode" />
      <br />
      <label for="cityCode"> 도시 이름</label>
      <input type="text" name="cityTitle" v-model="inputCitytitle" />

      <br />
      <button @click="addCity">도시 추가</button>

      <br /><br /><br />

      <label for="dongCode"> 동 이름</label>
      <input type="text" name="dongCode" v-model="inputDongTitle" />

      <br />
      <button @click="addDong">동 추가</button>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
export default {
  components: {},
  data() {
    return {
      selectedDongList: [],
      selectedCity: '',
      inputCityCode: '',
      inputCitytitle: '',
      inputDongTitle: ''
    }
  },
  computed: {
    ...mapGetters(['dongListCount', 'cityCount', 'percent']),
    ...mapState(['cities'])
  },
  setup() {},
  created() {},
  beforeMount() {},
  mounted() {},
  unmounted() {},
  methods: {
    // ...mapMutations([
    //   'addCityToState',
    //   'addDongToState',
    //   'getSelectedCitysDongCount'
    // ]),
    changeCity(event) {
      console.log(event)
      this.selectedDongList = this.$store.state.dongList.filter(
        (dong) => dong.cityCode === this.selectedCity
      )
    },
    addCity() {
      const cityObj = {
        cityCode: this.inputCityCode,
        title: this.inputCitytitle
      }

      this.$store.commit('addCityToState', cityObj)
    },
    addDong() {
      //   const selectedDongCount = this.getSelectedCitysDongCount(
      //     this.selectedCity
      //   )
      const selectedDongCount = this.$store.commit(
        'getSelectedCitysDongCount',
        this.selectedCity
      )
      const dongObj = {
        cityCode: this.selectedCity,
        dongCode: selectedDongCount + 1,
        dongTitle: this.inputDongTitle
      }

      this.$store.commit('addDongToState', dongObj)
      this.changeCity()
    }
  }
}
</script>
