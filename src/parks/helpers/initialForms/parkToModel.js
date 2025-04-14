const ParkDataToModel = (ParkData) => {
  return {
    id: ParkData.id,
    name: ParkData.name,
    description: ParkData.description,
    address: ParkData.address,
    lon: ParkData.lon,
    lat: ParkData.lat,
    dogLikes: ParkData.dogLikes,
    distance: ParkData.distance,
    images: ParkData.images,
  };
};

export default ParkDataToModel;
