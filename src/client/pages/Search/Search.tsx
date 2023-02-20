import React, { useState } from "react";
import axios from "axios";
import "./search.css";
import { FcSearch } from "react-icons/fc";
import Loader from "../../loader";
import Dark from '../../DarkStyle/dark';
import ArrowUp from "../Home/ArrowUp";






//API
const X_RapidAPI_Key: string | undefined = process.env.REACT_APP_X_RapidAPI_Key;
const X_RapidAPI_Host: string | undefined = process.env.REACT_APP_X_RapidAPI_Host;

//type
type Ad = {
  id: number;
  departement: number;
  city: string;
  subject: string;
  type: string;
  expanded: boolean;
  original_ad: {
    list_id: number;
    first_publication_date: string;
    subject: string;
    body: string;
    price: number[];
    images: {
      urls: [0];
      src?: string | undefined;

    };
  };
};


//Search component with API call and loading state 
const Search: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [ads, setAds] = useState<Ad[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(false);

  const [, setNumberOfAds] = useState(0);


  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleClick = async () => {
    setLoading(true);


//API call  
    const options = {
      method: "GET",
      url: "https://immobilier-leboncoin.p.rapidapi.com/api/v1/annonces",
      params: { departement: searchValue },
      headers: {
        "X-RapidAPI-Key": X_RapidAPI_Key,
        "X-RapidAPI-Host": X_RapidAPI_Host,
      },
    };
//try catch to catch errors 
    try {
      const response = await axios.request(options);

      setAds(response.data.ads);
      setNumberOfAds(response.data.ads.length)

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);

    }
  };


// Card component  with the API data 
  return (
    <section className="py-20">
      <div className="container mx-auto">
        <div className="dark-style">
          <Dark />
        </div>
        <ArrowUp />

        <h1 className="title">Search KoliFlux</h1>


        <div className="search">
          <input
            placeholder="N° Departement"
            type="text"
            className="input"
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <FcSearch className="search-icon" onClick={handleClick} />
        </div>
        {ads.length === 0 && searchValue && (
          loading && <Loader />
        )}

        <div className="card-container">

          {ads.map(ad => (



            <div className="card" key={ad.id}>

              <img src={String(ad.original_ad.images.urls[0])} alt="" />
              <h1 className="card-title">{ad.original_ad.subject}</h1>
              <h2 className="card-location">Ville: {ad.city}</h2>
              <h2 className="card-price">Prix: {ad.original_ad.price}€</h2>
              <p className="card1-body1" style={{ display: isExpanded ? "block" : "none" }} >
                {ad.original_ad.body}
              </p>
              {ad.original_ad.body.length > 100 && (
                <button className="read-more-btn" onClick={toggleExpand}>
                  {isExpanded ? "Réduire" : "Lire la suite"}


                </button>

              )}



            </div>

          ))}
        </div>
      </div>

    </section>
  );
};




export default Search;

