<template>
  <div class="hello">
    <h1>Welcome to the daeshboard</h1>
    <div>
      <v-btn color="success" @click="navigateTo({name: 'login'})"
      pl-4 pr-4
      >
        Login
      </v-btn>
      <v-btn color="success" @click="navigateTo({name: 'register'})"
      pl-4 pr-4
      >
        Register
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  }
}
</script>

<style scoped>
h1
{
  color: #2c3e50;
  margin-top: 3%;
}
</style>
