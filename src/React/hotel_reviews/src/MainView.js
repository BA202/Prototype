import React from 'react';
import NewReview from './NewReview.js';
import Footer from './Footer.js';
import DataView from './DataView.js';
import Demo from './Demo.js';
import './MainView.css';


class MainView extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            mode : "Demo",

        }
        this.ModeChanged = this.ModeChanged.bind(this);
      }

     

    render() {
        let subView = <Demo></Demo>;
        let demoStyle = "toggleButton selected";
        let debugStyle = "toggleButton notSelected";
        if(this.state.mode === "Debug")
        {
            demoStyle = "toggleButton notSelected";
            debugStyle = "toggleButton selected";
            subView = <div>
                <NewReview></NewReview>
                <div className="HorizontalSeparator"></div>
                <DataView></DataView>
                
            </div>
           
        }
        return (
            <div className="centered">
                <label className='MainViewModeLbl'>Mode:</label>
                <div className="toggle">
                    <input className= {demoStyle} value="Demo" type="Button" id = "Demo" onClick={this.ModeChanged} readOnly></input>
                    <input className= {debugStyle} value="Debug" type="Button" id = "Debug" onClick={this.ModeChanged} readOnly></input>
	            </div>
                {subView}
                <Footer></Footer>
              </div>
          );
    }

    ModeChanged(e)
    {
        this.setState({mode: e.target.id});
    }

  }
  
  export default MainView;