const apiKey = "6ea31ec3e1c7606eb89a2f009f3f265f";

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
  
const url = (city)=> `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;


async function getWeatherByLocation(city){
     
         const resp = await fetch(url(city), {
             origin: "cros" });
         const respData = await resp.json();
     
           addWeatherToPage(respData);
          
     }

      function addWeatherToPage(data){
          const temp = Ktoc(data.main.temp);
          if(temp>20)
          {
            document.body.style.backgroundImage = "url('sun.jpg')";
            document.body.style.backgroundRepeat = "no-repeat";
            document.body.style.backgroundSize="cover";
          }
          else if(temp<20)
          {
            document.body.style.backgroundImage = "url('snow.jpg')";
            document.body.style.backgroundRepeat = "no-repeat";
            document.body.style.backgroundSize="cover";

          }
          const weather = document.createElement('div')
          weather.classList.add('weather');

          weather.innerHTML = `
          <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}°C <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2>
          <small>${data.weather[0].main}</small>
          
          `;


        //   cleanup 
          main.innerHTML= "";
           main.appendChild(weather);
      };


     function Ktoc(K){
        
         return Math.floor(K - 273.15);
         
     }



     form.addEventListener('submit',(e) =>{
        e.preventDefault();

        const city = search.value;

        if(city){
            getWeatherByLocation(city)
        }

     });