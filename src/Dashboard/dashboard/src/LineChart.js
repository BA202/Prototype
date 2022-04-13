import React from 'react';
import './LineChart.css';
import Plot from 'react-plotly.js';


class LineChart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      "PlotTitle":"LineChart",
      "traces": [
        {
          "x": [1, 2, 3, 4],
          "y": [10, 4, 1, 0],
          'name': 'Positive',
          'line': {
            'color': '#73BF94',
            'width': 3
          }
        },
        {
          "x": [1, 2, 3, 4],
          "y": [12, 9, 15, 12],
          'name': 'Negative',
          'line': {
            'color': '#DC505F',
            'width': 3
          }
        },
        {
          "x": [1, 2, 3, 4],
          "y": [19, 12, 14, 16],
          'name': 'Neutral',
          'line': {
            'color': '#FFE782',
            'width': 3
          }
        }
      ]
    }
  }

  render() {
    return (
      <div className="LineChart">
        <Plot
          data={this.state.traces}
          layout={{ width: 1000, height: 500, title: this.state.PlotTitle }}
        />
      </div>
    );
  }
}

export default LineChart;