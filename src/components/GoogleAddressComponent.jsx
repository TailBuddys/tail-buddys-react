import React, { useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { TextField, List, ListItem, ListItemButton } from "@mui/material";

export default function GoogleAddressComponent({ onSelect }) {
  const [inputValue, setInputValue] = useState("");
  const {
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (description) => {
    setValue(description, false);
    setInputValue(description);
    clearSuggestions();

    const results = await getGeocode({ address: description });
    const { lat, lng } = await getLatLng(results[0]);

    onSelect({ address: description, lat, lng });
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

// example
//<AddressSearch onSelect={(location) => console.log(location)} />
