const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

/**
 * Generic fetch wrapper with error handling
 */
async function request<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE}${endpoint}`;
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const errorText = await res.text();
    let message = `Request failed: ${res.status}`;
    try {
      const json = JSON.parse(errorText);
      message = json.detail ?? json.message ?? errorText;
    } catch {
      message = errorText || message;
    }
    throw new Error(message);
  }

  return res.json();
}

// ─── Stats ───
export async function getStats() {
  return request<{
    total_bookings: number;
    total_providers: number;
    cities_count: number;
  }>("/api/stats/overview");
}

// ─── Services ───
export async function getServices() {
  return request<string[]>("/api/services");
}

// ─── Auth ───
export async function login(credentials: {
  email_or_phone: string;
  password: string;
}) {
  return request("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export async function signup(data: Record<string, unknown>) {
  return request("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// ─── Customer Profile ───
export async function getCustomerProfile(userId?: string) {
  const url = userId ? `/api/customer/profile?user_id=${userId}` : "/api/customer/profile";
  return request<{
    user: {
      first_name: string;
      last_name: string;
      email: string;
      phone: string;
      city: string;
    };
  }>(url);
}

export async function updateCustomerProfile(userId: string, data: Record<string, unknown>) {
  return request(`/api/customer/profile?user_id=${userId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

// ─── Provider Profile ───
export async function getProviderProfile(userId?: string) {
  const url = userId ? `/api/provider/profile?user_id=${userId}` : "/api/provider/profile";
  return request<{
    user: {
      first_name: string;
      last_name: string;
      email: string;
      phone: string;
      city: string;
    };
    profile: {
      professions: string[];
      experience: string;
      price_range: string;
      bio: string;
      service_areas: string[];
      photo_url: string | null;
    };
  }>(url);
}

export async function updateProviderProfile(userId: string, data: Record<string, unknown>) {
  return request(`/api/provider/profile?user_id=${userId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}
