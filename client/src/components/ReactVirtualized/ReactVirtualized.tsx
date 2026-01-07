import React, { useEffect, useState } from "react";
import { List } from "react-window";
import { getUnlimitedTodoData } from "../InfiniteScroll/infinitescroll.networkcalls";

const ReactVirtualized: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData(page);
  }, []);

  const fetchData = async (page: number) => {
    const todoData = await getUnlimitedTodoData(page);
    if (todoData) {
      setData((prevData) => [...prevData, ...todoData,...todoData,...todoData,...todoData,...todoData,...todoData,...todoData,...todoData,...todoData,...todoData,...todoData,...todoData,...todoData,...todoData,...todoData,...todoData,...todoData,...todoData,...todoData,...todoData,...todoData,...todoData,...todoData,...todoData,...todoData,...todoData]);
    }
  };

  return (
    <div>
      dxfgfdsgds
      <List
        rowComponent={({ index }) => {
          // console.log(data,"sdfsdfsdf");
          return (
            <div
              style={{
                border: "1px solid white",
                margin: "5px",
                padding: "5px",
              }}
            >
              <p>Title: {data[index].title}</p>
              <p>Id: {data[index].id}</p>
              <p>Description: {data[index].description}</p>
              <p>Category: {data[index].category}</p>
            </div>
          );
        }}
        rowCount={data.length}
        rowHeight={25}
        rowProps={{ data }}
      />
      {/* </List> */}
    </div>
  );
};

export default ReactVirtualized;
