const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');
const GOOGLE_API_KEY = 'AIzaSyABSFKaipczYf43QSpVDHvfxTeIoAZpEo4';

const Place = mongoose.model('Place');
const SavedPlace = mongoose.model('SavedPlace');

const router = express.Router();

router.use(requireAuth);

/*
  GET getPlaceUsers
  args: placeId
*/
router.post('/users', async (req, res) => {

  try {

    const { placeId } = req.body;

    const User = mongoose.model('User');

    let users;
    if (placeId) {
      users = await User.find({ placeId: placeId });
    } else {
      users = await User.find();
    }

    console.log(users);

    res.send(users);

  } catch (error) {

    return res.status(500).send({ error: error.message });

  }

});

router.post('/save', async (req, res) => {

  try {

    const place = new SavedPlace(req.body);
    await place.save();
    res.send(place); 

  } catch (error) {

    console.log(error);
    
  }

});

router.get('/saved/:userId', async (req, res) => {

  try {

    const { userId } = req.params;

    const places = await SavedPlace.find({user_id: userId});
    
    res.send(places);

  } catch (error) {

    console.log('xyz===',error);

  }

});

router.post('/checkOut', async (req, res) => {

  const User = mongoose.model('User');

  User.findOneAndUpdate({_id: user_id}, { place_id: null }, { upsert: true }, function(err, doc) {
    if (err) {
      console.log('error', err);
      return res.send(500, { error: err });
    }

    console.log('checked out');

    return res.send("succesfully saved");

  });

});

router.post('/checkIn', async (req, res) => {

  const User = mongoose.model('User');

  console.log('req.body', req.body);

  const { userId, placeId } = req.body;

  if (!userId || !placeId) {
    return res.status(500).send({ error: 'You must provide a userId and placeId' });
  }

  User.findOneAndUpdate({ _id: userId }, { placeId: placeId }, { upsert: false }, function(err, doc) {
    if (err) {
      console.log('error', err);
      return res.send(500, { error: err });
    }

    console.log('saved');

    return res.send("succesfully saved");

  });

});

module.exports = router;
