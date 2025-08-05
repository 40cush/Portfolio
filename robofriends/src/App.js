// App.js

import React, { useState, useEffect } from "react";
import CardList from "./CardList";
import SearchBox from "./SearchBox";
import "./App.css";
import 'tachyons'

const App = () => {
  const [robots, setRobots] = useState([]);
  const [searchfield, setSearchfield] = useState('');

  // Fetch robot data on component mount
  useEffect(() => {
    const fetchRobots = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();
        setRobots(users);
      } catch (error) {
        console.error('Error fetching robots:', error);
      }
    };

    fetchRobots();
  }, []);

  const filteredRobots = robots.filter(robot =>
    robot.name.toLowerCase().includes(searchfield.toLowerCase())
  );

  return (
    <div className="App">
      <h2>Robofriends</h2>
      <SearchBox onSearchChange={(e) => setSearchfield(e.target.value)} />
      <CardList robots={filteredRobots} />
    </div>
  );
};

export default App;
