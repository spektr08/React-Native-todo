import { storage } from './client';
import { ID } from 'appwrite';

const uploadImage = async (file) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("fileId", ID.unique());
    formData.append("file", {
        uri: file.uri,
        name: file.fileName,
        type: file.type,
    });
    const appwrite = {
        "content-type": "multipart/form-data",
        "X-Appwrite-Project": process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
        "x-sdk-version": "appwrite:web:10.2.0",
    }
    const response = await fetch(
        `${process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.EXPO_PUBLIC_STORAGE_ID}/files`,
        {
            method: "POST", // or 'PUT'
            headers: {
                ...appwrite,
                "Content-Type": "multipart/form-data;",
            },
            body: formData,
        }
    );

    return response.json();
}

export default uploadImage;

