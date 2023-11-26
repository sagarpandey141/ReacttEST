import React, { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiConnector } from "../sevices/axios";
import ThrTab from "./components/ThreeComponent/ThrTab";
import {Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {Autoplay} from "swiper/modules";
import "../pages/HomePage.css"
const HomePage = () => {
   const [searchWord,setSearchWord] = useState("");
   const navigate = useNavigate();
    function handleSearch(keyword) {
        if(keyword != ""){
             navigate(`/search/${keyword}`)
        }  
    }
const baseImageUrl = import.meta.env.VITE_IMAGE_BASE_URL;
const [backgroundImages,setBackGroundImages] = useState([]);
async function backImages(){
   try{
      const response = await apiConnector("GET","https://api.themoviedb.org/3/trending/movie/week");
      console.log(response,"data")
      const arr = response.data.results.map((data) => baseImageUrl+"original"+data.backdrop_path);
      setBackGroundImages(arr);
   }catch(error){
    console.log(error,"error")
   }
}
useEffect(()=> {
   backImages();
},[])

  return (
    <div className="bg-[#08172f]">
      {
         backgroundImages.length===0 ? (
             <div>
               <div class="center">
                     <div class="wave"></div>
                     <div class="wave"></div>
                     <div class="wave"></div>
                     <div class="wave"></div>
                     <div class="wave"></div>
                     <div class="wave"></div>
                     <div class="wave"></div>
                     <div class="wave"></div>
                     <div class="wave"></div>
                     <div class="wave"></div>
               </div>
             </div>
         ) : (
                
       <div className="relative">
         <Swiper 
         loop={true} 
         slidesPerView={1}
         autoplay={{
            delay: 3000,
            disableOnInteraction: false,
         }}
         className="relative max-h-[750px] border"
         modules={[Autoplay]}
         >
            {
               backgroundImages.map((str,index)=> <SwiperSlide key={index}>
                  <img src={str} alt={str} className="brightness-75 w-full " />
            </SwiperSlide>)
            }
         </Swiper>
          
           
         <div className="absolute flex justify-center items-center z-10 bg-gradient-to-t from-slate-900  mt-[-30rem] w-[100vw]   border-pink-800 ">
            <div className="flex flex-col items-center ">
                  <h1 className="xl:text-7xl text-white font-bold sm:text-5xl text-3xl transition-all duration-500">Welcome.</h1>
                  <p className=" text-center xl:text-xl text-base text-gray-200">Millions of movies, TV shows and people to discover. Explore now.</p>
                  <div className="flex lg:text-lg mt-10 max-w-xl w-10/12 ">
                  <input type="text" value={searchWord} onChange={(e) => 
                     setSearchWord(e.target.value)
                     
                  }
                     onKeyDown={(e) =>{
                        if(e.key == "Enter"){
                        handleSearch(searchWord)
                        }
                     } 
                     } className="focus:outline-none rounded-l-full w-full lg:py-2 lg:px-6 py-1 px-3  text-gray-500" placeholder="Search for a movie or tv show..." />
                  <button onClick={() => {
                  handleSearch(searchWord);
                  }} className="py-2 lg:text-base  text-sm px-5 rounded-r-full bg-gradient-to-r text-gray-100 from-yellow-500 to-pink-500">Search</button>
                  </div>
            </div>
         </div>
                    <ThrTab/>  
         </div>
         )
      }
    </div>
  );
};

export default HomePage;
