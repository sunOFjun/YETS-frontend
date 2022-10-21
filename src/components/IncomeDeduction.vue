<template>
  <div class="basicDiv">
    <h3>&lt; 소득공제 &gt;</h3>
    <button @click="applyLocale">콤마찍기</button>
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
            <td class="mainRow">인적공제</td>
            <td><button @click="toggleHumanDeduction">입력</button></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td class="subRow">&nbsp;&nbsp;-기본공제</td>
            <td></td>
            <td>{{ basicHumanDeductionAmount }}</td>
            <td>{{ basicHumanDeductionLimit }}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td class="subRow">&nbsp;&nbsp;-추가공제</td>
            <td></td>
            <td>{{ additionalHumanDeductionAmount }}</td>
            <td>{{ additionalHumanDeductionLimit }}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td class="mainRow">연금보험료공제</td>
            <td><button @click="toggleIncomeDeductionDetail">입력</button></td>
            <td>{{ nationalPension }}</td>
            <td>{{ nationalPensionAmount }}</td>
            <td>{{ nationalPensionLimit }}</td>
            <td></td>
          </tr>
          <tr>
            <td class="mainRow">특별소득공제</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td class="subRow">&nbsp;&nbsp;-건강보험료 등</td>
            <td><button @click="toggleIncomeDeductionDetail">입력</button></td>
            <td>{{ healthInsuranceEtcSum }}</td>
            <td>{{ healthInsuranceEtcAmount }}</td>
            <td>{{ healthInsuranceEtcLimit }}</td>
            <td></td>
          </tr>
          <tr>
            <td class="subRow">&nbsp;&nbsp;-주택자금</td>
            <td><button @click="toggleIncomeDeductionDetail">입력</button></td>
            <td>{{ mortgageLoan }}</td>
            <td>{{ mortgageLoanAmount }}</td>
            <td>{{ mortgageLoanLimit }}</td>
            <td></td>
          </tr>
          <tr>
            <td class="mainRow">그 밖의 소득공제</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td class="subRow">&nbsp;&nbsp;-개인연금저축</td>
            <td>
              <button @click="toggleIncomeDeductionDetail">입력</button>
            </td>
            <td>{{ privatePensionSaving }}</td>
            <td>{{ privatePensionSavingAmount }}</td>
            <td>{{ privatePensionSavingLimit }}</td>
            <td></td>
          </tr>
          <tr>
            <td class="subRow">&nbsp;&nbsp;-주택마련저축</td>
            <td><button @click="toggleIncomeDeductionDetail">입력</button></td>
            <td>{{ housingSaving }}</td>
            <td>{{ housingSavingAmount }}</td>
            <td>{{ housingSavingLimit }}</td>
            <td></td>
          </tr>
          <tr>
            <td class="subRow">&nbsp;&nbsp;-신용카드 등</td>
            <td><button @click="toggleIncomeDeductionDetail">입력</button></td>
            <td>{{ creditCardEtcSum }}</td>
            <td>{{ creditCardEtcAmount }}</td>
            <td>{{ creditCardEtcLimit }}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
    <HumanDeduction
      title="인적공제"
      :visible="HumanDeductionVisible"
      @close="toggleHumanDeduction"
    />
    <IncomeDeductionDetail
      title="연금보험공제"
      :visible="IncomeDeductionDetailVisible"
      @close="toggleIncomeDeductionDetail"
    />
  </div>
</template>
<script>
import HumanDeduction from '@/popups/HumanDeduction.vue'
import IncomeDeductionDetail from '@/popups/IncomeDeductionDetail.vue'
import Axios from 'axios'
import { mapState } from 'vuex'

