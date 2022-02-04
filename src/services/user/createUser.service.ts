import { Request, Response } from 'express'
import { CreateUserInput, UserResposeType } from '../../interfaces/user.interfaces'
import { types } from 'cassandra-driver'
import cassandraClient from './../../config/db.config'

export default async function  (req: Request, res: Response) {
    const reqData: CreateUserInput = req.body
    const id = types.Uuid.random()
    const query = 'insert into users (id, name, phone, age, gender) values (?,?,?,?,?)'
    const params: any = [ id, reqData.name, reqData.phone, reqData.age, reqData.gender ]
    await cassandraClient.execute(query, params, { prepare : true })

    
    const responseObject: UserResposeType = {
        code: 200,
        data: {
            id
        }
    }

    res.status(200).json(responseObject)
}