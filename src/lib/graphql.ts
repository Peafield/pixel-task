export async function graphqlFetch<T>(
  query: string,
  variables?: Record<string, string>,
  token?: string,
): Promise<T> {
  const endpoint = "https://asktask-api.stagelab.co.uk/graphql";

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = token;
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({
        query,
        variables,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, body: ${errorText}`,
      );
    }

    const result = await response.json();

    return result as T;
  } catch (error) {
    console.error("GraphQL fetch error:", error);
    throw error;
  }
}
