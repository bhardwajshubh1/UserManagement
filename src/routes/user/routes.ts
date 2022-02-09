import { Router } from 'express'
import userDataEntryCheck from '../../middlewares/userDataEntryCheck'
import { createUserService, deleteUserService, getUserService, getUsersService, updateUserService } from '../../services/user/service'


const router = Router()

router
    .route('/users')
    .post(createUserService)
    .get(getUsersService)

router
    .route('/users/:userId')
    .get(userDataEntryCheck, getUserService)
    .put(userDataEntryCheck, updateUserService)
    .delete(userDataEntryCheck, deleteUserService)


export default router