import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
cloudinary.config({
  cloud_name: "daaqothd4",
  api_key: "979811982914146",
  api_secret: "Cnw4BnTjVSNH-AJmNgvD2W6KtFI",
});

export const uploadOnCloudinary = async (fileLink) => {
  try {
    if (!fileLink) return null;
    const response = await cloudinary.uploader.upload(fileLink, {
      resource_type: "auto",
    });
    fs.unlinkSync(fileLink);
    return response;
  } catch (error) {
    fs.unlinkSync(fileLink);
    return error;
  }
};
export const deleteFromCloudinary = async (file_public_id) => {
  if(!file_public_id) return null
  try {
    const response = await cloudinary.uploader.destroy(file_public_id)
    return response
  } catch (error) {
    console.log("Error from deleting the resources from cloudinary....! : ",error);
  }
};
