import { ClientOptions, GrpcOptions, Transport } from "@nestjs/microservices";
import { join } from "path";

export const grpcOptions: GrpcOptions = {
    transport: Transport.GRPC,
    options: {
        url:'localhost:50052',
        package:['task'],
        protoPath:[join(__dirname,'./task/task.proto')]
    }
}