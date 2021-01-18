'use strict'

// IMPORTS
const BaseController = use('App/Controllers/Http/BaseController')


// COMPONENTS
const { validate } = use('Validator')

class LoginController extends BaseController {
    async index ({ request, response, auth }) {
        try {
            const rules = {
                username: 'required',
                password: 'required'
            }

            const messages = {
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

            const { username, password } = request.all()
            return await auth.withRefreshToken().attempt(username, password)

        } catch (e) {
            return this.errorResponse(response, e, 'Não foi possível fazer o login!')
        }
    }
}

module.exports = LoginController
