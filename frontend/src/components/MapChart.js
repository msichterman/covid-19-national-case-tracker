import React, { useState } from "react";
import { ComposableMap, Geographies, Geography, Marker, Annotation } from "react-simple-maps";
import { scaleQuantize } from "d3-scale";
import { geoCentroid } from "d3-geo";
import allStates from './allStates'
const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const colorScale = scaleQuantize()
  .domain([1, 10])
  .range([
    "#ffedea",
    "#ffcec5",
    "#ffad9f",
    "#ff8a75",
    "#ff5533",
    "#e2492d",
    "#be3d26",
    "#9a311f",
    "#782618",
  ]);

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



  return (
    <>
      <ComposableMap projection="geoAlbersUsa">
        <Geographies geography={geoUrl}>
          {({ geographies }) => (
              <>
              {
                  geographies.map((geo) => {
                      const cur = data.find((s) => s.id === geo.id);
                      return (
                          <Geography
                              key={geo.rsmKey}
                              stroke="#FFF"
                              geography={geo}
                              fill={colorScale(cur ? cur.unemployment_rate : "#EEE")}
                          />
                      );
                  })
              }
                  {geographies.map(geo => {
                      const centroid = geoCentroid(geo);
                      const cur = allStates.find(s => s.val === geo.id);
                      return (
                          <g key={geo.rsmKey + "-name"}>
                              {cur &&
                              centroid[0] > -160 &&
                              centroid[0] < -67 &&
                              (Object.keys(offsets).indexOf(cur.id) === -1 ? (
                                  <Marker coordinates={centroid}>
                                      <text y="2" fontSize={14} textAnchor="middle">
                                          {cur.id}
                                      </text>
                                  </Marker>
                              ) : (
                                  <Annotation
                                      subject={centroid}
                                      dx={offsets[cur.id][0]}
                                      dy={offsets[cur.id][1]}
                                  >
                                      <text x={4} fontSize={14} alignmentBaseline="middle">
                                          {cur.id}
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
