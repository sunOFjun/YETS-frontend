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
              · 기본공제
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
                <td class="mainRow">기본공제대상</td>
                <td>
                  <input
                    class="input-number"
                    type="number"
                    id="childrenTaxCreditNumber"
                    v-model="childrenTaxCreditNumber"
                  />
                  명
                </td>
              </tr>
              <tr>
                <td rowspan="3" class="mainRow">출산입양</td>
                <td>
                  <label for="birthFirst">첫째</label>
                  <input type="checkbox" v-model="birthFirst" id="birthFirst" />
                </td>
              </tr>
              <tr>
                <td>
                  <label for="birthSecond">둘째</label>
                  <input
                    type="checkbox"
                    v-model="birthSecond"
                    id="birthSecond"
                  />
                </td>
              </tr>

              <tr>
                <td>
                  셋쩨이상
                  <input
                    style="width: 50px"
                    class="input-number"
                    type="number"
                    id="birthThirdUp"
                    v-model="birthThirdUp"
                  />
                  명
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <table>
            <caption style="text-align: left">
              · 특별세액공제
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
                <td class="mainRow">보장성보험료</td>
                <td>
                  <input
                    class="input-number"
                    type="number"
                    id="lifeInsurance"
                    v-model="lifeInsurance"
                  />
                  원
                </td>
              </tr>
              <tr>
                <td class="mainRow">의료비-난임시술비</td>
                <td>
                  <input
                    class="input-number"
                    type="number"
                    id="medicalInfertility"
                    v-model="medicalInfertility"
                  />
                  원
                </td>
              </tr>
              <tr>
                <td class="mainRow">의료비-미숙아</td>
                <td>
                  <input
                    class="input-number"
                    type="number"
                    id="medicalPremie"
                    v-model="medicalPremie"
                  />
                  원
                </td>
              </tr>
              <tr>
                <td class="mainRow">
                  의료비-본인,장애인,65세이상자,건강보험특례자
                </td>
                <td>
                  <input
                    class="input-number"
                    type="number"
                    id="medicalSpecial"
                    v-model="medicalSpecial"
                  />
                  원
                </td>
              </tr>
              <tr>
                <td class="mainRow">의료비-가족일반의료비</td>
                <td>
                  <input
                    class="input-number"
                    type="number"
                    id="medicalGeneral"
                    v-model="medicalGeneral"
                  />
                  원
                </td>
              </tr>
              <tr>
                <td class="mainRow">실손의료보험비</td>
                <td>
                  <input
                    class="input-number"
                    type="number"
                    id="actualMedicalExpenses"
                    v-model="actualMedicalExpenses"
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
      childrenTaxCreditNumber: '',
      birthFirst: '',
      birthSecond: '',
      birthThirdUp: '',
      lifeInsurance: '',
      medicalInfertility: '',
      medicalPremie: '',
      medicalSpecial: '',
      medicalGeneral: '',
      actualMedicalExpenses: ''
    }
  },
  created() {},
  computed: {
    ...mapState(['name', 'jumin'])
  },
  methods: {
    initData() {
      const url = 'api/v1/taxCredit/' + this.jumin
      Axios.get(url)
        .then((Response) => {
          console.log(Response.data.length)
          if (Response.data.length === 0) {
            console.log(Response)
          } else {
            console.log(Response)
            console.log(Response.data[0])
            this.childrenTaxCreditNumber =
              Response.data[0].childrenTaxCreditNumber
            this.birthFirst =
              Response.data[0].birthFirst === 1 ? 'true' : 'false'
            this.birthSecond =
              Response.data[0].birthFirst === 1 ? 'true' : 'false'
            this.birthThirdUp = Response.data[0].birthThirdUp
            this.lifeInsurance = Response.data[0].lifeInsurance
            this.medicalInfertility = Response.data[0].medicalInfertility
            this.medicalPremie = Response.data[0].medicalPremie
            this.medicalSpecial = Response.data[0].medicalSpecial
            this.medicalGeneral = Response.data[0].medicalGeneral
            this.actualMedicalExpenses = Response.data[0].actualMedicalExpenses
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    insertData() {
      const url = 'api/v1/taxCredit/' + this.jumin
      const requestBody = [
        {
          childrenTaxCreditNumber: this.childrenTaxCreditNumber,
          birthFirst: this.birthFirst === true ? 1 : 0,
          birthSecond: this.birthSecond === true ? 1 : 0,
          birthThirdUp: this.birthThirdUp,
          lifeInsurance: this.lifeInsurance,
          medicalInfertility: this.medicalInfertility,
          medicalPremie: this.medicalPremie,
          medicalSpecial: this.medicalSpecial,
          medicalGeneral: this.medicalGeneral,
          actualMedicalExpenses: this.actualMedicalExpenses
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
