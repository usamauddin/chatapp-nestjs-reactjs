import { Module } from "@nestjs/common";
import { SocketEvent } from "./socket-events";

@Module({
    providers: [SocketEvent]
})

export class SocketModule {}