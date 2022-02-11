import { Kafka, logLevel } from 'kafkajs'

const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID,
  brokers: process.env.KAFKA_BROKERS?.split(' ') || [],
  logLevel: logLevel.ERROR
})

export const producer = kafka.producer()

export const consumer = kafka.consumer({ groupId: 'user-group' })