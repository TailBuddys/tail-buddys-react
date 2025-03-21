import React, { useEffect, useRef } from "react";

const GoogleAddressComponent = ({
  placeholder = "Enter an address...",
  onSelectAddress,
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (!window.google || !window.google.maps || !inputRef.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        types: ["geocode"], // Only address suggestions
        componentRestrictions: { country: "il" }, // Restrict to Israel
      }
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (
        place.formatted_address &&
        place.geometry &&
        place.geometry.location
      ) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        onSelectAddress(place.formatted_address, { lat, lng });
      }
    });

    return () => {
      window.google.maps.event.clearInstanceListeners(autocomplete);
    };
  }, [onSelectAddress]);

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder={placeholder}
      className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};

export default GoogleAddressComponent;
