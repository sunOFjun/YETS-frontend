<template>
  <div>
    <input type="text" v-model="userId" />
    <button @click="checkUserId">확인</button>
    <button @click="changeData">변경</button>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      userId: '안녕'
    }
  },
  setup() {},
  created() {},
  beforeMount() {},
  mounted() {},
  unmounted() {},
  methods: {
    checkUserId() {
      console.log(this.userId)
    },
    changeData() {
      this.userId = '변경'
    }
  }
}
</script>
