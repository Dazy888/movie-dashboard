import 'dotenv/config';
import { ApolloServer } from 'apollo-server';
import { resolvers } from '@/schema/resolvers.js';
import {typeDefs} from "@/schema/typeDefs.js";


const server = new ApolloServer({
    typeDefs,
    resolvers,
    cors: {
        origin: true
    },
});

server.listen({ port: 4000 }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
