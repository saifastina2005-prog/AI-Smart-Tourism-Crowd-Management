import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup
} from "react-leaflet";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MapView() {
  const [locations, setLocations] = useState([]);
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [advisory, setAdvisory] = useState(null);
  const [loading, setLoading] = useState(false);
 

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8001/predict_all")
      .then((res) => {
        setLocations(res.data.locations);
      })
      .catch((err) => {
        console.error("API Error:", err);
      });
  }, []);

  const getColor = (risk) => {
    if (risk === "Low") return "green";
    if (risk === "Medium") return "orange";
    if (risk === "High") return "red";
    if (risk === "Critical") return "darkred";
    return "blue";
  };

  const handleMarkerClick = async (locationId) => {
    try {
      setSelectedLocationId(locationId);
      setLoading(true);
      setAdvisory(null);

      const res = await axios.get(
        `http://127.0.0.1:8001/smart_advisory/${locationId}`
      );

      // 🔥 FIX HERE
      setAdvisory(res.data);

    } catch (err) {
      console.error("Advisory API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
  <div>
      <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
  🌍 AI Tourism Smart Map
</h2>

      <MapContainer
        center={[-37.8136, 144.9631]}
        zoom={13}
        style={{ height: "600px", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {locations.map((loc) => (
          <CircleMarker
            key={loc.location_id}
            center={[loc.latitude, loc.longitude]}
            radius={8}
            fillColor={getColor(loc.risk_level)}
            color={getColor(loc.risk_level)}
            fillOpacity={0.8}
            eventHandlers={{
              click: () => handleMarkerClick(loc.location_id)
            }}
          >
            <Popup>
              {selectedLocationId === loc.location_id ? (
                loading ? (
                  <div>Loading advisory...</div>
                ) : advisory ? (
                  <div style={{ minWidth: "260px" }}>
                    <h3>📍 Location {advisory.location_id}</h3>

                    <p>
                      👥 <strong>Status:</strong>{" "}
                      {advisory.current_status}
                    </p>

                    <p>
                      📈 <strong>Trend:</strong>{" "}
                      {advisory.trend}
                    </p>

                    <p>
                      ⏰ <strong>Best Time:</strong>{" "}
                      {advisory.best_time_to_visit}
                    </p>

                    <p>
                      🌤 <strong>Weather:</strong>{" "}
                      {advisory.weather_summary}
                    </p>

                    <p>
                      💯 <strong>Comfort Score:</strong>{" "}
                      {advisory.comfort_score}
                    </p>

                    <hr />

                    <strong>🧠 Recommendation:</strong>
                    <p>{advisory.final_recommendation}</p>
                  </div>
                ) : (
                  <div>Error loading advisory</div>
                )
              ) : (
                <div>Click marker to view advisory</div>
              )}
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}