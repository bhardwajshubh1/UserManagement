import { Router } from 'express'
import createUserService from '../../services/user/createUser.service'

const router = Router()

router
    .route('/users')
    .post(createUserService)
    // .get()

// router
//     .route('/users/:userId')
//     .put()
//     .get()
//     .delete()


export default router