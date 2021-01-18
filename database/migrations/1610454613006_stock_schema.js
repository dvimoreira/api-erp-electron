'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StockSchema extends Schema {
  up () {
    this.create('stocks', (table) => {
      table.increments()
      table.string('title', 255).notNullable()
      table.string('creator_type', 50).notNullable()
      table.string('fornecedor', 255).nullable()
      table.string('qtd', 10).notNullable()
      table.string('price', 20).notNullable()
      table.string('stock_reference', 255).notNullable()
      table.text('description').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('stocks')
  }
}

module.exports = StockSchema
