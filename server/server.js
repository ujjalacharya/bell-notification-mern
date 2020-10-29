const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const socketIO = require("socket.io");
const Feed = require("./models/Feed");

mongoose
  .connect(
    "mongodb://admin:admin12345@ds121406.mlab.com:21406/push-notification-mern",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("DB Connected"))
  .catch((err) => {
    console.error("Failed to connect to mongo on startup - retrying in 5 sec");
  });

// our localhost port
const port = process.env.PORT || 3001;

const app = express();

// our server instance
const server = http.createServer(app);

// This creates our socket using the instance of the server
const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("New client connected" + socket.id);
  //console.log(socket);

  // Returning the initial data of food menu from FoodItems collection
  socket.on("initial_data", async () => {
    const feed = await Feed.find({}).sort({createdAt: -1});
    io.sockets.emit("get_data", feed);
  });

  // Placing the order, gets called from /src/main/PlaceOrder.js of Frontend
  socket.on("post_data", async (body) => {
    const title = body;
    const feed = new Feed({ title });
    await feed.save();
    io.sockets.emit("change_data");
  });

  socket.on("check_all_notifications", async () => {
    const feeds = await Feed.find({});

    feeds.forEach((feed) => {
      feed.read = true;
    });

    await Feed.create(feeds)
    
    io.sockets.emit("change_data");
  });

  // disconnect is fired when a client leaves the server
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
