<template>
  <div>
    <div :class="{ 'text-red': true, active: true }">클래스 바인딩</div>
    <div :class="class2">클래스 바인딩</div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      example: '',
      class2: ['active', 'text-red']
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
<style scoped>
.active {
  background-color: greenyellow;
  font-weight: bold;
}
.text-red {
  color: red;
}
</style>
