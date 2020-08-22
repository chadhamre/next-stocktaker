const dotenv = require('dotenv')
const { Sequelize, DataTypes } = require('sequelize')
const AccountModel = require('./models/account')

dotenv.config()

const sequelize = new Sequelize(process.env.JAWSDB_COPPER_URL, {
  logging: console.log,
})

const Account = AccountModel(sequelize, Sequelize)

module.exports = {
  Account,
}
