<template>
  <div>
    <input
      type="search"
      name=""
      id=""
      @keyup.enter="doSearch($event)"
      v-model="searchText"
    />
    <button @click="doSearch">조회</button>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      searchText: ''
    }
  },
  setup() {},
  created() {},
  beforeMount() {},
  mounted() {},
  unmounted() {},
  methods: {
    doSearch() {
      console.log(this.searchText)
    },
    checkEnter(event) {
      console.log(event)
      this.doSearch()
    }
  }
}
</script>
