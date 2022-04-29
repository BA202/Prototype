import React from 'react';
import './MainView.css';
import Filters from './Filters.js';
import Footer from './Footer.js';
import TextBox from './TextBox.js';
import PiChart from './PiChart.js';
import LineChart from './LineChart.js';
import Overview from './Overview.js';
import backendApi from './backendApi';

class MainView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {},

    }
    this.updateView = this.updateView.bind(this);
    this.UpdateRequestData = this.UpdateRequestData.bind(this);
    this.updateLineChart = React.createRef();
    this.updateLineChartKat = React.createRef();
    this.updatePiChart = React.createRef();
    this.updateOverview = React.createRef();
    this.updateTextField = React.createRef();
    this.updateFilter = React.createRef();
    this.getInitalData();
  }

  render() {
    return (
      <div className="MainView">
        <div className="Header">
          <h1 className='MainView_Title'>Hotel Reviews</h1>
        </div>

        <div className='MainView_Content'>
          <Filters onChange={this.updateView} onRequestChange={this.UpdateRequestData} ref={this.updateFilter}></Filters>
          <div className='MainView_DashboardView'>
            <div className='MainView_DashboardView_TextBox'>
              <TextBox ref={this.updateTextField}></TextBox>
            </div>
            <div className='MainView_DashboardView_PiChart'>
              <PiChart ref={this.updatePiChart}></PiChart>
            </div>
            <div className='MainView_DashboardView_LineChart'>
              <LineChart ref={this.updateLineChart} width={1200}></LineChart>
            </div>
            <div className='MainView_DashboardView_Overview'>
              <Overview ref={this.updateOverview}></Overview>
            </div>
            <LineChart ref={this.updateLineChartKat} width={1500}></LineChart>
          </div>
        </div>

        <Footer></Footer>
      </div>
    );
  }

  updateView(e) {
    this.setState({ data: e });
    this.updateLineChart.current.newData(e.LineChart);
    this.updatePiChart.current.newData(e.PiChart);
    this.updateOverview.current.newData(e.Overview);
    this.updateTextField.current.newData(e.TextBox);
    this.updateFilter.current.newData(e.SearchBox);
    this.updateLineChartKat.current.newData(e.LineChartKat);
  }

  UpdateRequestData(e) {
    this.updateTextField.current.newRequestData(e);
  }


  async getInitalData() {
    let data = {
      "Date": ["2022-04-1T00:00:0Z", "2022-04-16T23:59:0Z"],
      "Category": ["Location", "Room", "Food", "Staff", "ReasonForStay", "GeneralUtility", "HotelOrganisation"],
      "Score": ["Positive", "Negative", "Neutral"],
      "ContentType": ["Review"],
      "Language": ["English", "German"],
      "Source": ["Online"],
      "Hotel": ["Arosa"]
    };

    let res = await backendApi.getViewData(data);
    this.updateView(res);


    }
  }

export default MainView;