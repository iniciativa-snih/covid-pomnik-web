export const apiFetcher = (url: string) => fetch(url).then((res) => res.json())
