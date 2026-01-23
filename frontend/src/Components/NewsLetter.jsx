
const NewsLetter = () => {
    return (
        <div  data-aos="flip-left"
        data-aos-easing="ease-out-cubic"
        data-aos-duration="2000"
         style={{ backgroundImage: 'url(https://i.ibb.co/BNvdfDG/pexels-pixabay-262048.jpg)' }}
         className="flex hero lg:w-11/12 mx-auto mb-10 py-20 flex-col items-center justify-center  text-[#1E2C1A]">
             <div className="hero-overlay bg-opacity-60"></div>
            <h2 className="text-3xl font-bold mb-4">Let s keep in touch</h2>
            <p className="text-xl font-bold mb-5">Subscribe to keep up with fresh deals and exciting updates.</p>
            <div className="mb-6 flex gap-3">
                <input type="email" className="px-5 py-3 rounded-lg" placeholder="Enter your email address" />
                <button className="btn">Send</button>
            </div>
            <div className="notice">
                <input type="checkbox" />
                <span className="text-lg font-bold">I agree to my email address being stored and uses to receive monthly newsletter.</span>
            </div>
        </div>
    );
};

export default NewsLetter;