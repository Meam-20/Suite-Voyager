import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";

const RoomReview = (details) => {

   const detailsRoomId = details.details._id


    const [reviews, setReviews] = useState();
    
    useEffect(()=>{
        fetch(`http://localhost:5000/review`)
        .then(res=>res.json())
        .then(data=>setReviews(data))
    },[])
    // console.log(reviews)

 
    if(reviews){
 
        return (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                {
                    reviews.map(review=><ReviewCard key={review._id} review={review}></ReviewCard>)
                }
            </div>
        );
    }
    else{
        return(
            <div>
                <h1>No Reviews</h1>
            </div>
        );
    }
};

export default RoomReview;