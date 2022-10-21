<template>
  <div>
    <div>{{ html }}</div>
    <div v-html="html"></div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      html: '<p style="color:red"> html code 적용 </p>'
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
