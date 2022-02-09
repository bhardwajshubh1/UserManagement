import { Client } from 'elasticsearch'

const client = new Client({
  host: process.env.ELASTIC_HOST,
  log: 'trace',
  apiVersion: process.env.ELASTIC_APIVERSION
});

export const elasticHealthCheck = async () => {
    
    try {
        await client.ping({requestTimeout: 1000 })
    } catch (e) {
        throw new Error('Unable to connect with elastic search\n' + e)
    }
}

export default client