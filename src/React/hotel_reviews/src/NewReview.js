import './NewReview.css';
import React from 'react';
import backendApi from './backendApi';


class NewReview extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            newReviewText : "",
        }
        this.textInputChange = this.textInputChange.bind(this);
        this.submitPressed = this.submitPressed.bind(this);
        
      }

    render() {
      return (
        <div className = "NewReview">
            <div className='NewReviewField'>
                <textarea id= "TextFieldNewReview" className ="TextFieldNewReview" value = {this.state.newReviewText} placeholder ="enter new review" onChange = {this.textInputChange} cols="40" rows="7"></textarea>
                <input className ="Btn_Submit" type ="Button" value ="Submit" onClick={this.submitPressed} readOnly></input>
            </div>
        </div>
      );
    }

    textInputChange(e)
    {
        this.setState({
            newReviewText: e.target.value
          });
    }

    async submitPressed(e)
    {
        
        await backendApi.addNewReview(this.state.newReviewText);
        this.setState({
            newReviewText : ""
        });
        
    }
 
  }
  
  export default NewReview;