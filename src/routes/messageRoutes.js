const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const Message = mongoose.model('Message');

const router = express.Router();

router.use(requireAuth);

router.get('/messages/:placeId', async (req, res) => {
 
 try {

    const { placeId } = req.params;
    console.log(placeId);
    
    const messages = await Message.find({placeId: placeId});

    res.send(messages);

  } catch(err) {

    console.log('error=======',err.message);
    
  }

});

router.post('/send', async (req, res) => {

  const myMessage = req.body;

  myMessage.user.avatar = 'https://placeimg.com/140/140/any';
  myMessage.user.name = 'Other uSER';

  try {
    console.log(myMessage);
    const message = new Message(myMessage);
    await message.save();
    res.send(message);

  } catch (err) {
    console.log('ERROR==============', err);
    res.status(422).send({ error: err.message });
  }

});

/*
router.post('/tracks', async (req, res) => {
  const { name, locations } = req.body;

  if (!name || !locations) {
    return res
      .status(422)
      .send({ error: 'You must provide a name and locations' });
  }

  try {
    const track = new Track({ name, locations, userId: req.user._id });
    await track.save();
    res.send(track);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});
*/
module.exports = router;
