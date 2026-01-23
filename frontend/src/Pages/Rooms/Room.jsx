import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

const Room = ({ room }) => {
    // Model onujayi data destructure krun
    const { _id, image, name, type, price, available } = room; 

    return (
        <Link to={`/rooms/${_id}`}>
            <div className='my-5 text-[#D49B35] border-x-2 border-y-2 rounded-lg p-2 transition hover:shadow-xl'>
                <img className='w-full h-72 rounded-lg hover:translate-y-2 transition-transform object-cover' src={image} alt={name} />
                <div className='mt-2 p-2'>
                    <h1 className='text-xl font-bold'>{name}</h1>
                    <p className='text-sm opacity-80'>{type}</p>
                    <div className='flex justify-between items-center mt-2'>
                        <h1 className='text-lg font-bold'>${price}/night</h1>
                        <span className={`badge ${available ? 'badge-success' : 'badge-error'} badge-sm`}>
                            {available ? 'Available' : 'Booked'}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

Room.propTypes = {
    room: PropTypes.object
};

export default Room;