export default {
  components: {
    HumanDeduction,
    IncomeDeductionDetail
  },
  data() {
    return {
      HumanDeductionVisible: false,
      IncomeDeductionDetailVisible: false,
      basicHumanDeductionAmount: 0,
      basicHumanDeductionLimit: 0,
      additionalHumanDeductionAmount: 0,
      additionalHumanDeductionLimit: 0,
      nationalPension: 0,
      healthInsuranceEtcSum: 0,
      mortgageLoan: 0,
      privatePensionSaving: 0,
      housingSaving: 0,
      creditCardEtcSum: 0,
      nationalPensionAmount: 0,
      healthInsuranceEtcAmount: 0,
      mortgageLoanAmount: 0,
      privatePensionSavingAmount: 0,
      housingSavingAmount: 0,
      creditCardEtcAmount: 0,
      nationalPensionLimit: 0,
      healthInsuranceEtcLimit: 0,
      mortgageLoanLimit: 0,
      privatePensionSavingLimit: 0,
      housingSavingLimit: 0,
      creditCardEtcLimit: 0
    }
  },
  setup() {},
  created() {},
  beforeMount() {},
  mounted() {
    this.emitter.on('incomeDeductionSearch', this.afterCalculateInit)
  },
  unmounted() {},
  computed: {
    ...mapState(['name', 'jumin'])
  },
  methods: {
    toggleHumanDeduction() {
      this.HumanDeductionVisible = !this.HumanDeductionVisible
    },
    toggleIncomeDeductionDetail() {
      this.IncomeDeductionDetailVisible = !this.IncomeDeductionDetailVisible
    },
    afterCalculateInit(param) {
      this.incomeDeductionSearch()
      this.incomeDeductionAmountSearch()
      this.incomeDeductionLimitSearch()
    },
    incomeDeductionSearch() {
      if (this.name === '' || this.jumin === '') {
        alert('이름과 주민 필수입력')
        return
      }
      const url = '/api/v1/incomeDeduction/' + this.jumin
      Axios.get(url)
        .then((Response) => {
          this.nationalPension = Response.data[0].nationalPension
          this.healthInsuranceEtcSum =
            Response.data[0].healthInsurance +
            Response.data[0].employmentInsurance
          this.mortgageLoan = Response.data[0].mortgageLoan
          this.privatePensionSaving = Response.data[0].privatePensionSaving
          this.housingSaving = Response.data[0].housingSaving
          this.creditCardEtcSum =
            Response.data[0].creditCard +
            Response.data[0].debitCard +
            Response.data[0].cash +
            Response.data[0].creditCardCulture +
            Response.data[0].debitCardCulture +
            Response.data[0].cashCulture +
            Response.data[0].traditionalMarket +
            Response.data[0].publicTransport
        })
        .catch((error) => {
          console.log(error)
        })
    },
    incomeDeductionAmountSearch() {
      if (this.name === '' || this.jumin === '') {
        alert('이름과 주민 필수입력')
        return
      }
      const url = '/api/v1/incomeDeductionAmount/' + this.jumin
      Axios.get(url)
        .then((Response) => {
          this.basicHumanDeductionAmount =
            Response.data[0].basicHumanDeductionAmount

          this.additionalHumanDeductionAmount =
            Response.data[0].additionalHumanDeductionAmount

          this.nationalPensionAmount = Response.data[0].nationalPensionAmount
          this.healthInsuranceEtcAmount =
            Response.data[0].healthInsuranceAmount +
            Response.data[0].employmentInsuranceAmount
          this.mortgageLoanAmount = Response.data[0].mortgageLoanAmount
          this.privatePensionSavingAmount =
            Response.data[0].privatePensionSavingAmount
          this.housingSavingAmount = Response.data[0].housingSavingAmount
          this.creditCardEtcAmount = Response.data[0].creditCardEtcAmount
        })
        .catch((error) => {
          console.log(error)
        })
    },
    incomeDeductionLimitSearch() {
      if (this.name === '' || this.jumin === '') {
        alert('이름과 주민 필수입력')
        return
      }
      const url = '/api/v1/incomeDeductionLimit/' + this.jumin
      Axios.get(url)
        .then((Response) => {
          this.basicHumanDeductionLimit =
            Response.data[0].basicHumanDeductionLimit
          this.additionalHumanDeductionLimit =
            Response.data[0].additionalHumanDeductionLimit
          this.nationalPensionLimit = Response.data[0].nationalPensionLimit
          this.healthInsuranceEtcLimit =
            Response.data[0].healthInsuranceLimit +
            Response.data[0].employmentInsuranceLimit
          this.mortgageLoanLimit = Response.data[0].mortgageLoanLimit
          this.privatePensionSavingLimit =
            Response.data[0].privatePensionSavingLimit
          this.housingSavingLimit = Response.data[0].housingSavingLimit
          this.creditCardEtcLimit = Response.data[0].creditCardEtcLimit
        })
        .catch((error) => {
          console.log(error)
        })
    },
    applyLocale() {
      this.basicHumanDeductionAmount =
        this.basicHumanDeductionAmount.toLocaleString()
      this.additionalHumanDeductionAmount =
        this.additionalHumanDeductionAmount.toLocaleString()
      this.basicHumanDeductionLimit =
        this.basicHumanDeductionLimit.toLocaleString()
      this.additionalHumanDeductionLimit =
        this.additionalHumanDeductionLimit.toLocaleString()
      this.nationalPension = this.nationalPension.toLocaleString()
      this.healthInsuranceEtcSum = this.healthInsuranceEtcSum.toLocaleString()
      this.mortgageLoan = this.mortgageLoan.toLocaleString()
      this.privatePensionSaving = this.privatePensionSaving.toLocaleString()
      this.housingSaving = this.housingSaving.toLocaleString()
      this.creditCardEtcSum = this.creditCardEtcSum.toLocaleString()
      this.nationalPensionAmount = this.nationalPensionAmount.toLocaleString()
      this.healthInsuranceEtcAmount =
        this.healthInsuranceEtcAmount.toLocaleString()
      this.mortgageLoanAmount = this.mortgageLoanAmount.toLocaleString()
      this.privatePensionSavingAmount =
        this.privatePensionSavingAmount.toLocaleString()
      this.housingSavingAmount = this.housingSavingAmount.toLocaleString()
      this.creditCardEtcAmount = this.creditCardEtcAmount.toLocaleString()
      this.nationalPensionLimit = this.nationalPensionLimit.toLocaleString()
      this.healthInsuranceEtcLimit =
        this.healthInsuranceEtcLimit.toLocaleString()
      this.mortgageLoanLimit = this.mortgageLoanLimit.toLocaleString()
      this.privatePensionSavingLimit =
        this.privatePensionSavingLimit.toLocaleString()
      this.housingSavingLimit = this.housingSavingLimit.toLocaleString()
      this.creditCardEtcLimit = this.creditCardEtcLimit.toLocaleString()
    }
  }
}
</script>
<style>
@import '@/css/main.css';
</style>
