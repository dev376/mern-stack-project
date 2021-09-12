import pkg from 'mongoose';
import EventMessage from '../models/eventMessages.js';
const { mongoose } = pkg;

export const getEvents = async (req, res) => {
    try {
        const eventMessages = await EventMessage.find();
        
        res.status(200).json(eventMessages);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

export const createEvent =async (req, res) => {
    const event = req.body;

    const newEvent = new EventMessage(event);
    try {
        await newEvent.save();
        
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(409).json({ message: error });
    }
}

export const updateEvent = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No event with that id');
    
    const updateEvent = EventMessage.findByIdAndUpdate(_id, {...post, _id}, { new: true });
    res.json(updateEvent);
}

export const deleteEvent = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send('No event with that id');
    
    await EventMessage.findByIdAndRemove(id);

    res.json({ message: 'Event deleted successfully' });
}

export const likeEvent = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid((id)))
        return res.status(404).send('No event with that id');
    
    const event = await EventMessage.findById(id);
    const updateEvent = await EventMessage.findByIdAndUpdate(id, { likeCount: event.likeCount + 1 }, { new: true });

    res.json(updateEvent);
}
