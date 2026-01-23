import {  useLoaderData } from "react-router-dom";
import Room from "./Room";

const Rooms = () => {
    const rooms = useLoaderData();
    console.log(rooms);
    return (

        <div className="grid lg:gap-3 px-4 rounded-lg bg-[#1E2C1A] w-11/12 mx-auto grid-cols-1  md:grid-cols-2 lg:grid-cols-3">
            {
                rooms.map(room =><Room key={room._id} room={room}></Room>)
            }
        </div>
    );
};

export default Rooms;