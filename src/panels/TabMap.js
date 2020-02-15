import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { YMaps, Map, Placemark, ZoomControl, GeolocationControl} from 'react-yandex-maps';
import "./TabMap.css"

export default class TabMap extends Component {
  static propTypes = {
    update: PropTypes.func.isRequired,
    go: PropTypes.func.isRequired,
  };

  state = {
    isLoaded: false,
    error: '',
  }
  
  render() { 
    return (
      <Fragment>
        <div class="wrapper" >
          <YMaps>
                <Map 
                  width={1000}
                  height={640}
                  defaultState={{ center: [59.9503007,30.3764863], zoom: 11 }} >
                  <Placemark {... {
                    geometry: [59.9250078,30.2651232],
                    properties: {
                    hintContent: 'Приют для животных "Брошенный ангел"',
                    balloonContentHeader: '<strong>Приют для животных "Брошенный ангел"</strong>',
					balloonContentBody: 'ул, Кожевенная линия, 1-3, Санкт-Петербург, <em> 199106</em>',
					balloonContentFooter: '8 (812) 925-75-10'					
                    },
                    modules: ['geoObject.addon.balloon', 'geoObject.addon.hint']    
                    }
                  }
                  />
                  <Placemark {...{
                      geometry: [60.005928,30.3757615],
                      properties: {
                          hintContent: 'Центр помощи бездомным собакам',
                          balloonContent: 'Центр помощи бездомным собакам /n Большой Смоленский пр., 9, Санкт-Петербург, 192148'
                      },
                      modules: ['geoObject.addon.balloon', 'geoObject.addon.hint']
                    }
                  } 
                  />
                  <Placemark {...{
                      geometry: [60.0328212,29.9048691],
                      properties: {
                          hintContent: 'БФ помощь бездомным собакам',
                          balloonContent: 'БФ помощь бездомным собакам /n Большой Смоленский пр., 9, Санкт-Петербург, 192148'
                      },
                      modules: ['geoObject.addon.balloon', 'geoObject.addon.hint']
                    }
                  } 
                  />
				  <Placemark {...{
                      geometry: [59.9871847,30.2836098],
                      properties: {
                          hintContent: 'Ветклиника "Красный лис"',
                          balloonContent: 'Ветклиника "Красный лис" /n Сестрорецкая ул., 8, Санкт-Петербург, 197183'
                      },
                      modules: ['geoObject.addon.balloon', 'geoObject.addon.hint']
                    }
                  } 
                  />
				  <Placemark {...{
                      geometry: [59.9386638,30.3196371],
                      properties: {
                          hintContent: 'Ветклиника "ВетСеть"',
                          balloonContent: 'Ветклиника "ВетСеть" \n Большая Пороховская ул., 47, Санкт-Петербург, 195248'
                      },
                      modules: ['geoObject.addon.balloon', 'geoObject.addon.hint']
                    }
                  } 
                  />

                  <ZoomControl options={{ float: 'right' }} />
                </Map>
            </YMaps>
        </div>
        
        

        <div class="loading-element">
          <img class="loading-element__image" src="https://media.giphy.com/media/LPxz7QLDtFSbpfIES8/giphy.gif" width="250" height="250" >
          </img>

        </div>
      </Fragment>      
    );
  }
}

/*
[
  {
    "id": 1,
    "title": "Центр помощи бездомным животным \"Лучик\" г. Надым",
    "description": "Приют для бездомных животных города Надым",
    "image": "https://01f1fef5.ngrok.io/api/v1/shelter/getlist/images/schem.JPG",
    "members": "",
    "urlVK": "141883313"
  },
  {
    "id": 2,
    "title": "Приют города Санкт-Петербурга",
    "description": "Приют для бездомных животных",
    "image": "https://01f1fef5.ngrok.io/api/v1/shelter/getlist/images/no-img.jpg",
    "members": "",
    "urlVK": "147993097"
  }
]
*/