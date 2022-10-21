<template>
  <div class="my-modal" v-if="visible">
    <div class="my-modal__dialog">
      <header class="my-modal__header">
        <button style="float: right" @click="$emit('close', !visible)">
          X
        </button>
        <br />
        <div>
          <span>{{ title }}</span>
        </div>
      </header>
      <div class="my-modal__body">
        <div>
          <table>
            <caption style="text-align: left">
              · 연금보험료공제
            </caption>
            <colgroup>
              <col width="40%" />
              <col width="60%" />
            </colgroup>
            <thead>
              <th>항목</th>
              <th>금액</th>
            </thead>
            <tbody>
              <tr>
                <td class="mainRow">국민연금</td>
                <td>
                  <input
                    class="input-number"
                    type="number"
                    id="nationalPension"
                    v-model="nationalPension"
                  />
                  원
                </td>
              </tr>
            </tbody>
          </table>
          <table>
            <caption style="text-align: left">
              · 특별소득공제
            </caption>
            <colgroup>
              <col width="40%" />
              <col width="60%" />
            </colgroup>
            <thead>
              <th>항목</th>
              <th>금액</th>
            </thead>
            <tbody>
              <tr>
                <td class="mainRow">건강보험료</td>
                <td>
                  <input
                    class="input-number"
                    type="number"
                    id="healthInsurance"
                    v-model="healthInsurance"
                  />
                  원
                </td>
              </tr>
              <tr>
                <td class="mainRow">고용보험료</td>
                <td>
                  <input
                    class="input-number"
                    type="number"
                    id="employmentInsurance"
                    v-model="employmentInsurance"
                  />
                  원
                </td>
              </tr>
              <tr>
                <td class="mainRow">주택자금 차입금</td>
                <td>
                  <input
                    class="input-number"
                    type="number"
                    id="mortgageLoan"
                    v-model="mortgageLoan"
                  />
                  원
                </td>
              </tr>
            </tbody>
          </table>
          <table>
            <caption style="text-align: left">
              · 그 밖의 소득공제
            </caption>
            <colgroup>
              <col width="40%" />
              <col width="60%" />
            </colgroup>
            <thead>
              <th>항목</th>
              <th>금액</th>
            </thead>
            <tbody>
              <tr>
                <td class="mainRow">개인연금저축</td>
                <td>
                  <input
                    class="input-number"
                    type="number"
                    id="privatePensionSaving"
                    v-model="privatePensionSaving"
                  />
                  원
                </td>
              </tr>
              <tr>
                <td class="mainRow">주택마련저축</td>
                <td>
                  <input
                    class="input-number"
                    type="number"
                    id="housingSaving"
                    v-model="housingSaving"
                  />
                  원
                </td>
              </tr>
              <tr>
                <td class="mainRow">신용카드</td>
                <td>
                  <input
                    class="input-number"
                    type="number"
                    id="creditCard"
                    v-model="creditCard"
                  />
                  원
                </td>
              </tr>
              <tr>
                <td class="mainRow">직불카드</td>
                <td>
                  <input
                    class="input-number"
                    type="number"
                    id="debitCard"
                    v-model="debitCard"
                  />
                  원
                </td>
              </tr>
              <tr>
                <td class="mainRow">현금</td>
                <td>
                  <input
                    class="input-number"
                    type="number"
                    id="cash"
                    v-model="cash"
                  />
                  원
                </td>
              </tr>
              <tr>
                <td class="mainRow">신용카드 - 문화</td>
                <td>
                  <input
                    class="input-number"
                    type="number"
                    id="creditCardCulture"
                    v-model="creditCardCulture"
                  />
                  원
                </td>
              </tr>
              <tr>
                <td class="mainRow">직불카드 - 문화</td>
                <td>
                  <input
                    class="input-number"
                    type="number"
                    id="debitCardCulture"
                    v-model="debitCardCulture"
                  />
                  원
                </td>
              </tr>
              <tr>
                <td class="mainRow">현금 - 문화</td>
                <td>
                  <input
                    class="input-number"
                    type="number"
                    id="cashCulture"
                    v-model="cashCulture"
                  />
                  원
                </td>
              </tr>
              <tr>
                <td class="mainRow">전통시장</td>
                <td>
                  <input
                    class="input-number"
                    type="number"
                    id="traditionalMarket"
                    v-model="traditionalMarket"
                  />
                  원
                </td>
              </tr>
              <tr>
                <td class="mainRow">대중교통</td>
                <td>
                  <input
                    class="input-number"
                    type="number"
                    id="publicTransport"
                    v-model="publicTransport"
                  />
                  원
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <br /><br />
      </div>
      <div class="bottom-button-group">
        <button @click="insertData">적용하기</button>
        &nbsp;
        <button @click="$emit('close', !visible)">닫기</button>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: 'my-modal',
  props: {
    visible: {
      type: Boolean,
      require: true,
      default: false
    },
    title: {
      type: String,
      require: false
    }
  },
  data() {
    return {
      nationalPension: '',
      healthInsurance: '',
      employmentInsurance: '',
      mortgageLoan: '',
      privatePensionSaving: '',
      housingSaving: '',
      creditCard: '',
      debitCard: '',
      cash: '',
      creditCardCulture: '',
      debitCardCulture: '',
      cashCulture: '',
      traditionalMarket: '',
      publicTransport: ''
    }
  },
  created() {},
  computed: {
    ...mapState(['name', 'jumin'])
  },
  methods: {
    initData() {
      const url = 'api/v1/incomeDeduction/' + this.jumin
      Axios.get(url)
        .then((Response) => {
          console.log(Response.data.length)
          if (Response.data.length === 0) {
            console.log(Response)
          } else {
            console.log(Response)
            console.log(Response.data[0])
            this.nationalPension = Response.data[0].nationalPension
            this.healthInsurance = Response.data[0].healthInsurance
            this.employmentInsurance = Response.data[0].employmentInsurance
            this.mortgageLoan = Response.data[0].mortgageLoan
            this.privatePensionSaving = Response.data[0].privatePensionSaving
            this.housingSaving = Response.data[0].housingSaving
            this.creditCard = Response.data[0].creditCard
            this.debitCard = Response.data[0].debitCard
            this.cash = Response.data[0].cash
            this.creditCardCulture = Response.data[0].creditCardCulture
            this.debitCardCulture = Response.data[0].debitCardCulture
            this.cashCulture = Response.data[0].cashCulture
            this.traditionalMarket = Response.data[0].traditionalMarket
            this.publicTransport = Response.data[0].publicTransport
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    insertData() {
      const url = 'api/v1/incomeDeduction/' + this.jumin
      const requestBody = [
        {
          nationalPension: this.nationalPension,
          healthInsurance: this.healthInsurance,
          employmentInsurance: this.employmentInsurance,
          mortgageLoan: this.mortgageLoan,
          privatePensionSaving: this.privatePensionSaving,
          housingSaving: this.housingSaving,
          creditCard: this.creditCard,
          debitCard: this.debitCard,
          cash: this.cash,
          creditCardCulture: this.creditCardCulture,
          debitCardCulture: this.debitCardCulture,
          cashCulture: this.cashCulture,
          traditionalMarket: this.traditionalMarket,
          publicTransport: this.publicTransport
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
    }
  },
  watch: {
    visible: function (newVal, oldVal) {
      if (newVal === true && this.jumin) {
        console.log(newVal)
        console.log(this.jumin)
        this.initData()
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/css/main.css';
$module: 'my-modal';
.#{$module} {
  // This is modal bg
  background-color: rgba(0, 0, 0, 0.7);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: fixed;
  overflow: auto;
  margin: 0;
  //This is modal layer
  &__dialog {
    left: 5%;
    top: 75px;
    width: 600px;
    position: absolute;
    background: #fff;
    margin-bottom: 50px;
    height: 600px;
  }

  &__header {
    font-size: 28px;
    font-weight: bold;
    line-height: 1.29;
    padding: 16px 16px 0 25px;
    position: relative;
  }
  &__body {
    padding: 25px;
    min-height: 150px;
    max-height: 412px;
    overflow-y: scroll;
  }
}
</style>
