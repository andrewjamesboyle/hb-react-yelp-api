import { useEffect, useState } from 'react';
import './App.css';
import { RestaurantListItem } from './components/RestaurantListItem';
import { fetchBusinesses } from './services/yelp';

function App() {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [zip, setZip] = useState('97031');
  // const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchBusinesses(zip, search);
      console.log('data', data);
      setBusinesses(data);
      setLoading(false);
    };
    fetchData();
  }, [zip, search]);

  const searchRestaurants = async () => {
    const resp = await fetchBusinesses(`/.netlify/functions/yelp?zip=${zip}`);
    const data = await resp.json();
    setBusinesses(data);
    setLoading(false);
    // call the API with the zip
    // set the restaurants in state
  };
  // TODO -- add event for button click to handle calling fetchBusinesses with zip / search

  return (
    <div className="App">
      <h1>Alchemy Restaurant Finder</h1>
      <div className="query-form">
        <div className="form-control">
          <label>Zip:</label>
          <input type="text" placeholder="zip" value={zip} onChange={(e) => setZip(e.target.value)} />
        </div>
        <div className="form-control">
          <label>Query:</label>
          <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <button onClick={searchRestaurants}>Search</button>
      </div>
      {loading && <div className="loader"></div>}
      {!loading && businesses.map((b) => <RestaurantListItem key={b.id} {...b} />)}
      {/* {restaurants.map((restaurant) => (
        <div key={restaurant.id}>{restaurant.name}</div>
      ))} */}
    </div>
  );
}

export default App;
