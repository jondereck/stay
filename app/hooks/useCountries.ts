import { searchRegion, searchMunicipality, searchProvince } from 'ph-geo-admin-divisions';



const formatDivisions =  () => {
  const regions =  searchRegion({});
  const municipalities =  searchMunicipality({});
  const provinces =  searchProvince({});

  
  const municipalitiesWithLatLon = [
    { psgcId: "0102801000", latitude: 18.4591, longitude: 120.9188 },
    { psgcId: "0105522000", latitude: 16.006, longitude: 120.2397 },
    { psgcId: "0203129002", latitude: 10.3157, longitude: 123.8854 },
    // Add more municipalities here...
  ];
  
  const formattedMunicipalities = municipalities.map((municipality) => {
    const province = provinces.find((province) => province.provinceId === municipality.provinceId);
    const provinceName = province ? province.name : '';
  
    const region = regions.find((region) => region.regionId === municipality.regionId);
    const regionName = region ? region.name : '';

  // Find the municipality with the matching psgcId in the municipalitiesWithLatLon array
  const municipalityWithLatLon = municipalitiesWithLatLon.find((item) => item.psgcId === municipality.psgcId);
  const latitude = municipalityWithLatLon ? municipalityWithLatLon.latitude : null;
  const longitude = municipalityWithLatLon ? municipalityWithLatLon.longitude : null;
    return {
      value: municipality.psgcId,
      label: municipality.name,
      province: provinceName,
      region: regionName,
      geoLevel: municipality.geoLevel,
      latlng: latitude && longitude ? { lat: latitude, lng: longitude } : null,
      
      // Add any other additional properties from the municipality object
    };
  });


  return {
    
    municipalities: formattedMunicipalities,
 
  };
};

const useCountries =  () => {
  const formattedDivisions =  formatDivisions();

  const getAll = () => formattedDivisions;



const getByValue = (value: string) => {
    const regions = searchRegion({});
    const { municipalities } = formattedDivisions;
    const provinces = searchProvince({});

    const location = municipalities.find(
      (municipality) => municipality.value === value
    );

    
    return location;
  };

  return {
    getAll,
    getByValue,
  };
};

export default useCountries;
