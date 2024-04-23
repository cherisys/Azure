const {ServiceBusClient} = require("@azure/service-bus");
const connectionString = ""

const queueName = "queue001";
const sbClient = new ServiceBusClient(connectionString);
const sender = sbClient.createSender(queueName);

async function sendMessage(){

    // create a batch of messages
    const messages = [
        {body: "Hello, this is first message."},
        {body: "Hi, this is second message."}
    ];

    // send a message as batch
    await sender.sendMessage(messages);
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