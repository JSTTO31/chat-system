import { io, Socket } from "socket.io-client";

declare global{
    interface Window{
        socket: Socket
    }
}

export default defineNuxtPlugin(() => {
    const socket = io('http://localhost:3001')
    window.socket = socket

    
})