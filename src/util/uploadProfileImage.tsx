import { API_ENDPOINTS } from "./apiEndpoints";

const CLOUUDINARY_UPLOAD_PRESET = 'expensetracker';


const uploadProfileImage = async(imageFile: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', CLOUUDINARY_UPLOAD_PRESET);

    try {
        const response = await fetch(API_ENDPOINTS.UPLOAD_IMAGE, {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        return data.secure_url; 
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
}

export default uploadProfileImage;