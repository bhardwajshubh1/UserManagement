
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

export type Fields = [string]

interface Terms {
    terms: [string]
}

interface RangeContent {
    gte? : number | Date
    lte? : number | Date
    gt? : number | Date
    lt? : number | Date
}

interface Range {
    age: RangeContent
    name?: RangeContent
}

export interface FilterQuery extends Partial<Terms>, Partial<Range> {
    fields?: Fields
}

interface QueryObject extends Partial<Terms>, Partial<Range> {}

export interface Filters {
    query:  {
        bool: {
            should: [
                QueryObject?
            ]
        },
        fields?: Fields
    }
}