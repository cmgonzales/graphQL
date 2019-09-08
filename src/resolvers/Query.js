const Query = {
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

export {Query as default}