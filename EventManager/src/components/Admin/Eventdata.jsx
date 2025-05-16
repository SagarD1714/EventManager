import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Api from '../Modules/Api';
import Loader from '../../assets/Loader';
import { useNavigate } from 'react-router-dom';

const Eventdata = () => {
  const navigate = useNavigate();
  const api = Api;
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [TOKEN, setToken] = useState();
  const [user, setUser] = useState();

  const [showEditForm, setShowEditForm] = useState(false);
  const [editData, setEditData] = useState({
    id: '',
    title: '',
    location: '',
    pincode: '',
    startDate: '',
    endDate: '',
    description: '',
    coverImage: '',
    image: null,
  });

  useEffect(() => {
    const userData = sessionStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      const token = user?.TOKEN;
      const username = user?.result?.username;
      if (token && typeof username === 'string') {
        setUser(username);
        setToken(token);
      } else {
        alert('Please login');
      }
    } else {
      alert('Please login');
    }
  }, []);

  const FetchData = async () => {
    const page = 0;
    setIsLoading(true);
    try {
      const response = await axios.get(`${api}event`, { params: { page } });
      const data = response.data.result || [];
      localStorage.setItem('cachedEvents', JSON.stringify(data));
      const cached = localStorage.getItem('cachedEvents');
      if (cached) {
        setEvents(JSON.parse(cached));
      }
    } catch (error) {
      console.error('Error fetching data:', error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const cached = localStorage.getItem('cachedEvents');
    if (cached) {
      setEvents(JSON.parse(cached));
    }
  }, []);

  const DeleteEvent = (id, coverImage) => async () => {
    const cnf = confirm("Are you sure to delete ?");
    if (cnf) {
      const formData = new FormData();
      formData.append('id', id);
      formData.append('coverImage', coverImage);
      try {
        const response = await axios.delete(api + 'event', {
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
            'TOKEN': TOKEN,
            'USERNAME': user
          }
        });
        console.log('Deleted successfully:', response.data);
        FetchData();
      } catch (error) {
        console.error('Delete failed:', error.response?.data || error.message);
      }
    }
  };

  const openEditForm = (event) => {
    setEditData({
      id: event.id,
      title: event.title,
      location: event.location,
      pincode: event.pincode,
      startDate: event.startDate,
      endDate: event.endDate,
      description: event.description,
      coverImage: event.coverImage,
      image: null,
    });
    setShowEditForm(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditData({ ...editData, image: file });
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('id', editData.id);
      formData.append('title', editData.title);
      formData.append('location', editData.location);
      formData.append('pincode', editData.pincode);
      formData.append('startDate', editData.startDate);
      formData.append('endDate', editData.endDate);
      formData.append('description', editData.description);

      if (editData.image) {
        formData.append('image', editData.image);
      }


      console.log(formData)
      const response = await axios.post(`${api}event`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          TOKEN: TOKEN,
          USERNAME: user,
        },
      });
      console.log(response.data)
      alert('Event updated successfully');
      setShowEditForm(false);
      FetchData();
    } catch (error) {
      console.error('Update failed:', error.response?.data || error.message);
      alert('Update failed');
    }
  };

  return (
    <div className="font-sans font-semibold py-6 px-4 min-h-screen bg-gray-50">
      <button
        className="border border-blue-400 cursor-pointer text-white bg-blue-500 hover:bg-blue-600 active:scale-95 transition-transform px-5 py-2 rounded-md shadow-md mb-6"
        onClick={FetchData}
      >
        Refresh
      </button>
      <button
        className="border border-blue-400 cursor-pointer text-white bg-blue-500 hover:bg-blue-600 active:scale-95 transition-transform px-5 py-2 rounded-md shadow-md mb-6 mx-3"
        onClick={() => navigate('/event-info')}
      >
        Event info
      </button>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="overflow-auto h-[78vh] space-y-6 pr-2">
          {events.map((event, index) => (
            <div
              key={event.id || index}
              className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-5 rounded-xl border border-gray-200 shadow-sm bg-white hover:shadow-md transition-shadow"
            >
              <img
                src={event.coverImage}
                alt="event-thumbnail"
                className="w-24 h-24 object-cover rounded-lg border border-gray-300"
              />
              <div className="flex-1 min-w-[200px] space-y-2 text-sm text-gray-800">
                <p><span className="font-medium text-gray-500">Pin Code:</span> {event.pincode}</p>
                <p><span className="font-medium text-gray-500">Title:</span> {event.title}</p>
                <p><span className="font-medium text-gray-500">Date:</span> {event.startDate} - {event.endDate}</p>
                <p><span className="font-medium text-gray-500">Location:</span> {event.location}</p>
                <div>
                  <p className="font-medium text-gray-500 mb-1">Description:</p>
                  <textarea
                    className="w-full border border-gray-300 rounded-md p-2 text-gray-700 resize-y focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50"
                    value={event.description}
                    readOnly
                    rows={2}
                  />
                </div>
              </div>
              <div className="flex gap-3 self-stretch md:self-auto">
                <button
                  className="border border-blue-500 text-blue-600 bg-white hover:bg-blue-100 cursor-pointer active:scale-95 transition-transform px-4 py-1 rounded-md"
                  onClick={() => openEditForm(event)}
                >
                  Edit
                </button>
                <button
                  className="border border-red-500 text-red-600 bg-white hover:bg-red-100 cursor-pointer active:scale-95 transition-transform px-4 py-1 rounded-md"
                  onClick={DeleteEvent(event.id, event.coverImage)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Popup Form */}
      {showEditForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl space-y-4">
            <h2 className="text-xl font-bold mb-2">Edit Event</h2>

            <input
              className="w-full p-2 border rounded"
              type="text"
              value={editData.title}
              onChange={(e) => setEditData({ ...editData, title: e.target.value })}
              placeholder="Title"
            />
            <input
              className="w-full p-2 border rounded"
              type="text"
              value={editData.location}
              onChange={(e) => setEditData({ ...editData, location: e.target.value })}
              placeholder="Location"
            />
            <input
              className="w-full p-2 border rounded"
              type="text"
              value={editData.pincode}
              onChange={(e) => setEditData({ ...editData, pincode: e.target.value })}
              placeholder="Pincode"
            />
            <div className="flex gap-2">
              <input
                className="w-full p-2 border rounded"
                type="date"
                value={editData.startDate}
                onChange={(e) => setEditData({ ...editData, startDate: e.target.value })}
              />
              <input
                className="w-full p-2 border rounded"
                type="date"
                value={editData.endDate}
                onChange={(e) => setEditData({ ...editData, endDate: e.target.value })}
              />
            </div>
            <textarea
              className="w-full p-2 border rounded"
              rows={3}
              value={editData.description}
              onChange={(e) => setEditData({ ...editData, description: e.target.value })}
              placeholder="Description"
            />

            <div>
              <p className="text-sm mb-1">Cover Image (optional):</p>
              {editData.coverImage && !editData.image && (
                <img
                  src={editData.coverImage}
                  alt="preview"
                  className="w-32 h-32 object-cover mb-2 rounded border"
                />
              )}
              {editData.image && (
                <img
                  src={URL.createObjectURL(editData.image)}
                  alt="new preview"
                  className="w-32 h-32 object-cover mb-2 rounded border"
                />
              )}
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </div>

            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
                onClick={() => setShowEditForm(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Eventdata;
