<template>
  <div>
    <select v-model="selectValue" name="" id="">
      <option value=""></option>
      <option value="02">서울</option>
      <option value="051">부산</option>
      <option value="064">제주</option>
    </select>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      selectValue: '02'
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
