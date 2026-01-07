import { useEffect,useState } from "react";
import { getTodoData } from "./infinitescroll.networkcalls";
import InfiniteCard from "./InfiniteCard";
import InfiniteScroll from "react-infinite-scroll-component";

// import {getTodoData} from "../InfiniteScroll"

const InfiniteScrollComponent = () => {
  const totalProducts = 100; // Example total number of products
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    fetchDaata(page);
  }, []);
  const fetchDaata = async (page: number) => {
    const todoData = await getTodoData(page);
    if (todoData) {
      setData([...data, ...todoData]);
    }
  };
  const pageUpdate = () => {
    setPage(page + 1);
  };
  useEffect(() => {
    fetchDaata(page);
  }, [page]);

  return (
    <div id="scrollableChat" style={{ height: '85vh', overflow: 'auto', display: 'flex', flexDirection: 'column-reverse', border: '1px solid black' }}>
      <InfiniteScroll
        dataLength={data.length}
        next={pageUpdate}
        hasMore={totalProducts > data.length}
        inverse={true}
        // loader={<p>Loading...</p>}
        // endMessage={<p>No more data to load.</p>}

        
        scrollableTarget="scrollableChat"      // target the container above
        loader={<p style={{ textAlign: "center" }}>Loading older…</p>}
        endMessage={<p style={{ textAlign: "center", color: "#777" }}>
          You’re at the beginning of the chat.
        </p>}
        style={{ display: "flex", flexDirection: "column-reverse" }} 

      >
        {data.map((item, ind) => (
          <div style={{}} key={ind}>
            <InfiniteCard cardData={item} />
          </div>
        ))}
        InfiniteScrollComponent works!
      </InfiniteScroll>
    </div>
  );
};

export default InfiniteScrollComponent;
