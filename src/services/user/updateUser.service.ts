import { Request, Response } from 'express'
import { UpdateUserInput, UserResposeType } from '../../interfaces/user.interfaces'
import cassandraClient from './../../config/db.config'
import client from '../../config/elasticsearch.config'
import { ErrorResponseType } from '../../interfaces/common.interface'
import { ELASTIC_SCHEMAS } from '../../config/constants'

export default async function  (req: Request, res: Response) {
    try {
        const reqData: UpdateUserInput = req.body
        const userId: string = req.params.userId
        console.log((Object.keys(reqData)).length)
        if ((Object.keys(reqData)).length) {
            const arrToAppend = []
            const params: any = Object.values(reqData)
            
            for (const key in reqData) {
                arrToAppend.push(`${key}=?`)
            }

            params.push(userId)
            const stringToAppend = arrToAppend.join(', ')

            const query = `UPDATE users SET ${stringToAppend} WHERE id=?`

            await cassandraClient.execute(query, params, { prepare : true })
            
            const obj = {
                id: userId,
                index: ELASTIC_SCHEMAS.USER_MANAGEMENT,
                type: 'UserEntity',
                body: {
                    doc: reqData
                }
              }

            await client.update(obj)

            const responseObject: UserResposeType = {
                code: 200,
                data: {
                    id: userId
                }
            }
            
            return res.status(200).json(responseObject)
        }
        
        const responseObj: ErrorResponseType = {
            code: 400,
            message: 'Empty user object found'
        }

        return res.status(400).json(responseObj)
    } catch (e) {
        const errorResposeObject: ErrorResponseType = {
            code: 500,
            message: 'Something went wrong\n' + e
        }

        res.status(500).json(errorResposeObject)
    }
    
}