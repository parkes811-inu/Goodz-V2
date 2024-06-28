import React from 'react';
import "../admin/Index.css"

const IndexStats = ({ stats }) => (
  <div className="stats">
    {Object.keys(stats).map((key, index) => (
      <React.Fragment key={key}>
        {index > 0 && <div className="divider">&gt;</div>}
        <div className="col">
          <div>{stats[key].label}</div>
          <div>{stats[key].value}</div>
        </div>
      </React.Fragment>
    ))}
  </div>
);

export default IndexStats;