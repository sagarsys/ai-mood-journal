const createUrl = (path: string) => window.location.origin + path;

export const createNewEntry = async () => {
  const response = await fetch(createUrl('/api/journal'), {
    method: 'POST'
  })

  if (response.ok) {
    const data = await response.json();
    return data.entry
  }
};

export const updateEntry = async (id: string, content: string) => {
  const response = await fetch(createUrl(`/api/journal/${id}`), {
    method: 'PATCH',
    body: JSON.stringify({ content })
  })

  if (response.ok) {
    const json = await response.json();
    return json.data;
  }
}