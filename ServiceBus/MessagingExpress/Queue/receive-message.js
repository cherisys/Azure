const {ServiceBusClient} = require("@azure/service-bus");
const connectionString = ""

const queueName = "queue001";
const sbClient = new ServiceBusClient(connectionString);
const receiver = sbClient.createReceiver(queueName);

async function receiveMessage(){

    // subscribe to messages from queue
    receiver.subscribe({
        processMessage: async (message) => {
            //process each message
            console.log(message.body);
        },
        processError: async (err) => {
            console.log(err);
        }
    })
}

receiveMessage()
    .then(() => {
        return receiver.close();
    })
    .then(() => {
        return sbClient.close();
    })
    .catch((err) => {
        console.error(err);
    });