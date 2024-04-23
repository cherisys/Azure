const { ServiceBusClient } = require("@azure/service-bus");

const connectionString = ""
const serviceBusClient = new ServiceBusClient(connectionString);
// create service bus administration client
const administrationClient = serviceBusClient.createAdministrationClient();

// create a queue
async function createQueue(queueName) {
    try {
        await administrationClient.createQueue(queueName);
    }
    catch(err) {
        console.log(err);
    }
}

// send message to the queue
async function sendMessage(queueName){
    try
    {
        const sender = serviceBusClient.createSender(queueName);
        
        const message1 = {
            body: "Hello, from Node to Queue.", 
            label: "greeting", 
            useProperties: { priority: 1}
        };

        const message2 = {
            body: "Hi, from Node to Queue.", 
            label: "greeting", 
            useProperties: { priority: 1}
        };

        //send an array of two messages to queue
        await sender.sendMessages([message1, message2]);
        await sender.close();
    }
    catch(err){
        console.log(err);
    }
}

// receive messages from a queue
async function receiveMessages(queueName){
    try
    {
        const receiver = serviceBusClient.createReceiver(queueName);
        // receive a batch of 2 messages and set peek lock of 3 seconds
        const receivedMessages = await receiver.receiveMessages(2, {maxWaitTimeInMs: 3000});

        // process received messages
        for (let i=0; i<receivedMessages.length; i++) {

            // do something with message
            console.log(receivedMessages[i]);

            // complete the message after processing
            await receiver.completeMessage(message);
        }

        await receiver.close();
    }
    catch(err){
        console.log(err);
    }
}

// update a queue
async function updateQueue(queueName) {
    try {
        // get current queue properties
        let queueProperties = await administrationClient.getQueue(queueName);
        // change max delivery count value
        queueProperties.maxDeliveryCount = 5;
        // update queue with modified property
        await administrationClient.updateQueue(queueProperties);
    }
    catch(err) {
        console.log(err);
    }
}

// delete a queue
async function deleteQueue(queueName) {
    try {
        await administrationClient.deleteQueue(queueName);
    }
    catch(err) {
        console.log(err);
    }
}

// main function to run program
async function main(queueName) {

    try {
        // create queue
        await createQueue(queueName);
        // send message
        await sendMessage(queueName);
        // receive messages
        await receiveMessages(queueName);
        // update queue
        await updateQueue(queueName);
        // delete queue
        await deleteQueue(queueName);
    }
    catch(err) {
        console.log(err);
    }
    finally {
        administrationClient.close();
        serviceBusClient.close();
    }
}

// call main function
await main("queue001");