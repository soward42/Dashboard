<template>
  <v-layout row>
    <v-container row>
        <v-flex xs12>
        <div>
          <v-tabs
            v-model="active"
            color="cyan"
            dark
            slider-color="yellow"
          >
            <v-tab
              v-for="service in services.services"
              :key="service.name"
              ripple
            >
              {{ service.name }}
            </v-tab>
            <v-tab-item
              v-for="service in services.services"
              :key="service.name"
            >
              <v-toolbar :color="service.backColor" v-for="widget in service.widget" :key="widget.name">
                <v-toolbar-title>{{ widget.name }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn @click="addWidget(widget.name+'Param')">Add</v-btn>
              </v-toolbar>
            </v-tab-item>
          </v-tabs>
        </div>
      </v-flex>
      <v-layout>
        <v-flex justify-center>
            <v-card v-for="userWidget in widgets" :key="userWidget.id">
              <v-card-title primary-title class="justify-center">
                <div class="widgetValue text-xs-center">
                  <h3 class="headline mb-0">{{ userWidget.text_value }}</h3>
                  <div :id="userWidget.id"></div>
                  <v-btn class="deleteButton" color="red" @click="deleteWidget(userWidget)" dark>Delete</v-btn>
                </div>
              </v-card-title>
            </v-card>
        </v-flex>
      </v-layout>
    </v-container>
      <v-dialog row justify-center v-model="WeatherModal" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Widget Parameter</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field v-model="value" label="City name*" hint="London" required></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="WeatherModal = false">Close</v-btn>
            <v-btn id="submitButton" color="blue darken-1" flat @click="submitWeather">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog row justify-center v-model="FollowerCountModal" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Follower Count Widget Parameter</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field v-model="value" label="Twitter account*" hint="the name after @" required></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="FollowerCountModal= false">Close</v-btn>
            <v-btn id="submitButton" color="blue darken-1" flat @click="submitFollower">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog row justify-center v-model="LastTweetModal" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Widget Parameter</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field v-model="value" label="Twitter account*" hint="the name after @" required></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="LastTweetModal = false">Close</v-btn>
            <v-btn id="submitButton" color="blue darken-1" flat @click="submitTweet">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </v-layout>
</template>

<script>
import config from '../config/serviceDisplayConfig'
import Service from '@/services/Service'
export default {
  data () {
    return {
      active: null,
      services: config,
      WeatherModal: false,
      LastTweetModal: false,
      FollowerCountModal: false,
      value: '',
      widgets: null,
      timer: ''
    }
  },
  methods: {
    submit () {
      console.log(config)
    },
    addWidget (func) {
      this[func]()
    },
    LocalWeatherParam () {
      this.WeatherModal = true
    },
    FollowerCountParam () {
      this.FollowerCountModal = true
    },
    LastTweetParam () {
      this.LastTweetModal = true
    },
    async submitWeather () {
      try {
        await Service.addWidget({
          token: localStorage.getItem('token'),
          widgetType: this.services.services[0].widget[0].name,
          textValue: this.value
        })
        this.WeatherModal = false
        this.getUserWidget()
      } catch (error) {
        console.log(error)
      }
    },
    async submitFollower () {
      try {
        await Service.addWidget({
          token: localStorage.getItem('token'),
          widgetType: this.services.services[1].widget[0].name,
          textValue: this.value
        })
        this.FollowerCountModal = false
        this.getUserWidget()
      } catch (error) {
        console.log(error)
      }
    },
    async submitTweet () {
      try {
        await Service.addWidget({
          token: localStorage.getItem('token'),
          widgetType: this.services.services[1].widget[1].name,
          textValue: this.value
        })
        this.LastTweetModal = false
        this.getUserWidget()
      } catch (error) {
        console.log(error)
      }
    },
    async getUserWidget () {
      try {
        const widgets = await Service.widgetList({
          token: localStorage.getItem('token')
        })
        this.widgets = widgets.data.widgets
        console.log(this.widgets)
      } catch (error) {
        console.log(error)
      }
    },
    async updateData () {
      console.log('On passe dans la fonction à 15 secondes d\'intervalles')
      Object.keys(this.widgets).forEach(key => {
        this['get' + this.widgets[key].widget](key)
      })
    },
    async getFollowerCount (key) {
      const data = await Service.followerCount(this.widgets[key].text_value)
      console.log(data)
      document.getElementById(this.widgets[key].id).innerHTML = 'Follower count: ' + data.data.followers_count
    },
    async getLastTweet (key) {
      const data = await Service.lastTweet(this.widgets[key].text_value)
      console.log(data)
      document.getElementById(this.widgets[key].id).innerHTML = 'Last tweet: ' + data.data.tweet
    },
    async getLocalWeather (key) {
      const data = await Service.localWeather(this.widgets[key].text_value)
      console.log(data)
      document.getElementById(this.widgets[key].id).innerHTML = 'Temperature: ' + data.data.temp + '°C - Weather: ' + data.data.weather
    },
    async deleteWidget (Widget) {
      await Service.deleteWidget({widgetId: Widget.id})
      this.getUserWidget()
    }
  },
  beforeMount () {
    this.getUserWidget()
  },
  mounted () {
    this.timer = setInterval(() => {
      this.updateData()
    }, 15000)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>

<style scoped>
.widgetValue {
  text-align: center;
}
</style>
