// CardList.js
import React from 'react';

const CardList = ({ robots }) => {
  return (
    <div>
      {robots.map(robot => (
        <div key={robot.id} className="card">
          <img src={`https://robohash.org/${robot.id}?200x200`} alt="robot" />
          <h2>{robot.name}</h2>
          <p>{robot.email}</p>
        </div>
      ))}
    </div>
  );
};

export default CardList;
