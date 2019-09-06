import { GraphQLServer} from 'graphql-yoga'
import uuidv4 from 'uuid/v4'
import { unusedFragMessage } from 'graphql/validation/rules/NoUnusedFragments';

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
    id: '11',
    title: 'Moby dick',
    body: 'The crazy book',
    published: true,
    author: '1'
},
{
    id: '12',
    title: 'Dance',
    body: 'New york times best seller',
    published: false,
    author: '2'
},
{
    id: '13',
    title: 'mmie',
    body: 'this is new things',
    published: true,
    author: '3'
}]

const comments = [{
    id: '55',
    text: 'this is the first comment',
    author: '3',
    post: '11'

},
{
    id: '66',
    text: 'this is the second comment',
    author: '1',
    post: '12'
},
{
    id: '77',
    text: 'this is the third comment',
    author: '2',
    post: '11' 
},
{
    id: '66',
    textFields: 'this is the fourth comment',
    author: '3',
    post:'13'
}]

//Type definitions (schema)
const typeDefs = `
    type Query {
        me: User!
        post: Post!
        comments:[Comment]!
        users(query: String!): [User!]!
        posts(query: String!): [Post!]
    
    }

    type Mutation{
        createUser(name: String, email: String!, age: Int): User!
        createPost(title: String!, body: String, published: Boolean!, author: ID): Post!
        createComment(text: String!, author: ID, post: ID ): Comment!
    }

    type User{
        id: ID
        name: String!
        email: String!
        age: Int
        post: [Post!]!
        comment: [Comment!]!
    }

    type Post{
        id: ID
        title: String!
        body: String!
        published: Int
        author: User!
        comment: [Comment!]!
    }
    type Comment{
        id: ID!
        text: String!
        author: User!
        post: Post!
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
        },
        posts(parent, args, ctx, info){
          if(!args.query){
            return posts
            }
            return posts.filter((posts) => {
                const isTitleMatch = posts.title.toLowerCase().includes(args.query.toLowerCase());
                const isBodyMatch = posts.body.toLowerCase().includes(args.query.toLowerCase());

                return isTitleMatch || isBodyMatch
            })
        },

        comments(parent, args, ctx, info){
            return comments;
        }  
    },



    Mutation:{
        createUser(parent, args,ctx,info){
            const emailTaken = users.some((user) =>  user.email === args.email);
            if(emailTaken){
                throw new Error('Email Taken.')
            }

            
            const user = {
                id: uuidv4(),
                ...args

            }
            users.push(user)

            return user
     },
        createPost(parent,args,ctx,info){
            const userExist = user.some((user)=> user.id === args.autho);

            if(!userExist){
                throw new Error('User not found')
            }
 
            const post = {
                id: uuidv4(),
                ...args
            }

            posts.push(post)
            return post
        },

        createComment(parent,args,ctxminfo){
            const userExist = users.some((user) => user.id === args.author)
            const postExist = post.some((user)=> post.id ===args.post && post.published)
         
            if(!userExist || !postExist){
                throw new Error ('unable to find user and post')
            }

            const comment = {
                id: uuidv4(),
                ...args
            }

            comments.push(comment)

            return comment
        }
    },
     

        Post:{
            author(parent, args, ctx, info){
               return users.find((user) => {
                   return user.id === parent.author
               }) 
            },
            comment(parent,args,ctx,info){
                return comments.filter((comment)=>{
                    return comment.post === parent.id
                })
            }
        },
        User:{
            post(parent,args, ctx, info){
                return posts.filter((post) => {
                    return post.author === parent.id
                })
            },
            comment(parent, args,ctx, info){
                return comment.filter((comment) => {
                    return comment.author === parent.id
                })
            }
        },
        Comment:{
            author(parent, args, ctx, info){
                return users.find((user) => {
                    return user.id === parent.author
                }) 
             },
             post(parent,args,ctx, info){
                 return post.find((post)=>{
                     return post.id === parent.id
                 })
             }
        }

      
    
}


const server = new GraphQLServer({
    typeDefs,
    resolvers 
})

server.start(() => console.log("server is up"))