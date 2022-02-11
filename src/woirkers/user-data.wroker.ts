import { ELASTIC_SCHEMAS, KAFKA_TOPICS } from "../config/constants"
import client from "../config/elasticsearch.config"
import { consumer } from "../config/kafka"
import { UserEntity } from "../interfaces/user.interfaces"


export default async () => {
    
    await consumer.subscribe({ topic: KAFKA_TOPICS.USER_TOPIC, fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const userObject: UserEntity = JSON.parse(message.value?.toString() || '{}')

            const obj = {
                id: `${userObject.id}`,
                index: ELASTIC_SCHEMAS.USER_MANAGEMENT,
                type: 'UserEntity',
                body: userObject
            }
            const responseObj = await client.index(obj)
        }
    })
}