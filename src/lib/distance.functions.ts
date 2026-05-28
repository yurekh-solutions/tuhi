import { createServerFn } from "@tanstack/react-start";

type Input = { origin: string; destination: string };

// Environment variable names to check (priority order)
const GOOGLE_MAPS_KEYS = [
  "GOOGLE_MAPS_API_KEY",
  "VITE_GOOGLE_MAPS_API_KEY",
  "VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY",
  "MAPS_API_KEY",
];

function getMapsApiKey(): string | undefined {
  // Try globalThis.env (Cloudflare Workers / Vite build-time)
  const env = (globalThis as { env?: Record<string, string> }).env;
  if (env) {
    for (const key of GOOGLE_MAPS_KEYS) {
      if (env[key]) {
        return env[key];
      }
    }
  }

  // Try process.env (Node.js)
  if (typeof process !== "undefined" && process.env) {
    for (const key of GOOGLE_MAPS_KEYS) {
      if (process.env[key]) {
        return process.env[key];
      }
    }
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
    const GOOGLE_MAPS_API_KEY = getMapsApiKey();

    if (!GOOGLE_MAPS_API_KEY) {
      throw new Error("GOOGLE_MAPS_API_KEY is not configured");
    }

    // Use Google Distance Matrix API directly
    const encodedOrigin = encodeURIComponent(data.origin);
    const encodedDestination = encodeURIComponent(data.destination);

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodedOrigin}&destinations=${encodedDestination}&mode=driving&language=en-IN&region=IN&key=${GOOGLE_MAPS_API_KEY}`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Maps API failed [${res.status}]`);
    }

    const json = await res.json();

    if (json.status !== "OK" || !json.rows?.[0]?.elements?.[0]) {
      const errorMsg = json.error_message || json.status || "Unknown error";
      throw new Error(`No driving route found: ${errorMsg}`);
    }

    const element = json.rows[0].elements[0];

    if (element.status !== "OK" && element.status !== "ROUTE_EXISTS") {
      throw new Error(`Route not available: ${element.status}`);
    }

    const distanceMeters = element.distance?.value || 0;
    const durationSeconds = element.duration?.value || 0;
    const km = Math.round(distanceMeters / 1000);
    const durationMinutes = Math.round(durationSeconds / 60);

    return { km, durationMinutes };
  });
