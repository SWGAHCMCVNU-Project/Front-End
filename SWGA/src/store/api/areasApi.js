// store/api/areaApi.js
import AreaService from '../../services/areasService';

export const createAreaAPI = async (data) => {
  console.log("Calling createAreaAPI with data:", data);
  return AreaService.createArea(data);
};

export const getAreasAPI = async ({ page, size, search, state, isAsc, brandId }) => {
  return AreaService.getAreas({ page, size, search, state, isAsc, brandId });
};

export const getAreaByIdAPI = async (id) => {
  return AreaService.getAreaById(id);
};

export const updateAreaAPI = async (id, data) => {
  return AreaService.updateArea(id, data);
};