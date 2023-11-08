

/**
 * Renders a chart using ZingChart
 * with the hourly date from hourlytemp
 * and time from timstamp
 */
function hourlyChart(){
    console.log(hourlytemp);
    var myConfig = {
      "globals": {
        "font-family": "Roboto"
      },
      "graphset": [{
        "type": "area",
        "background-color": "#fff",
        "utc": true,
        "title": {
          "y": "15px",
          "text": "Hourly Temperature Change",
          "background-color": "none",
          "font-color": "#05636c",
          "font-size": "24px",
          "height": "25px",
          "adjust-layout": true
        },
        "plotarea": {
          "margin-top": "10%",
          "margin-right": "dynamic",
          "margin-bottom": "dynamic",
          "margin-left": "dynamic",
          "adjust-layout": true
        },
        "labels": [{
            "text": "",
            "default-value": "",
            "color": "#8da0cb",
            "x": "20%",
            "y": 50,
            "width": 120,
            "text-align": "left",
            "bold": 0,
            "font-size": "14px",
            "font-weight": "bold"
          },
          
        ],
        "scale-x": {
          "label": {
            "text": "Time",
            "font-size": "14px",
            "font-weight": "normal",
            "offset-x": "10%",
            "font-angle": 360
          },
          "item": {
            "text-align": "center",
            "font-color": "#05636c"
          },
          "zooming": 1,
          "max-labels": 12,
          "labels": [
            timestamp[0],
            timestamp[1],
            timestamp[2],
            timestamp[3],
            timestamp[4],
            timestamp[5],
            timestamp[6],
            timestamp[7],
            timestamp[8],
            timestamp[9],
            timestamp[10],
            timestamp[11],
            timestamp[12],
            timestamp[13],
            timestamp[14],
            timestamp[15],
            timestamp[16],
            timestamp[17],
            timestamp[18],
            timestamp[19],
            timestamp[20],
            timestamp[21],
            timestamp[22],
            timestamp[23]
          ],
          "max-items": 12,
          "items-overlap": true,
          "guide": {
            "line-width": "0px"
          },
          "tick": {
            "line-width": "2px"
          },
        },
        "crosshair-x": {
          "line-color": "#fff",
          "line-width": 1,
          "plot-label": {
            "visible": false
          }
        },
        "scale-y": {
          "values": "0:120:50",
          "item": {
            "font-color": "#05636c",
            "font-weight": "normal"
          },
          "label": {
            "text": "Temperature",
            "font-size": "14px"
          },
          "guide": {
            "line-width": "0px",
            "alpha": 0.2,
            "line-style": "dashed"
          }
        },
        "plot": {
            animation: {
                effect: "ANIMATION_SLIDE_LEFT"
            },
        
          "line-width": 2,
          "marker": {
            "size": 1,
            "visible": false
          },
          "tooltip": {
            "font-family": "Roboto",
            "font-size": "15px",
            "text": "It feels like %v F at %Time",
            "text-align": "left",
            "border-radius": 5,
            "padding": 10
          }
        },
        "series": [{
            "values": [
              hourlytemp[0],
              hourlytemp[1],
              hourlytemp[2],
              hourlytemp[3],
              hourlytemp[4],
              hourlytemp[5],
              hourlytemp[6],
              hourlytemp[7],
              hourlytemp[8],
              hourlytemp[9],
              hourlytemp[10],
              hourlytemp[11],
              hourlytemp[12],
              hourlytemp[13],
              hourlytemp[14],
              hourlytemp[15],
              hourlytemp[16],
              hourlytemp[17],
              hourlytemp[18],
              hourlytemp[19],
              hourlytemp[20],
              hourlytemp[21],
              hourlytemp[22],
              hourlytemp[23],
             
            ],
            "Time": [
              timestamp[0],
              timestamp[1],
              timestamp[2],
              timestamp[3],
              timestamp[4],
              timestamp[5],
              timestamp[6],
              timestamp[7],
              timestamp[8],
              timestamp[9],
              timestamp[10],
              timestamp[11],
              timestamp[12],
              timestamp[13],
              timestamp[14],
              timestamp[15],
              timestamp[16],
              timestamp[17],
              timestamp[18],
              timestamp[19],
              timestamp[20],
              timestamp[21],
              timestamp[22],
              timestamp[23],
            ],
            "line-color": "#fc8d62",
            "aspect": "spline",
            "background-color": "#fc8d62",
            "alpha-area": ".5",
            "font-family": "Roboto",
            "font-size": "14px",
            "text": "returns"
          }
        ]
      }]
    };
  
    zingchart.render({
      id: 'chart',
      data: myConfig,
      height: '100%',
      width: '100%'
    });
  }

 /**
 * Renders a chart using ZingChart
 * with the precipation hourly date from precipation
 * and time from timstamp
 */
