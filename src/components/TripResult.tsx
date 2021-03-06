import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { TicketResponse } from "../Models/TicketResponse";
import { getTMEvents } from "../services/GetTMEvents";
import { getWeather } from "../services/GetWeather";
import { EventResults } from "./EventResults";
import { WeatherResult } from "./WeatherResult";
import { getPhoto } from "../services/GetPhotos";
import { PhotoResult } from "./PhotoResult";
import { useContext } from "react";
import { TripContext } from "../context/TripContext";
import "./tripResult.css";

export function TripResult() {
  const [tripResultsWeather, setTripResultsWeather] = useState<any>([]);

  const [tripResultsEvents, setTripResultsEvents] = useState<
    TicketResponse | undefined
  >();

  const [tripResultPhoto, setTripResultPhoto] = useState<any>();

  const [searchParams, setSearchParams] = useSearchParams();

  const [thisTrip, setThisTrip] = useState({
    searchTerm: searchParams.get("destination")!,
    arrivalDate: searchParams.get("arrivalDate")!,
    departureDate: searchParams.get("departureDate")!,
    URL: window.location.search,
  });

  console.log(thisTrip.URL);

  const { addTrip } = useContext(TripContext);

  useEffect(() => {
    const destination = searchParams.get("destination");
    const arrivalDate = searchParams.get("arrivalDate");
    const departureDate = searchParams.get("departureDate");
    if (destination && arrivalDate && departureDate) {
      getWeather(destination, arrivalDate, departureDate).then((data) => {
        setTripResultsWeather(data);
      });
      getTMEvents(destination, arrivalDate, departureDate).then((data) => {
        setTripResultsEvents(data);
      });
    }
    getPhoto(destination!).then((data) => {
      setTripResultPhoto(data);
    });
  }, [searchParams]);

  return (
    <div className="results-page">
      <h1 className="results-header">Find the fun in </h1>
      <h1 className="italic-city">{thisTrip.searchTerm}</h1>
      <div className="airbnb-saveButton-photo">
        <PhotoResult photo={tripResultPhoto} />

        <WeatherResult weather={tripResultsWeather.days}></WeatherResult>
      </div>

      <button className="save-button" onClick={() => addTrip(thisTrip)}>
        Save This Trip
      </button>
      <a
        className="airbnb"
        href={`https://www.airbnb.com/s/${searchParams.get(
          "destination"
        )}/homes?tab_id=home_tab&refinement_paths%5B%5D=%2Fhomes&checkin=${searchParams.get(
          "arrivalDate"
        )}&checkout=${searchParams.get(
          "departureDate"
        )}&source=structured_search_input_header&search_type=filter_change`}
      >
        Find Airbnb
      </a>
      <div className="side-by-side">
        <EventResults events={tripResultsEvents?._embedded.events} />
      </div>
    </div>
  );
}
