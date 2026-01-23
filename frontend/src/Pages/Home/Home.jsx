import { useEffect } from "react";
import Footer from "../../Components/Footer";
import Gallery from "../../Components/Gallery";
import Map from "../../Components/Map";
import NewsLetter from "../../Components/NewsLetter";
import Promotion from "../../Components/Promotion";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
  useEffect(()=>{
    AOS.init();
  },[])
  return (
    <div className="py-10">
      <Promotion></Promotion>
      <Gallery></Gallery>
      <NewsLetter></NewsLetter>
      <Map></Map>
      <Footer></Footer>
      
    </div>
  );
};

export default Home;