import React, { useEffect, useRef } from "react";

const GoogleAddressComponent = ({
  onSelectAddress,
  onReset,
  initialAddress,
  data,
}) => {
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null); // ✅ Store the autocomplete instance

  const placeholder =
    data.address === "" ? "Enter an address..." : data.address;

  useEffect(() => {
    if (!window.google || !window.google.maps || !inputRef.current) return;

    // ✅ Initialize once
    if (!autocompleteRef.current) {
      autocompleteRef.current = new window.google.maps.places.Autocomplete(
        inputRef.current,
        {
          types: ["geocode"],
          componentRestrictions: { country: "il" },
        }
      );
    }

    // ✅ Always attach listener (even if Autocomplete already exists)
    const listener = autocompleteRef.current.addListener(
      "place_changed",
      () => {
        const place = autocompleteRef.current.getPlace();
        if (
          place.formatted_address &&
          place.geometry &&
          place.geometry.location
        ) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          onSelectAddress(place.formatted_address, { lat, lng });
        }
      }
    );

    // ✅ Cleanup listener only (don't clear autocompleteRef!)
    return () => {
      if (listener) {
        window.google.maps.event.removeListener(listener);
      }
    };
  }, [onSelectAddress]); // ✅ Allow re-attachment of updated listener

  const handleInputChange = (e) => {
    const value = e.target.value;

    if (value === "") {
      onSelectAddress("", null); // ✅ Notify parent that address was cleared
    }
  };

  useEffect(() => {
    if (onReset) {
      onReset(() => {
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      });
    }
  }, [onReset]);
  return (
    <input
      value={initialAddress}
      ref={inputRef}
      type="text"
      placeholder={placeholder}
      onChange={handleInputChange}
      className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};

export default GoogleAddressComponent;
