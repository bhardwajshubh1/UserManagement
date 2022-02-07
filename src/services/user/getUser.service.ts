import { Request, Response } from 'express'
import { CreateUserInput, UserResposeType, UserEntity, GetUserResposeType } from '../../interfaces/user.interfaces'
import client from '../../config/elasticsearch.config'
import { ErrorResponseType } from '../../interfaces/common.interface'
import { ELASTIC_SCHEMAS } from '../../config/constants'

export default async function  (req: Request, res: Response) {
    try {
        const userId: string = req.params.userId

        const result = await client.get({
            index: ELASTIC_SCHEMAS.USER_MANAGEMENT,
            id: userId,
            type: 'UserEntity'
        })
        const responseObject: GetUserResposeType = {
            code: 200,
            data: <UserEntity>result._source
        }
        
        res.status(200).json(responseObject)

    } catch (e) {
        const errorResposeObject: ErrorResponseType = {
            code: 500,
            message: 'Something went wrong\n' + e
        }

        res.status(500).json(errorResposeObject)
    }
    
}