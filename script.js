// OpenWeatherMap API 키
const apiKey = 'a152b7a749e8aa04db0b12b472743ceb';

// DOM 요소 가져오기
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const weatherDescription = document.getElementById('weather-description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');

// 도시 이름 매핑 테이블
const cityMapping = {
    '서울시': 'Seoul',
    '부산시': 'Busan',
    '대구시': 'Daegu',
    // 필요한 다른 도시들도 추가 가능
};

// 날씨 데이터 가져오는 함수 수정
async function getWeather(city) {
    try {
        // 입력값 디버깅
        console.log('입력된 도시:', city);
        console.log('매핑된 영어 도시명:', cityMapping[city]);
        
        const cityEnglish = cityMapping[city] || city;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityEnglish}&appid=${apiKey}&units=metric&lang=kr`;
        console.log('요청 URL:', url);
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(`API 에러: ${data.message}`);
        }
        
        console.log('받은 데이터:', data); // 성공시 데이터 확인
        updateWeatherInfo(data);
        
    } catch (error) {
        console.error('상세 에러:', error);
        alert('날씨 데이터를 가져오는데 실패했습니다. 개발자 도구의 콘솔을 확인해주세요.');
    }
}


// 날씨 정보 업데이트 함수
function updateWeatherInfo(data) {
    cityName.textContent = data.name;
    temperature.textContent = `Temperature: ${data.main.temp}°C`;
    weatherDescription.textContent = `Weather: ${data.weather[0].description}`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
}

// 검색 버튼 클릭 이벤트 리스너 추가
searchBtn.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        getWeather(city);
    } else {
        alert('Please enter a city name.');
    }
});
