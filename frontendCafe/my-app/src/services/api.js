const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:4000';

const apiFetch = async (endpoint, options = {}) => {
  const url = `${API_BASE}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

  // Prepare headers — only set JSON if not FormData
  const headers = {
    ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
    ...options.headers,
  };

  const fetchOptions = {
    ...options,
    headers,
    // Optional: credentials: 'include' if you use cookies/auth later
    // credentials: 'include',
  };

  try {
    const response = await fetch(url, fetchOptions);

    // Try JSON first, fallback to text
    let data;
    const text = await response.text(); // read once
    try {
      data = JSON.parse(text);
    } catch {
      data = text; // keep as string
    }

    if (!response.ok) {
      // Better error message
      const errorMessage = data?.message || data || `Request failed with status ${response.status}`;
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.error(`API error on ${endpoint}:`, error);
    throw error;
  }
};

export default apiFetch;