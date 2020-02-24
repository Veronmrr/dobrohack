import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { PanelHeader, FormLayout, FormStatus, Button, Input, PanelHeaderBack, View, Panel, Slider, Select, Group, Div, InfoRow,
  Progress, File, Tabs, TabsItem, Avatar } from '@vkontakte/vkui';
import './TabAccount.css';
import TabAdmin from './TabAdmin';
var moment = require('moment');
require('moment/locale/ru');
moment.locale('ru');



export default class TabAccount extends Component {
  static propTypes = {
    userInfo: PropTypes.object,
    update: PropTypes.func.isRequired,
    go: PropTypes.func.isRequired,
  };
  
  state = {
    clicked: 'false'
  }

  static defaultProps = {
    userInfo: {
      first_name: 'Негр',
      last_name: 'Танцующий',
      photo_200: 'http://pics.wikireality.ru/upload/thumb/f/f4/82f2426f2971.jpg/300px-82f2426f2971.jpg',
      bdate: '12.11.2000',
	  exp: 280,
	  level: 1
    },
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
	
  checkboxChange = () => {
	  // ХЕНДЛЕР ДЛЯ ЧЕКБОКСА
	  fetch('https://01f1fef5.ngrok.io/api/v1/vlt/detail/'+global.vlt[global.vlt_i].id, {
      method: 'PUT', // Method itself
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      'id': global.vlt[global.vlt_i].id,
	  'allergy': !global.vlt[global.vlt_i].allergy
      })});
      global.vlt[global.vlt_i].allergy = !global.vlt[global.vlt_i].allergy;
      console.log(global.vlt[global.vlt_i].allergy)
  }

  

  render() {
    const { userInfo } = this.props;
    console.log(global.shelters);
    const karma = 150;
    
    var flag = false;
    for (var i = 0; i < global.vlt.length; i++){
      if (global.vlt[i].urlVK === (global.user_info.id).toString()) {
		    global.vlt_i = i;
        flag = true;
        global.userInfo.isAdmin = global.vlt[i].isAdmin;
        console.log(global.vlt[global.vlt_i]);
        console.log(global.userInfo.isAdmin)
      }
    } 
  
    if (!flag){
      console.log('flag')
      fetch('https://01f1fef5.ngrok.io/api/v1/vlt/create/', {
      method: 'POST', // Method itself
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      //'birth_date': global.user_info.bdate,
      'phone': global.phone_number,
      'vorname': global.user_info.first_name,
      'nachname': global.user_info.last_name,
      'urlVK': global.user_info.id,
      //'profile_image': global.user_info.photo_200,
      })}).then(function(res){  })
      .catch(function(res){ console.log(res) });

    }

    const isAdmin = true;

    console.log(global.user_info)
    console.log(flag)
    var searcher = {};
    for (var i = 0; i < global.shelters.length; i++){
      searcher[global.shelters[i].urlVK] = global.shelters[i].title;
      const startPage = (
        <Fragment>
        <div className="Account">
          <div className="Account__in">
            <div className="Account__data">
              {/* <div className="Account__dataTabs">
                <Tabs>
                  <TabsItem>Данные</TabsItem>
                  <TabsItem>Отзывы</TabsItem>
                  <TabsItem>История</TabsItem>
                </Tabs>
              </div> */}

              <FormLayout>

                <div className="Account__header">

                  <div className="Account__info">
                  <div className="Account__hero">
                    <div className="Account__avatar">
                      <img src={userInfo.photo_200} />
                    </div>
                    <div className="Account__name">{userInfo.first_name} {userInfo.last_name}</div>
                    <div className="Account__name Account__level"> Уровень {1}</div>
                  </div>
                  <div className="Account_progress">
                    <progress value={150} max={1000}></progress><br/>
                    {150}/{1000}
                  </div>
                  </div>

                </div>

                {/*<img src='https://media.giphy.com/media/j0H0I4ycvwZHO58mHq/giphy.gif' />*/}
                <div className="User__info">
                  <div className="User__bdate">
                    <h6 className="User__bdate title">
                      День рождения:
                    </h6>
                    {moment(userInfo.bdate, "DD-MM-YYYY").format("DD MMMM")}
                  </div>
                  <div className="User__phone__number">
                    <h6 className="User__number title">
                      Номер телефона:
                    </h6>
                    {global.phone_number}
                    <p>&emsp;
                      <label>
                        <input type="checkbox" onChange={this.checkboxChange}/>
                        <span>Наличие аллергии на животных {}</span>
                      </label>
                    </p>
                  </div>
                </div>
                <center>
                  <div className="mascot">
                    <img src='https://media.giphy.com/media/XG0dcmHUNBNOlKlPSy/giphy.gif' />
                  </div>
                  <img src='https://barcode.tec-it.com/barcode.ashx?data=AA1234' alt="Карта волонтера" />
                </center>


{/*        <div className="Account_admin">
              {global.userInfo.isAdmin && (<Button
                variant="contained"
                color="primary"
                onClick={() => 
                  { 
                  this.setState({loadWorksheep: true})
                }}
            >
                Страница администратора
              </Button>)}
                
              
              
        </div>*/}
              </FormLayout>
            </div>
          </div>
        </div>

        {/* <div>
            Карма
        </div>
        <div>
          <FormLayout>
            <File top="Загрузите ваше фото" before={<Icon28Camera />} size="l">
            Открыть галерею
            </File>
            <InfoRow title="Default">
              <Progress value={40} />
            </InfoRow>
          </FormLayout>
        </div> */}

        <div style={{ height: 60 }} />
      </Fragment>
      );

    return (
      <div>{ this.state.loadWorksheep ? <WorksheetSelector/> : startPage }</div>
    );
  }
  }
}

function WorksheetSelector(props) {
  return (
    <TabAdmin></TabAdmin>
  );
}

