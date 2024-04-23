const { ServiceBusClient } = require("@azure/service-bus");

const connectionString = ""
const serviceBusClient = new ServiceBusClient(connectionString);

async function receiveMessages(queueName){
    try
    {
        const receiver = serviceBusClient.createReceiver(queueName);
        // receive a batch of 2 messages and set peek lock
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
    finally {
        
        await serviceBusClient.close();
    }
}

await receiveMessages("queue001");