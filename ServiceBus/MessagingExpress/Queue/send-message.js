const { ServiceBusClient } = require("@azure/service-bus");

const connectionString = ""
const serviceBusClient = new ServiceBusClient(connectionString);

async function sendMessage(queueName){
    try
    {
        const sender = serviceBusClient.createSender(queueName);
        const message = {
            body: "Hello, from Node to Topic.", 
            label: "greeting", 
            useProperties: { priority: 1}
        };

        //send message to queue
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

await sendMessage("queue001");