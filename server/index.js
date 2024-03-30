import express, { text } from 'express'
import mongoose from 'mongoose';
import roomRoutes from './routes/room.routes.js'

import { Server } from 'socket.io';
import { createServer } from 'http';
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("mongoose connected")
})
.catch((error)=>{
    console.log("error occured connecting to mongoose - ", error)
})

const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ['GET', 'POST'],
        credentials: true
    }
})
const PORT = 5000;

app.get('/', ( req, res )=> {
    res.send("hello there!!")
})

//**********routes***********
app.use('/api/room', roomRoutes)

io.on('connection', (socket) => {
    console.log('New User connected ')
    
    socket.broadcast.emit('welcome', `${socket.id} has joined`)
    
    socket.on('usertyping', (text) => {
        socket.broadcast.emit('usertyping',text)
    })
    
    socket.on('createRoom', (storyId) => {
        const roomId = `room_${storyId}`;
        socket.join(roomId);
        console.log(`Room created: ${roomId}`);
      });
})




server.listen(PORT, ()=> {
    console.log("app is listening on port 5000")
})