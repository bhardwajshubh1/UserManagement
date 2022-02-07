
import { types } from 'cassandra-driver'
enum Gender {
    'male',
    'female'
}

export interface CreateUserInput {
    name: string
    phone: string
    age?: number
    gender?: Gender
}

export interface UpdateUserInput {
    name?: string
    phone?: string
    age?: number
    gender?: Gender
}

export interface UserEntity {
    id: types.Uuid
    name: string
    phone: string
    age: number
    gender: Gender
}

type CreateOrUpdateUserResponse = {
    id: string
}

export interface UserResposeType {
    code: number
    data: CreateOrUpdateUserResponse 
}

export interface GetUserResposeType {
    code: number
    data: UserEntity
}