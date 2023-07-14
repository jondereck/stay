import { searchRegion, searchMunicipality, searchProvince } from 'ph-geo-admin-divisions';


const formatDivisions =  () => {
  const regions =  searchRegion({});
  const municipalities =  searchMunicipality({});
  const provinces =  searchProvince({});



  const formattedMunicipalities = municipalities.map((municipality) => {
    const province = provinces.find((province) => province.provinceId === municipality.provinceId);
    const provinceName = province ? province.name : '';

    const region = regions.find((region) => region.regionId == municipality.regionId);
    const regionName = region ? region.name : ';';

    return {
      value: municipality.municipalityId,
      label: municipality.name,
      province: provinceName,
      region: regionName,
      // Add additional properties from the municipality object
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
