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
                <td class="mainRow">본인기본공제</td>
                <td>
                  <input
                    class="input-number"
                    type="number"
                    id="myself"
                    v-model="myself"
                    readonly
                  />
                  명
                </td>
              </tr>
              <tr>
                <td class="mainRow">배우자공제</td>
                <td>
                  <input
                    type="radio"
                    value="Y"
                    name=""
                    id="radioY"
                    v-model="spouseYn"
                  />
                  <label for="radioY">Yes</label>
                  <input
                    type="radio"
                    value="N"
                    name=""
                    id="radioN"
                    v-model="spouseYn"
                  />
                  <label for="radioN">No</label>
                </td>
              </tr>
              <tr>
                <td class="mainRow">부양가족공제 직계존속</td>
                <td>
                  <input
                    class="input-number"
                    type="number"
                    id="parents"
                    v-model="parents"
                  />
                  명
                </td>
              </tr>
              <tr>
                <td class="mainRow">부양가족공제 직계비속 자녀,입양자</td>
                <td>
                  <input
                    class="input-number"
                    type="number"
                    id="children"
                    v-model="children"
                  />
                  명
                </td>
              </tr>
              <tr>
                <td class="mainRow">부양가족공제 직계비속 그외</td>
                <td>
                  <input
                    class="input-number"
                    type="number"
                    id="exceptChildren"
                    v-model="exceptChildren"
                  />
                  명
                </td>
              </tr>
              <tr>
                <td class="mainRow">형제자매</td>
                <td>
                  <input
                    class="input-number"
                    type="number"
                    id="sibling"
                    v-model="sibling"
                  />
                  명
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <br /><br />
        <div>
          <table>
            <caption style="text-align: left">
              · 추가공제
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
                <td class="mainRow">경로우대공제(70세이상)</td>
                <td>
                  <input
                    class="input-number"
                    type="number"
                    id="seniority"
                    v-model="seniority"
                  />
                  명
                </td>
              </tr>
              <tr>
                <td class="mainRow">장애인공제</td>
                <td>
                  <input
                    class="input-number"
                    type="number"
                    id="disabled"
                    v-model="disabled"
                  />
                  명
                </td>
              </tr>
              <tr>
                <td class="mainRow">부녀자공제</td>
                <td>
                  <input
                    class="input-number"
                    type="number"
                    id="women"
                    v-model="women"
                  />
                  명
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
      spouseYn: 'N',
      myself: 1,
      parents: null,
      children: null,
      exceptChildren: null,
      sibling: null,
      seniority: null,
      disabled: null,
      women: null
    }
  },
  created() {},
  computed: {
    ...mapState(['name', 'jumin'])
  },
  methods: {
    initData() {
      const url = 'api/v1/humanDeduction/' + this.jumin
      Axios.get(url)
        .then((Response) => {
          console.log(Response.data.length)
          if (Response.data.length === 0) {
            console.log(Response)
          } else {
            console.log(Response)
            console.log(Response.data[0])
            this.spouseYn = Response.data[0].spouseYn
            this.myself = Response.data[0].myself
            this.parents = Response.data[0].parents
            this.children = Response.data[0].children
            this.exceptChildren = Response.data[0].exceptChildren
            this.sibling = Response.data[0].sibling
            this.seniority = Response.data[0].seniority
            this.disabled = Response.data[0].disabled
            this.women = Response.data[0].women
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    insertData() {
      const url = 'api/v1/humanDeduction/' + this.jumin
      const requestBody = [
        {
          jumin: this.jumin,
          spouseYn: this.spouseYn,
          myself: this.myself,
          parents: this.parents,
          children: this.children,
          exceptChildren: this.exceptChildren,
          sibling: this.sibling,
          seniority: this.seniority,
          disabled: this.disabled,
          women: this.women
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
