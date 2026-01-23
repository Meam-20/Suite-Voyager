
import {  useParams } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { useContext, useEffect, useState } from "react";
import Swal from 'sweetalert2'

const Update = () => {
    const { user} = useContext(AuthContext);
   const {id} = useParams()
   const[updateBookings, setUpdateBookings] = useState()
   useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      const response = await fetch(`http://localhost:5000/bookings?email=${user?.email}`)
      const data =await response.json()
      setUpdateBookings(data)
    }
  
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [user?.email])


 if(updateBookings)
 {
  const update = updateBookings.find(update => update._id = id)
  console.log(update)
  const { _id, img, Number, Type, Price, date } = update;
  const handleUpdate=(event)=>{

    event.preventDefault();
    const form = event.target;
    const RoomId = _id
    const date = form.date.value;
    const Type = form.type.value;
    const Number=form.number.value;
    const Price = form.price.value;
    const Name = user.displayName;
    const email = form.email.value;
    const Image = img;
    const updatedBooking = {RoomId,date, Type, Number, Price, Name, email, Image }
    console.log(updatedBooking)
    fetch(`http://localhost:5000/bookings/${_id}`, {
           method: "PATCH", 
           headers: {
            'content-type' : 'application/json'
           },
           body: JSON.stringify(updatedBooking)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.modifiedCount){
                Swal.fire({
                    title: 'Success!',
                    text: 'Booking Updated',
                    icon: 'success',
                    confirmButtonText: 'Done'
                  })
            }
        })
    
  }
   return( 
    <div className="w-11/12 mx-auto bg-[#1E2C1A] text-[#D49B35] rounded-lg">
        <h1 className="text-center font-bold text-3xl py-6">Update Booking</h1>
    <h3 className="text-center font-bold text-2xl py-6"> Room Type : {Type}</h3>
    <div className="p-9">
        
        <div className="grid grid-cols-2 py-7">
            <div className="w-80">
                <table className="table">
                    {/* head */}
                    <thead className="text-xl text-[#D49B35]">
                        <tr>
                            <th>Room Number</th>
                            <th>Date</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        <tr>
                            <td>{Number}</td>
                            <td>{date}</td>
                            <td>{Price}</td>
                        </tr>
                    </tbody>
                </table>
                <form  onSubmit={handleUpdate} >
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Room Type</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="type" defaultValue={Type} placeholder="Room Type" className="input input-bordered w-full" />
                        </label>
                    </div>
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Date</span>
                        </label>
                        <label className="input-group">
                            <input type="date" name="date" defaultValue={date} className="input input-bordered w-full" />
                        </label>
                    </div>
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <label className="input-group">
                            <input type="text" defaultValue={Price} name="price" placeholder="price" className="input input-bordered w-full" />
                        </label>
                    </div>
                    <div className="form-control md:w-1/2">
                <label className="label">
                    <span className="label-text">Room Number</span>
                </label>
                <label className="input-group">
                    <input type="text" name="number" defaultValue={Number} placeholder="Room Number" className="input input-bordered w-full" />
                </label>
            </div>
                    <div className="form-control md:w-1/2">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <label className="input-group">
                    <input type="email" name="email" defaultValue={user?.email} placeholder="email" className="input input-bordered w-full" />
                </label>
            </div>
          
                <input type="submit" value="Update" className="font-semibold btn my-5" />
             


                </form>
            </div>
        </div>
    </div>
</div>
   );
 }
 else{
  return(
    <div>
      <span className="loading loading-bars loading-lg"></span>
    </div>
  )
 }
};



export default Update;