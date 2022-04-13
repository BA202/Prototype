import React from 'react';
import './PiChart.css';
import Plot from 'react-plotly.js';

class PiChart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      "PlotTitle":"PiChart",
      "traces": [
        {
          "type": "sunburst",
          "labels": ["Eve", "Cain", "Seth", "Enos", "Noam", "Abel", "Awan", "Enoch", "Azura"],
          "parents": ["", "Eve", "Eve", "Seth", "Seth", "Eve", "Eve", "Awan", "Eve"],
          "values": [65, 14, 12, 10, 2, 6, 6, 4, 4],
          "leaf": { "opacity": 0.4 },
          "marker": { "line": { "width": 2 } },
          "branchvalues": 'total'
        }]
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
}

export default PiChart;