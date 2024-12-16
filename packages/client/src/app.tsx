import { useState, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
// import { getCodeSandboxHost } from "@codesandbox/utils";

type Hotel = { _id: string, chain_name: string; hotel_name: string; city: string, country: string };
type Country = { _id: string; "country": string; "countryisocode": string };
type City = { _id: string; "name": string; };

// const codeSandboxHost = getCodeSandboxHost(3001)
const API_URL = "https://ubiquitous-winner-q4x647rqp4jfxpvj-3001.app.github.dev" // codeSandboxHost ? `https://${codeSandboxHost}` : 'http://localhost:3001'

const search = async (value: string) => {
  const hotelsData = await fetch(`${API_URL}/search/${value}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
  return (await hotelsData.json()) as { hotels: Hotel[]; countries: Country[]; cities: City[] };
}

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [showClearBtn, setShowClearBtn] = useState(false);

  const fetchData = async (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);

    if (event.target.value === '') {
      resetData();
      return;
    }

    const data = await search(event.target.value)
    setShowClearBtn(true);
    setHotels(data.hotels);
    setCountries(data.countries);
    setCities(data.cities);
  };

  const resetData = () => {
    searchValue && setSearchValue("");
    setHotels([]);
    setShowClearBtn(false);
  }

  return (
    <div className="App">
      <div className="container">
        <div className="row height d-flex justify-content-center align-items-center">
          <div className="col-md-6">
            <div className="dropdown">
              <div className="form">
                <i className="fa fa-search"></i>
                <input
                  type="text"
                  className="form-control form-input"
                  placeholder="Search accommodation..."
                  value={searchValue}
                  onChange={fetchData}
                />
                {showClearBtn && (
                  <span className="left-pan">
                    <i className="fa fa-close" onClick={resetData}></i>
                  </span>
                )}
              </div>
              {!!hotels.length && (
                <div className="search-dropdown-menu dropdown-menu w-100 show p-2">
                  <h2>Hotels</h2>
                  {hotels.length ? hotels.map((hotel, index) => (
                    <li key={hotel.hotel_name + "-" + index}>
                      <Link to={`/hotels/${hotel.hotel_name}`} className="dropdown-item">
                        <i className="fa fa-building mr-2"></i>
                        {hotel.hotel_name}
                      </Link>
                      <hr className="divider" />
                    </li>
                  )) : <p>No hotels matched</p>}
                  <h2>Countries</h2>
                  {countries.length ? countries.map((country, index) => (
                    <li key={country.country + "-" + index}>
                      <Link to={`/countries/${country.country}`} className="dropdown-item">
                        <i className="fa fa-building mr-2"></i>
                        {country.country}
                      </Link>
                      <hr className="divider" />
                    </li>
                  )) : <p>No countries matched</p>}
                  <h2>Cities</h2>
                  {cities.length ? cities.map((city, index) => (
                    <li key={city.name + "-" + index}>
                      <Link to={`/cities/${city.name}`} className="dropdown-item">
                        <i className="fa fa-building mr-2"></i>
                        {city.name}
                      </Link>
                      <hr className="divider" />
                    </li>
                  )) : <p>No cities matched</p>}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
