// import your node modules

const express = require('express');

const db = require('./data/db.js');

const server = express();

server.use(express.json());

// add your server code starting here
//get posts
server.get('/api/posts', (req, res) =>{
    db.find().then(posts => {
        res.status(200).json(posts);
    }).catch(err => {
        res.json(err);
    })
    
});

// get post by id
server.get('/api/posts/:id', (req, res) => {
    const id = req.params.id;

    db.findById(id).then(posts => {
        if(posts){
            res.status(200).json(posts)
        }else{
            res.status(404).json({message: 'post not found'})
        }
        
    })
    .catch(err => res.status(500).json(err))
});

server.post('/api/posts', (req, res) => {
    const postInfo = req.body;

    console.log('body:', req.body);

    db.insert(postInfo).then(result => {
        db.findById(result.id).then( post => {
            res.status(201).json(post);
        })
        .catch( err => res.status(500).json({ message: 'the get by id failed', error: err}) 
    )
    .catch(err => res.status(500).json({ message: 'the post failed', error: err }))
})
})

server.delete('/api/posts/:id', (req, res) => {
    const {id} = req.params;
    db.findById(id)
    .then(post => {
        if(post){
            db.remove(id)
                .then(count => {
                    res.status(202).json(post);
                });
        }else{
            res.status(404).json({message: 'user with id does not exist.'});
        }
    })
    .catch(err => res.status(500).json(err))
})


server.listen(5000, () => console.log('server running'));
//hello