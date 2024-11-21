import React from "react";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";


const HeroBanner = () => {
  const [backGround, setBackGround] = useState("");
  const [query, setQuery] = useState("");
  const {data,loading}=useFetch("/movie/upcoming")
  const navigate=useNavigate();
  const {url}=useSelector((state)=>state.home)

  useEffect(()=>{
const bg=url.backdrop+data?.results?.[Math.floor(Math.random()*20)]?.backdrop_path;
setBackGround(bg);
},[data])

  

const searchQuery = (event) => {
    if (event.key === "Enter" && query.length > 0) {
        navigate(`/search/${query}`)
    }

  };
  const clickQuery = (query) => {
   
        navigate(`/search/${query}`)
    

  };
  return (
    
      <div className="heroBanner">
       {!loading && (<div className="backdrop-img">
          <Img src={backGround} />
        </div>)}
        <div className="opacity-layer"></div>
        <ContentWrapper>
        
          <div className="heroBannerContent">
            <span className="title"></span>
            <span className="subTitle">
              Your Favourite place to explore your favoutire movies,Tv shows and
              people. Explore it now.
            </span>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search the movie or tv show "
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQuery}
              />
              <button onClick={()=>clickQuery(query)}>Search</button>
            </div>
          </div>
        
      
        </ContentWrapper>
       
    </div>
  );
};

export default HeroBanner;
