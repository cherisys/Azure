const { ServiceBusClient } = require("@azure/service-bus");

const connectionString = ""
const serviceBusClient = new ServiceBusClient(connectionString);

async function sendMessageBatch(topicName){
    try
    {
        // create sender for topic
        const sender = serviceBusClient.createSender(topicName);
        // create messages in array
        const messages = [];
        for (let i = 0; i<=10; i++){
            const message = {
                body: `Hello world ${i}.`, 
                label: "greeting", 
                useProperties: { priority: 1}
            };

            messages.push(message);
        }

        // create message batch
        let messageBatch = await sender.createMessageBatch();

        // loop throught the messages array and try to add to batch
        for (let i=0; i<messages.length; i++){

            // try adding message
            const isAdded = messageBatch.tryAddMessage(messages[i]);

            // if not added, it means:
            // - message size exceeds maximum size allowed by AMQP protocol (256KB)
            // - message batch is full and exceeding maximum size allowed by AMQP protocol
            if(!isAdded) {
                // send this batch
                await sender.sendMessages(messageBatch);

                //create new batch
                messageBatch = await sender.createMessageBatch();

                const isAddedNow = messageBatch.tryAddMessage(messages[i]);
                if(!isAddedNow) {
                    throw new Error("Something went wrong!");
                }
                
            }
        }

        //send any remaning messages in last created or partially filled up batch
        if(messageBatch.count > 0) {
            await sender.sendMessages(messageBatch);
        }

        sender.close();
    }
    catch(err){
        console.log(err);
    }
    finally {
        await serviceBusClient.close();
    }
}

await sendMessageBatch("topic001");