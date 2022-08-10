import mapboxgl from 'mapbox-gl';
import { NextComponentType, NextPageContext } from 'next';
import { useEffect, useRef, useState } from 'react';


mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;

export type DashboardMapLocation = {
  id: string;
  lat: number;
  lng: number;
}

type Props = {
  locations: DashboardMapLocation[];
  debug?: boolean;
}

const DashboardMap: NextComponentType<NextPageContext, {}, Props> = ({ locations, debug = false }) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState(-0.1276);
  const [lat, setLat] = useState(51.5072);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current || !mapContainer.current) {
      return;
    }

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11?optimize=true',
      center: { lng, lat },
      zoom,
    });
  }, [map, mapContainer]);

  useEffect(() => {
    if (!map.current) {
      return;
    }
    map.current.on('move', () => {
      setLng(map.current!.getCenter().lng);
      setLat(map.current!.getCenter().lat);
      setZoom(map.current!.getZoom());
    });
  });

  const markers = useRef<Map<string, mapboxgl.Marker>>(new Map());

  useEffect(() => {
    if (!map.current) {
      markers.current.clear();
      return;
    }

    // Check that all markers are on the map
    const allMarkers = new Set(markers.current.keys());
    for (const { id, lat, lng } of locations) {
      if (id in allMarkers) {
        // Skip locations that are already on the map
        allMarkers.delete(id);
        continue;
      }

      // Add location marker to the map
      const marker = new mapboxgl.Marker()
        .setLngLat({ lng, lat })
        .addTo(map.current);
      markers.current.set(id, marker);
    }

    // Remove any markers that are no longer in the locations array
    allMarkers.forEach((id) => {
      markers.current.get(id)!.remove();
      markers.current.delete(id);
    });
  }, [map, locations, markers]);

  return (
    <div>
      <div className="map-container">
        {debug && (
          <div className="map-sidebar">
            Longitude: {lng.toFixed(4)} | Latitude {lat.toFixed(4)} | Zoom: {zoom.toFixed(2)}
          </div>
        )}
        <div ref={mapContainer} className="map" />
      </div>
    </div>
  );
};

export default DashboardMap;
