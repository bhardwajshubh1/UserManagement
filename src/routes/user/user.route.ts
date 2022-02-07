import { Router } from 'express'
import createUserService from '../../services/user/createUser.service'
import deleteUserService from '../../services/user/deleteUser.service'
import getUserService from '../../services/user/getUser.service'
import updateUserService from '../../services/user/updateUser.service'

const router = Router()

router
    .route('/users')
    .post(createUserService)
    // .get()

router
    .route('/users/:userId')
    .get(getUserService)
    .put(updateUserService)
    .delete(deleteUserService)


export default router