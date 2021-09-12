import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import useStyles from './styles';

import Events from './Event/Event.js';
import { useSelector } from 'react-redux';


const Event = ({ setCurrentId }) => {
    const event = useSelector((state) => state.events)
    const classes = useStyles();
    
    return (
        event.length ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="strech" spacing={3}>
                {event.map((event) => (
                    <Grid key={event.id} item xs={12} sm={6}>
                        <Events event = {event} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        )
    );
}

export default Event;