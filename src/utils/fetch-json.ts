export default async function fetchJson<T>(url: RequestInfo, params?: RequestInit): Promise<T> {
  let response: Response;

  try {
    response = await fetch(url, params);
  } catch(error) {
    throw new FetchError('Произошла сетевая ошибка.');
  }

  if (!response.ok) {
    let errorText = response.statusText;

    try {
      const body = await response.json();
      errorText = (body.error && body.error.message) || (body.data && body.data.error && body.data.error.message) || errorText;
    } catch(error) {
      /* ignore */
    }

    const message = `Error ${response.status}: ${errorText}`;
    throw new FetchError(message, response);
  }

  try {
    return await response.json();
  } catch(error) {
    throw new FetchError(error.message, response);
  }
}

export class FetchError implements Error {
  name = "FetchError";
  constructor(public message: string, public response?: Response) {}
}