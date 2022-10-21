<template>
  <div>
    <h1>hello</h1>
    <input type="text" v-bind:value="vBind" />
    <input type="text" v-model="vModel" />
    <input type="text" :value="vModel2" @input="bindData" />
    <br />
    <button @click="showLog">sda</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      vBind: 'bind',
      vModel: 'model',
      vModel2: ''
    }
  },
  methods: {
    showLog() {
      console.log('hi')
      console.log(this.vBind)
      console.log(this.vModel)
    },
    bindData(event) {
      this.vModel2 = event.target.value
    }
  }
}
</script>
<style scoped></style>
