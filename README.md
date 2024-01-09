# leaftlet-challenge
# Instructions

## Part 1: Create the Earthquake Visualization

### Get the Earthquake Dataset

1. Visit the [USGS GeoJSON Feed](Links to an external site.) page.
2. Choose a dataset (e.g., "All Earthquakes from the Past 7 Days").
3. Click on the dataset to obtain the JSON representation.

### Import and Visualize the Data

- Use Leaflet to create a map that plots all earthquakes based on longitude and latitude.
- Reflect earthquake magnitude with marker size and depth with marker color.
- Earthquakes with higher magnitudes should appear larger, and those with greater depth should appear darker.
- The depth of the earth can be found as the third coordinate for each earthquake.
- Include popups for additional earthquake information.
- Create a legend to provide context for map data.

## Part 2: Gather and Plot More Data (Optional)

### Plot Tectonic Plates Dataset

1. Obtain the tectonic plates dataset from [fraxen/tectonicplates](https://github.com/fraxen/tectonicplates).
2. Plot tectonic plates on the map alongside the earthquake data.

### Additional Tasks

- This part is optional and does not earn extra points.
- Challenge yourself to boost your skills.
- The produced map should resemble the example in "5-Advanced" screenshot.

#### Perform the Following Tasks:

1. Plot the tectonic plates dataset on the map in addition to the earthquakes.
2. Add other base maps for users to choose from.
3. Put each dataset into separate overlays that can be turned on and off independently.
4. Add layer controls to the map.