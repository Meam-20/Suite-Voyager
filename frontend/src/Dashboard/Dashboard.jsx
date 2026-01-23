import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const Dashboard = () => {
    const [rooms, setRooms] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [activeTab, setActiveTab] = useState('rooms'); // Default tab 'rooms'

    useEffect(() => {
        fetchRooms();
        fetchUsers();
    }, []);

    // --- Data Fetching ---
    const fetchRooms = () => {
        fetch('http://localhost:5000/rooms')
            .then(res => res.json())
            .then(data => setRooms(data));
    };

    const fetchUsers = () => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => setUsers(data));
    };

    /* ========= ROOM CRUD OPERATIONS ========= */
    const handleAddRoom = (e) => {
        e.preventDefault();
        const form = e.target;
        const newRoom = {
            name: form.name.value,
            type: form.type.value,
            price: parseFloat(form.price.value),
            image: form.image.value,
            description: form.description.value,
            amenities: form.amenities.value.split(',').map(item => item.trim()),
            available: true
        };

        fetch('http://localhost:5000/rooms', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newRoom)
        })
            .then(res => res.json())
            .then(data => {
                if (data._id) {
                    setRooms([...rooms, data]);
                    form.reset();
                    document.getElementById('add_room_modal').close();
                    Swal.fire('Success!', 'Room Added Successfully', 'success');
                }
            });
    };

    const handleUpdateRoom = (e) => {
        e.preventDefault();
        const form = e.target;
        const updatedRoom = {
            name: form.name.value,
            type: form.type.value,
            price: parseFloat(form.price.value),
            image: form.image.value,
            description: form.description.value,
            amenities: typeof form.amenities.value === 'string' ? form.amenities.value.split(',').map(item => item.trim()) : form.amenities.value,
        };

        fetch(`http://localhost:5000/rooms/${selectedRoom._id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedRoom)
        })
            .then(res => res.json())
            .then(data => {
                fetchRooms();
                document.getElementById('update_room_modal').close();
                Swal.fire('Updated!', 'Room data has been modified', 'success');
            });
    };

    const handleDeleteRoom = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/rooms/${id}`, { method: 'DELETE' })
                    .then(() => {
                        setRooms(rooms.filter(r => r._id !== id));
                        Swal.fire("Deleted!", "Room has been deleted.", "success");
                    });
            }
        });
    };

    /* ========= USER ROLE MANAGEMENT ========= */
    const handleMakeAdmin = (user) => {
        fetch(`http://localhost:5000/users/admin/${user._id}`, {
            method: 'PATCH',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ role: 'admin' })
        })
            .then(res => res.json())
            .then(() => {
                fetchUsers();
                Swal.fire('Success!', `${user.name} is now an Admin`, 'success');
            });
    };

    return (
        <div className="p-5 lg:p-10 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-[#1E2C1A]">Admin Control Panel</h1>

            {/* Navigation Tabs */}
            <div className="flex gap-4 mb-6">
                <button
                    onClick={() => setActiveTab('rooms')}
                    className={`btn ${activeTab === 'rooms' ? 'bg-[#D49B35] text-white border-none' : 'btn-outline'}`}>
                    Manage Rooms
                </button>
                <button
                    onClick={() => setActiveTab('users')}
                    className={`btn ${activeTab === 'users' ? 'bg-[#D49B35] text-white border-none' : 'btn-outline'}`}>
                    Manage Users
                </button>
            </div>

            {/* --- Manage Rooms Section --- */}
            {activeTab === 'rooms' && (
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <div className="flex justify-between items-center mb-5">
                        <h2 className="text-xl font-bold">All Rooms ({rooms.length})</h2>
                        <button className="btn bg-[#1E2C1A] text-white hover:bg-black" onClick={() => document.getElementById('add_room_modal').showModal()}>
                            + Add New Room
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th>Image</th>
                                    <th>Room Name</th>
                                    <th>Price</th>
                                    <th>Type</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rooms.map(room => (
                                    <tr key={room._id} className="hover">
                                        <td><img src={room.image} className="w-14 h-12 rounded object-cover shadow" alt="" /></td>
                                        <td className="font-semibold">{room.name}</td>
                                        <td className="text-green-600 font-bold">${room.price}</td>
                                        <td>{room.type}</td>
                                        <td className="flex gap-2">
                                            <button className="btn btn-xs btn-info text-white" onClick={() => { setSelectedRoom(room); document.getElementById('update_room_modal').showModal(); }}>Edit</button>
                                            <button className="btn btn-xs btn-error text-white" onClick={() => handleDeleteRoom(room._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* --- Manage Users Section --- */}
            {activeTab === 'users' && (
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-xl font-bold mb-5">User Management ({users.length})</h2>
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th>User</th>
                                    <th>Email</th>
                                    <th>Current Role</th>
                                    <th>Change Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user._id}>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="w-10 rounded-full border">
                                                        <img src={user.photo || "https://i.ibb.co/mJR9p7v/user.png"} alt="" />
                                                    </div>
                                                </div>
                                                <span className="font-medium">{user.name}</span>
                                            </div>
                                        </td>
                                        <td>{user.email}</td>
                                        <td>
                                            <span className={`badge ${user.role === 'admin' ? 'badge-primary' : 'badge-ghost'}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td>
                                            {user.role !== 'admin' ? (
                                                <button onClick={() => handleMakeAdmin(user)} className="btn btn-xs bg-[#D49B35] text-white border-none">Make Admin</button>
                                            ) : (
                                                <span className="text-xs italic text-gray-400">Admin Privileges</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* --- Modals --- */}
            {/* Add Room Modal */}
            <dialog id="add_room_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-4">Add New Room</h3>
                    <form onSubmit={handleAddRoom} className="grid grid-cols-1 gap-3">
                        <input name="name" placeholder="Room Name" className="input input-bordered w-full" required />
                        <div className="flex gap-2">
                            <input name="price" type="number" placeholder="Price" className="input input-bordered w-full" required />
                            <select name="type" className="select select-bordered w-full">
                                <option value="Single">Single</option>
                                <option value="Double">Double</option>
                                <option value="Suite">Suite</option>
                            </select>
                        </div>
                        <input name="image" placeholder="Image URL" className="input input-bordered w-full" required />
                        <input name="amenities" placeholder="Amenities (Wifi, AC, TV)" className="input input-bordered w-full" />
                        <textarea name="description" placeholder="Description" className="textarea textarea-bordered w-full"></textarea>
                        <div className="modal-action">
                            <button type="submit" className="btn btn-success text-white">Save Room</button>
                            <button type="button" className="btn" onClick={() => document.getElementById('add_room_modal').close()}>Cancel</button>
                        </div>
                    </form>
                </div>
            </dialog>

            {/* Update Room Modal */}
            <dialog id="update_room_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-4">Edit Room Information</h3>
                    {selectedRoom && (
                        <form onSubmit={handleUpdateRoom} className="grid grid-cols-1 gap-3">
                            <input name="name" defaultValue={selectedRoom.name} className="input input-bordered w-full" required />
                            <div className="flex gap-2">
                                <input name="price" type="number" defaultValue={selectedRoom.price} className="input input-bordered w-full" required />
                                <select name="type" defaultValue={selectedRoom.type} className="select select-bordered w-full">
                                    <option value="Single">Single</option>
                                    <option value="Double">Double</option>
                                    <option value="Suite">Suite</option>
                                </select>
                            </div>
                            <input name="image" defaultValue={selectedRoom.image} className="input input-bordered w-full" required />
                            <input name="amenities" defaultValue={selectedRoom.amenities?.join(', ')} className="input input-bordered w-full" />
                            <textarea name="description" defaultValue={selectedRoom.description} className="textarea textarea-bordered w-full"></textarea>
                            <div className="modal-action">
                                <button type="submit" className="btn btn-info text-white">Update Changes</button>
                                <button type="button" className="btn" onClick={() => document.getElementById('update_room_modal').close()}>Cancel</button>
                            </div>
                        </form>
                    )}
                </div>
            </dialog>
        </div>
    );
};

export default Dashboard;