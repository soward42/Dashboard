<template>
  <div id="app">
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm10 md8>
            <v-card class="elevation-12">
              <v-alert type="error"
              dismissible
              v-html="errorMsg"
              :value="errAlert"
              ></v-alert>
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-form>
                <v-flex pl-4 pr-4>
                  <v-text-field
                  v-model="username"
                  :rules="[rules.required]"
                  label="Username"
                  ></v-text-field>
                </v-flex>
                <br/>
                <v-flex pl-4 pr-4>
                  <v-text-field
                    v-model="password"
                    :rules="[rules.required]"
                    :type="show1 ? 'text' : 'password'"
                    label="Password"
                    @click:append="show1 = !show1"
                  ></v-text-field>
                </v-flex>
                <v-btn round color="info" v-on:click="submit()">Login</v-btn>
              </v-form>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</div>
</template>

<script>
import Service from '@/services/Service'

export default {
  data () {
    return {
      show1: false,
      show2: false,
      username: '',
      password: '',
      errorMsg: null,
      errAlert: false,
      rules: {
        required: value => !!value || 'Required.'
      }
    }
  },
  methods: {
    async submit () {
      try {
        await Service.login({
          username: this.username,
          password: this.password
        }).then(response => {
          localStorage.setItem('token', response.data.token)
          this.$router.push('widget')
        })
      } catch (error) {
        this.errorMsg = error.response.data.error
        this.errAlert = true
      }
    }
  }
}
</script>

<style scoped>

</style>
