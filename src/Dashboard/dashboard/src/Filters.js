import React from 'react';
import './Filters.css';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { Collapse } from 'react-collapse';
import backendApi from './backendApi';


class Filters extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedData: { 'from': new Date('April 03, 2022 03:24:00'), 'to': new Date('April 05, 2022 03:24:00') },
      filterState: {
        "Category": {
          "Location": false,
          "Room": false,
          "Food": false,
          "Staff": false,
          "ReasonForStay": false,
          "GeneralUtility": false,
          "HotelOrganisation": false
        },
        "Score": {
          "Positive": false,
          "Negative": false
        },
        "Language": {
          "German": false,
          "English": false
        },
        "Source": {
          "Trivago": false,
          "Google": false
        }
      },
      dateExpanded: false,
      categoryExpanded: false,
      scoreExpanded: false,
      languageExpanded: false,
      sourceExpanded: false,
      hotelExpanded: false,
      validDate: true,
      data: {
        "Date": [
        ],
        "Category": [

        ],
        "Score": [

        ],
        "Language": [

        ],
        "Source": [

        ]
      }

    }

    this.dateSelected = this.dateSelected.bind(this);
    this.startDateExpand = this.startDateExpand.bind(this);
    this.checkBoxChanged = this.checkBoxChanged.bind(this);
  }

  render() {
    let showDate;
    if (this.state.validDate) {
      showDate = <label>{this.state.selectedData.from.toLocaleDateString()}-{this.state.selectedData.to.toLocaleDateString()}</label>
    }

    let categoryChoises = [];
    for (let i in this.state.data.Category) {
      categoryChoises.push(
        <tr>
          <th><label class="container">{this.state.data.Category[i]}
            <input type="checkbox" onChange={this.checkBoxChanged} id={this.state.data.Category[i]} className="Category" checked={this.state.filterState.Category[this.state.data.Category[i]]}></input>
            <span class="checkmark"></span>
          </label></th>
        </tr>
      );
    }

    let scoreChoises = [];
    for (let i in this.state.data.Score) {
      scoreChoises.push(
        <tr>
          <th><label class="container">{this.state.data.Score[i]}
            <input type="checkbox" onChange={this.checkBoxChanged} id={this.state.data.Score[i]} className="Score" checked={this.state.filterState.Score[this.state.data.Score[i]]}></input>
            <span class="checkmark"></span>
          </label></th>
        </tr>
      );
    }

    let languageChoises = [];
    for (let i in this.state.data.Language) {
      languageChoises.push(
        <tr>
          <th><label class="container">{this.state.data.Language[i]}
            <input type="checkbox" onChange={this.checkBoxChanged} id={this.state.data.Language[i]} className="Language" checked={this.state.filterState.Language[this.state.data.Language[i]]}></input>
            <span class="checkmark"></span>
          </label></th>
        </tr>
      );
    }

    let sourceChoises = [];
    for (let i in this.state.data.Source) {
      sourceChoises.push(
        <tr>
          <th><label class="container">{this.state.data.Source[i]}
            <input type="checkbox" onChange={this.checkBoxChanged} id={this.state.data.Source[i]} className="Source" checked={this.state.filterState.Source[this.state.data.Source[i]]}></input>
            <span class="checkmark"></span>
          </label></th>
        </tr>
      );
    }

    let hotelChoises = []


    return (
      <div className="Filters">
        <div className='Filters_MainGrid'>
          <div className='Filters_Div_Date'>
            {showDate} <br></br>
            <input className='Filter_Button' type="button" id="dateExpanded" onClick={this.startDateExpand} value="Date"></input>
          </div>
          <div className='Filters_Div_Category'>
            <label></label><br></br>
            <input className='Filter_Button' type="button" id="categoryExpanded" onClick={this.startDateExpand} value="Category"></input>
          </div>
          <div className='Filters_Div_Score'>
            <label></label><br></br>
            <input className='Filter_Button' type="button" id="scoreExpanded" onClick={this.startDateExpand} value="Score"></input>
          </div>
          <div className='Filters_Div_Language'>
            <label></label><br></br>
            <input className='Filter_Button' type="button" id="languageExpanded" onClick={this.startDateExpand} value="Language"></input>
          </div>
          <div className='Filters_Div_Source'>
            <label></label><br></br>
            <input className='Filter_Button' type="button" id="sourceExpanded" onClick={this.startDateExpand} value="Source"></input>
          </div>
          <div className='Filters_Div_Hotel'>
            <label></label><br></br>
            <input className='Filter_Button' type="button" id="hotelExpanded" onClick={this.startDateExpand} value="Hotel"></input>
          </div>
          <div className='Filters_Div_Date_View'>
            <Collapse className='DataPickerPosition' isOpened={this.state.dateExpanded}>
              <DayPicker mode="range" selected={this.state.selectedData} onSelect={this.dateSelected} modifiersClassNames={{ selected: 'my-selected', today: 'my-today' }} modifiersStyles={{ disabled: { fontSize: '75%' } }} fromDate={new Date(this.state.data.Date[0], 1, 1)} toDate={new Date()} />
            </Collapse>
          </div>
          <div className='Filters_Div_Category_View'>
            <Collapse className='DataPickerPosition' isOpened={this.state.categoryExpanded}>
              <table>
                {categoryChoises}
              </table>
            </Collapse>
          </div>
          <div className='Filters_Div_Score_View'>
            <Collapse className='DataPickerPosition' isOpened={this.state.scoreExpanded}>
              <table>
                {scoreChoises}
              </table>
            </Collapse>
          </div>
          <div className='Filters_Div_Language_View'>
            <Collapse className='DataPickerPosition' isOpened={this.state.languageExpanded}>
              <table>
                {languageChoises}
              </table>
            </Collapse>
          </div>
          <div className='Filters_Div_Source_View'>
            <Collapse className='DataPickerPosition' isOpened={this.state.sourceExpanded}>
              <table>
                {sourceChoises}
              </table>
            </Collapse>
          </div>
          <div className='Filters_Div_Hotel_View'>
            <Collapse className='DataPickerPosition' isOpened={this.state.hotelExpanded}>
              <table>
                {hotelChoises}
              </table>
            </Collapse>
          </div>
        </div>

      </div>
    );
  }

  dateSelected(e) {
    let isValid = false
    try {
      if (e.from.toString().length > 0 && e.to.toString().length > 0) {
        isValid = true;
      }
    }
    catch {
      isValid = false;
    }

    this.setState({
      selectedData: e,
      validDate: isValid
    })
  }

  startDateExpand(e) {
    let newState = !this.state[e.target.id];
    this.setState({
      [e.target.id]: newState,
    });
  }

  async checkBoxChanged(e) {
    let newVlaue = this.state.filterState;
    newVlaue[e.target.className][e.target.id] = !newVlaue[e.target.className][e.target.id]
    this.setState({
      filterState: newVlaue
    });



    let data = {
      "Date": ["2012-04-20T00:00:0Z", "2023-04-23T23:59:0Z"],
      "Category": ["Location","Room"],
      "Score": ["Positive", "Negative"],
      "ContentType": ["Review"],
      "Language": ["English", "German"],
      "Source": ["Online"],
      "Hotel": ["Arosa"]
    };

    for(let key in this.state.filterState)
    {
      console.log(key);
    }

    let res = await backendApi.getViewData(data);
    this.props.onChange(res);
  }

  newData(e) {
    this.setState({ data: e });
  }
}

export default Filters;