import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import BookingRow from "../../Components/BookingRow";
// import BookingRow from "../../Components/BookingRow";
import Swal from 'sweetalert2'

const MyBookings = () => {
    const { user } = useContext(AuthContext)
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/bookings?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setBookings(data))
        // console.log(bookings)
    }
        , [user?.email])

        const handleDelete = _id => {
            console.log(_id);
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                console.log(result)
                if (result.isConfirmed==true) {
    
    
                    fetch(`http://localhost:5000/bookings/${_id}`, {
                        method: 'DELETE'
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            if (data.deletedCount > 0) {
                                Swal.fire(
                                    'Deleted!',
                                    'Your Coffee has been deleted.',
                                    'success'
                                )
                                const remaining = bookings.filter(booking => booking._id !== id);
                                setBookings(remaining);
                            }
                        })
    
                }
            })
        }
    
        


   

    return (
        <div >
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Image</th>
                            <th>Room Type</th>
                            <th>Room Number</th>
                            <th>Date</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map(booking =>
                                 <BookingRow 
                                 key={booking._id} 
                                 booking={booking}
                                 handleDelete={handleDelete}
                               
                             ></BookingRow>)
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};




export default MyBookings;