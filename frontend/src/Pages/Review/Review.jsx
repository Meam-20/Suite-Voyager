import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2'

const Review = () => {
    const {user} = useContext(AuthContext)
    const id = useParams()
    const handleReview=(event)=> {
        event.preventDefault();
        const form = event.target;
        const RoomId = id;
        const UserName = form.UserName.value;
        const Rating = form.rating.value;
        const Comment = form.comment.value;
        const Email = form.email.value;
        const review = {UserName,Rating,Comment,Email,RoomId};
        console.log(review)

        fetch(`http://localhost:5000/review`, {
           method: "POST", 
           headers: {
            'content-type' : 'application/json'
           },
           body: JSON.stringify(review)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.insertedId){
                Swal.fire({
                    title: 'Success!',
                    text: 'Review Added',
                    icon: 'success',
                    confirmButtonText: 'Done'
                  })
            }
        })
    }
    return (
        <div className="w-11/12 mx-auto bg-[#1E2C1A] text-[#D49B35] rounded-lg">
            <h1 className="text-center font-bold text-3xl py-6">Post Review</h1>
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
                                {/* <tr>
                                <td>{Number}</td>
                                <td>{date}</td>
                                <td>{Price}</td>
                            </tr> */}
                            </tbody>
                        </table>
                        <form onSubmit={handleReview} >
                            <div className="form-control md:w-1/2">
                                <label className="label">
                                    <span className="label-text">User Name</span>
                                </label>
                                <label className="input-group">
                                    <input type="text" name="UserName" defaultValue={user?.displayName} placeholder="User Name" className="input input-bordered w-full" />
                                </label>
                            </div>
                            <div className="form-control md:w-1/2">
                                <label className="label">
                                    <span className="label-text">Rating</span>
                                </label>
                                <label className="input-group">
                                    <input type="text" name="rating" placeholder="0-5" className="input input-bordered w-full" />
                                </label>
                            </div>
                            <div className="form-control md:w-1/2">
                                <label className="label">
                                    <span className="label-text">Comment</span>
                                </label>
                                <label className="input-group">
                                    <input type="text" name="comment" placeholder="comment" className="input input-bordered w-full" />
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

                            <input type="submit" value="Submit" className="font-semibold btn my-5" />



                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Review;