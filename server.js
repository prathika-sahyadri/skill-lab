const express = require('express');
const app = express();
app.use(express.json());


let events = [];
let bookings = [];




app.get('/events', (req, res) => {
  res.json(events);
});


app.post('/events/add', (req, res) => {
  const { id, name, date, venue } = req.body;
  if (!id || !name || !date || !venue) {
    return res.status(400).json({ message: 'All fields are required (id, name, date, venue)' });
  }
  const newEvent = { id, name, date, venue };
  events.push(newEvent);
  res.status(201).json({ message: 'Event created successfully', event: newEvent });
});


app.get('/event/:id', (req, res) => {
  const event = events.find(e => e.id === req.params.id);
  if (!event) return res.status(404).json({ message: 'Event not found' });
  res.json(event);
});


app.put('/event/:id', (req, res) => {
  const event = events.find(e => e.id === req.params.id);
  if (!event) return res.status(404).json({ message: 'Event not found' });

  const { name, date, venue } = req.body;
  if (name) event.name = name;
  if (date) event.date = date;
  if (venue) event.venue = venue;

  res.json({ message: 'Event updated successfully', event });
});


app.delete('/event/:id', (req, res) => {
  const index = events.findIndex(e => e.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Event not found' });

  events.splice(index, 1);
  res.json({ message: 'Event deleted successfully' });
});





app.get('/api/bookings', (req, res) => {
  res.json(bookings);
});


app.post('/api/bookings', (req, res) => {
  const { id, eventId, participantName, email } = req.body;
  if (!id || !eventId || !participantName || !email) {
    return res.status(400).json({ message: 'All fields are required (id, eventId, participantName, email)' });
  }

  const event = events.find(e => e.id === eventId);
  if (!event) return res.status(404).json({ message: 'Event not found for booking' });

  const newBooking = { id, eventId, participantName, email };
  bookings.push(newBooking);
  res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
});


app.get('/api/bookings/:id', (req, res) => {
  const booking = bookings.find(b => b.id === req.params.id);
  if (!booking) return res.status(404).json({ message: 'Booking not found' });
  res.json(booking);
});


app.put('/api/bookings/:id', (req, res) => {
  const booking = bookings.find(b => b.id === req.params.id);
  if (!booking) return res.status(404).json({ message: 'Booking not found' });

  const { participantName, email } = req.body;
  if (participantName) booking.participantName = participantName;
  if (email) booking.email = email;

  res.json({ message: 'Booking updated successfully', booking });
});


app.delete('/api/bookings/:id', (req, res) => {
  const index = bookings.findIndex(b => b.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Booking not found' });

  bookings.splice(index, 1);
  res.json({ message: 'Booking cancelled successfully' });
});



const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Synergia Event Booking API running on http://localhost:${PORT}`);
});
