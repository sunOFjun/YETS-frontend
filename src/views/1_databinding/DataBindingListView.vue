<template>
  <div>
    <div>
      <select name="" id="">
        <option
          :value="city.code"
          :key="city.code"
          v-for="city in $store.state.cities"
        >
          {{ city.code }} - {{ city.title }}
        </option>
      </select>
    </div>
    <div>
      <table>
        <thead>
          <tr>
            <th>순번</th>
            <th>타이틀</th>
            <th>코드</th>
          </tr>
        </thead>
        <tbody>
          <tr :key="city.code" v-for="(city, isx) in $store.state.cities">
            <td>{{ isx }}</td>
            <td>{{ city.title }}</td>
            <td>{{ city.code }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {}
  },
  setup() {},
  created() {},
  beforeMount() {},
  mounted() {},
  unmounted() {},
  methods: {}
}
</script>
