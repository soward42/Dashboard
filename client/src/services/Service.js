import Api from '@/services/Api'

export default {
  register (credentials) {
    return Api().post('register', credentials)
  },
  login (credentials) {
    return Api().post('login', credentials)
  },
  addWidget (credentials) {
    return Api().post('addWidget', credentials)
  },
  widgetList (credentials) {
    return Api().post('userWidgetList', credentials)
  },
  followerCount (credentials) {
    return Api().get('followerCount?screenName=' + credentials)
  },
  lastTweet (credentials) {
    return Api().get('tweet?screenName=' + credentials)
  },
  localWeather (credentials) {
    return Api().get('weather?city=' + credentials)
  },
  deleteWidget (credentials) {
    return Api().post('deleteWidget', credentials)
  }
}
