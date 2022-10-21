<template>
  <div>
    <div class="headDiv">
      <h1>연말정산 모의계산</h1>
    </div>
    <BasicInfo />
    <br />
    <IncomeDeduction />
    <br />
    <TaxCredit />
    <br />
    <div class="basicDiv">
      <button
        style="margin-top: 20px; margin-bottom: 20px"
        @click="calculateYets"
      >
        계산하기
      </button>
    </div>
  </div>
</template>
<script>
import Axios from 'axios'
import BasicInfo from '@/components/BasicInfo.vue'
import IncomeDeduction from '@/components/IncomeDeduction.vue'
import TaxCredit from '@/components/TaxCredit.vue'
import { mapState } from 'vuex'

export default {
  components: {
    BasicInfo,
    IncomeDeduction,
    TaxCredit
  },
  data() {
    return {
      example: ''
    }
  },
  setup() {},
  created() {},
  beforeMount() {},
  mounted() {},
  unmounted() {},
  computed: {
    ...mapState(['name', 'jumin'])
  },
  methods: {
    calculateYets() {
      const url = 'api/v1/basicInfo/calculate/' + this.name + '/' + this.jumin
      Axios.get(url)
        .then((Response) => {
          console.log(Response.data.length)

          this.emitter.emit('basicInfoSearch', '1')
          this.emitter.emit('incomeDeductionSearch', '1')
          this.emitter.emit('taxCreditSearch', '1')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
<style>
@import '@/css/main.css';
</style>
