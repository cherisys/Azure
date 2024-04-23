from azure.servicebus import ServiceBusClient, ServiceBusMessage
from azure.servicebus.management import ServiceBusAdministrationClient

connection_str = ""
queue_name = "queue001"

# create service bus client
servicebus_client = ServiceBusClient.from_connection_string(connection_str)

# create service bus administration client
servicebus_admin_client = ServiceBusAdministrationClient.from_connection_string(connection_str)

# create queue
servicebus_admin_client.create_queue(queue_name)

# update queue
queue_properties = servicebus_admin_client.get_queue(queue_name)
queue_properties.max_delivery_count = 10
servicebus_admin_client.update_queue(queue_properties)

# send a message to queue
sender = servicebus_client.get_queue_sender(queue_name)
message = ServiceBusMessage("Hello from Python")
sender.send_messages(message)
sender.close()
    
# receive message from queue
receiver = servicebus_client.get_queue_receiver(queue_name)
received_message = receiver.receive_messages(max_message_count=1)[0]
# do something with received message
print(received_message)
# mark message as completed
receiver.complete_message(received_message)
receiver.close()

# delete queue
servicebus_admin_client.delete_queue(queue_name)

# close admin client and service client
servicebus_admin_client.close()
servicebus_client.close()