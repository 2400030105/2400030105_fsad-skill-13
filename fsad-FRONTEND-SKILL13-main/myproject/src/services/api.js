const API_URL = import.meta.env.VITE_API_URL || "http://192.168.1.13:8080/api";

const handleResponse = async (response) => {
  if (!response.ok) {
    let message = "Request failed";

    try {
      const errorData = await response.json();
      message = errorData?.message || message;
    } catch {
      if (response.status === 0 || !response.ok) {
        message = "Unable to reach server. Check your connection and server status.";
      } else {
        message = response.statusText || message;
      }
    }

    throw new Error(message);
  }

  return response.json();
};

export const getProducts = async () => {
  const response = await fetch(`${API_URL}/products`);
  return handleResponse(response);
};

export const addProduct = async (product) => {
  const response = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  return handleResponse(response);
};

export const deleteProduct = async (id) => {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
  });

  if (response.status === 204) {
    return null;
  }

  return handleResponse(response);
};
