import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography, Marker, Annotation } from "react-simple-maps";
import { geoCentroid } from "d3-geo";
import axios from 'axios';

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const colorScale = (percentage) => {
    if (percentage < 1) {
        return 'green';
    }
    if (percentage < 2) {
        return 'yellow';
    }
    if (percentage < 5) {
        return 'orange';
    }
    return 'red'
};

const offsets = {
    VT: [50, -8],
    NH: [34, 2],
    MA: [30, -1],
    RI: [28, 2],
    CT: [35, 10],
    NJ: [34, 1],
    DE: [33, 0],
    MD: [47, 10],
    DC: [49, 21]
};

const MapChart = () => {
  const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/states')
            .then(res => setData(res.data))
    }, []);

  return (
    <>
      <ComposableMap projection="geoAlbersUsa">
        <Geographies geography={geoUrl}>
          {({ geographies }) => (
              <>
              {
                  geographies.map((geo) => {
                      const cur = data.find((s) => s.name === geo.properties.name);
                      return (
                          <Geography
                              key={geo.rsmKey}
                              stroke="#FFF"
                              geography={geo}
                              fill={colorScale(cur ? ((cur.cumulative_cases / cur.population) * 100) : "#fff")}
                          />
                      );
                  })
              }
                  {geographies.map(geo => {
                      const centroid = geoCentroid(geo);
                      const cur = data.find(s => s.name === geo.properties.name);
                      return (
                          <g key={geo.rsmKey + "-name"}>
                              {cur &&
                              centroid[0] > -160 &&
                              centroid[0] < -67 &&
                              (Object.keys(offsets).indexOf(cur.abbreviation) === -1 ? (
                                  <Marker coordinates={centroid}>
                                      <text y="2" fontSize={14} textAnchor="middle">
                                          {cur.abbreviation}
                                      </text>
                                  </Marker>
                              ) : (
                                  <Annotation
                                      subject={centroid}
                                      dx={offsets[cur.abbreviation][0]}
                                      dy={offsets[cur.abbreviation][1]}
                                  >
                                      <text x={4} fontSize={14} alignmentBaseline="middle">
                                          {cur.abbreviation}
                                      </text>
                                  </Annotation>
                              ))}
                          </g>
                      );
                  })}
              </>
          )}
        </Geographies>
      </ComposableMap>
    </>
  );
};

export default MapChart;
