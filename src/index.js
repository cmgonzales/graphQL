import { GraphQLServer, PubSub} from 'graphql-yoga'
import db from './db'
import Query from './resolvers/Query'
import Post from './resolvers/Post'
import Comment from './resolvers/Comment'
import Mutation from './resolvers/Mutation'
import Users from './resolvers/User'
import Subscrption from './resolvers/Subscription'
//Scalar types - String, Boolean, Int, Float, ID

const pubsub = new PubSub()

const resolvers = {
    Query,
    Post,
    Comment,
    Mutation,
    Users,
    Subscription
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers, 
    context: {
        db,
        pubsub
    }
})

server.start(() => console.log("server is up"))