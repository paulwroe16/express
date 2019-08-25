const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');
const GOOGLE_API_KEY = 'AIzaSyABSFKaipczYf43QSpVDHvfxTeIoAZpEo4';

const Track = mongoose.model('Track');

const router = express.Router();

router.use(requireAuth);

router.get('/places', async (req, res) => {
  const places = await Track.find({ userId: req.user._id });

  res.send(tracks);
});

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

module.exports = router;
