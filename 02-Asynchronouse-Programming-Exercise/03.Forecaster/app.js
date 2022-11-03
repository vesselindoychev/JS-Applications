function attachEvents() {
    let locationNameInput = document.getElementById('location');
    document.getElementById('submit').addEventListener('click', getWeatherHandler);
    let weatherConditionSymbols = {
        'Sunny': '☀',
        'Partly sunny': '⛅',
        'Overcast': '☁',
        'Rain': '☂'
    }

    function getWeatherHandler() {
        let forecastDiv = document.getElementById('forecast');
        forecastDiv.style.display = 'block';

        fetch(`http://localhost:3030/jsonstore/forecaster/locations`)
            .then(body => body.json())
            .then(locations => {
                let currentLocation = locations.find(x => x.name === locationNameInput.value);
                return fetch(`http://localhost:3030/jsonstore/forecaster/today/${currentLocation.code}`)
                    .then(body => body.json())
                    .then(forecastInfo => ({code: currentLocation.code, forecastInfo}));
            })
            // .then(body => body.json())
            .then(({code, forecastInfo}) => {
                let currentForecastDiv = document.getElementById('current');



                locationNameInput.value = '';
                
                Array.from(currentForecastDiv.children).forEach((el, index) => {
                    // index !== 0 ? el.remove() : el
                    el.remove()
                })
                
                let locationWeatherCondition = forecastInfo.forecast.condition;
                let locationName = forecastInfo.name;
                let forecastLowTemp = forecastInfo.forecast.low;
                let forecastHighTemp = forecastInfo.forecast.high;

                let forecastLocationInfoDiv = createForecastDivWithSpanElements(weatherConditionSymbols, locationWeatherCondition, locationName, forecastLowTemp, forecastHighTemp);
                
                currentForecastDiv.appendChild(forecastLocationInfoDiv);
                
                return fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${code}`)
                
            })
            .then(body => body.json())
            .then(upcomingForecast => {
                console.log(upcomingForecast)

                let upcomingDiv = document.getElementById('upcoming');
                

                Array.from(upcomingDiv.children).forEach((el, index) => {
                    // index !== 0 ? el.remove() : el
                    el.remove()
                })

                let upcomingForecastInfoDiv = createUpcomingDiv(upcomingForecast.forecast)
                upcomingDiv.appendChild(upcomingForecastInfoDiv);

            })
            .catch(error => {
                let upcomingDiv = document.getElementById('upcoming');
                let currentForecastDiv = document.getElementById('current');
                upcomingDiv.innerHTML = '';
                currentForecastDiv.innerHTML = '';
                let errorDiv = document.createElement('div');
                
                errorDiv.setAttribute('class', 'label error');
                errorDiv.textContent = 'Error';
                currentForecastDiv.appendChild(errorDiv);
                
            })
            
            

            
    }
    function createUpcomingDiv(forecastObj) {
        let mainDiv = document.createElement('div');
        mainDiv.setAttribute('class', 'forecast-info');

        let firstUpcomingSpan = createOnlySpansWithClassAndAppendChilds('upcoming', forecastObj[0]);
        let secondUpcomingSpan = createOnlySpansWithClassAndAppendChilds('upcoming', forecastObj[1]);
        let thirdUpcomingSpan = createOnlySpansWithClassAndAppendChilds('upcoming', forecastObj[2]);
        
        mainDiv.appendChild(firstUpcomingSpan);
        mainDiv.appendChild(secondUpcomingSpan);
        mainDiv.appendChild(thirdUpcomingSpan);

        return mainDiv;
    }

    function createOnlySpansWithClassAndAppendChilds(className, forecastObj) {

        let firstSpan = document.createElement('span');
        firstSpan.setAttribute('class', className);

        let firstSymbolUpcomingSpanChild = createSpanElementsWithClass('forecast-data', weatherConditionSymbols[forecastObj.condition]);
        let firstTemperatureSpanChild = createSpanElementsWithClass('forecast-data', `${forecastObj.low}°/${forecastObj.high}°`);
        let firstConditionSpanChild = createSpanElementsWithClass('forecast-data', forecastObj.condition);

        firstSpan.appendChild(firstSymbolUpcomingSpanChild);
        firstSpan.appendChild(firstTemperatureSpanChild);
        firstSpan.appendChild(firstConditionSpanChild);

        return firstSpan;

    }

    function createForecastDivWithSpanElements(weatherObj, locationWeatherCondition, locationName, forecastLowTemp, forecastHighTemp) {
        let mainDiv = document.createElement('div');
        mainDiv.setAttribute('class', 'forecasts');

        let currentConditionSymbolSpan = document.createElement('span');
        currentConditionSymbolSpan.setAttribute('class', 'condition symbol');
        currentConditionSymbolSpan.textContent = weatherObj[locationWeatherCondition];

        let currentForecastConditionSpan = document.createElement('span');
        currentForecastConditionSpan.setAttribute('class', 'condition');

        let citySpan = createSpanElementsWithClass('forecast-data', locationName)
        let temperatureSpan = createSpanElementsWithClass('forecast-data', `${forecastLowTemp}°/${forecastHighTemp}°`)
        let weatherCondtitionSpan = createSpanElementsWithClass('forecast-data', locationWeatherCondition);

        currentForecastConditionSpan.appendChild(citySpan);
        currentForecastConditionSpan.appendChild(temperatureSpan);
        currentForecastConditionSpan.appendChild(weatherCondtitionSpan);

        mainDiv.appendChild(currentConditionSymbolSpan);
        mainDiv.appendChild(currentForecastConditionSpan);


        return mainDiv

    }

    function createSpanElementsWithClass(className, text) {
        let spanEl = document.createElement('span');
        spanEl.setAttribute('class', className);
        spanEl.textContent = text;

        return spanEl;
    }

    
}

attachEvents();