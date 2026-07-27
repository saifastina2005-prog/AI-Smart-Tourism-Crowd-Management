import { useState } from "react";
import MapView from "./components/MapView";

function App() {
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-orange-100 p-6">
      <h1 className="text-3xl font-bold text-sky-700 mb-6 text-center">
        AI Tourism Smart Map
      </h1>

      <MapView onSelectLocation={setSelectedLocation} />
    </div>
  );
}

export default App;