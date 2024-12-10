interface NominatimSuggestion {
  display_name: string;
  lat: string;
  lon: string;
}

const getNominatimSuggestions = async (
  query: string
): Promise<NominatimSuggestion[]> => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      query
    )}&format=json&addressdetails=1&limit=5&countrycodes=cz`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch suggestions");
  }
  return response.json();
};

export { getNominatimSuggestions, type NominatimSuggestion };
