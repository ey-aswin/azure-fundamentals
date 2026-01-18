import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getTodoData } from "../InfiniteScroll/infinitescroll.networkcalls";

interface TableProps {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
}

const PaginatedTable: React.FC = () => {
  const [skeletonLoader, setSkeletonLoader] = useState(true);
  const [tableData, setTableData] = useState<TableProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totlalPages = 10;
  const itemsPerPage = 10;
  const fetchData = async (page: number) => {
    try {
      const todoData = await getTodoData(page);
      if (todoData && Array.isArray(todoData)) {
        setTableData((prev) => [...todoData]); // ✅ Safe update
        setSkeletonLoader(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setSkeletonLoader(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, []);
  let paginationItems = [];
  for (let i = 0; i < itemsPerPage; i++) {
    paginationItems.push(
      <button
        style={{margin:"10px", padding:"10px", backgroundColor: currentPage === i + 1 ? 'lightblue' : 'black'}}
        key={i}
        onClick={() => {
          setSkeletonLoader(true);
          setCurrentPage(i + 1);
          fetchData(i + 1);
        }}
      >
        {i + 1}
      </button>
    );
  }

  return (
    <div>
      <h2>Table</h2>
      <div style={{ height: "100vh", width: "80vw" }}>
        {skeletonLoader ? (
          <Skeleton
            height={600}
            baseColor="#40464aff"
            highlightColor="#1c1d20ff"
            duration={1.2}
            count={1}
          />
        ) : (
          <div>
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((item) => (
                  <tr
                    key={item.id}
                    style={{
                      border: "1px solid black",
                      margin: "10px",
                      padding: "10px",
                    }}
                  >
                    <td>
                      <h3>{item.title}</h3>
                    </td>
                    <td>
                      <p>{item.description}</p>
                    </td>
                    <td>
                      <p>{item.category}</p>
                    </td>
                    <td>
                      <p>{item.price}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div></div>
            <div style={{ marginTop: "20px" }}>
              {paginationItems}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaginatedTable;
