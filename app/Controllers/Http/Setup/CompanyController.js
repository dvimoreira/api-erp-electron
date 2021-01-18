'use strict'

// IMPORTS
const BaseController = use('App/Controllers/Http/BaseController')


// COMPONENTS
const { validate } = use('Validator')

// MODELS
const Company = use("App/Models/Company")
const User = use("App/Models/User")

class CompanyController extends BaseController {
    async index ({ request, response }) {
        try {
            const rules = {
                company_name: 'required',
                cnpj: 'required',
                phone: 'required',
                mobile_phone: 'required',
                address: 'required',
                district: 'required',
                number: 'required',
                city: 'required',
                state: 'required',
                postal_code: 'required'
            }

            const messages = {
                'company_name.required': 'O Nome da empresa é um campo obrigatório',
                'cnpj.required': 'O CNPJ é um campo obrigatório',
                'phone.required': 'O Telefone é um campo obrigatório',
                'mobile_phone.required': 'O Celular é um campo obrigatório',
                'address.required': 'O Endereço é um campo obrigatório',
                'district.required': 'O Bairro é um campo obrigatório',
                'number.required': 'O Número é um campo obrigatório',
                'city.required': 'A Cidade é um campo obrigatório',
                'state.required': 'O Estado é um campo obrigatório',
                'postal_code.required': 'O CEP é um campo obrigatório'
            }

            const validation = await validate(request.all(), rules, messages)

            if (validation.fails()) {
                return response.status(422).send({
                    status: false,
                    message: "Não foi possível validar os campos enviados.",
                    errors: validation.messages()
                })
            }

            const data = new Company()
            data.company_name = request.input('company_name')
            data.cnpj = request.input('cnpj')
            data.ie = request.input('ie')
            data.municipal_registration = request.input('municipal_registration')
            data.phone = request.input('phone')
            data.mobile_phone = request.input('mobile_phone')
            data.icms = request.input('icms')
            data.address = request.input('address')
            data.district = request.input('district')
            data.number = request.input('number')
            data.city = request.input('city')
            data.state = request.input('state')
            data.postal_code = request.input('postal_code')

            await data.save()            

            return response.status(200).send({
                status: true,
                message: 'Empresa cadastrada com sucesso!'
            })

        } catch (e) {
            return this.errorResponse(response, e, 'Não foi possível cadastrar informações da empresa')     
        }
    }

    async checkCompanyExist ({ response }) {
        try {
            const data = await Company.getCount()

            if (data >= 1) {
                return response.status(200).send({
                    status: true,
                    message: 'Registro de empresa encontrado'
                })
            } else {
                return response.status(422).send({
                    status: false,
                    message: 'Registro de empresa não encontrado'
                })
            }

        } catch (e) {
            return this.errorResponse(response, e, 'Não foi possível buscar informações')     
        }
    }

    async checkUserExist ({ response }) {
        try {
            const data = await User.getCount()

            if (data >= 1) {
                return response.status(200).send({
                    status: true,
                    message: 'Registro de usuario encontrado'
                })
            } else {
                return response.status(422).send({
                    status: false,
                    message: 'Registro de usuario não encontrado'
                })
            }

        } catch (e) {
            return this.errorResponse(response, e, 'Não foi possível buscar informações')     
        }
    }
}

module.exports = CompanyController
