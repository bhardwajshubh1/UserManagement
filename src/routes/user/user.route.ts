import { Router } from 'express'
import createUserService from '../../services/user/createUser.service'
import getUserService from '../../services/user/getUser.service'

const router = Router()

router
    .route('/users')
    .post(createUserService)
    // .get()

router
    .route('/users/:userId')
    .get(getUserService)
    // .put()
    // .delete()


export default router