function precipationChart(){
    var myConfig = {
      "globals": {
        "font-family": "Roboto"
      },
      "graphset": [{
        "type": "area",
        "background-color": "#fff",
        "utc": true,
        "title": {
          "y": "15px",
          "text": "Hourly Precipation Change",
          "background-color": "none",
          "font-color": "#05636c",
          "font-size": "24px",
          "height": "25px",
          "adjust-layout": true
        },
        "plotarea": {
          "margin-top": "10%",
          "margin-right": "dynamic",
          "margin-bottom": "dynamic",
          "margin-left": "dynamic",
          "adjust-layout": true
        },
        "labels": [{
            "text": "",
            "default-value": "",
            "color": "#8da0cb",
            "x": "20%",
            "y": 50,
            "width": 120,
            "text-align": "left",
            "bold": 0,
            "font-size": "14px",
            "font-weight": "bold"
          },
          
        ],
        "scale-x": {
          "label": {
            "text": "Time",
            "font-size": "14px",
            "font-weight": "normal",
            "offset-x": "10%",
            "font-angle": 360
          },
          "item": {
            "text-align": "center",
            "font-color": "#05636c"
          },
          "zooming": 1,
          "max-labels": 12,
          "labels": [
            timestamp[0],
            timestamp[1],
            timestamp[2],
            timestamp[3],
            timestamp[4],
            timestamp[5],
            timestamp[6],
            timestamp[7],
            timestamp[8],
            timestamp[9],
            timestamp[10],
            timestamp[11],
            timestamp[12],
            timestamp[13],
            timestamp[14],
            timestamp[15],
            timestamp[16],
            timestamp[17],
            timestamp[18],
            timestamp[19],
            timestamp[20],
            timestamp[21],
            timestamp[22],
            timestamp[23]
          ],
          "max-items": 12,
          "items-overlap": true,
          "guide": {
            "line-width": "0px"
          },
          "tick": {
            "line-width": "2px"
          },
        },
        "crosshair-x": {
          "line-color": "#fff",
          "line-width": 1,
          "plot-label": {
            "visible": false
          }
        },
        "scale-y": {
          "values": "0:120:50",
          "item": {
            "font-color": "#05636c",
            "font-weight": "normal"
          },
          "label": {
            "text": "Precipation in inches",
            "font-size": "14px"
          },
          "guide": {
            "line-width": "0px",
            "alpha": 0.2,
            "line-style": "dashed"
          }
        },
        "plot": {
            animation: {
                effect: "ANIMATION_SLIDE_LEFT"
            },        
          "line-width": 2,
          "marker": {
            "size": 1,
            "visible": false
          },
          "tooltip": {
            "font-family": "Roboto",
            "font-size": "15px",
            "text": "Precipation in inches %v F at %Time",
            "text-align": "left",
            "border-radius": 5,
            "padding": 10
          }
        },
        "series": [{
            "values": [
                precipation[0],
                precipation[1],
                precipation[2],
                precipation[3],
                precipation[4],
                precipation[5],
                precipation[6],
                precipation[7],
                precipation[8],
                precipation[9],
                precipation[10],
                precipation[11],
                precipation[12],
                precipation[13],
                precipation[14],
                precipation[15],
                precipation[16],
                precipation[17],
                precipation[18],
                precipation[19],
                precipation[20],
                precipation[21],
                precipation[22],
                precipation[23],
             
            ],
            "Time": [
              timestamp[0],
              timestamp[1],
              timestamp[2],
              timestamp[3],
              timestamp[4],
              timestamp[5],
              timestamp[6],
              timestamp[7],
              timestamp[8],
              timestamp[9],
              timestamp[10],
              timestamp[11],
              timestamp[12],
              timestamp[13],
              timestamp[14],
              timestamp[15],
              timestamp[16],
              timestamp[17],
              timestamp[18],
              timestamp[19],
              timestamp[20],
              timestamp[21],
              timestamp[22],
              timestamp[23],
            ],
            "line-color": "#0000FF",
            "aspect": "spline",
            "background-color": "#0000FF",
            "alpha-area": ".5",
            "font-family": "Roboto",
            "font-size": "14px",
            "text": "returns"
          }
        ]
      }]
    };
  
    zingchart.render({
      id: 'chart',
      data: myConfig,
      height: '100%',
      width: '100%'
    });
  }
  /**
 * Renders a chart using ZingChart
 * with the precipation hourly date from precipation
 * and time from timstamp
 */
