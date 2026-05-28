import { createServerFn } from "@tanstack/react-start";

type Input = { origin: string; destination: string };

function getOpenRouteServiceApiKey(): string | undefined {
  // Try globalThis.env (Cloudflare Workers / Vite build-time)
  const env = (globalThis as { env?: Record<string, string> }).env;
  if (env?.OPENROUTESERVICE_API_KEY) {
    return env.OPENROUTESERVICE_API_KEY;
  }

  // Try process.env (Node.js)
  if (typeof process !== "undefined" && process.env?.OPENROUTESERVICE_API_KEY) {
    return process.env.OPENROUTESERVICE_API_KEY;
  }

  return undefined;
}

export const computeDistance = createServerFn({ method: "POST" })
  .inputValidator((data: Input) => {
    if (!data?.origin || !data?.destination) {
      throw new Error("Both origin and destination are required");
    }
    if (data.origin.length > 200 || data.destination.length > 200) {
      throw new Error("Address too long");
    }
    return data;
  })
  .handler(async ({ data }) => {
    const ORS_API_KEY = getOpenRouteServiceApiKey();

    if (!ORS_API_KEY) {
      throw new Error("OPENROUTESERVICE_API_KEY is not configured");
    }

    // First, geocode origin and destination to get coordinates
    const geocodeLocation = async (address: string) => {
      const geocodeUrl = `https://api.openrouteservice.org/geocode/search?api_key=${ORS_API_KEY}&text=${encodeURIComponent(address)}&country=India`;
      const res = await fetch(geocodeUrl);
      const json = await res.json();

      if (!res.ok || !json.features?.length) {
        throw new Error(`Location not found: ${address}`);
      }

      const [longitude, latitude] = json.features[0].geometry.coordinates;
      return { latitude, longitude };
    };

    const originCoords = await geocodeLocation(data.origin);
    const destCoords = await geocodeLocation(data.destination);

    // Use OpenRouteService Matrix API for distance calculation
    const matrixUrl = `https://api.openrouteservice.org/v2/matrix/driving-car?api_key=${ORS_API_KEY}`;

    const res = await fetch(matrixUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        locations: [
          [originCoords.longitude, originCoords.latitude],
          [destCoords.longitude, destCoords.latitude],
        ],
        metrics: ["distance", "duration"],
        units: "m",
      }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(
        `OpenRouteService API failed [${res.status}]: ${errorData.error?.message || res.statusText}`,
      );
    }

    const json = await res.json();

    if (!json.durations?.[0]?.[1] || !json.distances?.[0]?.[1]) {
      throw new Error("No driving route found");
    }

    const durationSeconds = json.durations[0][1];
    const distanceMeters = json.distances[0][1];
    const km = Math.round(distanceMeters / 1000);
    const durationMinutes = Math.round(durationSeconds / 60);

    return { km, durationMinutes };
  });
