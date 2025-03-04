export async function fetchData<T = unknown>(
  url: string,
): Promise<{ data?: T; error?: { message: string } }> {
  const response = await fetch(url);
  return (await response.json()) as { data?: T; error?: { message: string } };
}
