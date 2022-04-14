import React from 'react';
import './PiChart.css';
import Plot from 'react-plotly.js';

class PiChart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      "PlotTitle":"PiChart",
      "traces": []
    }
  }

  render() {
    return (
      <div className="PiChart">
        <Plot
          data={this.state.traces}
          layout={{ width: 500, height: 500, title: this.state.PlotTitle }}
        />
      </div>
    );
  }

  newData(e) 
  {
      this.setState({traces:e});
  }
}

export default PiChart;