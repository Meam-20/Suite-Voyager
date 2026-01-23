// React Router থেকে Link import করা navigation এর জন্য
import { Link } from "react-router-dom";

// Hotel promotion section component
const Promotion = () => {
    return (
        // Hero section with background image এবং AOS animation
        <div data-aos="zoom-in" className="hero w-11/12 mx-auto min-h-screen" style={{ backgroundImage: 'url(https://i.ibb.co/6RdZNDB/pexels-jonas-togo-2907196.jpg)' }}>
            {/* Background overlay for better text readability */}
            <div className="hero-overlay bg-opacity-60"></div>
            {/* Main content container */}
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    {/* Promotion headline */}
                    <h1 className="mb-5 text-5xl font-bold my-7"> Save up to 50% on your dream stay!</h1>
                    {/* Promotion benefits list */}
                    <ul className="text-start">
                        <li>Free Breakfast for a delightful start to your day!</li> {/* বিনামূল্যে নাস্তা */}
                        <li>Complimentary Wi-Fi for staying connected.</li> {/* ফ্রি ওয়াইফাই */}
                        <li>Kids Stay FREE</li> {/* শিশুদের জন্য ফ্রি থাকা */}
                        <li> Perfect for family vacations!</li> {/* পারিবারিক ছুটির জন্য উপযুক্ত */}
                        <li>Flexible Booking</li> {/* নমনীয় বুকিং */}
                        <li>No cancellation fees!</li> {/* বাতিলকরণ ফি নেই */}
                    </ul>
                   {/* Book Now button যা rooms page এ নিয়ে যায় */}
                   <Link to='/rooms'><button className="btn my-7 ">Book Now</button></Link>
                </div>
            </div>
        </div>
    );
};

export default Promotion;