import { useContext } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from './../../Providers/AuthProvider';
import RoomReview from "../../Components/RoomReview";
import Swal from 'sweetalert2';

const RoomDetails = () => {
    const { user } = useContext(AuthContext);
    const details = useLoaderData();
    
    // Schema matching: image, name, price, description
    const { _id, image, name, type, price, description, amenities } = details;

    const handleBooking = event => {
        event.preventDefault();
        const form = event.target;
        
        const bookedRoom = {
            roomId: _id,
            name: user?.displayName,
            email: user?.email,
            checkIn: form.date.value,
            totalPrice: price,
            status: 'confirmed'
        };

        fetch('http://localhost:5000/bookings', {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(bookedRoom)
        })
        .then(res => res.json())
        .then(data => {
            if (data._id) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Room Booked Successfully',
                    icon: 'success',
                    confirmButtonText: 'Done'
                });
            }
        });
    }

    return (
        <div className="lg:w-11/12 mx-auto bg-[#1E2C1A] text-[#D49B35] rounded-lg p-5">
            <h3 className="text-center font-bold text-3xl py-6">{name}</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div>
                    <img className="w-full h-96 rounded-lg object-cover" src={image} alt="" />
                    <div className="mt-5">
                        <h3 className="text-2xl font-bold mb-2">Description</h3>
                        <p className="opacity-80 leading-relaxed">{description}</p>
                        <div className="mt-4">
                            <h4 className="font-bold">Amenities:</h4>
                            <div className="flex gap-2 mt-2">
                                {amenities?.map((a, i) => <span key={i} className="badge badge-outline text-[#D49B35]">{a}</span>)}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-[#162113] p-8 rounded-xl">
                    <h3 className="text-xl font-bold mb-4">Book This Room</h3>
                    <div className="flex justify-between border-b border-[#D49B35] pb-2 mb-4">
                        <span>Price per night:</span>
                        <span className="font-bold">${price}</span>
                    </div>

                    <form onSubmit={handleBooking} className="space-y-4">
                        <div className="form-control">
                            <label className="label text-[#D49B35]">Check-in Date</label>
                            <input type="date" name="date" required className="input input-bordered w-full bg-transparent border-[#D49B35]" />
                        </div>
                        
                        <div className="form-control">
                            <label className="label text-[#D49B35]">Email Address</label>
                            <input type="email" readOnly defaultValue={user?.email} className="input input-bordered w-full bg-transparent border-[#D49B35] opacity-60" />
                        </div>

                        {user ? (
                            <button type="submit" className="btn w-full bg-[#D49B35] text-[#1E2C1A] hover:bg-[#b8862d] border-none font-bold">Book Now</button>
                        ) : (
                            <Link to='/login' className="btn w-full btn-outline border-[#D49B35] text-[#D49B35]">Login to Book</Link>
                        )}
                    </form>
                </div>
            </div>

            <div className="w-11/12 mx-auto text-center mt-12 border-t border-[#D49B35] pt-10">
                <h1 className="font-bold text-3xl my-4">Guest Reviews</h1>
                <RoomReview details={details} />
            </div>
        </div>
    );
};

export default RoomDetails;