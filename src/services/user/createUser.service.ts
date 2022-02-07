import { Request, Response } from 'express'
import { CreateUserInput, UserResposeType, UserEntity } from '../../interfaces/user.interfaces'
import { types } from 'cassandra-driver'
import cassandraClient from './../../config/db.config'
import client from '../../config/elasticsearch.config'
import { ErrorResponseType } from '../../interfaces/common.interface'
import { ELASTIC_SCHEMAS } from '../../config/constants'

export default async function  (req: Request, res: Response) {
    try {
        const reqData: CreateUserInput = req.body
        const query = 'insert into users (id, name, phone, age, gender) values (?,?,?,?,?)'
        const id = types.Uuid.random()
        const params: any = [ id, reqData.name, reqData.phone, reqData.age, reqData.gender ]
        await cassandraClient.execute(query, params, { prepare : true })
        const obj = {
            id: `${id}`,
            index: ELASTIC_SCHEMAS.USER_MANAGEMENT,
            type: 'UserEntity',
            body: { id, ...reqData }
        }
        const responseObj = await client.index(obj)
        
        const responseObject: UserResposeType = {
            code: 200,
            data: {
                id
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