const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());

const port = process.env.PORT || 3000;

const Post = require('./models/post');

//index route
server.get('/', (req, res) => res.send('Hello World. Have an amazing day!'))

server.post('/', async (req, res) => {
    try {
        const data = req.body;
        const post = await Post.create(data)
        console.log(post);
        res.status(201).json({post})
    } catch(err) {
        console.log(err);
        res.status(500).json({err})
    }
})

server.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const post = await Post.findById(id)
        res.status(200).json({post})
    } catch(err) {
        res.status(404).json({message: 'Post does not exist'})
    }
})

module.exports = server

