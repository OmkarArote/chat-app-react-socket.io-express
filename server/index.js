const express = require("express");
const http = require("http");
const cors = require("cors");
const port = process.env.PORT || 8080;
const { Server } = require("socket.io")

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    },
});

io.on("connection", (socket) => {
    console.log(`User connected ${socket.id}`);
    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with id: ${socket.id} joined room: ${data}`);
    });
    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    })
    // socket.emit("receive_message", 'Testing Done On 2: '+socket.id)
    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
    })
});

app.get('/', (req, res) => {
    res.send('running test')
})

server.listen(port, () => {
    console.log('running server: '+ port);
});