import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const storage = getStorage();

const ImageUpload = () => {
    const { user } = useAuth();
  const [file, setFile] = useState(null);
  const [imageURL, setImageURL] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (file) {
      const storageRef = ref(storage, `images/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setImageURL(downloadURL);
    }
  };
  useEffect(() => {
    const fetchImageData = async () => {
      try {
        const db = getFirestore();
        const userRef = doc(db, 'users', user.uid);
        const userSnapshot = await getDoc(userRef);
        const userData = userSnapshot.data();
  
        if (userData && userData.imageUrl) {
          const { imageUrl } = userData;
          setImageURL(imageUrl);
        }
      } catch (error) {
        console.log('Error fetching image data:', error);
      }
    };
  
    if (user) {
      fetchImageData();
    }
  }, [user]);

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {imageURL && <img src={imageURL} alt="Uploaded" />}
    </div>
  );
};

export default ImageUpload;