import React, { useEffect, useState }from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import Events from './components/Events/Events.js';
import Form from './components/Form/Form.js';
import events from './images/events.jpeg';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { getEvents } from './actions/events';

const App = () => {
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getEvents());
    }, [currentId ,dispatch]);
    return (
        <Container maxwidth="lg">
            <AppBar className={ classes.appBar} position="static" color="inherit">
                <Typography className={classes.heading} variant="h2" align="center">Events</Typography>
                <img className={classes.image} src={events} alt="events" height="60" />
            </AppBar>
            <Grow in>
                <Container>
                    <Grid className={ classes.mainContainer } container direction = "column-reverse" justify="space-between" alignItems="strech" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Events setCurrentId={setCurrentId}/>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form currentId={currentId} setCurrentId={setCurrentId} />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    );
}

export default App;