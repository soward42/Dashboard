module.exports = {
  port: process.env.PORT || 8080,
  db: {
    database: process.env.DB_NAME || 'dashboard',
    user: process.env.DB_USER || 'dashboard',
    password: process.env.DB_PASS || 'dashboard',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: './dashboard.sqlite',
      operatorsAliases: false
    }
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'dashboard'
  },
  api : {
    twitterConsKey: process.env.TWITTERCONSKEY || 'w0qPa0oqOGdrmNlYfhVKtJGle',
    twitterScrtConsKey: process.env.TWITTERSCRTCONSKEY || '9FIqY0WbymPybFsiHqMXSmH4UMsdTvSB5n0anLaTSKooGkdhva',
    twitterAccessToken: process.env.TWITTERACCESSTOKEN || '2535095818-hHvfDEjr0jozyBySWa5fdQoAdTulPb142ONLolF',
    twitterScrtAccessToken: process.env.TWITTERSCRTACCESSTOKEN || 'v1dIo3Ftf67sZd5JB4W9xfIWTQ3OXjQSifH7OKkQRzkNV',
    weatherApiKey: process.env.WEATHERAPIKEY || '5f3acb02450116e41b4018ad570afac8'
  }
}