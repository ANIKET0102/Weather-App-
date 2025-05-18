document.getElementById("getWeatherBtn").addEventListener("click", async function () {
    const location = document.getElementById("locationInput").value.trim();
    const resultDiv = document.getElementById("result");

    if (!location) {
        resultDiv.innerHTML = "Please enter a location.";
        return;
    }

    const apiKey = "adcadd6946aa4c2bb73155019251705";
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Location not found");

        const data = await response.json();
        const temp = data.current.temp_c;
        const condition = data.current.condition.text;
        const icon = data.current.condition.icon;

        resultDiv.innerHTML = `
            <p><strong>${data.location.name}, ${data.location.country}</strong></p>
            <div style="display: flex; align-items: center; justify-content: center; gap: 10px;">
                <img src="${icon}" alt="${condition}" style="vertical-align: middle;" />
                <span>${temp}°C - ${condition}</span>
            </div>
        `;
    } catch (error) {
        resultDiv.innerHTML = "Could not retrieve weather data. Please check the location.";
    }
});
