import Mongoose from 'mongoose';

const eventSchema = Mongoose.Schema({
    title : String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likecount: {
        type: Number,
        default : 0
    },
    createdAt: {
        type: Date,
        default : new Date()
    },
});

var EventMessage = Mongoose.model('EventMessage', eventSchema);

export default EventMessage;