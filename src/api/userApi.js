import axiosInstance from "../services/axiosInstance";

export const getProfile = async()=>{

const res=await axiosInstance.get("/users/profile");

return res.data.data;

}

export const updateProfile=async(payload)=>{

const res=await axiosInstance.put("/users/profile",payload);

return res.data.data;

}