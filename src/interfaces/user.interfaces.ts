
import { types } from 'cassandra-driver'
enum GENDER {
    'male',
    'female'
}

export interface CreateUserInput {
    name: string
    phone: string
    age?: number
    gender?: GENDER
}

export interface UpdateUserInput {
    name?: string
    phone?: string
    age?: number
    gender?: GENDER
}

export interface UserEntity {
    id: types.Uuid
    name: string
    phone: string
    age: number
    gender: GENDER
}

export interface UserEntityResponse {
    _id: string
    _index: string
    _score?: number
    _type: string
    _version?: number,
    _seq_no?: number,
    _primary_term?: number,
    found?: true,
    _source: UserEntity
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
    data: UserEntityResponse | [UserEntityResponse]
}

export type Fields = [string?]

interface Range {
    key: string
    operator: string
    value: string
}


interface Term {
    key: string
    value: [string]
}


export interface FilterQuery {
    fields?: Fields
    termFilter? : [Term]
    rangeFilter?: [Range]
}

interface TermObjectType {
    [key: string]: [string?]
}

export interface TermObject {
    terms:  TermObjectType
}

interface RangeObjectType {
    [key: string]: Object
}

export interface RangeObject {
    range:  RangeObjectType
}

type QueryObject = (TermObject | RangeObject)[]

export interface Filters {
    query:  {
        bool: {
            must: QueryObject
        },
    }
    _source?: Fields
}

export type RangeReducesObjectType = {
    [key: string]: RangeObject
} 