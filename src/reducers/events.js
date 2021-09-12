import { CREATE, FETCH_ALL, UPDATE, DELETE ,LIKE} from "../constants/actionTypes";
export default (events = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case LIKE:
            return events.mao((event) => event._id === action.payload._id ? action.payload : event)
        case CREATE:
            return [...events, action.payload];
        case UPDATE:
            return events.map(() => events._id === action.payload._id ? action.payload : events);
        case DELETE:
            return events.filter((event) => event.id !== action.payload);
        
        default:
            return events;
    }
}
