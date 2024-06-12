export async function getAddressFromCoordinates(lat: number, lng: number): Promise<string | null> {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      throw new Error('Google Maps API key is missing');
    }
  
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;
  
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch address');
      }
  
      const data = await response.json();
      if (data.status === 'OK') {
        const address = data.results[0].formatted_address;
        return address;
      } else {
        throw new Error('Geocoding failed');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      return 'Problem occurred';
    }
  }