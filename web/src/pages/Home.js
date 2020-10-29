import React, { useState } from "react";
import { Button, Input, message } from "antd";
import { socket } from "../components/shared/Navbar";

function Home() {
  const [input, setInput] = useState("");
  const handleClick = () => {
    input && socket.emit("post_data", input);
    message.success("Feed created successfully");
    setInput("");
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ height: "200px" }}>
        <h1>Add a feed</h1>
        <Input
          placeholder="Add a feed to show"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ marginBottom: "1rem" }}
        />
        <Button type="primary" onClick={handleClick}>
          Add
        </Button>
      </div>
    </div>
  );
}

export default Home;
