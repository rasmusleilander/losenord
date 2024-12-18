export interface GETdataFormat {
  payload: string;
  expired: boolean;
  days_remaining: number;
  views_remaining: number;
  first_view: boolean;
  deleted: boolean;
}

async function http<T>(request: RequestInfo): Promise<T> {
  const response = await fetch(request);
  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
  }
  return await response.json();
}

export async function getReq(idPass: string) {
  const URLfget = `https://cors.dialekt.it/https://backendpw.dialekt.it/p/${idPass}.json`;

  const response = await http<GETdataFormat>(
    new Request(URLfget, {
      method: "GET",
      headers: { Accept: "application/json" },
    })
  );

  if (response.deleted || response.expired || !response.payload) {
    response.payload = "Länken har upphört gälla";
    response.expired = true; // Ensure the expired flag is set
  }

  return response;
}

export async function postReq(
  payload: string,
  expire_after_days: number,
  expire_after_views: number
) {
  interface POSTdataFormat {
    url_token: string;
    error?: string;
    status?: number;
  }

  const response = await http<POSTdataFormat>(
    new Request(
      "https://cors.dialekt.it/https://backendpw.dialekt.it/p.json",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: {
            payload,
            expire_after_days,
            expire_after_views,
          },
        }),
      }
    )
  );

  // Handle cases where 'status' is undefined or an error occurs
  if (response.error || (response.status !== undefined && response.status >= 400)) {
    throw new Error("Något gick tyvärr fel. Försök igen senare");
  }

  const domain = "https://losenord.evolvit.se";
  return `${domain}/p/${response.url_token}`;
}

export async function inactivateLink(idPass: string) {
  const URLInactive = `https://cors.dialekt.it/https://backendpw.dialekt.it/p/${idPass}`;

  const response = await fetch(URLInactive, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to inactivate link. Please try again.");
  }

  return response.json();
}

