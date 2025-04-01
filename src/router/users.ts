import { Router, Response, Request } from 'express'
import { UsersController } from '../controllers'
import { validateAuth } from '../middleware/auth.middleware'


export const CreateRouter: Router = Router()

CreateRouter.route('/create').post(UsersController.register)
CreateRouter.route('/login').post(UsersController.login)
CreateRouter.route('/verifyOtp').post(UsersController.verifyOtp)
CreateRouter.route('/registrerOtp').post(UsersController.registerOtp)
CreateRouter.route('/confirmOtp').post(UsersController.confirmOtp)
CreateRouter.route('/profile').get(validateAuth , UsersController.profile)
CreateRouter.route('/update').put(validateAuth , UsersController.update)