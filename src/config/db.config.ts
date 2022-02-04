import { Client }  from 'cassandra-driver'

const cassandraConfig = {
    contactPoints: process.env.CONTACT_POINTS?.split(' '),
    localDataCenter: process.env.LOCAL_DATACENTER,
    keyspace: process.env.KEYSPACE
}

export default new Client(cassandraConfig)