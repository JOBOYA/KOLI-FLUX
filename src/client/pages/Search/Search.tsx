import React, { useState } from "react";
import axios from "axios";
import "./search.css";
import { FcSearch } from "react-icons/fc";
import { HiOutlineMail } from "react-icons/hi";
import { BsTelephoneFill } from "react-icons/bs";
import {BiBed} from "react-icons/bi";
import Loader from "../../loader";
import Dark from "../../components/DarkStyle/dark";
import ArrowUp from "../Home/ArrowUp";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";



const X_RapidAPI_Key: string | undefined = process.env.REACT_APP_X_RapidAPI_Key;
const X_RapidAPI_Host: string | undefined = process.env.REACT_APP_X_RapidAPI_Host;

type Item = {
  id: number;
  Object: {
    title: string;
    bedrooms: number;
    city: string;
    price: number;
    livingArea: number;
    livingAreaUnit: string;
    professional: {
      email: string;
      phoneNumber: number;
    };
    photos: {
      url: string;
    }[];
    medias: {
      
      url: string;
    }[];
  };
};




const Search: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    
    const options = {
     
      method: "GET",
      url: "https://seloger.p.rapidapi.com/properties/list",
      params: {
       zipCodes: searchValue,

        pageIndex: "1",
        pageSize: "50",
        realtyTypes: "1",
        transactionType: "1",
        sortBy: "0",
        includeNewConstructions: "true",
      },
      headers: {
        "x-rapidapi-key": X_RapidAPI_Key,
        "x-rapidapi-host": X_RapidAPI_Host,

      },
    };

    try {
      const response = await axios.request(options);
      const items = response.data.items.map((item: any) => ({
        id: item.id,
        Object: {
          title: item.title,
          city: item.city,
          bedrooms: item.bedrooms,
          livingArea: item.livingArea,
          price: item.price,
          professional: item.professional,
          PhoneNumber: item.professional,
          photos: item.photos.map((photo: any) => ({
            url: photo,
          })),
          medias: item.medias.map((media: any) => ({
            
            url: media.url,
          })),

        },
      }));



      

      
      setItems(items);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };




  

  return (
    <section className="py-20">
      <div className="container mx-auto">
        <div className="dark-style">
        <Dark active={true} />
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

        {loading && <Loader />}

        <div className="card-container">
          {items.map((item) => (
            <div className="card" key={item.id}>
            
            <Carousel
                showThumbs={false}
                showStatus={false}
                
                autoPlay={true}
                infiniteLoop={true}
                interval={3000}
                transitionTime={1000}
               
              >
                {item.Object.photos.map((photo) => (
                  <div key={photo.url} className="carousel">
<img src={photo.url} alt=""  />
              </div>
                ))}
              </Carousel>



         

              
              <h1 className="card-title">{item.Object.title}</h1>
              <h2 className="card-location">Ville: {item.Object.city}</h2>
              <h2 className="card-price">Prix: {item.Object.price}€</h2>
              <h2 className="card-title" style={{fontSize: '20px'}}><BiBed />Room : {item.Object.bedrooms}</h2>
              <h2 className="card-title">Surface: {item.Object.livingArea}m²</h2>
              <h5 className="card-title" style={{fontSize: '1em'}}><HiOutlineMail style={{fontSize: '2em'}}/>{item.Object.professional.email}</h5>
              <h5 className="card-title"><BsTelephoneFill /> Tél: {item.Object.professional.phoneNumber}</h5>
              {item.Object.medias.length > 0 ? (
  <button
    className="read-more-btn"
    onClick={() => {
      window.open(item.Object.medias[0].url, "_blank");
    }}
  >
    Visite 360°
  </button>
) : null}








          
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Search;
