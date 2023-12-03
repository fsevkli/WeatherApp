# Weather Forecast Web Application

## Project Overview

This web application is designed to provide users with real-time weather updates, leveraging Flask, a Python micro-framework. It features location-based weather data, search functionality for custom locations, and a dynamic background that changes based on day or night.

## Key Features

- **Real-Time Weather Updates**: Fetches current weather data using the user's IP or a specified location.
- **Hourly and Daily Forecasts**: Offers detailed weather forecasts for up to 14 days, including hourly data.
- **Location Detection**: Automatically detects the user's location for relevant weather updates.
- **Custom Location Search**: Allows users to search for weather data in different locations.
- **Custom Weather Map**: View the wind, temperature, and pressure map of different locations.
- **Dynamic Backgrounds**: The UI changes between day and night modes based on real-time data.
- **Weather Charts**: View different weather charts from hourly temperature changes to Humidity changes.


## Prerequisites

- [Python 3.11.x](https://www.python.org/downloads/release/python-3116/) installed on your system
- pip (Python package manager)
- Internet connection

## Installation Instructions

### Step 1: Obtain the Source Code

Clone the repository using Git or download the ZIP file of the source code and extract it.

To clone the repository, open Command Prompt or PowerShell and execute:

`git clone https://github.com/fsevkli/WeatherApp.git`


Navigate to the directory where the repository has been cloned.


### Step 2: Install Dependencies

Install the required dependencies using pip. Open Command Prompt or PowerShell in the application directory and run:

`pip install -r requirements.txt`


### Step 3: Configure the Application

Set the `FLASK_APP` environment variable to point to your `app.py` file.

In Terminal:
```bash
export FLASK_APP="app.py"
```

In PowerShell:
```bash
$env:FLASK_APP="app.py"
```


### Step 4: Launch the Application
Run the application using the Flask command:

```bash
flask run
```

After executing the command, Flask will start a web server.

### Step 5: Accessing the Application
Open your web browser and go to the following URL to use the application:

`http://127.0.0.1:5000`


You should now be able to interact with the Flask Weather Application.

### For Detailed Instruction:

[CLICK HERE](https://docs.google.com/document/d/1LG7uygfYRUJSqw9FJ0B9F0kqjMl15eIOQHYW3GCBmpE/edit?usp=sharing)

## Troubleshooting

If you encounter any issues:

- Ensure that Python and pip are correctly installed and accessible from the command line.
- Check if all dependencies are installed without errors.
- Verify that the `API_KEY` in `app.py` is valid and not expired.
- Make sure you're running the commands in the directory that contains `app.py`.

## How to Use

- **Home Page**: Shows weather based on the user's location.
- **Search Function**: Input a location to get its weather forecast.
- **Date Selector**: Choose a date for hourly weather data.
- **Day/Night Checker**: Automatically adjusts UI based on the time of the day.

## Endpoints

- `GET /`: Main page with default weather data.
- `GET /default`: Weather data based on the user's location.
- `POST /getDate`: Hourly data for a selected date.
- `GET /CheckSun`: Determines current time phase (day/night).
- `GET /location`: Weekly forecast for a specified or current location.

## Contributing

Contributions are welcome. Ensure adherence to coding standards, documentation norms, and thorough testing.

## License
Licensed under MIT license. See the LICENSE file for more details.
