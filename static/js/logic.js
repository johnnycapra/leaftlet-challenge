// Define the map
let myMap = L.map("map", {
    center: [37.77, -122.41],
    zoom: 5
});

// Base tile layers

let satelliteLayer = L.tileLayer("https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}", {
    attribution: '© Google',
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

let grayscaleLayer = L.tileLayer("https://{s}.tile.grayscale.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '© OpenStreetMap contributors'
});

let outdoorsLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '© OpenStreetMap contributors'
});

// Add the base tile layers to the map
satelliteLayer.addTo(myMap);

// Overlay layers
let earthquakeLayer = L.layerGroup().addTo(myMap);
let tectonicPlatesLayer = L.layerGroup().addTo(myMap);

// URL for tectonic plates data
let tectonicPlatesURL = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

// Use D3 to fetch the JSON tectonic plates data
d3.json(tectonicPlatesURL).then(function (platesData) {
    L.geoJSON(platesData, {
        style: function (feature) {
            return {
                color: "orange",
                weight: 2
            };
        }
    }).addTo(tectonicPlatesLayer);
});

// URL for earthquake data
let earthquakeURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Use D3 to fetch the JSON earthquake data
d3.json(earthquakeURL).then(function (data) {
// Loop through the earthquake data
data.features.forEach(function (feature) {
    // Extract magnitude, depth, latitude, and longitude
    let magnitude = feature.properties.mag;
    let depth = feature.geometry.coordinates[2];
    let latitude = feature.geometry.coordinates[1];
    let longitude = feature.geometry.coordinates[0];

    // Customize marker size and color based on magnitude and depth
    let marker = L.circleMarker([latitude, longitude], {
        radius: magnitude * 5, // Adjust the multiplier as needed
        fillColor: getColor(depth), // Implement getColor function
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    });

    // Bind popup with additional information
    marker.bindPopup(`<b>Magnitude:</b> ${magnitude}<br><b>Depth:</b> ${depth} km<br><b>Location:</b> ${latitude}, ${longitude}`);

    // Add marker to the earthquake layer
    marker.addTo(earthquakeLayer);
});

let legend = L.control({ position: "bottomright" });

legend.onAdd = function () {

    // Customize the legend content as needed
    let div = L.DomUtil.create("div", "info legend");

    // Add legend entries using getColor function (assuming you have this function)
    let depthChart = ["-10-10", "10-30", "30-50", "50-70", "70-90", "90+"];
    let colors = ["#95FA09", "#D5F60A", "#F5D611", "#FBA921","#FA914B","#FC4653"];
    let legendList = "<ul>";

    let legendInfo = "<h3>Legend</h1>" 

    
    div.innerHTML += legendInfo;

    depthChart.forEach(function (depths, i) {
    legendList +=
        "<li>" +
        "<span class=\"color-box\" style=\"background-color: " + colors[i] + "\"></span>" +
        depths +
        "</li>";
    });

    legendList += "</ul>";
    div.innerHTML += legendList;
    // Add more legend entries as needed
    return div;
};

legend.addTo(myMap);
});

// Base maps and overlay maps for layer control
let baseMaps = {
    "Satellite": satelliteLayer,
    "Grayscale": grayscaleLayer,
    "Outdoors": outdoorsLayer
};

let overlayMaps = {
    "Earthquakes": earthquakeLayer,
    "Tectonic Plates": tectonicPlatesLayer
};

// Add layer control to the map
L.control.layers(baseMaps, overlayMaps).addTo(myMap);

function getColor(depth) {
    switch(true) {
        case depth >= 90:
            return "#FC4653";
        case (depth >= 70 && depth < 90):
            return "#FA914B";
        case (depth >= 50 && depth < 70):
            return "#FBA921";
        case (depth >= 30 && depth < 50):
            return "#F5D611";
        case (depth >= 10 && depth < 30):
            return "#D5F60A";
        case (depth > -10 && depth < 10):
            return "#95FA09"
        default:
            return "black";

    }
}