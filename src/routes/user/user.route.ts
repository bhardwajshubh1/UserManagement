import { Router } from 'express'

const router = Router()

router
    .route('/users')
    .post()
    .get()

router
    .route('/users/:userId')
    .put()
    .get()
    .delete()


export default router