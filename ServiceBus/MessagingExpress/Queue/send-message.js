const {ServiceBusClient} = require("@azure/service-bus");
const connectionString = ""

const queueName = "queue001";
const sbClient = new ServiceBusClient(connectionString);
const sender = sbClient.createSender(queueName);

async function sendMessage(){

    // create an array of messages
    const messages = [
        {body: "Hello, this is first message."},
        {body: "Hi, this is second message."}
    ];

    // send messages - individual messages will be created in queue.
    await sender.sendMessages(messages);
}

sendMessage()
    .then(() => {
        return sender.close();
    })
    .then(() => {
        return sbClient.close();
    })
    .catch((err) => {
        console.error(err);
    });