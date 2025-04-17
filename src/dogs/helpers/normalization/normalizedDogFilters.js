const normalizedDogFilters = (filters) => ({
  Distance: filters.distance || null,
  Breeds: filters.breeds
    ? filters.breeds.map((breed) => parseInt(breed.code))
    : null,
  Size: filters.size
    ? filters.size.map((sizeItem) => parseInt(sizeItem.code))
    : null,
  Gender: filters.gender
    ? filters.gender.map((genderItem) => genderItem.code)
    : null,
  Vaccinated: filters.vaccinated
    ? filters.vaccinated.map((vaccItem) => vaccItem.code)
    : null,
});
export default normalizedDogFilters;
