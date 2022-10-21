<template>
  <div class="basicDiv">
    <h3>기본정보 입력</h3>
    <br />
    <table style="border: 1px solid">
      <colgroup>
        <col span="1" style="width: 25%" />
        <col span="1" style="width: 20%" />
        <col span="1" style="width: 25%" />
        <col span="1" style="width: 20%" />
        <col span="1" style="width: 10%" />
      </colgroup>
      <tbody>
        <tr>
          <td>이름</td>
          <td>
            <input
              @keyup.enter="searchBasicInfo"
              @input="updateName"
              type="text"
              name="name"
              id="name"
              :value="name"
            />
          </td>
          <td>주민번호</td>
          <td>
            <input
              @keyup.enter="searchBasicInfo"
              @input="updateJumin"
              type="text"
              name="jumin"
              id="jumin"
              :value="jumin"
            />
          </td>
          <td><button @click="searchBasicInfo">조회하기</button></td>
        </tr>
        <tr>
          <td>총급여</td>
          <td>
            <input
              type="number"
              name="totalIncome"
              id="totalIncome"
              v-model="totalIncome"
            />
          </td>
          <td>기납부세액</td>
          <td>
            <input
              type="number"
              name="paidTax"
              id="paidTax"
              v-model="paidTax"
            />
          </td>
          <td><button @click="saveBasicInfo">적용하기</button></td>
        </tr>
        <tr>
          <td>근로소득금액</td>
          <td class="leftCell" id="labourIncome">{{ labourIncome }}</td>
          <td>과세표준</td>
          <td class="leftCell" id="taxBase">{{ taxBase }}</td>
          <td></td>
        </tr>
        <tr>
          <td>산출세액</td>
          <td class="leftCell" id="calculatedTax">{{ calculatedTax }}</td>
          <td>결정세액</td>
          <td class="leftCell" id="determinedTax">{{ determinedTax }}</td>
          <td></td>
        </tr>
        <tr>
          <td>차감징수납부예상세액</td>
          <td class="leftCell" id="taxPayable">{{ taxPayable }}</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import Axios from 'axios'
import { mapState } from 'vuex'
// const basicInfoAPI = Axios.create({
//   baseURL: 'http://localhost:8081/api/v1',
//   timeout: 1000
// })
export default {
  components: {},
  data() {
    return {
      totalIncome: '',
      paidTax: '',
      labourIncome: 0,
      taxBase: 0,
      calculatedTax: 0,
      determinedTax: 0,
      taxPayable: 0
    }
  },
  setup() {},
  created() {},
  beforeMount() {},
  mounted() {
    this.emitter.on('basicInfoSearch', this.searchBasicInfo)
  },
  unmounted() {},
  computed: {
    ...mapState(['name', 'jumin'])
  },
  methods: {
    saveBasicInfo() {
      const url = 'api/v1/basicInfo'
      const requestBody = [
        {
          name: this.name,
          jumin: this.jumin,
          totalIncome: this.totalIncome,
          paidTax: this.paidTax
        }
      ]

      Axios.post(url, requestBody)
        .then((Response) => {
          console.log(Response)
          alert('정상적으로 입력되었습니다.')
        })
        .catch((error) => {
          console.log(error)
        })
    },
    searchBasicInfo(param) {
      if (this.name === '' || this.jumin === '') {
        alert('이름과 주민 필수입력')
        return
      }
      const url = '/api/v1/basicInfo/' + this.name + '/' + this.jumin
      Axios.get(url)
        .then((Response) => {
          console.log(Response)
          console.log(Response.data[0])
          this.totalIncome = Response.data[0].totalIncome
          this.paidTax = Response.data[0].paidTax
          this.labourIncome = Response.data[0].labourIncome
          this.taxBase = Response.data[0].taxBase
          this.calculatedTax = Response.data[0].calculatedTax
          this.determinedTax = Response.data[0].determinedTax
          this.taxPayable = Response.data[0].taxPayable

          this.applyLocale()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    applyLocale() {
      this.labourIncome = this.labourIncome.toLocaleString()
      this.taxBase = this.taxBase.toLocaleString()
      this.calculatedTax = this.calculatedTax.toLocaleString()
      this.determinedTax = this.determinedTax.toLocaleString()
      this.taxPayable = this.taxPayable.toLocaleString()
    },

    updateName(event) {
      this.$store.commit('updateName', event.target.value)
    },
    updateJumin(event) {
      this.$store.commit('updateJumin', event.target.value)
    }
  }
}
</script>

<style>
@import '@/css/main.css';
</style>
