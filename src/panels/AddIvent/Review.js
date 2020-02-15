import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import './Review.css';

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: '700',
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review() {
  const classes = useStyles();

    

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Проверка
      </Typography>
      <div class="newEventInfo">
          <div class="newEventInfo__place">
              <br/>
              <span><b>Место</b> -- {global.that.state.place}</span>
          </div>
          <div class="neEventInfo__title">
              <br/>
              <span><b>Название</b> -- {global.that.state.title}</span>
          </div>
          <div class="newEventInfo__place">
              <br/>
              <span><b>Дата</b> -- {global.that.state.date}</span>
          </div>
          <div class="newEventInfo__place">
             <br/>
              <span><b>Приют</b> -- {global.that.state.shelter}</span>
          </div>
          <div class="newEventInfo__place">
          <b>Описание</b> <br/>
              <span>{global.that.state.description}</span>
          </div>  
      </div>
    </React.Fragment>
  );
}