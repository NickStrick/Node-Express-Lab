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
        res.status(500).json({ error: "The posts information could not be retrieved." });
    })
    
});

// get post by id
server.get('/api/posts/:id', (req, res) => {
    const id = req.params.id;

    db.findById(id).then(posts => {
        if(posts){
            res.status(200).json(posts)
        }else{
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
        
    })
    .catch(err => res.status(500).json({ error: "The post information could not be retrieved." }))
});

server.post('/api/posts', (req, res) => {
    const postInfo = req.body;
    console.log('body:', req.body);
    if((postInfo.title !== undefined)&& (postInfo.contents !== undefined)){
        db.insert(postInfo).then(result => {
                db.findById(result.id).then( post => {
                    res.status(201).json(post);
                })
                .catch( err => res.status(500).json({ message: 'the get by id failed', error: err}) 
            )
            
        }).catch(err => res.status(500).json({error: "There was an error while saving the post to the database"}))
    }else{
        res.status(400).json({errorMessage: "Please provide title and contents for the post."})
    }
    

    
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
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
    })
    .catch(err => res.status(500).json({ error: "The post could not be removed" }))
})

server.put('/api/posts/:id', async (req, res) => {
    const {id}= req.params;
    const changes = req.body;
    
        const post = await db.findById(id)
        // console.log(post.length);
        if(post.length > 0){
            if((changes.title !== undefined)&& (changes.contents !== undefined)){
                try{
                    const result = await db.update(id, changes)
                    res.status(200).json(result);

                }catch(err) {
                    res.status(500).json({ error: "The post information could not be modified." });
                }
            }else{
                res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
            }
        }else{
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
    
    
})


server.listen(5000, () => console.log('server running'));
//hello