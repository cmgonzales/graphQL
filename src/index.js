import { GraphQLServer} from 'graphql-yoga'
import uuidv4 from 'uuid/v4'
import db from './db'

//Scalar types - String, Boolean, Int, Float, ID


const resolvers = {
    Query: {
        users(parent, args, {db}, info){

            if(!args.query){
            return db.users;
            }

            return db.users.filter((user) => {
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
        posts(parent, args, {db}, info){
          if(!args.query){
            return db.posts
            }
            return db.posts.filter((posts) => {
                const isTitleMatch = posts.title.toLowerCase().includes(args.query.toLowerCase());
                const isBodyMatch = posts.body.toLowerCase().includes(args.query.toLowerCase());

                return isTitleMatch || isBodyMatch
            })
        },

        comments(parent, args, {db}, info){
            return db.comments;
        }  
    },

    Mutation:{
        createUser(parent, args, {db},info){
            const emailTaken = users.some((user) =>  user.email === args.email);
            if(emailTaken){
                throw new Error('Email Taken.')
            }

            
            const user = {
                id: uuidv4(),
                ...args.data

            }
            db.users.push(user)

            return user
     },

        deleteUser(parent, args, {db}, info){
            const userIndex = db.users.findIndex((user) =>  user.id === args.ID)

            if(userIndex === -1){
                throw new Error('user not found')
            }

           const deleteUsers = db.users.splice(userIndex, 1)

           db.post = db.post.filter((post) => {
        
           const match = post.author === args.id
        
        
            if (match) {
                db.comments = db.comments.filter((comments) => comment.post !== post.id)
            }

            return !match;
            })
            db.comment = db.comment.filter((comment) => comment.autho !== args.id)

           return deleteUsers[0]
     },
        createPost(parent,args,{db},info){
            const userExist = db.users.some((user)=> user.id === args.author);


            if(!userExist){
                throw new Error('User not found')
            }
 
            const post = {
                id: uuidv4(),
                ...args.data
            }

            db.posts.push(post)
            return post
        },


        deltePost(parent, args, {db}, info){
            const postIndex = db.post.findIndex((post) =>  post.id === args.id)

            if(postIndex === -1){
                throw new Error('Post not found ')
            }

            const deletedPost = db.post.splice(postIndex, 1)
            db.comments = db.comment.filter((comment) => comment.post !== args.id)
            return deletedPost[0]
        },

        createComment(parent,args,{db},info){
            const userExist = db.users.some((user) => user.id === args.author)
            const postExist = db.post.some((user)=> post.id ===args.post && post.published)
         
            if(!userExist || !postExist){
                throw new Error ('unable to find user and post')
            }

            const comment = {
                id: uuidv4(),
                ...args.data
            }

            db.comments.push(comment)

            return comment
        },

        deleteComment(parent, args, {db}, info){
            const commentIndex = db.comment.findIndex((comment)=> comment.id === args.id)

            if (commentIndex === -1){
                throw new Error ('Comment not found')
            }

            const deletedComments = db.comments.splice(commentIndex, 1)

            return deletedComments[0]
        }
    },
     

        Post:{
            author(parent, args, {db}, info){
               return db.users.find((user) => {
                   return user.id === parent.author
               }) 
            },
            comment(parent,args,{db},info){
                return db.comments.filter((comment)=>{
                    return comment.post === parent.id
                })
            }
        },
        User:{
            post(parent,args,  {db}, info){
                return db.posts.filter((post) => {
                    return post.author === parent.id
                })
            },
            comment(parent, args,{db}, info){
                return db.comment.filter((comment) => {
                    return comment.author === parent.id
                })
            }
        },
        Comment:{
            author(parent, args, {db}, info){
                return db.users.find((user) => {
                    return user.id === parent.author
                }) 
             },
             post(parent,args,{db}, info){
                 return db.post.find((post)=>{
                     return post.id === parent.id
                 })
             }
        }    
    
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers, 
    context: {
        db 
    }
})

server.start(() => console.log("server is up"))