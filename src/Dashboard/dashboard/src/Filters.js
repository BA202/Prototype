import React from 'react';
import './Filters.css';



class Filters extends React.Component {

  constructor(props) {
    super(props);
    let date = new Date();
    this.state = {
      startDate: date
    }
    this.DateSelected = this.DateSelected.bind(this);
  }

  render() {

    return (
      <div className="Filters">
        <div className='Filters_MainGrid'>
          <div className='Filters_Div_Date'>
            
          </div>
          <div className='Filters_Div_Category'>
            <h1>Date</h1>
          </div>
          <div className='Filters_Div_Score'>
            <h1>Date</h1>
          </div>
          <div className='Filters_Div_Language'>
            <h1>Date</h1>
          </div>
          <div className='Filters_Div_Source'>
            <h1>Date</h1>
          </div>
          <div className='Filters_Div_Hotel'>
            <h1>Date</h1>
          </div>

        </div>

      </div>
    );
  }

  DateSelected(e) {
    console.log(e);
  }
}

export default Filters;