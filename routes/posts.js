const express = require('express')

const router = express.Router()
const Post = require('../models/Post')

router.get('/', async(req, res) => {
  try{
    const posts = await Post.find();
    res.json(posts)
  }catch(err){
    res.json({message:err});

  }
})
router.post('/', async(req, res) => {

  try{
    const post = new Post({
      title: req.body.title,
      description: req.body.description

    })
    const savedPost = await post.save();
    res.json(savedPost);
  }catch (err){
    throw(err)
    res.json({ message: err })
  }
})
//specific post
router.get('/:postID',async (req,res) => {
  try{
  const post = await Post.findById(req.params.postID);
  res.json(post);
} catch (err) {
  res.json({ message: err })
}

})
//Delete post
router.delete('/:postID', async (req,res) => {
try {
  const removedPost = await Post.remove({_id: req.params.postID });
  res.json(removedPost);
} catch (err) {
  res.json({ message: err });
}
})
//updated post
router.patch('/:postID', async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
    {_id: req.params.postID },
    { $set: { title: req.body.title } }

  )
  res.json(updatedPost);
} catch (err) {
  res.json({ message: err });
}
})
module.exports = router;
