import React, { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { Box, Card, CardContent, Typography } from "@mui/material";

const containerStyle = {
  width: "100%",
  height: "500px",
};

export default function GoogleMapComponent({ locations }) {
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <Box>
      <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={locations[0]}
          zoom={10}
        >
          {locations.map((loc, index) => (
            <Marker
              key={index}
              position={loc}
              onClick={() => setSelectedLocation(loc)}
            />
          ))}

          {selectedLocation && (
            <InfoWindow
              position={selectedLocation}
              onCloseClick={() => setSelectedLocation(null)}
            >
              <Card sx={{ maxWidth: 250 }}>
                <CardContent>
                  <Typography variant="h6">{selectedLocation.name}</Typography>
                  <Typography variant="body2">
                    {selectedLocation.address}
                  </Typography>
                </CardContent>
              </Card>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </Box>
  );
}

//example
// const locations = [
//     { lat: 40.7128, lng: -74.006, name: "New York", address: "NY, USA" },
//     { lat: 34.0522, lng: -118.2437, name: "Los Angeles", address: "LA, USA" },
//     { lat: 41.8781, lng: -87.6298, name: "Chicago", address: "Chicago, USA" }
//   ];

//   <MapWithPins locations={locations} />
