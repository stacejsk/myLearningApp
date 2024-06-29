const express = require('express');
const router = express.Router();
const Events = require('../models/Events');



// POST a new event
router.post('/events', async (req, res) => {
    try {
        const newEventId = await Events.createEvent(req.body);
        res.status(201).send({ message: 'Event created successfully', eventId: newEventId });
    } catch (error) {
        res.status(500).send('Server error creating event');
    }
});

// DELETE an event
router.delete('/events/:eventId', async (req, res) => {
    try {
        await Events.deleteEvent(req.params.eventId);
        res.send({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).send('Server error deleting event');
    }
});


module.exports = router;