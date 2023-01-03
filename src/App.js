import { useState, useEffect } from "react";
import "./App.css";

const getData = async (page) => {
  try {
    let res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`
    );
    let data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

function App() {
  const [loading, setLoading] = useState(true);
  const [post, setPosts] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchAndData(page);
  }, [page]);

  const fetchAndData = async (page = 1) => {
    try {
      setLoading(true);
      const data = await getData(page);
      console.log(data);
      setPosts(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const handlePageChange = (changeBy) => {
    setPage(page + changeBy);
    fetchAndData(page + changeBy);
  };

  if (loading) {
    return <h1>loading.....</h1>;
  }

  return (
    <div className="App">
      <h1>POSTS</h1>
      {}
      <ul>
        {post.map((postItem) => (
          <li key={postItem.id}>
            {postItem.id} {"-"} {postItem.title}
          </li>
        ))}
      </ul>
      <button
        disabled={page === 1}
        onClick={() => {
          handlePageChange(-1);
        }}
      >
        ATRAS
      </button>
      <button>{page}</button>
      <button
        disabled={page === 10}
        onClick={() => {
          handlePageChange(1);
        }}
      >
        NEXT
      </button>
    </div>
  );
}

export default App;
