'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProviderSchema extends Schema {
  up () {
    this.create('providers', (table) => {
      table.increments()
      table.string('fantasy_name', 255).notNullable()
      table.string('social_name', 255).notNullable()
      table.string('address', 255).notNullable()
      table.string('number', 50).notNullable()
      table.string('complement', 255).nullable()
      table.string('district', 255).notNullable()
      table.string('city', 255).notNullable()
      table.string('state', 255).notNullable()
      table.string('postal_code', 50).notNullable()
      table.string('company_type', 50).notNullable()
      table.string('cpf_cnpj', 50).notNullable()
      table.string('ie', 150).notNullable()
      table.string('email', 255).notNullable()
      table.string('phone', 50).notNullable()
      table.string('mobile_phone', 50).nullable()
      table.string('responsible', 255).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('providers')
  }
}

module.exports = ProviderSchema
