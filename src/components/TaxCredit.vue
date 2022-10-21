<template>
  <div class="basicDiv">
    <h3>세액공제</h3>
    <div>
      <table>
        <colgroup>
          <col width="20%" />
          <col width="10%" />
          <col width="15%" />
          <col width="15%" />
          <col width="15%" />
          <col width="15%" />
        </colgroup>
        <thead>
          <th colspan="2">공제항목명</th>
          <th>사용(납입)금액</th>
          <th>소득공제액</th>
          <th>공제한도</th>
          <th>한도미달액</th>
        </thead>
        <tbody>
          <tr>
            <td colspan="2" class="mainRow">근로소득세액공제</td>
            <td></td>
            <td>{{ labourIncomeTaxCredit }}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td class="mainRow">자녀세액공제</td>
            <td><button @click="toggleTaxCreditDetail">입력</button></td>
            <td></td>
            <td>{{ childrenTaxCreditAmount }}</td>
            <td>{{ childrenTaxCreditLimit }}</td>
            <td></td>
          </tr>
          <tr>
            <td class="mainRow">특별세액공제</td>
            <td><button @click="toggleTaxCreditDetail">입력</button></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td class="subRow">&nbsp;&nbsp;-보장성보험료</td>
            <td></td>
            <td></td>
            <td>{{ lifeInsuranceAmount }}</td>
            <td>{{ lifeInsuranceLimit }}</td>
            <td></td>
          </tr>
          <tr>
            <td class="subRow">&nbsp;&nbsp;-의료비</td>
            <td></td>
            <td></td>
            <td>{{ medicalExpensesAmount }}</td>
            <td>{{ medicalExpensesLimit }}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>

    <TaxCreditDetail
      title="세액공제"
      :visible="TaxCreditDetailVisible"
      @close="toggleTaxCreditDetail"
    />
  </div>
</template>
<script>
import Axios from 'axios'
import TaxCreditDetail from '@/popups/TaxCreditDetail.vue'
import { mapState } from 'vuex'

export default {
  components: {
    TaxCreditDetail
  },
  data() {
    return {
      TaxCreditDetailVisible: false,
      labourIncomeTaxCredit: 0,
      childrenTaxCreditAmount: 0,
      lifeInsuranceAmount: 0,
      medicalExpensesAmount: 0,
      childrenTaxCreditLimit: 0,
      lifeInsuranceLimit: 0,
      medicalExpensesLimit: 0
    }
  },
  setup() {},
  created() {},
  beforeMount() {},
  mounted() {
    this.emitter.on('taxCreditSearch', this.afterCalculateInit)
  },
  unmounted() {},
  computed: {
    ...mapState(['name', 'jumin'])
  },
  methods: {
    toggleTaxCreditDetail() {
      this.TaxCreditDetailVisible = !this.TaxCreditDetailVisible
    },
    afterCalculateInit(param) {
      this.taxCreditAmountSearch()
      this.taxCreditLimitSearch()
    },

    taxCreditAmountSearch() {
      const url = '/api/v1/taxCreditAmount/' + this.jumin
      Axios.get(url)
        .then((Response) => {
          console.log(Response.data[0])
          this.labourIncomeTaxCreditAmount =
            Response.data[0].labourIncomeTaxCreditAmount
          this.childrenTaxCreditAmount =
            Response.data[0].childrenTaxCreditAmount
          this.lifeInsuranceAmount = Response.data[0].lifeInsuranceAmount
          this.medicalExpensesAmount = Response.data[0].medicalExpensesAmount

          this.applyLocale()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    taxCreditLimitSearch() {
      const url = '/api/v1/taxCreditLimit/' + this.jumin
      Axios.get(url)
        .then((Response) => {
          console.log(Response.data[0])
          this.childrenTaxCreditLimit = Response.data[0].childrenTaxCreditLimit
          this.lifeInsuranceLimit = Response.data[0].lifeInsuranceLimit
          this.medicalExpensesLimit = Response.data[0].medicalExpensesLimit

          this.applyLocale()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    applyLocale() {
      this.labourIncomeTaxCredit = this.labourIncomeTaxCredit.toLocaleString()
      this.childrenTaxCreditAmount =
        this.childrenTaxCreditAmount.toLocaleString()
      this.lifeInsuranceAmount = this.lifeInsuranceAmount.toLocaleString()
      this.medicalExpensesAmount = this.medicalExpensesAmount.toLocaleString()
      this.childrenTaxCreditLimit = this.childrenTaxCreditLimit.toLocaleString()
      this.lifeInsuranceLimit = this.lifeInsuranceLimit.toLocaleString()
      this.medicalExpensesLimit = this.medicalExpensesLimit.toLocaleString()
    }
  }
}
</script>
<style>
@import '@/css/main.css';
</style>
