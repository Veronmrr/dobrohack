import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function AddressForm() { 

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Добавить событие
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <span class="textView">Название</span>
          <input type="text" value={global.that.state.title} onChange={(e)=> {
            global.that.setState({title: e.target.value})
          }}>
          </input>
          </Grid>
        <Grid item xs={12} sm={6}>
        <span class="textView">Место мероприятия</span>
          <input type="text" value = {global.that.state.place} onChange={(e)=> {
            global.that.setState({place: e.target.value})
          }}>
          </input>
          </Grid>
          <span class="textView">Описание</span>
        <input type="text" value = {global.that.state.description} onChange={(e)=> {
            global.that.setState({description: e.target.value})
          }}>
          </input>
          <span className="textView">Порода животного</span>
          <input type="text" value={global.that.state.breed} onChange={(e) => {
              global.that.setState({breed: e.target.value})
          }}>
          </input>
          </Grid>
        <Grid item xs={12} sm={6}>

        </Grid>
        <Grid item xs={12} sm={6}>
          <br/>  
          <FormControlLabel 
            control={<Checkbox color="seßcondary" name="saveAddress" value="yes" 
            onChange={(e)=>{
              global.that.setState({allergy: e.target.value})
            }} />}
            label="Это задание может быть выполнено алергиком"
          />
          <br/>
          <FormControlLabel
              control={<Checkbox color="seßcondary" name="is__vacinated" value="yes"
                                 onChange={(e)=>{
                                   global.that.setState({is__vacinated: e.target.value})
                                 }} />}
              label="Животное привито"
          />
        </Grid>
    </React.Fragment>
  );
}

