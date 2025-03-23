import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import { auth } from '../../Auth/firebase.init';

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [reload, setReload] = useState(false);
  const [user, loading] = useAuthState(auth);

  const allowedEmails = [
    'hazrataliein@gmail.com',
    'programmer.hazratali@gmail.com',
    'iushazratali@gmail.com',
    'hazratalisoft@gmail.com',
  ];

  useEffect(() => {
    const fetchPhotos = async () => {
      const res = await fetch('http://localhost:8000/photos');
      const data = await res.json();
      setPhotos(data?.data);
    };
    fetchPhotos();
  }, [reload]);

  const uploadPhoto = async (event) => {
    event.preventDefault();
    if (!allowedEmails.includes(user?.email)) {
      return toast.error('You do not have permission to upload photos!');
    }

    const formData = new FormData();
    formData.append('title', event.target.title.value);
    formData.append('image', event.target.image.files[0]);
    formData.append('userEmail', user?.email);

    const res = await fetch('http://localhost:8000/photos', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (res.ok) {
      toast.success('Photo uploaded successfully!');
      setReload(!reload);
    } else {
      toast.error(`Upload failed! Reason: ${data.message || 'Unknown problem'}`);
    }
  };

  const deletePhoto = async (id) => {
    if (!allowedEmails.includes(user?.email)) {
      return toast.error('You do not have permission to delete photos!');
    }

    const res = await fetch(`http://localhost:8000/photos/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      toast.success('Photo deleted!');
      setReload(!reload);
    } else {
      toast.error('There was a problem deleting the photo!');
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-6 min-h-screen max-w-7xl mx-auto text-white">
      <h2 className="text-3xl font-bold text-center mb-6">Photos</h2>

      {allowedEmails.includes(user?.email) && (
        <form onSubmit={uploadPhoto} className="mb-6 flex gap-4 justify-center">
          <input
            type="text"
            name="title"
            placeholder="Photo Title"
            required
            className="input input-bordered w-1/4 p-2 rounded-lg"
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            required
            className="input input-bordered w-1/4 p-2 rounded-lg"
          />
          <button
            type="submit"
            className="bg-blue-500 px-4 py-2 rounded-lg text-white font-semibold hover:bg-blue-700"
          >
            Upload
          </button>
        </form>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {photos.map((photo) => (
          <div key={photo._id} className="bg-gray-800 p-2">
            <img
              src={photo.image}
              alt={photo.title}
              className="w-full h-40 rounded-md object-cover"
            />
            <h3 className="text-xl mb-2">{photo.title}</h3>
            {allowedEmails.includes(user?.email) && (
              <button
                onClick={() => deletePhoto(photo._id)}
                className="w-full mt-3 bg-red-500 text-white py-2 rounded-md hover:bg-red-700"
              >
                Delete Photo
              </button>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};

export default Photos;
