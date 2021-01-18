'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const Helpers = use('Helpers')

// IMAGE FILE
Route.get('/upload/:path/:fileName', async({response,params})=>{// where :fileName is fileName name
  return response.download(Helpers.publicPath(`upload/${params.path}/${params.fileName}`))
})

// SETUP
Route.group(() => {
  Route.post('company', 'Setup/CompanyController.index')
  Route.get('company/checkCompanyExist', 'Setup/CompanyController.checkCompanyExist')

  Route.post('userAdmin', 'Setup/UserController.index')
  Route.get('user/checkUserExist', 'Setup/CompanyController.checkUserExist')
}).prefix('api/v1/setup')

// AUTH
Route.group(() => {
  Route.post('login', 'Auth/LoginController.index')
  Route.post('refresh-token', 'Auth/TokenController.refresh')
}).prefix('api/v1/auth')

// Stock
Route.group(() => {
  Route.get('list-all', 'Stock/StockController.index')
}).prefix('api/v1/stock')

