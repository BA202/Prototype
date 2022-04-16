import React from 'react';
import './Overview.css';

class Overview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dict: {}
        }
    }

    render() {
        let currentBtnBackgroundColor = "Demo_BackgroundGreen";
        let fullOverviewList = [];
        for (const allReviews in this.state.dict) {
            for (var i = 0; i < this.state.dict[allReviews].length; i++) {
                if (typeof this.state.dict[allReviews][i] === 'object') {
                    var platformList = [];
                    for (const platForm in this.state.dict[allReviews][i]) {
                        for (var j = 0; j < this.state.dict[allReviews][i][platForm].length; j++) {
                            var posNegList = [];
                            if (typeof this.state.dict[allReviews][i][platForm][j] === 'object') {
                                for (const posNeg in this.state.dict[allReviews][i][platForm][j]) {
                                    posNegList.push(<tr>
                                        <td><label className='Overview_Minor'>{posNeg}</label></td>
                                        <td><label className='Overview_Minor'>{this.state.dict[allReviews][i][platForm][j][posNeg]}</label></td>
                                    </tr>)
                                }
                                platformList.push(<tr>
                                    <td><table>{posNegList}</table></td>
                                </tr>)
                            }
                            else {
                                platformList.push(<tr>
                                    <td><label className='Overview_Platform'>{platForm}:</label></td>
                                    <td className='OverView_RightAlign'><label >{this.state.dict[allReviews][i][platForm][j]}</label></td>
                                </tr>)
                            }
                        }
                    }
                    fullOverviewList.push(<tr>
                        <td><table>{platformList}</table></td>
                    </tr>)
                }
                else {
                    fullOverviewList.push(<tr>
                        <td><label className='Overview_TotNumberOfReviews'>{allReviews}</label></td>
                        <td><label className='OverView_RightAlign'>{this.state.dict[allReviews][i]}</label></td>
                    </tr>)
                }
            }
        }
        return (
            <div className='Overview_Background'>

                <div className='Overview_Foreground'>
                    <table>{fullOverviewList}</table>
                </div>
            </div>

        );
    }

    newData(e) 
    {
        this.setState({dict:e});
    }
}

export default Overview;