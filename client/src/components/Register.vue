<template>
  <div id="app">
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm10 md8>
            <v-alert type="error"
            dismissible
            v-html="errorMsg"
            :value="alertError"
            >
            </v-alert>
            <v-alert type="success"
            dismissible
            :value="alertSuccess"
            >
              Successfully registered
            </v-alert>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Register</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-form>
                <v-flex pl-4 pr-4>
                  <v-text-field
                  v-model="mail"
                  :rules="[rules.required, rules.checkMail]"
                  label="Email"
                  ></v-text-field>
                  <v-text-field
                  v-model="confirmMail"
                  :rules="[rules.required, rules.sameMail]"
                  label="Email confirmation"
                  ></v-text-field>
                </v-flex>
                <br/>
                <v-flex pl-4 pr-4>
                  <v-text-field
                  v-model="username"
                  :rules="[rules.required, rules.minUsername]"
                  label="Username"
                  ></v-text-field>
                </v-flex>
                <br/>
                <v-flex pl-4 pr-4>
                  <v-text-field
                    v-model="password"
                    :rules="[rules.required, rules.minPassword]"
                    :type="show1 ? 'text' : 'password'"
                    label="Password"
                    hint="At least 8 characters"
                    counter
                    @click:append="show1 = !show1"
                  ></v-text-field>
                  <v-text-field
                    v-model="confirmPassword"
                    :rules="[rules.required, rules.samePassword]"
                    :type="show1 ? 'text' : 'password'"
                    label="Password Confirmation"
                    counter
                    @click:append="show1 = !show1"
                  ></v-text-field>
                </v-flex>
                <v-btn round color="info" v-on:click="submit">Register</v-btn>
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
      mail: '',
      confirmMail: '',
      confirmPassword: '',
      errorMsg: null,
      alertError: false,
      alertSuccess: false,
      rules: {
        required: value => !!value || 'Required.',
        minPassword: v => v.length >= 8 || 'Min 8 characters',
        minUsername: v => v.length >= 6 || 'Min 6 characters',
        checkMail: v => (/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/).test(v) || 'Invalid email',
        sameMail: v => v === this.mail || 'Email doesn\'t match',
        samePassword: v => v === this.password || 'Password doesn\'t match'
      }
    }
  },
  methods: {
    async submit () {
      try {
        await Service.register({
          email: this.email,
          username: this.username,
          password: this.password
        })
        this.alertSuccess = true
      } catch (error) {
        this.errorMsg = error.response.data.error
        this.alertError = true
        console.log(error)
      }
    }
  }
}
</script>

<style scoped>
</style>
