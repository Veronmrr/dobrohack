import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { PanelHeader, FixedLayout, Tabs, TabsItem, Select, FormLayout} from '@vkontakte/vkui';
import { TAB_EVENTS, TAB_WORK, TAB_MAP, TAB_ACCOUNT, PANEL_MAIN, TAB_LOST, TAB_DONATE } from '../constants';
import TabEvents from './TabEvents';
import TabAccount from './TabAccount.js';
import TabMap from './TabMap';
import TabWork from './TabWork';
import TabLost from './TabLost';
import TabDonate from './TabDonate';
import Icon20CalendarOutline from '@vkontakte/icons/dist/20/calendar_outline';

import Icon28Profile from '@vkontakte/icons/dist/28/profile';
import Icon20ArticleOutline from '@vkontakte/icons/dist/20/article_outline';
import Icon20PlaceOutline from '@vkontakte/icons/dist/20/place_outline';
import Icon24BrowserForward from '@vkontakte/icons/dist/24/browser_forward';
import Icon24Replay from '@vkontakte/icons/dist/24/replay';
import connect from '@vkontakte/vk-connect';

export default class Main extends Component {
  static propTypes = {
    activeTab: PropTypes.string,
    go: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
  };

  static defaultProps = {
    activeTab: TAB_EVENTS,
  };

  onTabClick = (e) => {
    this.props.update(PANEL_MAIN, {
      activeTab: e.currentTarget.dataset.id,
    });
  };

  refreshPage(){
    window.location.reload();
  }

  onDonate = (e) => {
    /*connect.send("VKWebAppInit", {});
    connect.send("VKWebAppOpenPayForm", {"app_id": 7175703, "action": "pay-to-group", 
          "params": {"group_id": 180054668}});*/
    this.props.update(PANEL_MAIN, {
      activeTab: TAB_DONATE,
    });
  };
  

  getTabComponent = () => {
    const { activeTab } = this.props;

    switch (activeTab) {
      case TAB_EVENTS:
        return TabEvents;

      case TAB_WORK:
        return TabWork;

      case TAB_MAP:
        return TabMap;

      case TAB_ACCOUNT:
        return TabAccount;
      
        case TAB_LOST:
        return TabLost;

        case TAB_DONATE:
        return TabDonate;

      default:
        return <div>Что-то пошло не так, нет такой вкладки</div>;
    }
  }

  render() {
    const { activeTab } = this.props;
    const TabComponent = this.getTabComponent();

    return (
      <Fragment>
        <PanelHeader>Помоги Барбосу</PanelHeader>
        <TabComponent
          {...this.props}
        />
			<div class="fixed-action-btn"  style={{position: "relative"}}>
              <a className="btn-floating btn-large waves-effect waves-light" style={{bottom: 60, left: 30, position: "fixed", border: "2px solid #000"}} onClick={this.refreshPage}>
                <img src="https://sun9-60.userapi.com/c858016/v858016157/bfa2f/EafeESlMfjI.jpg"/>
              </a>
              <a class="btn-floating btn-large waves-effect waves-light" style={{bottom:60, right: 0, position: "fixed", border: "2px solid #000"}} onClick={this.onDonate}>
                  {/*<i class="large material-icons">attach_money</i>*/}
                  <img src="https://sun9-31.userapi.com/c857328/v857328281/20302/L6VRcd72khg.jpg"/>
				</a>


        </div>



        <FixedLayout vertical="bottom">
          <Tabs>
            <TabsItem
              data-id={TAB_EVENTS}
              selected={activeTab === TAB_EVENTS}
              onClick={this.onTabClick}
            ><Icon20CalendarOutline width={25} height={25}/></TabsItem>

            <TabsItem
              data-id={TAB_WORK}
              selected={activeTab === TAB_WORK}
              onClick={this.onTabClick}
            ><Icon20ArticleOutline width={25} height={25}/></TabsItem>

            <TabsItem
              data-id={TAB_MAP}
              selected={activeTab === TAB_MAP}
              onClick={this.onTabClick}
            ><Icon20PlaceOutline width={25} height={25}/></TabsItem>

            <TabsItem
              data-id={TAB_LOST}
              selected={activeTab === TAB_LOST}
              onClick={this.onTabClick}
            > <Icon24BrowserForward width={25} height={25}/></TabsItem>


            <TabsItem
              data-id={TAB_ACCOUNT}
              selected={activeTab === TAB_ACCOUNT}
              onClick={this.onTabClick}
            ><Icon28Profile width={25} height={25}/></TabsItem>
          </Tabs>
        </FixedLayout>
      </Fragment>
    );
  }
}