import React from "react";
import { Button } from "antd";
import { socket } from "../components/shared/Navbar";

function Home() {
  const handleClick = () => {
    socket.emit("post_data");
  };
  return (
    <div>
      <h1>Home page</h1>
      <Button type="primary" onClick={handleClick}>
        Add a random feed
      </Button>
    </div>
  );
}

export default Home;
