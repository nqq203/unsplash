import api from "./api";

export async function getListPhotos({page}) {
  try {
    const response = await api.get("/photos", {
      params: {page: page, per_page: 20}
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getPhotoDetail({id}) {
  try {
    const response = await api.get(`/photos/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}