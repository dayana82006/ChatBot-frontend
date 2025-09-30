const API_URL = "http://localhost:8000";

export async function login(email: string, password: string) {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      throw new Error("Error en el servidor");
    }

    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}
