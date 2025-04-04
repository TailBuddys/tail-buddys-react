const normalizedExistingDog = (dog) => ({
  name: dog.name,
  description: dog.description,
  type: dog.type,
  size: dog.size,
  gender: dog.gender,
  birthdate: dog.birthdate,
  address: dog.address,
  lon: dog.lon,
  lat: dog.lat,
  vaccinated: dog.vaccinated,
});

export default normalizedExistingDog;
