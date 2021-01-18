'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CompanySchema extends Schema {
  up () {
    this.create('company', (table) => {
      table.increments()
      table.string('company_name', 255).notNullable()
      table.string('cnpj', 255).notNullable()
      table.string('ie', 255).nullable()
      table.string('municipal_registration', 255).nullable()
      table.string('phone', 255).notNullable()
      table.string('mobile_phone', 255).notNullable()
      table.string('icms', 255).nullable()
      table.string('address', 255).notNullable()
      table.string('district', 255).notNullable()
      table.string('number', 255).notNullable()
      table.string('city', 255).notNullable()
      table.string('state', 255).notNullable()
      table.string('postal_code', 255).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('company')
  }
}

module.exports = CompanySchema
