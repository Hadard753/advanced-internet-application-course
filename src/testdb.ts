import { MongoMemoryServer } from "mongodb-memory-server";

export class TestMongoServer {
    mongoServer?: MongoMemoryServer;

    create = async (): Promise<string> => {
        console.log('connecting test db')
        this.mongoServer = await MongoMemoryServer.create();
        return this.mongoServer.getUri();
    }

    stop = async (): Promise<boolean | void> => {
        return this.mongoServer?.stop();
    }
}

export default new TestMongoServer();