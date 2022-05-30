window.addEventListener("load", () => {
    let long;
    let lat;
    let temperatureDiscription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    let tempicon = document.getElementById('temp-icon');
    let Description = document.getElementById('description')

    searchButton.addEventListener('click', (e) =>
    {
        e.preventDefault();
        getWeather(searchInput.value);
        searchInput.value = '';

    });


    const getWeather=async (city)=>
    {
        try{
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=56b7a1d8ffcdc869f2256230b7b53ab0`)
            
        

        const weatherData = await response.json();
        console.log(weatherData);
        const{country}=weatherData.sys;
        const{feels_like}=weatherData.main;
        const{id,main,description}=weatherData.weather[0];
        temperatureDegree.textContent = Math.round(feels_like-273);
        locationTimezone.textContent = country;
        temperatureDiscription.textContent = main;
        Description.textContent = description;

        if(id<300 && id>200)
                {
                   tempicon.src = "/img/thunderstorm.svg"
                }
                else if(id<400 && id>300)
                {
                   tempicon.src = "/img/cloud-rain-solid.svg"
                }
                else if(id<600 && id>500)
                {
                   tempicon.src = "/img/rain.svg";
                }
                
                else if(id<800 && id>600)
                {
                   tempicon.src = "/img/cold.svg"
                }
                else if(id==850)
                {
                    tempicon.src="/img/clear.svg"
                }
            }
            catch (error){
                alert('City not found')
            }
    };
    

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.openweathermap.org/data/2.5/weather?q=lat,lon&appid=56b7a1d8ffcdc869f2256230b7b53ab0`

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data)

                const { feels_like } = data.main;
                const { country } = data.sys;
                const { id,main,description } = data.weather[0];

                temperatureDegree.textContent = Math.round(feels_like-273);
                locationTimezone.textContent = country;
                temperatureDiscription.textContent = main;
                Description.textContent = description;

                if(id<300 && id>200)
                {
                   tempicon.src = "/img/thunderstorm.svg"
                }
                else if(id<400 && id>300)
                {
                   tempicon.src = "/img/cloud-rain-solid.svg"
                }
                else if(id<600 && id>500)
                {
                   tempicon.src = "/img/rain.svg";
                }
                
                else if(id<700 && id>600)
                {
                   tempicon.src = "/img/cold.svg"
                }
                else if(id<810 && id>700)
                {
                    tempicon.src="/img/clear.svg"
                }
            })
        });
    }else{
        h1.textContent = "This is not working"
    }

    
});