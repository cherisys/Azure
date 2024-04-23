from azure.servicebus import ServiceBusClient, ServiceBusMessage
from azure.servicebus.management import ServiceBusAdministrationClient

connection_str = ""
topic_name = "topic001"
subscription_name = "subs001"

# create service bus client
servicebus_client = ServiceBusClient.from_connection_string(connection_str)

# create service bus administration client
servicebus_admin_client = ServiceBusAdministrationClient.from_connection_string(connection_str)

# create topic
servicebus_admin_client.create_topic(topic_name)

# update topic
topic_properties = servicebus_admin_client.get_topic(topic_name)
topic_properties.max_size_in_megabytes = 1024
servicebus_admin_client.update_topic(topic_properties)

# create subscription
servicebus_admin_client.create_subscription(topic_name, subscription_name)

# send a message to topic
sender = servicebus_client.get_topic_sender(topic_name)
message = ServiceBusMessage("Hello from Python")
sender.send_messages(message)
sender.close()
    
# receive message from subscription
receiver = servicebus_client.get_subscription_receiver(topic_name, subscription_name)
received_message = receiver.receive_messages(max_message_count=1)[0]
# do something with received message
print(received_message)
# mark message as completed
receiver.complete_message(received_message)
receiver.close()

# delete subscription
servicebus_admin_client.delete_subscription(subscription_name)

# delete topic
servicebus_admin_client.delete_topic(topic_name)

# close admin client and service client
servicebus_admin_client.close()
servicebus_client.close()