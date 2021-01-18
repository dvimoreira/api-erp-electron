'use strict'

// IMPORTS
const BaseController = use('App/Controllers/Http/BaseController')

// COMPONENTS
const { validate } = use('Validator')

// MODELS
const Stock = use("App/Models/stock")
const User = use("App/Models/User")

class StockController extends BaseController {
    async index ({ request, response, auth }) {
        try {
            let data = await User.all()

            if (!data) {
                return response.status(422).send({
                    status: false,
                    message: "Não foi possível listar estoque"
                })
            }

            return response.status(200).send({
                status: true,
                message: 'Listagem de estoque',
                json: data
            })
        } catch (e) {
            return this.errorResponse(response, e, 'Não foi possível listar estoque.')     
        }
    }

    async create ({ request, response }) {
        try {
            const rules = {
                title: 'required',
                creator_type: 'required',
                qtd: 'required',
                price: 'required',
                stock_reference: 'required'
            }

            const messages = {
                'title.required': 'O Título é um campo obrigatório',
                'creator_type.required': 'O Tipo é um campo obrigatório',
                'qtd.required': 'A Quantidade é um campo obrigatório',
                'price.required': 'O Preço é um campo obrigatório',
                'stock_reference.required': 'A Referência de Estoque é um campo obrigatório'
            }

            const validation = await validate(request.all(), rules, messages)

            if (validation.fails()) {
                return response.status(422).send({
                    status: false,
                    message: "Não foi possível validar os campos enviados.",
                    errors: validation.messages()
                })
            }

            const data = new Stock()      
            data.title = request.input('title')
            data.creator_type = request.input('creator_type')
            data.fornecedor = request.input('fornecedor')
            data.qtd = request.input('qtd')
            data.price = request.input('price')
            data.stock_reference = request.input('stock_reference')
            data.description = request.input('description')
            await data.save()

            if (data) {
                return response.status(200).send({
                    status: true,
                    message: 'Estoque cadastrado com sucesso!'
                })
            }            

        } catch (e) {
            return this.errorResponse(response, e, 'Não foi possível cadastrar informações de estoque')     
        }
    }

    async edit ({ request, response, params }) {
        try {
            const rules = {
                title: 'required',
                creator_type: 'required',
                qtd: 'required',
                price: 'required',
                stock_reference: 'required'
            }

            const messages = {
                'title.required': 'O Título é um campo obrigatório',
                'creator_type.required': 'O Tipo é um campo obrigatório',
                'qtd.required': 'A Quantidade é um campo obrigatório',
                'price.required': 'O Preço é um campo obrigatório',
                'stock_reference.required': 'A Referência de Estoque é um campo obrigatório'
            }

            const validation = await validate(request.all(), rules, messages)

            if (validation.fails()) {
                return response.status(422).send({
                    status: false,
                    message: "Não foi possível validar os campos enviados.",
                    errors: validation.messages()
                })
            }

            const data = Stock.find(params.id)      
            data.title = request.input('title')
            data.creator_type = request.input('creator_type')
            data.fornecedor = request.input('fornecedor')
            data.qtd = request.input('qtd')
            data.price = request.input('price')
            data.stock_reference = request.input('stock_reference')
            data.description = request.input('description')
            await data.save()

            if (data) {
                return response.status(200).send({
                    status: true,
                    message: 'Estoque editado com sucesso!'
                })
            }            

        } catch (e) {
            return this.errorResponse(response, e, 'Não foi possível cadastrar informações de estoque')     
        }
    }

    async delete ({ request, response, auth }) {
        try {
            const data = Stock.find(params.id)      
            await data.delete()

            if (!data) {
                return response.status(422).send({
                    status: false,
                    message: "Não foi possível deletar item."
                })
            }
            
            return response.status(200).send({
                status: true,
                message: 'Estoque deletado com sucesso!'
            })
        } catch (e) {
            return this.errorResponse(response, e, 'Não foi possível deletar item do estoque')     
        }
    }
}

module.exports = StockController
