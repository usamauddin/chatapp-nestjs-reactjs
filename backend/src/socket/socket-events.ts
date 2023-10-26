import { OnModuleInit } from "@nestjs/common";
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io'

@WebSocketGateway({
    transports: ['websocket'],
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
})
export class SocketEvent implements OnGatewayInit {
    @WebSocketServer()
    server: Server;
    socket: Socket

    afterInit() {
        console.log('initialized')
    }

    @SubscribeMessage('joinRoom')
    joinRoom(client: Socket, room) {
        client.join(room)
        client.emit('joined room ', room)
        console.log('user joined room ', room)
    }

    @SubscribeMessage('leaveRoom')
    leaveRoom(client: Socket, room) {
        client.leave(room)
        client.emit('leaved room ', room)
        console.log('user leave room', room)
    }

    @SubscribeMessage('chatToServer')
    sendMessage(@MessageBody() body, @ConnectedSocket() socket: Socket) {
        this.server.in(body.chatId).emit('chatToClient', body);
        // socket.broadcast.emit('chatToClient', body) // working
    } 

}






// socket.broadcast.to(body.chatId).emit('clientToServer', body)