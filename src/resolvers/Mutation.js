import uuidv4 from 'uuid/v4'

const Mutation = {
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

    UpdateUser(parent, args, {db}, info){
        const user =  db.users.find((user)=> user.ud === args.id)

        if(!user){
            throw new Error('User not found')
        }

        if(typeof data.email === 'string'){
            const emailTaken = db.users.some((user) => user.id === data.email)
            
            if(emailTaken){
                throw new Error ('Email taken')
            }

            user.email = data.email
        }

        if(typeof data.name === 'string'){
            user.name = data.name
        }

        if(typeof data.age === 'undefined'){
            user.age = data.age
        }

        return user
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

        if(args.data.published){
            pubsub.publish('post', {post})
        }

        return post
    },


    deletePost(parent, args, {db}, info){
        const postIndex = db.post.findIndex((post) =>  post.id === args.id)

        if(postIndex === -1){
            throw new Error('Post not found ')
        }

        const deletedPost = db.post.splice(postIndex, 1)
        db.comments = db.comment.filter((comment) => comment.post !== args.id)
        return deletedPost[0]
    },

    updatePost(parent, args, {db}, info){
        const {id,data} =  args
        const post = db.post.find((post) => post.id === id)

        if(!post){
            throw new Error ('post not found')
        }
        if(typeof data.title === 'string'){
            post.title = data.title
        }
        if(typeof data.body === 'string'){
            post.body = data.body
        }
        if(typeof data.published === 'boolean'){
            post.published = data.published
        }

        return post
    },

    createComment(parent,args,{db, pubsub},info){
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
        pubsub.publish(`comment ${args.data.post}` , {comment: comment})

        return comment
    },

    deleteComment(parent, args, {db}, info){
        const commentIndex = db.comment.findIndex((comment)=> comment.id === args.id)

        if (commentIndex === -1){
            throw new Error ('Comment not found')
        }

        const deletedComments = db.comments.splice(commentIndex, 1)

        return deletedComments[0]
    },
    updateComment(parent, args, {db}, info){
        const {id, data} = args
        const comment = db.comment.find((comment) => comment.id === id )

        if (!comment){
            throw new Error('Comment not found')
        }

        if (typeof data.text === 'string'){
            comment.text = data.text
        }

        return comment
    }
}

export {Mutation as default}
 
