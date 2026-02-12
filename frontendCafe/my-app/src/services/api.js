
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:4000';

const apiFetch = async (endpoint, options = {}) => {
  const url = `${API_BASE}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      
    },
  };

  try {
    const response = await fetch(url, { ...defaultOptions, ...options });

    let data;
    try {
      data = await response.json();
    } catch {
      data = await response.text();
    }

    if (!response.ok) {
      throw new Error(data.message || `Request failed with status ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`API error on ${endpoint}:`, error);
    throw error; 
  }
};
export default apiFetch;