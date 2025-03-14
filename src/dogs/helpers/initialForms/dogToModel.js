const DogDataToModel = (DogData) => {
  return {
    name: DogData.name,
    description: DogData.description,
    type: DogData.type,
    size: DogData.size,
    geneder: DogData.geneder,
    birthdate: DogData.birthdate,
    address: DogData.address,
    vaccinated: DogData.vaccinated,
  };
};

export default DogDataToModel;
