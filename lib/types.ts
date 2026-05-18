// ─── User & Auth ───
export type UserRole = "customer" | "worker" | "admin";

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  city: string;
  role: UserRole;
  avatar_url?: string;
  created_at: string;
}

export interface WorkerProfile extends User {
  professions: string[];
  experience: string;
  price_range: string;
}

// ─── Provider ───
export interface Provider {
  id: string;
  name: string;
  category: string;
  area: string;
  city: string;
  lat: number;
  lng: number;
  rating: number;
  total_jobs: number;
  is_available: boolean;
  price_min: number;
  price_max: number;
  phone: string;
  created_at: string;
}

// ─── Booking ───
export type BookingStatus =
  | "CONFIRMED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export interface Booking {
  id: string;
  booking_ref: string;
  user_request: string;
  service_type: string;
  provider_id: string;
  provider_name: string;
  scheduled_time: string;
  area: string;
  status: BookingStatus;
  price_estimate: string;
  reminder_set: boolean;
  created_at: string;
}

// ─── Stats ───
export interface StatsOverview {
  total_bookings: number;
  total_providers: number;
  cities_count: number;
}

// ─── Service Category ───
export interface ServiceCategory {
  name: string;
  icon: string;
  slug: string;
}

// ─── API Response ───
export interface ApiResponse<T> {
  data: T;
  error?: string;
}
