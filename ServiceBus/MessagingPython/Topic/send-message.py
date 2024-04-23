from azure.servicebus import ServiceBusClient, ServiceBusMessage

connection_str = ""
topic_name = "topic001"

def send_message(connection_str, topic_name):
    servicebus_client = ServiceBusClient.from_connection_string(connection_str)
    sender = servicebus_client.get_topic_sender(topic_name)
    message = ServiceBusMessage("Hello from Python")
    sender.send_messages(message)
    sender.close()
    servicebus_client.close()

send_message(connection_str, topic_name)
