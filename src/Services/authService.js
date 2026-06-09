const API_BASE = import.meta.env.VITE_API_BASE_URL;

export async function signup(form) {
  try {
    const res = await fetch(`${API_BASE}/api/user/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!data.success) {
      return { success: false, errors: data.errors || ["Signup failed"] };
    }

    return { success: true, message: data.message };
  } catch {
    return { success: false, errors: ["Server error. Try again later."] };
  }
};

export async function login(form) {
  try {
    const res = await fetch(`${API_BASE}/api/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!data.success) {
      return { success: false, errors: data.errors || ["Signup failed"] };
    }

    return { success: true, message: data.message, data: data.data };
  } catch {
    return { success: false, errors: ["Server error. Try again later."] };
  }
};

export async function getMe() {
  try {
    const res = await fetch(
      `${API_BASE}/api/user/me`,
      {
        credentials: "include",
      }
    );

   const data = await res.json();

    if (!data.success) {
      return { success: false, errors: data.errors || ["Signup failed"] };
    }

    return { success: true, message: data.message, data: data.data };
  } catch {
    return {
      success: false,
      errors: ["ERROR_WHILE_FIND_USER"]
    };
  }
}

export async function logout(){
  try {
    const res = await fetch(`${API_BASE}/api/user/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const data = await res.json();

    if (!data.success) {
      return { success: false, message: data.message || "Signup failed" };
    }

    return { success: true, message: data.message};
  } catch {
    return { success: false, errors: ["Server error. Try again later."] };
  }
}