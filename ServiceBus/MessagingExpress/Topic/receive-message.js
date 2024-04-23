const { ServiceBusClient } = require("@azure/service-bus");

const connectionString = ""
const serviceBusClient = new ServiceBusClient(connectionString);

async function receiveMessages(topicName, subscriptionName) {
    try
    {
        // create receiver for topic subscription
        const receiver = serviceBusClient.createReceiver(topicName, subscriptionName);
        // register handlers for message or error events
        receiver.subscribe({
            // called whenever a message is received
            processMessage: async (message) => {
                // do something with message
                console.log(message);

                // complete the message to remove it from subscription
                await receiver.completeMessage(message);
            },
            processError: async (err) => {
                console.log(err);
            }
        });

        await receiver.close();
    }
    catch(err){
        console.log(err);
    }
    finally {
        await serviceBusClient.close();
    }
}

await receiveMessages("topic001", "subs001");