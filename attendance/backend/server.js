const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./models'); // Importă modelele Sequelize

const app = express();

// Middleware-uri
app.use(cors());
app.use(bodyParser.json());

// Rute API
app.get('/api/events', async (req, res) => {
  try {
    const events = await db.Event.findAll();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.post('/api/attendees', async (req, res) => {
  const { name, email, eventCode } = req.body;

  try {
    const event = await db.Event.findOne({ where: { code: eventCode } });
    if (!event) return res.status(404).json({ error: 'Event not found' });

    const attendee = await db.Attendee.create({ name, email, eventId: event.id });
    res.json(attendee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/events/:id/attendees', async (req, res) => {
  try {
    const attendees = await db.Attendee.findAll({ where: { eventId: req.params.id } });
    res.json(attendees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Pornire server
const PORT = process.env.PORT || 5000;
db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
