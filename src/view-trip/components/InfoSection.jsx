import { Button } from "@/components/ui/button";
import { GetPlaceDetails } from "@/service/GlobalAPI";
import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { Link } from "react-router-dom";

const PHOTO_REF_URL =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=1000&key=" +
  import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

const InfoSection = ({ trip }) => {
  const [photourl, setPhotourl] = useState();

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip.userSelection?.location.label,
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
    <div>
      <img
        src={photourl}
        className="w-full h-[340px] object-cover rounded-xl"
      />

      <div className="flex justify-between  items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {trip.userSelection?.location.label}
          </h2>
          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-base">
              📆 {trip.userSelection?.noOfDays} Day
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-base">
              💰 {trip.userSelection?.budget} Budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-base">
              🥂 No of Traveller : {trip.userSelection?.traveller}
            </h2>
          </div>
        </div>

        <Link
          to={
            "https://www.google.com/maps/search/?api=1&query=" +
            trip.userSelection?.location.label
          }
          target="_blank"
        >
          <Button>
            <IoIosSend />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default InfoSection;
