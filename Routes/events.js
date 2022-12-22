const router = require('express').Router();
const Event = require('../Models/events');

router.get('/', async (req, res) => {
    try {
        const events = await Event.find().populate('pending');
        res.status(200).json(events);
    } catch (err) {
        res.status(500).json(err);
    }
}
);

router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate('pending');
        res.status(200).json(event);
    } catch (err) {
        res.status(500).json(err);
    }
}
);

router.post('/', async (req, res) => {
    const event = new Event({
        name: req.body.name,
        description: req.body.description,
        date: req.body.date,
        // time: req.body.time,
        limit: req.body.limit,
        category: req.body.category,
        others: req.body.others,
        creator: req.body.creator,
    });

    try {
        const savedEvent = await event.save();
        res.status(200).json(savedEvent);
    } catch (err) {
        res.status(500).json(err);
    }
}
);


module.exports = router;