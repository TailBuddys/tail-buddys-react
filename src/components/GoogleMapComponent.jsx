import React, { useEffect, useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { Box, useMediaQuery } from "@mui/material";
import Spinner from "./Spinner";
import Error from "./Error";

export default function GoogleMapComponent({
  isLoading,
  error,
  parksData,
  presentedPark,
  dogData,
  setPresentedPark,
}) {
  const [mapCenter, setMapCenter] = useState();
  const [mapZoom, setMapZoom] = useState(12);
  const isMobile = useMediaQuery("(max-width:426px)");

  useEffect(() => {
    if (dogData !== null && dogData !== undefined) {
      setMapCenter({ lat: dogData.lat, lng: dogData.lon });
      setMapZoom(12);
    } else {
      setMapCenter({ lat: 31.77838, lng: 35.17582 });
      setMapZoom(7);
    }
  }, [dogData]);

  if (isLoading) return <Spinner />;
  if (error) return <Error />;
  return (
    <Box>
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height: isMobile ? "45vh" : "88vh",
          borderRadius: 10,
        }}
        center={mapCenter}
        zoom={mapZoom}
      >
        {dogData && (
          <Marker
            position={mapCenter}
            icon={{
              url: "/assets/images/dogPin.png",
              scaledSize: isMobile
                ? new window.google.maps.Size(30, 40)
                : new window.google.maps.Size(35, 45),
            }}
            title="Your location"
          />
        )}

        {parksData.map((park, index) => (
          <Marker
            key={index}
            position={{ lat: park.lat, lng: park.lon }}
            onClick={() => setPresentedPark(park)}
            icon={
              presentedPark &&
              presentedPark.lat === park.lat &&
              presentedPark.lng === park.lng
                ? {
                    url: "/assets/images/selectedParkPin.png",
                    scaledSize: isMobile
                      ? new window.google.maps.Size(30, 40)
                      : new window.google.maps.Size(35, 45),
                  }
                : {
                    url: "/assets/images/parkPin.png",
                    scaledSize: isMobile
                      ? new window.google.maps.Size(20, 30)
                      : new window.google.maps.Size(25, 35),
                  }
            }
            zIndex={
              presentedPark &&
              presentedPark.lat === park.lat &&
              presentedPark.lng === park.lng
                ? 1000
                : 1
            }
          />
        ))}

        {/* {selectedLocation && (
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
                {presentedPark &&
                  presentedPark.lat === selectedLocation.lat &&
                  presentedPark.lng === selectedLocation.lng && (
                    <Typography variant="body2" color="green">
                      Currently Selected Park
                    </Typography>
                  )}
              </CardContent>
            </Card>
          </InfoWindow>
        )} */}
      </GoogleMap>
    </Box>
  );
}

// import React, { useState } from "react";
// import {
//   GoogleMap,
//   LoadScript,
//   Marker,
//   InfoWindow,
// } from "@react-google-maps/api";
// import { Box, Card, CardContent, Typography } from "@mui/material";

// const containerStyle = {
//   width: "100%",
//   height: "500px",
// };

// export default function GoogleMapComponent({ locations }) {
//   const [selectedLocation, setSelectedLocation] = useState(null);

//   return (
//     <Box>
//       <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
//         <GoogleMap
//           mapContainerStyle={containerStyle}
//           center={locations[0]}
//           zoom={10}
//         >
//           {locations.map((loc, index) => (
//             <Marker
//               key={index}
//               position={loc}
//               onClick={() => setSelectedLocation(loc)}
//             />
//           ))}

//           {selectedLocation && (
//             <InfoWindow
//               position={selectedLocation}
//               onCloseClick={() => setSelectedLocation(null)}
//             >
//               <Card sx={{ maxWidth: 250 }}>
//                 <CardContent>
//                   <Typography variant="h6">{selectedLocation.name}</Typography>
//                   <Typography variant="body2">
//                     {selectedLocation.address}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </InfoWindow>
//           )}
//         </GoogleMap>
//       </LoadScript>
//     </Box>
//   );
// }

//   <MapWithPins locations={locations} />
