const CLOUD_NAME="dcpesbd8q";

const UPLOAD_PRESET="ai-job-porrtal";



export async function uploadToCloudinary(file) {


    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("folder", "job-portal/avatars");

    const api_url=`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;


    const res=await fetch(api_url,{
        method:"POST",
        body:formData
    })

    if(!res.ok){
        throw new Error("Failed to upload image to Cloudinary");
    }

    const data = await res.json();

    return data.secure_url;
}