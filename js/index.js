let actual = () => {
    let date = new Date().toLocaleString("es-ES", {
        timeStyle: 'short',
        dateStyle: "long"
    })
    return date
}

let getDate = () => {
    let date = new Date()
    return `${date.getDate()}/${('0' + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()}`
}   

let cleanup = () => {
    let container = document.getElementById('container')
    let loader = document.getElementById('loader')

    loader.style.display = 'none'
    container.style.display = 'flex'
}

let datosWeather = (data) => {

    console.log(data);

    let time = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1)
    let icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`

    const whatherData = {
        location: data.name,
        description: time,
        temperature: `${data.main.temp.toFixed(1)}°`,
        temperature_max: `${data.main.temp_max.toFixed(1)}°`,
        temperature_min: `${data.main.temp_min.toFixed(1)}°`,
        humidity: `${data.main.humidity}%`,
        pressure: `${data.main.pressure} Pa`,
        wind: `${data.wind.speed} Km/h`,
        date: actual(),
    }

    Object.keys(whatherData).forEach(key =>{
        document.getElementById(key).textContent = whatherData[key]
    })

    document.getElementById('icon').innerHTML = `
    <img src="${icon}" class="icon">`

    cleanup()

}

const api_key = '3f01e8bf3107b0802f59a9bcbaa58e63'

let fetchData = async (position) => {

    const {latitude , longitude} = position.coords;

    const respuesta = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}&units=metric&lang=es`)
    
    const data = await respuesta.json()

    datosWeather(data) 
}


window.onload = () => {
    navigator.geolocation.getCurrentPosition(fetchData)
}
