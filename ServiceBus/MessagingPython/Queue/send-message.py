from azure.servicebus import ServiceBusClient, ServiceBusMessage

connection_str = ""
queue_name = "queue001"

def send_message(connection_str, queue_name):
    servicebus_client = ServiceBusClient.from_connection_string(connection_str)
    sender = servicebus_client.get_queue_sender(queue_name)
    message = ServiceBusMessage("Hello from Python")
    sender.send_messages(message)
    sender.close()
    servicebus_client.close()

send_message(connection_str, queue_name)
