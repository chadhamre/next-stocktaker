const dotenv = require('dotenv')
const { Sequelize, DataTypes } = require('sequelize')
const AccountModel = require('./models/account')

dotenv.config()

const sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL, {
  logging: true,
})

const Account = AccountModel(sequelize, Sequelize)

module.exports = {
  Account,
}
