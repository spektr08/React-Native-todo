import { storage } from './client';

const getUrl = async (image): Promise<string> => {
    const url =  storage.getFilePreview(image.bucketId, image.$id);
    
    return url;
}

export default getUrl;
