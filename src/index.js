import { GraphQLServer} from 'graphql-yoga'

//Scalar types - String, Boolean, Int, Float, ID

//Demo user data 
const users = [{
    id: '1',
    name: 'Chris',
    email: 'chris@example.com',
    age: '22'
},{
    id: '2',
    name: 'Sarah',
    email: 'sarah@example.com',
    age: '34'
},{
    id: '3',
    name: 'Lindsey',
    email: 'lindsey@example.com',
    age: '43'
}]

const posts = [{
    id: '1',
    title: 'Moby dick',
    body: 'nice',
    published: true
}]


//Type definitions (schema)
const typeDefs = `
    type Query {
        me: User!
        post: Post!
        users(query: String!): [User!]!
        
    }

    type User{
        id: ID
        name: String!
        email: String!
        age: Int
    }

    type Post{
        id: ID
        title: String!
        body: String!
        published: Int
    }
`

//Resolvers (Set of function returning data)

const resolvers = {
    Query: {
        users(parent, args, ctx, info){

            if(!args.query){
            return users;
            }

            return users.filter((user) => {
                return user.name.toLowerCase().includes(args.query.toLowerCase());
            })
        },
        me(){
            return{
            id: '123',
            name: 'Monkey',
            email: 'monkey@banana.com',
            age: 23
            }
        },
       post(){
          return{
              id: '123',
              title: 'the monkey head',
              body: 'sexy',
              published: '1990'
            }       
        }
      
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers 
})

server.start(() => console.log("server is up"))