const normalizedPark = (park) => ({
  name: park.name,
  description: park.description,
  address: park.address,
  lon: park.lon,
  lat: park.lat,
});
export default normalizedPark;
