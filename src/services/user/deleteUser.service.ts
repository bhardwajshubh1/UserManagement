import { Request, Response } from 'express'
import { UserResposeType } from '../../interfaces/user.interfaces'
import cassandraClient from './../../config/db.config'
import client from '../../config/elasticsearch.config'
import { ErrorResponseType } from '../../interfaces/common.interface'
import { ELASTIC_SCHEMAS } from '../../config/constants'

export default async function  (req: Request, res: Response) {
    try {
        const userId: string = req.params.userId
        const query = 'DELETE FROM users WHERE id=?'
        const params: any = [ userId ]
        await cassandraClient.execute(query, params, { prepare : true })
        const obj = {
            id: `${userId}`,
            index: ELASTIC_SCHEMAS.USER_MANAGEMENT,
            type: 'UserEntity'
        }
        await client.delete(obj)
        
        const responseObject: UserResposeType = {
            code: 200,
            data: {
                id: userId
            }
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