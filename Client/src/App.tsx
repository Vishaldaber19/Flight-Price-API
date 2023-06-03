import axios from "axios";
import React, { useState } from "react";

function App() {
  const cities: Array<string> = [
    "Delhi",
    "Ahmedabad",
    "Bengaluru",
    "Chennai",
    "Goa",
    "Hyderabad",
    "Jaipur",
    "Kolkata",
    "Mumbai",
    "Chandigarh",
  ];
  const URL = "https://flight-price-api-esgk.onrender.com/flights/";
  const [departureCity, setDepartureCity] = useState("Delhi");
  const [arrivalCity, setArrivalCity] = useState("Jaipur");
  const [journeyDate, setJourneyDate] = useState(new Date().toJSON().slice(0,10).replace(/-/g,'-'));
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const arrivalHandleChange = (e: any) => {
    setArrivalCity(e.target.value);
  };
  const departureHandleChange = (e: any) => {
    setDepartureCity(e.target.value);
  };

  const dateHandleChange = (e: any) => {
    setJourneyDate(e.target.value);
  };

  const handleSearch = () => {
    console.log("departure : ", departureCity);
    console.log("arrival", arrivalCity);
    console.log("date", journeyDate);
    setLoading(true);
    axios
      .get(`${URL}${departureCity}/${arrivalCity}/${journeyDate}`)
      .then((result) => {
        console.log(result);
        setResult(result.data);
      })
      .catch((err) => setResult(err));
    setLoading(false);
  };

  return (
    <div className="w-full flex justify-center items-center flex-col  ">
      <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400 pt-10">
        Search Flight
      </p>
      <form className="bg-white shadow-md rounded px-8 pt-4 pb-8 mb-4">
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="departureCity"
            >
              Source
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="departureCity"
                onChange={departureHandleChange}
                required
              >
                {cities.map((city) => {
                  return <option>{city}</option>;
                })}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="arrivalCity"
            >
              Destination
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="arrivalCity"
                onChange={arrivalHandleChange}
                required
              >
                {cities.map((city) => {
                  return <option>{city}</option>;
                })}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="journeyDate"
            >
              Date
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="journeyDate"
              type="date"
              value={journeyDate}
              onChange={dateHandleChange}
              required
            />
          </div>
        </div>
        <div className="md:flex md:items-center mt-3">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button
              className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={handleSearch}
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>

        <div>
          <label
            className="block uppercase tracking-wide mt-3 text-gray-700 text-xs font-bold mb-2"
            htmlFor="arrivalCity"
          >
            Result
          </label>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Flight Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  result.length > 0 ? (
                    result.map((data) => {
                      const {_id,flightName,price} = data;
                      return(
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={_id}>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {flightName}
                    </th>
                    <td className="px-6 py-4">{price}</td>
                  </tr>
                      )
                  }) )
                 :
                 <span className="m-5 pt-3">No Flights Found.....</span>  
                }
              </tbody>
            </table>
          </div>
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs">Made by Vishal Daber</p>
    </div>
  );
}

export default App;
