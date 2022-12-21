const router = require("express").Router();
const Event = require("../Models/events");

// get all the events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get a single event
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate(["pending",  "attendees"]);
    res.status(200).json(event);
  } catch (err) {
    console.log(err.message);
    console.log('inside');
    res.status(500).json(err);
  }
});

// request to join an event
router.patch("/:id/request", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event.pending.includes(req.body.userId)) {
      await event.updateOne(
        { $push: { pending: req.body.userId } },
        { new: true },
      );
      res
        .status(200)
        .json({
          message: "The request has been sent",
          event: {
            ...event._doc,
            pending: [...event.pending, req.body.userId],
          },
        });
    } else {
      res.status(403).json("You have already sent a request");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// accept a request
router.patch("/:id/accept", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event.pending.includes(req.body.userId)) {
      await event.updateOne({ $pull: { pending: req.body.userId } });
      await event.updateOne({ $push: { attendees: req.body.userId } });
      const newEvent = await Event.findById(req.params.id).populate(["pending", "attendees"]);
      res.status(200).json(newEvent);
    } else {
      res.status(403).json("You have not sent a request yet");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// reject a request
router.patch("/:id/reject", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event.pending.includes(req.body.userId)) {
      await event.updateOne({ $pull: { pending: req.body.userId } });
      const newEvent = await Event.findById(req.params.id).populate(["pending", "attendees"]);
      // 'The request has been rejected'
      res.status(200).json(newEvent);
    } else {
      res.status(403).json("You have not sent a request yet");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// create an event
router.post("/", async (req, res) => {
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
});

module.exports = router;
