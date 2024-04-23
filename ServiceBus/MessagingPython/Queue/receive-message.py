from azure.servicebus import ServiceBusClient

connection_str = ""
queue_name = "queue001"

def receive_messages(connection_str, queue_name):
    servicebus_client = ServiceBusClient.from_connection_string(connection_str)
    receiver = servicebus_client.get_queue_receiver(queue_name)
    with receiver:
        for message in receiver:
            # Do something with the message
            print(message)
            receiver.complete_message(message)
    receiver.close()
    servicebus_client.close()

receive_messages(connection_str, queue_name)
