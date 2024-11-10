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
  const [image, setImage] = useState();

  useEffect(() => {
    trip && GetPlacePhoto();
    const num = Math.floor(Math.random() * 10);
    setImage(num);
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip.userSelection?.location.label,
    };
    const result = await GetPlaceDetails(data).then((resp) => {
      // console.log(resp.data.places[0].photos[3].name);
      const photoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        resp.data.places[0].photos[image].name
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

      <div className="flex justify-between items-center">
        <div className="my-3 sm:my-5 flex flex-col gap-2">
          <Link
            to={
              "https://www.google.com/maps/search/?api=1&query=" +
              trip.userSelection?.location.label
            }
            target="_blank"
          >
            <h2 className="font-bold text-xl sm:text-2xl">
              {trip.userSelection?.location.label}
            </h2>
          </Link>
          <div className="flex gap-1 sm:gap-5 items-center">
            <div>
              {trip.userSelection?.noOfDays == "1" ? (
                <h2 className="p-2 sm:p-1 sm:px-3 bg-gray-200 rounded-full text-gray-500 text-xs sm:text-base text-center">📆1 Day</h2>
              ) : (
                <h2 className="p-2 sm:p-1 sm:px-3 bg-gray-200 rounded-full text-gray-500 text-xs sm:text-base text-center">📆{trip.userSelection?.noOfDays} Days</h2>
              )}
            </div>
            <h2 className="p-2 sm:p-1 sm:px-3 bg-gray-200 rounded-full text-gray-500 text-xs sm:text-base text-center">
              💰 {trip.userSelection?.budget} Budget
            </h2>
            <h2 className="p-2 sm:p-1 sm:px-3 bg-gray-200 rounded-full text-gray-500 text-xs sm:text-base text-center">
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
          <Button className="hidden sm:inline">
            <IoIosSend />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default InfoSection;
