import { Button } from "@/components/ui/button";
import { GetPlaceDetails } from "@/service/GlobalAPI";
import React, { useEffect, useState } from "react";
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

const PHOTO_REF_URL =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=1000&key=" +
  import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

const Place = ({ place }) => {
  const [photourl, setPhotourl] = useState();

  useEffect(() => {
    place && GetPlacePhoto();
  }, [place]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: place.placeName,
    };
    const result = await GetPlaceDetails(data).then((resp) => {
      // console.log(resp.data.places[0].photos[3].name);
      const photoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        resp.data.places[0].photos[3].name
      );
      setPhotourl(photoUrl);
    });
  };
  return (
    <div className="shadow-md border rounded-xl p-5 mt-2 flex gap-5 hover:scale-105 hover:shadow-sm transition-all cursor-pointer">
      <img src={photourl} className="w-[130px] h-[130px] rounded-xl" />
      <div>
        <h2 className="font-bold text-lg">{place.placeName}</h2>
        <p className="text-sm text-gray-400">{place.placeDetails}</p>
        <h2 className="mt-2">🕙 {place?.timeToTravel}</h2>
        <Button className="size-9">
          <Link
            to={
              "https://www.google.com/maps/search/?api=1&query=" +
              place.geoCoordinates +
              "," +
              place.placeName
            }
            target="_blank"
          >
            <FaMapLocationDot />{" "}
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Place;
