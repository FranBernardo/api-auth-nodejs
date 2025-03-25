import { Router, Response, Request } from 'express'
import { UsersController } from '../controllers'


export const CreateRouter: Router = Router()

CreateRouter.route('/create').post(UsersController.register)
CreateRouter.route('/login').post(UsersController.login)