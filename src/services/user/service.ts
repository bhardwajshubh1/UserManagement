import { Request, Response } from 'express'
import { CreateUserInput, GetUserResposeType, UpdateUserInput, UserEntityResponse, UserResposeType } from '../../interfaces/user.interfaces'
import { types } from 'cassandra-driver'
import cassandraClient from './../../config/db.config'
import client from '../../config/elasticsearch.config'
import { ErrorResponseType } from '../../interface'
import { ELASTIC_SCHEMAS } from '../../config/constants'


export const createUserService = async function  (req: Request, res: Response) {
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
                id: id.toString()
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

export const deleteUserService = async function  (req: Request, res: Response) {
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

export const updateUserService = async function  (req: Request, res: Response) {
    try {
        const reqData: UpdateUserInput = req.body
        const userId: string = req.params.userId

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

export const getUserService = async function  (req: Request, res: Response) {
    try {
        const userId: string = req.params.userId

        const result = await client.get({
            index: ELASTIC_SCHEMAS.USER_MANAGEMENT,
            id: userId,
            type: 'UserEntity'
        })
        const responseObject: GetUserResposeType = {
            code: 200,
            data: <UserEntityResponse>result
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

export const getUsersService = async function  (req: Request, res: Response) {
    try {
        const userId: string = req.params.userId

        const result = await client.get({
            index: ELASTIC_SCHEMAS.USER_MANAGEMENT,
            id: userId,
            type: 'UserEntity'
        })
        const responseObject: GetUserResposeType = {
            code: 200,
            data: <UserEntityResponse>result
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