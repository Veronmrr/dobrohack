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
						hintContent: '<strong>Приют для животных "Брошенный ангел"</strong>',
						balloonContentHeader: '<strong>Приют для животных "Брошенный ангел"</strong>',
						balloonContentBody: 'ул, Кожевенная линия, 1-3, Санкт-Петербург, <em> 199106</em>',
						balloonContentFooter: '8 (812) 925-75-10'					
                    },
                    modules: ['geoObject.addon.balloon', 'geoObject.addon.hint']    
                    }
                  }
                  />
                  <Placemark {...{
                    geometry: [59.8958721,30.4055612],
                    properties: {
						hintContent: '<strong>Центр помощи бездомным собакам</strong>',
						balloonContentHeader: '<strong>Центр помощи бездомным собакам</strong>',
						balloonContentBody: 'Большой Смоленский пр., 9, Санкт-Петербург, <em> 192148</em>',
						balloonContentFooter: '8 (812) 365-49-69'		                    
                      },
                      modules: ['geoObject.addon.balloon', 'geoObject.addon.hint']
                    }
                  } 
                  />
                  <Placemark {...{
                    geometry: [59.9258075,30.290122],
                    properties: {
						hintContent: '<strong>Приют для хорьков "Северная корона"</strong>',
						balloonContentHeader: '<strong>Приют для хорьков "Северная корона"</strong>',
						balloonContentBody: 'Лиговский пр., 44, Санкт-Петербург, <em> 191040</em>',
						balloonContentFooter: '8 (904) 638-20-50'
                      },
                      modules: ['geoObject.addon.balloon', 'geoObject.addon.hint']
                    }
                  } 
                  />
				  <Placemark {...{
                    geometry: [59.9792023,30.2780069],
                    properties: {
						hintContent: '<strong>Ветклиника "Красный лис"</strong>',
						balloonContentHeader: '<strong>Ветклиника "Красный лис"</strong>',
						balloonContentBody: 'Сестрорецкая ул., 8, Санкт-Петербург, <em> 197183</em>',
						balloonContentFooter: '8 (812) 430-18-78'
                      },
                      modules: ['geoObject.addon.balloon', 'geoObject.addon.hint']
                    }
                  } 
                  />
				  <Placemark {...{
                    geometry: [59.952733,30.431274],
                    properties: {
						hintContent: '<strong>Ветклиника "ВетСеть"</strong>',
						balloonContentHeader: '<strong>Ветклиника "ВетСеть"</strong>',
						balloonContentBody: 'Большая Пороховская ул., 47, Санкт-Петербург, <em> 195248</em>',
						balloonContentFooter: '8 (812) 612-11-10'
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
    "image": "https://fedos.pythonanywhere.com/api/v1/shelter/getlist/images/schem.JPG",
    "members": "",
    "urlVK": "141883313"
  },
  {
    "id": 2,
    "title": "Приют города Санкт-Петербурга",
    "description": "Приют для бездомных животных",
    "image": "https://fedos.pythonanywhere.com/api/v1/shelter/getlist/images/no-img.jpg",
    "members": "",
    "urlVK": "147993097"
  }
]
*/