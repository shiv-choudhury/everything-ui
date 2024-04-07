import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function GraphComponent() {
  const options = {
    title: {
      text: "Commit History"
    },
    yAxis: {
      allowDecimals: false,
      title: {
        text: "Commits"
      }
    },
    series: [
      {
        data: [1, 10, 3, 4, 5, 6, 1, 8, 2]
      }
    ],
    credits: {
      enabled: false
    }
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

function BarGraph() {
  const options = {
    chart: {
      type: "column"
    },

    title: {
      text: "Olympic Games all-time medal table, grouped by continent",
      align: "left"
    },

    xAxis: {
      categories: ["Gold", "Silver", "Bronze"]
    },

    yAxis: {
      allowDecimals: false,
      min: 0,
      title: {
        text: "Count medals"
      }
    },

    tooltip: {
      format:
        "<b>{key}</b><br/>{series.name}: {y}<br/>" + "Total: {point.stackTotal}"
    },

    plotOptions: {
      column: {
        stacking: "normal"
      }
    },

    series: [
      {
        name: "Norway",
        data: [148, 133, 124],
        stack: "Europe"
      },
      {
        name: "Germany",
        data: [102, 98, 65],
        stack: "Europe"
      },
      {
        name: "United States",
        data: [113, 122, 95],
        stack: "North America"
      },
      {
        name: "Canada",
        data: [77, 72, 80],
        stack: "North America"
      }
    ],
    credits: {
      enabled: false
    }
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

export { GraphComponent, BarGraph };