function humidityChart(){
    var myConfig = {
      "globals": {
        "font-family": "Roboto"
      },
      "graphset": [{
        "type": "area",
        "background-color": "#fff",
        "utc": true,
        "title": {
          "y": "15px",
          "text": "Hourly Humidity Change",
          "background-color": "none",
          "font-color": "#05636c",
          "font-size": "24px",
          "height": "25px",
          "adjust-layout": true
        },
        "plotarea": {
          "margin-top": "10%",
          "margin-right": "dynamic",
          "margin-bottom": "dynamic",
          "margin-left": "dynamic",
          "adjust-layout": true
        },
        "labels": [{
            "text": "",
            "default-value": "",
            "color": "#8da0cb",
            "x": "20%",
            "y": 50,
            "width": 120,
            "text-align": "left",
            "bold": 0,
            "font-size": "14px",
            "font-weight": "bold"
          },
          
        ],
        "scale-x": {
          "label": {
            "text": "Time",
            "font-size": "14px",
            "font-weight": "normal",
            "offset-x": "10%",
            "font-angle": 360
          },
          "item": {
            "text-align": "center",
            "font-color": "#05636c"
          },
          "zooming": 1,
          "max-labels": 12,
          "labels": [
            timestamp[0],
            timestamp[1],
            timestamp[2],
            timestamp[3],
            timestamp[4],
            timestamp[5],
            timestamp[6],
            timestamp[7],
            timestamp[8],
            timestamp[9],
            timestamp[10],
            timestamp[11],
            timestamp[12],
            timestamp[13],
            timestamp[14],
            timestamp[15],
            timestamp[16],
            timestamp[17],
            timestamp[18],
            timestamp[19],
            timestamp[20],
            timestamp[21],
            timestamp[22],
            timestamp[23]
          ],
          "max-items": 12,
          "items-overlap": true,
          "guide": {
            "line-width": "0px"
          },
          "tick": {
            "line-width": "2px"
          },
        },
        "crosshair-x": {
          "line-color": "#fff",
          "line-width": 1,
          "plot-label": {
            "visible": false
          }
        },
        "scale-y": {
          "values": "0:120:50",
          "item": {
            "font-color": "#05636c",
            "font-weight": "normal"
          },
          "label": {
            "text": "Humidity",
            "font-size": "14px"
          },
          "guide": {
            "line-width": "0px",
            "alpha": 0.2,
            "line-style": "dashed"
          }
        },
        "plot": {
            animation: {
                effect: "ANIMATION_SLIDE_LEFT"
            },
        
          "line-width": 2,
          "marker": {
            "size": 1,
            "visible": false
          },
          "tooltip": {
            "font-family": "Roboto",
            "font-size": "15px",
            "text": "humidity  %v at %Time",
            "text-align": "left",
            "border-radius": 5,
            "padding": 10
          }
        },
        "series": [{
            "values": [
                humidity[0],
                humidity[1],
                humidity[2],
                humidity[3],
                humidity[4],
                humidity[5],
                humidity[6],
                humidity[7],
                humidity[8],
                humidity[9],
                humidity[10],
                humidity[11],
                humidity[12],
                humidity[13],
                humidity[14],
                humidity[15],
                humidity[16],
                humidity[17],
                humidity[18],
                humidity[19],
                humidity[20],
                humidity[21],
                humidity[22],
                humidity[23],
             
            ],
            "Time": [
              timestamp[0],
              timestamp[1],
              timestamp[2],
              timestamp[3],
              timestamp[4],
              timestamp[5],
              timestamp[6],
              timestamp[7],
              timestamp[8],
              timestamp[9],
              timestamp[10],
              timestamp[11],
              timestamp[12],
              timestamp[13],
              timestamp[14],
              timestamp[15],
              timestamp[16],
              timestamp[17],
              timestamp[18],
              timestamp[19],
              timestamp[20],
              timestamp[21],
              timestamp[22],
              timestamp[23],
            ],
            "line-color": "#FFFF00",
            "aspect": "spline",
            "background-color": "#FFFF00",
            "alpha-area": ".5",
            "font-family": "Roboto",
            "font-size": "14px",
            "text": "returns"
          }
        ]
      }]
    };
  
    zingchart.render({
      id: 'chart',
      data: myConfig,
      height: '100%',
      width: '100%'
    });
  }