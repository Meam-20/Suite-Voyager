
const ReviewCard = ({review}) => {
    return (
        <div className="card  bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{review.Comment}</h2>
                <p>Username:{review.UserName}</p>
                <p>Rating:{review.Rating}</p>
                <p>Email.{review.Email}</p>
            </div>
        </div> 
    );
};

export default ReviewCard;