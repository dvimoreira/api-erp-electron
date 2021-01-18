'use strict'

// IMPORTS
const BaseController = use('App/Controllers/Http/BaseController')

class TokenController extends BaseController {
    async refresh ({ request, response, auth }) {
        try {
            const { refresh_token } = request.all();
            return await auth.generateForRefreshToken(refresh_token);
        } catch (e) {
            return this.errorResponse(response, e, 'Não foi possível atualizar o token!')
        }
    }
}

module.exports = TokenController
