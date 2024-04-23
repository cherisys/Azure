1. Create a Service Bus
2. Choose Standard or Premium plan if you want to use Topic
3. Create Topic
    > 1. Max Topic Size
    > 2. Message Time to Live
4. Create Subscription
    > 1. Go to Topic
    > 2. Open Entities -> Subscriptions
    > 3. Max Delivery Count
    > 4. Auto-delete after idle for
    > 5. Enable sessions
    > 6. Message TTL and Dead-Lettering
    > 7. Message Lock Duration
4. Obtain Connection String
    > 1. Go to Service Bus Page
    > 2. Create Shared Access Policy
    > 3. Copy Primary Connection String
5. Install Packages
    > 1. pip install azure-servicebus
6. To See Messages in Topic
    > 1. Go to Service Bus Page
    > 2. Go to Topic Page
    > 3. Open Service Bus Explorer