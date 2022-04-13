import React from 'react';
import './MainView.css';
import Filters from './Filters.js';
import Footer from './Footer.js';
import TextBox from './TextBox.js';
import PiChart from './PiChart.js';
import LineChart from './LineChart.js';

class MainView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div className="MainView">
        <div className="Header">
          <h1 className='MainView_Title'>Hotel Reviews</h1>
        </div>

        <div className='MainView_Content'>
          <Filters></Filters>
          <div className='MainView_DashboardView'>
            <div className='MainView_DashboardView_TextBox'>
              <TextBox></TextBox>
            </div>
            <div className='MainView_DashboardView_PiChart'>
              <PiChart></PiChart>
            </div>
            <div className='MainView_DashboardView_LineChart'>
              <LineChart></LineChart>
            </div>
            <div className='MainView_DashboardView_Overview'>
              <h1>MainView_DashboardView_Overview</h1>
            </div>
          </div>
        </div>

        <Footer></Footer>
      </div>
    );
  }
}

export default MainView;