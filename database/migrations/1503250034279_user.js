'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('full_name', 255).notNullable()
      table.string('username', 255).notNullable()
      table.string('password', 255).notNullable()
      table.string('dt_birth', 255).notNullable()
      table.string('mobile_phone', 255).notNullable()
      table.string('dt_register', 255).nullable()
      table.string('email', 255).notNullable()
      table.enu('permission', ['U', 'A']).notNullable()
      table.enu('status', ['0', '1']).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
