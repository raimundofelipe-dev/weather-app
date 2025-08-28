
const btnBuscar = document.getElementById('btnBuscar');
const cityInput = document.getElementById('city');
const resultContainer = document.getElementById('result');


const API_KEY = 'c6d826e4cfc15d41fa7dedf57bcd0022';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

btnBuscar.addEventListener("click", async () => {
  const city = cityInput.value.trim();

  if (!city) {
    showError("Digite uma cidade para buscar.");
    return;
  }

  resultContainer.innerHTML = "<p>⏳ Buscando...</p>";
  await getWeather(city);
});

async function getWeather(city) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
        lang: 'pt'
      }
    });

    renderWeather(response.data);

  } catch (err) {
    if (err.response) {
      showError(`Erro HTTP ${err.response.status}: ${err.response.data.message}`);
    } else {
      showError('Erro: ' + err.message);
    }
  }
}

function renderWeather(data) {
  resultContainer.innerHTML = `
    <h3>${data.name}, ${data.sys.country}</h3>
    <p>🌡️ Temperatura: ${data.main.temp}°C</p>
    <p>🌡️ Sensação térmica: ${data.main.feels_like}°C</p>
    <p>💨 Velocidade do vento: ${data.wind.speed} m/s</p>
    <p>☁️ Condição: ${data.weather[0].description}</p>
    <p>⏰ Hora da atualização: ${formatDate(data.dt)}</p>
  `;
}

function showError(msg) {
  resultContainer.innerHTML = `<p class="error">⚠️ ${msg}</p>`;
}

function formatDate(timestamp) {
  return new Date(timestamp * 1000).toLocaleString("pt-BR");
}
