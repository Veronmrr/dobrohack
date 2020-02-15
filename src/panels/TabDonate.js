import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { PanelHeader, FormLayout, FormStatus, Button, Input, PanelHeaderBack, View, Panel, Slider, Select, Group, Div, InfoRow,
  Progress, File, Tabs, TabsItem, Avatar } from '@vkontakte/vkui';
import vkConnectPromise from '@vkontakte/vk-connect-promise';
import connect from '@vkontakte/vk-connect';
import "./TabDonate.css"



export default class TabDonate extends Component {
  static propTypes = {
    update: PropTypes.func.isRequired,
    go: PropTypes.func.isRequired,
  };
  
  state = {
    clicked: 'false'
  }

  static defaultProps = {
      
  };

  constructor (props) {
    super(props);

    this.state = {
      value1: 50,
      loadWorksheep: false
    };
  }

  options () {
    const options = [];
    for (let i = 0; i <= 10; i += 2) {
      options.push(<option value={`${i / 10}`} key={`${i}`}>{i / 10}</option>);
    }
    return options;
  }

donate = () =>{
    //connect.send("VKWebAppOpenPayForm", {"app_id": 6396978, "action": "pay-to-service", "params": {"group_id": 180054668}});
    /*vkConnectPromise
      .send("VKWebAppOpenPayForm", {"app_id": 7175703, "action": "transfer-to-user", "params": {"user_id": global.current_id}})
      .then(data => {
        global.lat = data.lat;
        global.lon = data.lon;
        console.log(global.lat, global.lon)
      })
      .catch(error => {
        // Handling an error
      });*/
      console.log(global.current_id)
      connect.send("VKWebAppInit", {});
      connect.send("VKWebAppOpenPayForm", {"app_id": 7175703, "action": "transfer-to-user", 
            "params": {"user_id": global.current_id}});
}

render() {
    const items = this.props.events;
    return (
      <Fragment>
          <form class="donate__form">
              <br />
              <div className="img-cat">
                  <img src="https://media.giphy.com/media/VfEezN7imWsqHpAFL3/giphy.gif"
                                     className="donate_cat"/></div>
<br />
              <h6>Помогите приютам</h6>
        {global.shelters.map((shelter) => {
          return (
            <p>&emsp;	    
            <label>
              <input type="checkbox" id={shelter.id} onChange={()=>{
                  for (var i=0; i< global.shelters.length; i++) {
                    document.getElementById(global.shelters[i].id).checked=false;
                  }
                  document.getElementById(shelter.id).checked=true;
                  global.current_id = shelter.urlVK;
                }}/>
              <span class="shelter__title"> {shelter.title}</span>
            </label>
            
          </p>
          );
        })}
        <Button size="xl" value='Сообщить' onClick={this.donate}>Отправить</Button>
        </form>
      </Fragment>
    );
  }
}