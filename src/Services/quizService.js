const API_BASE = import.meta.env.VITE_API_BASE_URL;

export async function findPopularSubject() {
  try {
    const res = await fetch(`${API_BASE}/api/quizzes/popular-subjects`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const data = await res.json();

    if (!data.success) {
      return { success: false, errors: data.errors || ["Popular subject find failed"] };
    }

    return { success: true, message: data.message, data: data.data };
  } catch {
    return { success: false, errors: ["Server error. Try again later."] };
  }
};

export async function findOneSubject(slug) {
  try {
    const res = await fetch(`${API_BASE}/api/quizzes/subjects/${slug}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const data = await res.json();

    if (!data.success) {
      return { success: false, errors: data.errors || ["Individual subject find failed"] };
    }

    return { success: true, message: data.message, data: data.data };
  } catch {
    return { success: false, errors: ["Server error. Try again later."] };
  }
};

export async function getOneQuiz(quizId) {
  try {
    const res = await fetch(`${API_BASE}/api/quizzes/find/${quizId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const data = await res.json();

    if (!data.success) {
      return { success: false, errors: data.errors || ["Quiz find failed"] };
    }

    return { success: true, message: data.message, data: data.data };
  } catch {
    return { success: false, errors: ["Server error. Try again later."] };
  }
};

export async function submitQuiz(quizId, form) {
  try {
    const res = await fetch(`${API_BASE}/api/quizzes/${quizId}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: form
    });

    const data = await res.json();

    if (!data.success) {
      return { success: false, errors: data.errors || ["Quiz find failed"] };
    }

    return { success: true, message: data.message, data: data.data };
  } catch {
    return { success: false, errors: ["Server error. Try again later."] };
  }
};