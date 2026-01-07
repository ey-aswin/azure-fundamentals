from azure.cosmos import CosmosClient 


class CosmosDBService:
    def __init__(self, connection_string, database_name, container_name,partition_key):
        self.client = CosmosClient.from_connection_string(connection_string)
        self.database_name = database_name
        self.container_name = container_name
        self.database = self.client.get_database_client(database_name)
        self.container = self.database.get_container_client(container_name)
        self.partition_key = partition_key 
    def create_item(self, item):
        return self.container.upsert_item(body=item)

    def read_item(self, database_name, container_name, item_id, partition_key):
        return self.container.read_item(item=item_id, partition_key=partition_key)   

    def query_items(self, query, parameters):
        return list(self.container.query_items(
            query=query,
            parameters=parameters,
            enable_cross_partition_query=True
        ))
    def delete_item(self,item_id):
        return self.container.delete_item(item=item_id, partition_key=self.partition_key)     
