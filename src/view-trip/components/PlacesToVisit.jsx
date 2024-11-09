import React from "react";
import Place from "./Place";

const PlacesToVisit = ({ trip }) => {
  return (
    <div>
      <h2 className="font-bold text-lg mt-5">Place to Visit</h2>
      <div>
        {trip?.tripData?.itinerary?.map((item, index) => (
          <div key={index} className="mt-5">
            <h2 className="font-medium text-lg">Day {item.day}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {item.activities.map((place, index) => (
                <div key={index} className="my-3">
                  <h2 className="font-medium text-sm text-orange-600">
                    {place.time}
                  </h2>
                  <Place place={place} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlacesToVisit;
