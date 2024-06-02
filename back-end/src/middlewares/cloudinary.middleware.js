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
