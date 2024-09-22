import { BASE_URL } from "./baseurl";
import { commonApi } from "./commonstructure";

export const registerApi = async (body) => {
  return await commonApi('POST', `${BASE_URL}/user/register`, body, "")
}

export const loginApi = async (body) => {
  return await commonApi('POST', `${BASE_URL}/user/login`, body, "")
}
export const addprojectApi = async (body, header) => {
  return await commonApi('POST', `${BASE_URL}/user/add-project`, body, header)
}
export const getUserProjectsApi = async (header) => {
  return await commonApi('GET', `${BASE_URL}/user/get-user-projects`, "", header)
}
export const getLimitdProjectsApi = async () => {
  return await commonApi('GET', `${BASE_URL}/user/get-limited-projects`, "", "")
}
export const getAllProjectsApi = async () => {
  return await commonApi('GET', `${BASE_URL}/user/get-all-projects`, "", "")
}
export const editProjectsApi = async (header, body, id) => {
  return await commonApi('PUT', `${BASE_URL}/user/edit-projects/${id}`, body, header)
}
export const deleteProjectApi = async (id) => {
  return await commonApi('DELETE', `${BASE_URL}/user/delete-project/${id}`, "", "")
}