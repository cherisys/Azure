from azure.servicebus import ServiceBusClient

connection_str = ""
topic_name = "topic001"
subscription_name = "subs001"

def receive_messages(connection_str, topic_name, subscription_name):
    servicebus_client = ServiceBusClient.from_connection_string(connection_str)
    receiver = servicebus_client.get_subscription_receiver(topic_name, subscription_name)
    with receiver:
        for message in receiver:
            # Do something with the message
            print(message)
            receiver.complete_message(message)
    receiver.close()
    servicebus_client.close()

receive_messages(connection_str, topic_name, subscription_name)
