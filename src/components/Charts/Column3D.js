import React from "react";


// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import Column2D from "fusioncharts/fusioncharts.charts";

// Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

// STEP 2 - Chart Data


// STEP 3 - Creating the JSON object to store the chart configurations


const chartCom = ({data})=>{
  const chartConfigs = {
    type: "column3d", // The chart type
    width: "100%", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        //Set the chart caption
        caption: "Most popular Repos",
       //Set the theme for your chart
        // theme: "fusion",
        // removeing decimal from chat value
        // decimals:0,
        // set radius of chart
        // pieRadius:'45%',
        //Set the chart subcaption
        // subCaption: "In MMbbl = One Million barrels",
        //Set the x-axis name
        xAxisName: "Repos",
        //Set the y-axis name
        yAxisName: "Stars",
        // setting font size of axies
        xAxisNameFontSize:"16px",
        yAxisNameFontSize:"16px",
        // numberSuffix: "K",

      },
      // Chart Data
      data
    }
  };
  return (<ReactFC {...chartConfigs} />);
}

// STEP 4 - Creating the DOM element to pass the react-fusioncharts component

export default chartCom;
