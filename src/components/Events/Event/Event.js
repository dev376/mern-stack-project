import React from 'react';
import { Card, CardActions, CardMedia, CardContent, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { deleteEvent, likeEvent } from '../../../actions/events.js';
import moment from 'moment';

const Events = ({ event, setCurrentId}) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={event.selectedfile} title={event.title} />
            <div className={classes.overlay}>
                <Typography variant="h6" >{event.creator}</Typography>
                <Typography variant="body2" >{moment(event.createdAt)}</Typography>
            </div>
            <div className={classes.overlay2}>
                <Button style={{ color: 'white' }} size="small" onClick={() =>setCurrentId(event._id)}>
                    <MoreHorizIcon fontSize="default" />
                </Button>
            </div>
            <div className={classes.detail}>
                <Typography variant="body2" color="textSecondary">{event.tags.map((tag) => ` #{tag} `)}</Typography>
            </div>
            <Typography variant="body2" gutterBottom> {event.title} </Typography>
            <CardContent>
                <Typography className={classes.title} variant="h5" >{event.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={() =>dispatch(likeEvent(event._id)) }>
                    <ThumbUpAltIcon fontSize='small' />
                    &nbsp; Like &nbsp;
                </Button>
            </CardActions>
       
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={() =>dispatch(deleteEvent(event._id)) }>
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
}

export default Events;