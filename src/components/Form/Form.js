import React, { useState,useEffect }from 'react';
import useStyles from './styles';
import { TextField, Button, Paper, Typography  } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { createEvent, updateEvent } from '../../actions/events';
import { useSelector } from 'react-redux';

const Form = ({currentId, setCurrentId}) => {
    const [eventData, setEventData] = useState({
        creator: '', title: '', message: '', tags: '', selectedFile: '',
    });

    const event = useSelector((state) => currentId ? state.event.find((p) => p._id === currentId) : null);
    const dispatch = useDispatch();

    const classes = useStyles();
    
    const handleSubmit = (e) => {
        e.preventdefault();
        if (currentId) {
            dispatch(updateEvent(currentId, eventData))
        } else {
            dispatch(createEvent(eventData)); 
        }
        clear();
    }

    useEffect(() => {
        if (event) setEventData(event);
    }, { event });

    const clear = () => {
        setCurrentId(null);
        setEventData({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" moValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} an Event</Typography>
                <TextField
                    name="creator"
                    variant="outlined"
                    label="Creator"
                    fullWidth
                    value={eventData.creator}
                    onChange={(e) => setEventData({ ...eventData, creator: e.target.value }) }
                /> <TextField
                    name="title"
                    variant="outlined"
                    label="Title"
                    fullWidth
                    value={eventData.title}
                    onChange={(e) => setEventData({ ...eventData, title: e.target.value }) }
                /> <TextField
                    name="message"
                    variant="outlined"
                    label="Message"
                    fullWidth
                    value={eventData.message}
                    onChange={(e) => setEventData({ ...eventData, message: e.target.value }) }
                /> <TextField
                    name="tags"
                    variant="outlined"
                    label="Tags"
                    fullWidth
                    value={eventData.tags}
                    onChange={(e) => setEventData({ ...eventData, tags: e.target.value.split(',') }) }
                />
                <div className={classes.fileInput}>
                    <FileBase type="file" multiple={false} onDone={(base64) => setEventData({ ...eventData, selectedFile: base64 })} />
                </div>
                <Button className={classes.buttonSubmit} variant="container" color="primary" size="large" type="submit" fullwidth>
                    Submit
                </Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullwidth>
                    Clear
                </Button>
                
            </form>
        </Paper>
    )
}

export default Form;
