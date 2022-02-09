import { NextFunction, Request, Response } from "express"
import cassandraClient from '../config/db.config'
import { ErrorResponseType } from "../interface"

export default async function (req: Request, res: Response, next: NextFunction) {
    const userId: string = req.params.userId
    const query = 'SELECT * FROM users WHERE id=?'
    const params: any = [ userId ]
    const result = await cassandraClient.execute(query, params, { prepare : true })
    
    if (!result.rowLength) {
        const responseObj: ErrorResponseType = {
            code: 400,
            message: 'User data not found'
        }
        return res.status(400).json(responseObj)
    }

    next()
}