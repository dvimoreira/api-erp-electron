'use strict'

// IMPORTS
const BaseController = use('App/Controllers/Http/BaseController')


// COMPONENTS
const { validate } = use('Validator')

// MODELS
const User = use("App/Models/User")

class UserController extends BaseController {
    async index ({ request, response }) {
        try {
            const rules = {
                full_name: 'required',
                dt_birth: 'required',
                mobile_phone: 'required',
                email: 'required',
                username: 'required',
                password: 'required'
            }

            const messages = {
                'full_name.required': 'O Nome completo é um campo obrigatório',
                'dt_birth.required': 'A Data de nascimento é um campo obrigatório',
                'mobile_phone.required': 'O Celular é um campo obrigatório',
                'email.required': 'O E-mail é um campo obrigatório',
                'username.required': 'O Usuário é um campo obrigatório',
                'password.required': 'A Senha é um campo obrigatório'
            }

            const validation = await validate(request.all(), rules, messages)

            if (validation.fails()) {
                return response.status(422).send({
                    status: false,
                    message: "Não foi possível validar os campos enviados.",
                    errors: validation.messages()
                })
            }

            const data = request.only(["full_name", "dt_birth", "mobile_phone", "dt_register", "email", "username", "password"])
            data.permission = 'A'
            data.status = '1'
            const user = await User.create(data)        

            if (user) {
                return response.status(200).send({
                    status: true,
                    message: 'Usuário cadastrado com sucesso!'
                })
            }            

        } catch (e) {
            return this.errorResponse(response, e, 'Não foi possível cadastrar informações de usuario')     
        }
    }
}

module.exports = UserController
