import { GetPlaceDetails } from "@/service/GlobalAPI";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PHOTO_REF_URL =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=1000&key=" +
  import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

const UserTripCard = ({ trip }) => {
  const [photourl, setPhotourl] = useState();

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip.userSelection?.location.label,
    };
    const result = await GetPlaceDetails(data).then((resp) => {
      console.log(resp.data.places[0].photos[3].name);
      const photoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        resp.data.places[0].photos[3].name
      );
      setPhotourl(photoUrl);
    });
  };
  return (
    <Link to={'/view-trip/'+trip.id}>
      <div className="hover:scale-105 cursor-pointer transition-all">
        <img src={photourl} className="h-[180px] w-full object-cover rounded-xl" />
        <div>
          <h2 className="font-bold text-lg">
            {trip.userSelection.location.label}
          </h2>
          <h2 className="text-sm text-gray-500">
            {trip.userSelection.noOfDays} Days trip with{" "}
            {trip.userSelection.budget} budget
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default UserTripCard;
