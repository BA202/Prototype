import React from 'react';
import './BarChart.css';
import Plot from 'react-plotly.js';

class BarChart extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      "PlotTitle":"BarChart",
      "traces": []
    }
  }

  render() {
    return (
      <div className="BarChart">
        <Plot
          data={this.state.traces}
          layout={{ width: this.props.width, height: 500, title: this.state.PlotTitle }}
        />
      </div>
    );
  }

  newData(e) 
  {
      console.log(e);
      this.setState({traces:e.traces});
  }
}

export default BarChart;