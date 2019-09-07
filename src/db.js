let users = [{
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

let posts = [{
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

let comments = [{
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

const db = {
    users,
    posts,
    comments
}

export {db as default}
