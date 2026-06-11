const API_BASE = import.meta.env.VITE_API_BASE_URL;

export async function getAdaptiveEligibleSubjects() {
  try {
    const res = await fetch(`${API_BASE}/api/get/adaptive-learning/eligiblity`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const data = await res.json();

    if (!data.success) {
      return { success: false, errors: data.errors || ["Adaptive Eligibilty find failed"] };
    }

    return { success: true, message: data.message, data: data.data };
  } catch {
    return { success: false, errors: ["Server error. Try again later."] };
  }
};