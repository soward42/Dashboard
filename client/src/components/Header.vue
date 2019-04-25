<template>
  <v-toolbar class="v-toolbar theme--dark primary">
    <v-toolbar-title>
      <span @click="navigateTo({name: 'root'})">
        DashBoard
      </span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn flat @click="navigateTo({name: 'register'})">
          Sign Up
        </v-btn>
      <v-btn flat @click="navigateTo({name: 'login'})">
          Login
        </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  }
}
</script>

<style>
</style>
