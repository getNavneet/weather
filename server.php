<?php
// Get the query parameters from the client-side request
$city = $_GET['city']; // Assuming you're passing the city name as a parameter

// Replace 'YOUR_API_KEY' with your actual OpenWeather API key
$apiKey = 'e6d57368f53cc23a651607920b96b0e9';

// Build the URL for the OpenWeather API request
$url = 'https://api.openweathermap.org/data/2.5/weather?q=' . urlencode($city) . '&appid=' . $apiKey;

// Make the request to the OpenWeather API
$response = file_get_contents($url);

// Forward the response back to the client
echo $response;
?>
<!-- fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
https://api.openweathermap.org/data/2.5/weather?q= -->