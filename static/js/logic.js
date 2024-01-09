// Define the map
let myMap = L.map("map", {
    center: [37.77, -122.41],
    zoom: 5
  });
  
    // Add the base tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(myMap);
  
    // URL for earthquake data
    let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
  
    // Use D3 to fetch the JSON data
    d3.json(url).then(function(data) {
    // Loop through the earthquake data
    data.features.forEach(function(feature) {
        // Extract magnitude, depth, latitude, and longitude
        let magnitude = feature.properties.mag;
        let depth = feature.geometry.coordinates[2];
        let latitude = feature.geometry.coordinates[1];
        let longitude = feature.geometry.coordinates[0];

        // Customize marker size and color based on magnitude and depth
        let marker = L.circleMarker([latitude, longitude], {
        radius: magnitude * 5, // Adjust the multiplier as needed
        fillColor: getColor(magnitude), // Implement getColor function
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
        });

        // Bind popup with additional information
        marker.bindPopup(`<b>Magnitude:</b> ${magnitude}<br><b>Depth:</b> ${depth} km`);

        // Add marker to the map
        marker.addTo(myMap);
    });
  
    let legend = L.control({ position: "bottomright" });

    legend.onAdd = function () {
      // Customize the legend content as needed
      let div = L.DomUtil.create("div", "info legend");
    
      // Add legend entries using getColor function (assuming you have this function)
      let mags = ["-10-10", "10-30", "30-50", "50-70", "70-90", "90+"];
      let colors = ["#2cba00", "#a3ff00", "#fff400", "#ffa700","#ff5349","#ff0000"];
      let legendList = "<ul>";

      let legendInfo = "<h3>Magnitudes</h1>"
      "<div class=\"labels\">" +
        "<div class=\"min\">" + mags[0] + "</div>" +
        "<div class=\"max\">" + mags[mags.length - 1] + "</div>" +
      "</div>";
        
      div.innerHTML += legendInfo;

      mags.forEach(function (mag, i) {
        legendList +=
          "<li>" +
          "<span class=\"color-box\" style=\"background-color: " + colors[i] + "\"></span>" +
          mag +
          "</li>";
      });
    
      legendList += "</ul>";
      div.innerHTML += legendList;
      // Add more legend entries as needed
      return div;
    };
    
    legend.addTo(myMap);
    });
// Function to determine color based on depth
function getColor(magnitude) {
    switch(true) {
        case magnitude > 5:
            return "#ff0000";
        case magnitude > 4:
            return "#ff5349";
        case magnitude > 3:
            return "#ffa700";
        case magnitude > 2:
            return "#fff400";
        case magnitude > 1:
            return "#a3ff00";
        default:
            return "#2cba00"

    }
}