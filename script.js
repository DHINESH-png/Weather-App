 const weather = document.querySelector(".weather")
 const cityInput = document.querySelector(".inp")
 const card = document.querySelector(".card")
 const apikey = "f5f498c55dd973092653b58c538bf6b4";


 weather.addEventListener("submit",async event =>{

    event.preventDefault();

    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            weatherInfo(weatherData)
        }
        catch(error){
            console.error(error)
            displayError(error)
        }
    }
    else{
        displayError("Please enter a city")
    }
 })
 
 async function getWeatherData(city){
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

        const response = await fetch(apiUrl);
        if(!response.ok){
            throw new Error(`could not fetch weather from ${city}`)
        }
        return await response.json();
    }

 function weatherInfo(data){
    const { name : city, 
            main :{temp, humidity},
            weather: [{description,id}]} = data;
 

         card.textContent="";
         card.style.display="flex";

         const citydisp = document.createElement("h1");
         const tempdisp = document.createElement("p");
         const humiddisp = document.createElement("p");
         const skydisp = document.createElement("p");
         const emojidisp = document.createElement("p");

         citydisp.textContent= city;
         tempdisp.textContent=`${(temp - 273.15).toFixed(1)}°C`;
         humiddisp.textContent=`HUMIDITY: ${humidity}%`;
         skydisp.textContent=description;
         emojidisp.textContent=getEmoji(id);

        citydisp.classList.add("city");
        tempdisp.classList.add("temp");
        humiddisp.classList.add("humid");
        skydisp.classList.add("sky");
        emojidisp.classList.add("icon")

         card.appendChild(citydisp);
         card.appendChild(tempdisp);
         card.appendChild(humiddisp);
         card.appendChild(skydisp);
         card.appendChild(emojidisp);
}


 function getEmoji(weatherId){
    switch(true){
        case( weatherId >= 200 && weatherId < 300):
            return '⛈️';
        case( weatherId >= 300 && weatherId < 400):
            return '🌧️';
        case( weatherId >= 500 && weatherId < 600):
            return '🌧️';
        case( weatherId >= 600 && weatherId < 700):
            return '❄️';
        case( weatherId >= 700 && weatherId < 800):
            return '🌫️';
        case( weatherId === 800):
            return '🌤️';
        case( weatherId >= 800 && weatherId < 810):
            return '☁️';
        default:
            return "❓";
    }

 }

 function displayError(message){
    const errorMessage = document.createElement("p");
    errorMessage.textContent=message;
    errorMessage.classList.add("error");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorMessage);

 }
