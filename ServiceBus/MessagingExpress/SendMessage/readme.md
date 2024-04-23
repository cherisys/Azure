1. Create a Service Bus
2. Choose Standard or higher plan if you want to use Topics (pub/sub).
3. Create Queue
    > a. Max Queue Limit
    > b. Max Delivery Count
    > c. Message Time to Live
    > d. Lock Duration
4. Obtain Connection String
    > a. Go to Service Bus Page
    > b. Create Shared Access Policy
    > c. Copy Primary Connection String
5. Install Packages
    > a. @azure/service-bus
    > b. @azure/identity
6. To See Messages in Queue
    > a. Go to Service Bus Page
    > b. Go to Queue Page
    > c. Open Service Bus Explorer