'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Stock extends Model {
    static get table () {
        return 'stocks'
    }
}

module.exports = Stock
