<template>
  <div>
    <button @click="increaseCounter" value="증가"></button>
    <p>{{ counter }}</p>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      counter: 0
    }
  },
  setup() {},
  created() {},
  beforeMount() {},
  mounted() {},
  unmounted() {},
  methods: {
    increaseCounter() {
      this.counter++
    }
  }
}
</script>
