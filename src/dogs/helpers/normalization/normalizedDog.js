const normalizeDog = (dog) => ({
  name: dog.name,
  description: null,
  type: null,
  size: null,
  geneder: null,
  birthdate: null,
  address: dog.address,
  lon: dog.lon,
  lat: dog.lat,
  vaccinated: null,
});
export default normalizeDog;
