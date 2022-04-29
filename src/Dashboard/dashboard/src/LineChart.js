import React from 'react';
import './LineChart.css';
import Plot from 'react-plotly.js';


class LineChart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      "PlotTitle": "LineChart",
      "traces": []
    }
  }

  render() {
    return (
      <div className="LineChart">
        <Plot
          data={this.state.traces}
          layout={{ width: this.props.width, height: 700, title: this.state.PlotTitle }}
        />
      </div>
    );
  }

  newData(e) {
    this.setState({ traces: e.traces});
  }
}

export default LineChart;