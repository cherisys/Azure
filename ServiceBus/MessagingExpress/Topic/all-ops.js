const { ServiceBusClient } = require("@azure/service-bus");

const connectionString = ""
const serviceBusClient = new ServiceBusClient(connectionString);
// create service bus administration client
const administrationClient = serviceBusClient.createAdministrationClient();

// create a topic
async function createTopic(topicName) {
    try {
        await administrationClient.createTopic(topicName);
    }
    catch(err) {
        console.log(err);
    }
}

// create a subscription
async function createSubscription(topicName, subscriptionName) {
    try {
        await administrationClient.createSubscription(topicName, subscriptionName);
    }
    catch(err) {
        console.log(err);
    }
}

// send message to the topic
async function sendMessage(topicName){
    try
    {
        const sender = serviceBusClient.createSender(topicName);
        
        const message1 = {
            body: "Hello, from Node to Topic.", 
            label: "greeting"
        };

        const message2 = {
            body: "Hi, from Node to Topic.", 
            label: "greeting"
        };

        //send an array of two messages to topic
        await sender.sendMessages([message1, message2]);
        await sender.close();
    }
    catch(err){
        console.log(err);
    }
}

// receive messages from subscription
async function receiveMessages(topicName, subscriptionName){
    try
    {
        const receiver = serviceBusClient.createReceiver(topicName, subscriptionName);
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

// update a topic
async function updateTopic(topicName) {
    try {
        // get current topic properties
        let topicProperties = await administrationClient.getTopic(topicName);
        // change max size in mb property
        topicProperties.maxSizeInMegabytes = 2048;
        // update topic with modified property
        await administrationClient.updateTopic(topicProperties);
    }
    catch(err) {
        console.log(err);
    }
}

// delete a topic
async function deleteTopic(topicName) {
    try {
        await administrationClient.deleteTopic(topicName);
    }
    catch(err) {
        console.log(err);
    }
}

// main function to run program
async function main(topicName, subscriptionName) {

    try {
        // create topic
        await createTopic(topicName);
        // create subscription
        await createSubscription(topicName, subscriptionName);
        // send message
        await sendMessage(topicName);
        // receive messages
        await receiveMessages(topicName, subscriptionName);
        // update topic
        await updateTopic(topicName);
        // delete topic
        await deleteTopic(topicName);
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
await main("topic001", "subs001");