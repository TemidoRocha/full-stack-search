import { useState, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
// import { getCodeSandboxHost } from "@codesandbox/utils";

type Hotel = { _id: string, chain_name: string; hotel_name: string; city: string, country: string };

// const codeSandboxHost = getCodeSandboxHost(3001)
const API_URL = "https://ubiquitous-winner-q4x647rqp4jfxpvj-3001.app.github.dev" // codeSandboxHost ? `https://${codeSandboxHost}` : 'http://localhost:3001'

const fetchAndFilterHotels = async (value: string) => {
  const hotelsData = await fetch(`${API_URL}/hotels`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
  const hotels = (await hotelsData.json()) as Hotel[];
  return hotels.filter(
    ({ chain_name, hotel_name, city, country }) =>
      chain_name.toLowerCase().includes(value.toLowerCase()) ||
      hotel_name.toLowerCase().includes(value.toLowerCase()) ||
      city.toLowerCase().includes(value.toLowerCase()) ||
      country.toLowerCase().includes(value.toLowerCase())
  );
}

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [showClearBtn, setShowClearBtn] = useState(false);

  const fetchData = async (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);

    if (event.target.value === '') {
      resetData();
      return;
    }

    const filteredHotels = await fetchAndFilterHotels(event.target.value)
    setShowClearBtn(true);
    setHotels(filteredHotels);
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
                    <li key={index}>
                      <Link to={`/hotels/${hotel.hotel_name}`} className="dropdown-item">
                        <i className="fa fa-building mr-2"></i>
                        {hotel.hotel_name}
                      </Link>
                      <hr className="divider" />
                    </li>
                  )) : <p>No hotels matched</p>}
                  <h2>Countries</h2>
                  {hotels.length ? hotels.map((hotel, index) => (
                    <li key={index}>
                      <Link to={`/countries/${hotel.country}`} className="dropdown-item">
                        <i className="fa fa-building mr-2"></i>
                        {hotel.country}
                      </Link>
                      <hr className="divider" />
                    </li>
                  )) : <p>No countries matched</p>}
                  <h2>Cities</h2>
                  {hotels.length ? hotels.map((hotel, index) => (
                    <li key={index}>
                      <Link to={`/cities/${hotel.city}`} className="dropdown-item">
                        <i className="fa fa-building mr-2"></i>
                        {hotel.city}
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
