const { Kafka } = require('kafkajs')

const { createClient } = require('redis');
const client = createClient();


const kafka = new Kafka({
    clientId: 'kafkapractice',
    brokers: ['localhost:9092'],
})
async function consume(){const consumer = kafka.consumer({ groupId: 'productConsumer' })
await consumer.connect()
await consumer.subscribe({ topics: ['fetchedProducts'] })

await consumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat }) => {
        await client.connect();
        await client.set(message.key.toString(), message.value.toString());
        await client.disconnect();
        console.log({
            key: message.key.toString(),
            value: message.value.toString(),
        })
    },
})}
consume();