import './NewReview.css';
import React from 'react';
import backendApi from './backendApi';


class NewReview extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            newReviewText : "",
            detectedLanguage : ""
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
                <label className="lblLanguageDetected">{this.state.detectedLanguage}</label>
            </div>
        </div>
      );
    }

    async textInputChange(e)
    {    
        this.setState({
            newReviewText: e.target.value
          });
          if (e.target.value.length === 10)
          {
            let res = await backendApi.detectLanguage(e.target.value);
            console.log(res);
            if (this.state.newReviewText.length >= 10)
            {
              this.setState({
                detectedLanguage: res
              });
            }
          }
          else if (e.target.value.length < 10)
          {
            this.setState({
              detectedLanguage: ""
            });
          }
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