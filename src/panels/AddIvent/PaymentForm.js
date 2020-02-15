import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';



export default function PaymentForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Дополнительные сведения
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
            <span class="textView">Идентификационный номер приюта</span>
            <input type="text" value = {global.that.state.shelter} onChange={(e)=> {
                global.that.setState({shelter: e.target.value})
            }}>
          </input>
        </Grid>
        <Grid item xs={12} md={6}>
        <span class="textView">Дата</span>
          <input type="date" value = {global.that.state.date} onChange={(e)=> {
                global.that.setState({date: e.target.value})
            }}>
          </input>       
          </Grid>
        <Grid item xs={12} md={6}>
        <span class="textView">Награда в очках опыта</span>
          <input type="text" value = {global.that.state.XP} onChange={(e)=> {
            global.that.setState({XP: e.target.value})
          }}>
          </input>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
