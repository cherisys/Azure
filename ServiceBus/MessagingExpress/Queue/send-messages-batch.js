const {ServiceBusClient} = require("@azure/service-bus");
const connectionString = ""

const queueName = "queue001";
const sbClient = new ServiceBusClient(connectionString);
const sender = sbClient.createSender(queueName);

async function sendBatchMessages(){

    let batch = await sender.createMessageBatch();

    for(let i=1; i<=10; i++){

        let message = {body: `Hello world ${i}`, label: 'greeting'};

        // try to add message to batch
        if(!batch.tryAddMessage(message)){

            // if it fails, send current batch as it is full
            await sender.sendMessages(batch);
            batch = await sender.createMessageBatch();

            // add message failed earlier to this new batch
            if(!batch.try.tryAddMessage(message)){
                // if it still fails, throw error
                throw new Error("Something went wrong.")
            }
        }
    }

    // send any remaining messages in batch
    await sender.sendMessages(batch);
}

sendBatchMessage()
    .then(() => {
        return sender.close();
    })
    .then(() => {
        return sbClient.close();
    })
    .catch((err) => {
        console.error(err);
    });