const DogDataToModel = (DogData) => {
  return {
    id: DogData.id,
    name: DogData.name,
    description: DogData.description,
    distance: DogData.distance,
    type: DogData.type ?? "",
    size: DogData.size ?? "",
    gender: DogData.gender === null ? "" : DogData.gender ? true : false,
    birthDate: DogData.birthDate,
    address: DogData.address,
    lon: DogData.lon,
    lat: DogData.lat,
    vaccinated: DogData.vaccinated ? true : false, // 0  for no, 1 for yes
    images: DogData.images,
  };
};

export default DogDataToModel;
