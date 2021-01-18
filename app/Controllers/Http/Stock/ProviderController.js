'use strict'

// IMPORTS
const BaseController = use('App/Controllers/Http/BaseController')

// COMPONENTS
const { validate } = use('Validator')

// MODELS
const Provider = use("App/Models/provider")

class ProviderController extends BaseController {
    async index ({ request, response }) {
        try {
            const rules = {
                fantasy_name: 'required',
                social_name: 'required',
                address: 'required',
                number: 'required',
                district: 'required',
                city: 'required',
                state: 'required',
                postal_code: 'required',
                company_type: 'required',
                cpf_cnpj: 'required',
                ie: 'required',
                email: 'required',
                responsible: 'required'
            }

            const messages = {
                'fantasy_name.required': 'O Nome Fantasia é um campo obrigatório',
                'social_name.required': 'A Rasão Social é um campo obrigatório',
                'address.required': 'O Endereço é um campo obrigatório',
                'number.required': 'O Número é um campo obrigatório',
                'district.required': 'O Bairro é um campo obrigatório',
                'city.required': 'A Cidade é um campo obrigatório',
                'state.required': 'O Estado é um campo obrigatório',
                'postal_code.required': 'O CEP é um campo obrigatório',
                'company_type.required': 'O Tipo de Pessoa é um campo obrigatório',
                'cpf_cnpj.required': 'O CPF/CNPJ é um campo obrigatório',
                'ie.required': 'A Inscrição Estadual é um campo obrigatório',
                'email.required': 'O E-mail é um campo obrigatório',
                'responsible.required': 'O Nome do Responsável é um campo obrigatório'
            }

            const validation = await validate(request.all(), rules, messages)

            if (validation.fails()) {
                return response.status(422).send({
                    status: false,
                    message: "Não foi possível validar os campos enviados.",
                    errors: validation.messages()
                })
            }

            const data = new Provider()      
            data.fantasy_name = request.input('fantasy_name')
            data.social_name = request.input('social_name')
            data.address = request.input('address')
            data.number = request.input('number')
            data.complement = request.input('complement')
            data.district = request.input('district')
            data.city = request.input('city')
            data.state = request.input('state')
            data.postal_code = request.input('postal_code')
            data.company_type = request.input('company_type')
            data.cpf_cnpj = request.input('cpf_cnpj')
            data.ie = request.input('ie')
            data.email = request.input('email')
            data.phone = request.input('phone')
            data.mobile_phone = request.input('mobile_phone')
            data.responsible = request.input('responsible')
            await data.save()

            if (user) {
                return response.status(200).send({
                    status: true,
                    message: 'Fornecedor cadastrado com sucesso!'
                })
            }            

        } catch (e) {
            return this.errorResponse(response, e, 'Não foi possível cadastrar informações de fornecedor')     
        }
    }
}

module.exports = ProviderController
