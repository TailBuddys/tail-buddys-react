// import React, { useState } from "react";
// import { TextField, List, ListItem, ListItemButton } from "@mui/material";
// import usePlacesAutocomplete, {
//   getGeocode,
//   getLatLng,
// } from "use-places-autocomplete";

// export default function GoogleAddressComponent({ onSelect }) {
//   const [inputValue, setInputValue] = useState("");
//   const {
//     suggestions: { status, data },
//     setValue,
//     clearSuggestions,
//   } = usePlacesAutocomplete({
//     googleMapsApiKey: "AIzaSyCXjFcSrYoaLNpyFjM81IBrZUQZdHc7cpg",
//   });

//   const handleSelect = async (description) => {
//     setValue(description, false);
//     setInputValue(description);
//     clearSuggestions();

//     const results = await getGeocode({ address: description });
//     const { lat, lng } = await getLatLng(results[0]);

//     onSelect({ address: description, lat, lng });
//   };

//   return (
//     <div>
//       <TextField
//         fullWidth
//         label="Enter an address"
//         value={inputValue}
//         onChange={(e) => {
//           setValue(e.target.value);
//           setInputValue(e.target.value);
//           console.log(data);
//         }}
//       />
//       {status === "OK" && (
//         <List>
//           {data.map(({ place_id, description }) => (
//             <ListItem key={place_id} disablePadding>
//               <ListItemButton onClick={() => handleSelect(description)}>
//                 {description}
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </List>
//       )}
//     </div>
//   );
// }

import React, { useState } from "react";
import { TextField, List, ListItem, ListItemButton } from "@mui/material";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

// const GOOGLE_API_KEY = "AIzaSyCXjFcSrYoaLNpyFjM81IBrZUQZdHc7cpg"; // Replace with your API key

export default function GoogleAddressComponent({ onSelect }) {
  const [inputValue, setInputValue] = useState("");

  const {
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* You can restrict results by country if needed */
      // componentRestrictions: { country: "us" },
    },
    debounce: 300, // Helps reduce API calls
    // googleMapsApiKey: GOOGLE_API_KEY, // Set your API key
  });

  const handleSelect = async (description) => {
    setValue(description, false);
    setInputValue(description);
    clearSuggestions();

    try {
      const results = await getGeocode({ address: description });
      const { lat, lng } = await getLatLng(results[0]);

      onSelect({ address: description, lat, lng });
    } catch (error) {
      console.error("Error fetching location details: ", error);
    }
  };

  return (
    <div>
      <TextField
        fullWidth
        label="Enter an address"
        value={inputValue}
        onChange={(e) => {
          setValue(e.target.value);
          setInputValue(e.target.value);
        }}
      />
      {status === "OK" && (
        <List>
          {data.map(({ place_id, description }) => (
            <ListItem key={place_id} disablePadding>
              <ListItemButton onClick={() => handleSelect(description)}>
                {description}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
}
