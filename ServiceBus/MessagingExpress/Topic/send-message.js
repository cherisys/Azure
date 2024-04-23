const { ServiceBusClient } = require("@azure/service-bus");

const connectionString = ""
const serviceBusClient = new ServiceBusClient(connectionString);

async function sendMessage(topicName){
    try
    {
        // create sender for topic
        const sender = serviceBusClient.createSender(topicName);
        // create message object
        const message = {
            body: "Hello, from Node to Topic.", 
            label: "greeting", 
            useProperties: { priority: 1}
        };

        //send message to topic
        await sender.sendMessages(message);
        await sender.close();
    }
    catch(err){
        console.log(err);
    }
    finally {
        await serviceBusClient.close();
    }
}

await sendMessage("topic001");