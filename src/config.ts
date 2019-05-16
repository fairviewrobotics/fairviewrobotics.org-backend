import convict from 'convict';

const config = convict({
  port: {
    doc: 'The port for the server',
    env: 'PORT',
    format: 'port',
    default: 3000
  },
  db: {
    uri: {
      doc: 'The uri of the mongodb server',
      env: 'MONGO_URI',
      format: String,
      default: 'mongodb://localhost:27017/fairviewrobotics'
    }
  },
  jwt: {
    expire: {
      doc: 'How long the jwt token lasts',
      env: 'JWT_EXPIRE',
      format: String,
      default: '5m'
    },
    secret: {
      doc: 'The secret that generates secure jwt tokens',
      env: 'JWT_SECRET',
      format: String,
      default: 'jwt-secret-@123!#@#*($@*)(*fsd4afdsg'
    }
  }
})

export default config;