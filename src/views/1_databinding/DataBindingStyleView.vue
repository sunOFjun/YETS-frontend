<template>
  <div>
    <div :style="style1">스타일 바인딩</div>
    <button @click="style1.color = 'blue'">색 변경</button>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      style1: {
        color: 'red',
        fontSize: '30px'
      }
    }
  },
  setup() {},
  created() {},
  beforeMount() {},
  mounted() {},
  unmounted() {},
  methods: {}
}
</script>
