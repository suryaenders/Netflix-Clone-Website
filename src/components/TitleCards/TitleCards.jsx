// import React from 'react'
import { Link } from "react-router-dom";
import "./TitleCards.css";
// import cards_data from "../../assets/cards/Cards_data";
import { useEffect, useRef, useState } from "react";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZWJmYWIzMDY5Yzc1NzJhOTU0MDIzZmY0ZmRkNzkyNyIsIm5iZiI6MTc3OTc5NjAzNi4zOTYsInN1YiI6IjZhMTU4ODQ0ZTIyNTA4MGJjMTQwZTkzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BSwCOCvALkkpe0FJU5Nikamz4w0-aS3ZvRaNbIaPCU8",
  },
};

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`,
      options,
    )
      .then((res) => res.json())
      .then((res) => setApiData(res.results))
      .catch((err) => console.error(err));

    const currentRef = cardsRef.current;
    currentRef?.addEventListener("wheel", handleWheel);

    return () => {
      currentRef?.removeEventListener("wheel", handleWheel);
    };
  }, [category]);

  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return (
            <Link to={`/player/${card.id}`} className="card" key={index}>
              <img
                src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path}
                alt=""
              />
              <p>{card.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TitleCards;
