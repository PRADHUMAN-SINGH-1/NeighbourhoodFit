import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './NeighborhoodList.css';


function NeighborhoodList() {

  const [neighborhoods, setNeighborhoods] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [minSafety, setMinSafety] = useState(0);
  const [maxRent, setMaxRent] = useState(100000);
  const [lifestyleFilter, setLifestyleFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // API URL for local + production
  const API_URL =
    process.env.NODE_ENV === "production"
      ? "https://neighborfit-y283.onrender.com"
      : "http://localhost:5050";

  useEffect(() => {
    axios
      .get(`${API_URL}/api/neighborhoods`)
      .then(response => setNeighborhoods(response.data))
      .catch(error => console.error('Error fetching data:', error))
      .finally(() => setIsLoading(false));
  }, [API_URL]);   // ✅ FIXED HERE

  const lifestyleOptions = [...new Set(
    neighborhoods.flatMap(n => n.lifestyle_tags || [])
  )].sort();

  const filteredNeighborhoods = neighborhoods
    .filter(n => {

      const rent = parseInt(n.avg_rent) || 0;
      const safety = parseFloat(n.safety_score) || 0;

      return (
        n.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        rent <= maxRent &&
        safety >= minSafety &&
        (lifestyleFilter === 'all' ||
          (n.lifestyle_tags || []).includes(lifestyleFilter))
      );

    })
    .sort((a, b) => (b.match_score || 0) - (a.match_score || 0));

  const topNeighborhoods = [...filteredNeighborhoods].slice(0, 5);

  return (
    <div className="neighborhood-container">

      <h1 className="heading">🏘️ Bengaluru Neighborhoods</h1>

      <div className="filter-bar">

  <div className="filter-item">
    <label>Search Area</label>
    <input
      type="text"
      placeholder="Enter area name"
      value={searchQuery}
      onChange={e => setSearchQuery(e.target.value)}
    />
  </div>

  <div className="filter-item">
    <label className="filter-label-with-info">
      Minimum Safety Score
      <button
        type="button"
        className="filter-info-button"
        aria-label="Safety score explanation"
      >
        i
        <span className="filter-info-tooltip" role="tooltip">
          Comparative score from urban indicators in this dataset, not official crime statistics.
          <br />
          <strong>Guide:</strong> 4–5 lower, 5–6.5 moderate, 6.5–8 higher, 8–9.5 very high.
        </span>
      </button>
    </label>
    <input
      type="number"
      value={minSafety}
      onChange={e => setMinSafety(e.target.value)}
    />
  </div>

  <div className="filter-item">
    <label>Maximum Rent (₹)</label>
    <input
      type="number"
      value={maxRent}
      onChange={e => setMaxRent(e.target.value)}
    />
  </div>

  <div className="filter-item">
    <label className="filter-label-with-info">
      Lifestyle
      <button
        type="button"
        className="filter-info-button"
        aria-label="Lifestyle filter explanation"
      >
        i
        <span className="filter-info-tooltip" role="tooltip">
          Tags are generated from dataset indicators:
          <br />
          <strong>Family-Friendly</strong> = schools + parks
          <br />
          <strong>Working Professionals</strong> = metro proximity + rent
          <br />
          <strong>Quiet Neighborhoods</strong> = safety + parks
          <br />
          <strong>Walkable &amp; Connected</strong> = very close metro access
        </span>
      </button>
    </label>
    <select
      value={lifestyleFilter}
      onChange={e => setLifestyleFilter(e.target.value)}
      style={{
        padding: '10px',
        borderRadius: '8px',
        border: 'none',
        backgroundColor: '#222',
        color: 'white',
        width: '200px'
      }}
    >
      <option value="all">All Lifestyles</option>
      {lifestyleOptions.map(tag => (
        <option key={tag} value={tag}>
          {tag}
        </option>
      ))}
    </select>
  </div>

</div>

      {isLoading && (
        <div
          style={{
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 0.75)',
            fontSize: '14px',
            margin: '-8px 0 18px'
          }}
        >
          Waking up the server… just a moment ☕
        </div>
      )}

      {/* MAP */}
      

      {/* Top neighborhoods */}
      <div className="top-section">

        <h2 className="top-heading">🏆 Top Neighborhoods</h2>

        <div className="top-list">

          {topNeighborhoods.map((n, i) => (

            <div key={i} className="top-item">

              <span className="rank">{i + 1}️⃣</span>
              <span className="area-name">{n.name}</span>
              <span className="area-score">⭐ {n.match_score}</span>

            </div>

          ))}

        </div>

      </div>

      {/* Cards */}
      <div className="card-grid">

        {filteredNeighborhoods.map((n, i) => (

          <div key={i} className="card">

            {i < 5 && (
  <span className="top-area-badge">🏆 Top Area</span>
)}

            <h2>{n.name}</h2>

            <p className="match-score">
              <span className="filter-label-with-info">
                ⭐ Match Score
                <button
                  type="button"
                  className="filter-info-button"
                  aria-label="Match score explanation"
                >
                  i
                  <span className="filter-info-tooltip" role="tooltip">
                    Overall neighborhood suitability score based on safety, metro proximity, parks, schools, and rent affordability.
                    <br />
                    It is not specific to the selected lifestyle.
                  </span>
                </button>
              </span>
              : {n.match_score || 'N/A'}
            </p>

            <p><strong>Ward:</strong> {n.ward || 'N/A'}</p>
            <p><strong>Safety Score:</strong> {n.safety_score || 'N/A'}</p>
            <p><strong>Avg. Rent:</strong> ₹{n.avg_rent || 'N/A'}</p>
            <p><strong>Metro Nearby:</strong> {n.metro_nearby_km || 'N/A'} km</p>
            <p><strong>Schools:</strong> {n.schools_nearby || 'N/A'}</p>
            <p><strong>Parks:</strong> {n.parks_nearby || 'N/A'}</p>
            <p><strong>Population:</strong> {n.population || 'N/A'}</p>

            <div className="tags">

              {parseFloat(n.safety_score) > 7 &&
                <span className="badge safe">Safe</span>
              }

              {parseFloat(n.metro_nearby_km) < 2 &&
                <span className="badge metro">Metro Nearby</span>
              }

              {parseInt(n.avg_rent) > 50000 &&
                <span className="badge rent">High Rent</span>
              }

            </div>

            <div className="lifestyle-tags">

              {n.lifestyle_tags && n.lifestyle_tags.map((tag, idx) => {

                let className = 'lifestyle-badge';

                if (tag.includes('Family')) className += ' family';
                else if (tag.includes('Professionals')) className += ' professionals';
                else if (tag.includes('Quiet')) className += ' quiet';
                else if (tag.includes('Walkable')) className += ' walkable';

                return (
                  <span key={idx} className={className}>
                    {tag}
                  </span>
                );

              })}

            </div>

            {n.lat && n.lon && (
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${n.lat},${n.lon}`}
                target="_blank"
                rel="noopener noreferrer"
                className="map-link"
              >
                View on Map
              </a>
            )}

          </div>

        ))}

      </div>

    </div>
  );
}

export default NeighborhoodList;
