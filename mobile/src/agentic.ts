export type Language = "English" | "Roman Urdu" | "Urdu";

export type ServiceCategory =
  | "AC Technician"
  | "Plumber"
  | "Electrician"
  | "Tutor"
  | "Beautician"
  | "Cleaner"
  | "Carpenter"
  | "Painter"
  | "General Home Service";

export interface ServiceIntent {
  service_type: ServiceCategory;
  location: string;
  area: string;
  city: string;
  time: string;
  preferred_slot: string;
  language: Language;
  confidence: number;
  original_text: string;
}

export interface RankedProvider {
  id: string;
  name: string;
  category: ServiceCategory;
  area: string;
  city: string;
  rating: number;
  total_jobs: number;
  is_available: boolean;
  distance_km: number;
  distance: string;
  time: string;
  price: string;
  score: number;
  reasons: string[];
}

export interface AgentTraceStep {
  agent_name: string;
  status: "planned" | "done" | "warning";
  detail: string;
  tool_called: string;
  timestamp: string;
}

export interface BookingRecord {
  booking_ref: string;
  status: "CONFIRMED" | "PENDING";
  provider_id: string;
  provider_name: string;
  service_type: ServiceCategory;
  scheduled_time: string;
  slot: string;
  location: string;
  price_estimate: string;
  confirmation_message: string;
}

export interface OrchestratorResult {
  session_id: string;
  intent: ServiceIntent;
  providers: RankedProvider[];
  selected_provider: RankedProvider;
  reasoning: string;
  booking: BookingRecord;
  reminder: {
    trigger_at: string;
    message: string;
  };
  follow_up: {
    status_update: string;
    completion_check: string;
  };
  trace_steps: AgentTraceStep[];
  ai_response_text: string;
}

interface ProviderSeed {
  id: string;
  name: string;
  category: ServiceCategory;
  area: string;
  city: string;
  rating: number;
  totalJobs: number;
  isAvailable: boolean;
  priceMin: number;
  priceMax: number;
  availableSlots: string[];
  distanceByArea: Record<string, number>;
}

const PROVIDERS: ProviderSeed[] = [
  {
    id: "p_ac_ali",
    name: "Ali AC Services",
    category: "AC Technician",
    area: "G-13",
    city: "Islamabad",
    rating: 4.7,
    totalJobs: 212,
    isAvailable: true,
    priceMin: 800,
    priceMax: 1500,
    availableSlots: ["10:00 AM", "12:30 PM", "4:00 PM"],
    distanceByArea: { "G-13": 2.1, "G-11": 3.1, "F-10": 4.2, "DHA": 17.5 },
  },
  {
    id: "p_ac_hassan",
    name: "Hassan Cooling Co.",
    category: "AC Technician",
    area: "G-11",
    city: "Islamabad",
    rating: 4.3,
    totalJobs: 96,
    isAvailable: true,
    priceMin: 700,
    priceMax: 1200,
    availableSlots: ["11:00 AM", "3:00 PM"],
    distanceByArea: { "G-13": 3.4, "G-11": 1.2, "F-10": 3.0 },
  },
  {
    id: "p_ac_karim",
    name: "Karim AC Repair",
    category: "AC Technician",
    area: "F-10",
    city: "Islamabad",
    rating: 4.5,
    totalJobs: 89,
    isAvailable: false,
    priceMin: 900,
    priceMax: 1800,
    availableSlots: ["6:00 PM"],
    distanceByArea: { "G-13": 4.1, "F-10": 1.0 },
  },
  {
    id: "p_elec_rehman",
    name: "Rehman Electricals",
    category: "Electrician",
    area: "G-13",
    city: "Islamabad",
    rating: 4.8,
    totalJobs: 148,
    isAvailable: true,
    priceMin: 600,
    priceMax: 1200,
    availableSlots: ["9:00 AM", "2:00 PM", "7:00 PM"],
    distanceByArea: { "G-13": 0.8, "G-11": 2.9, "F-10": 4.9 },
  },
  {
    id: "p_plumb_master",
    name: "Master Plumbers PK",
    category: "Plumber",
    area: "DHA",
    city: "Karachi",
    rating: 4.6,
    totalJobs: 177,
    isAvailable: true,
    priceMin: 500,
    priceMax: 1000,
    availableSlots: ["10:00 AM", "1:00 PM", "5:00 PM"],
    distanceByArea: { DHA: 3.2, Clifton: 5.4, Gulberg: 18.0 },
  },
  {
    id: "p_tutor_city",
    name: "City Tutor Network",
    category: "Tutor",
    area: "Clifton",
    city: "Karachi",
    rating: 4.9,
    totalJobs: 143,
    isAvailable: true,
    priceMin: 800,
    priceMax: 2000,
    availableSlots: ["4:00 PM", "6:00 PM"],
    distanceByArea: { Clifton: 1.4, DHA: 2.8, Gulberg: 17.3 },
  },
  {
    id: "p_beauty_glow",
    name: "Glow Home Salon",
    category: "Beautician",
    area: "Gulberg",
    city: "Lahore",
    rating: 4.7,
    totalJobs: 118,
    isAvailable: true,
    priceMin: 1200,
    priceMax: 3500,
    availableSlots: ["11:00 AM", "3:00 PM", "6:00 PM"],
    distanceByArea: { Gulberg: 1.8, "Model Town": 4.7, DHA: 8.9 },
  },
  {
    id: "p_clean_home",
    name: "HomeClean Pro",
    category: "Cleaner",
    area: "DHA",
    city: "Lahore",
    rating: 4.4,
    totalJobs: 64,
    isAvailable: true,
    priceMin: 600,
    priceMax: 1200,
    availableSlots: ["9:00 AM", "12:00 PM", "4:00 PM"],
    distanceByArea: { DHA: 5.0, Gulberg: 8.4, "Model Town": 6.1 },
  },
];

const SERVICE_KEYWORDS: Array<{ service: ServiceCategory; keywords: string[] }> = [
  {
    service: "AC Technician",
    keywords: ["ac", "a.c", "air conditioner", "cooling", "gas refill", "a/c", "اے سی", "ایئر کنڈیشنر"],
  },
  {
    service: "Plumber",
    keywords: ["plumber", "plumbing", "pipe", "leak", "paani", "nalka", "پلمبر", "پانی"],
  },
  {
    service: "Electrician",
    keywords: ["electrician", "bijli", "light", "fan", "switch", "wiring", "بجلی", "الیکٹریشن"],
  },
  {
    service: "Tutor",
    keywords: ["tutor", "teacher", "math", "physics", "tuition", "ustad", "ٹیوٹر", "استاد"],
  },
  {
    service: "Beautician",
    keywords: ["beautician", "salon", "makeup", "facial", "mehndi", "بیوٹیشن", "میک اپ"],
  },
  {
    service: "Cleaner",
    keywords: ["cleaner", "cleaning", "safai", "maid", "صفائی"],
  },
  {
    service: "Carpenter",
    keywords: ["carpenter", "wood", "darzi", "furniture", "کارپینٹر", "فرنیچر"],
  },
  {
    service: "Painter",
    keywords: ["painter", "paint", "rang", "رنگ", "پینٹر"],
  },
];

const AREAS = [
  { area: "G-13", city: "Islamabad", aliases: ["g-13", "g13", "g 13", "جی 13", "جی-13", "جی تیرہ"] },
  { area: "G-11", city: "Islamabad", aliases: ["g-11", "g11", "g 11", "جی 11", "جی-11"] },
  { area: "F-10", city: "Islamabad", aliases: ["f-10", "f10", "f 10", "ایف 10", "ایف-10"] },
  { area: "DHA", city: "Karachi", aliases: ["dha karachi", "defence karachi", "ڈی ایچ اے کراچی"] },
  { area: "DHA", city: "Lahore", aliases: ["dha lahore", "defence lahore", "ڈی ایچ اے لاہور"] },
  { area: "Clifton", city: "Karachi", aliases: ["clifton", "کلفٹن"] },
  { area: "Gulberg", city: "Lahore", aliases: ["gulberg", "گلبرگ"] },
  { area: "Model Town", city: "Lahore", aliases: ["model town", "ماڈل ٹاؤن"] },
];

const CITY_ALIASES = [
  { city: "Islamabad", aliases: ["islamabad", "اسلام آباد"] },
  { city: "Karachi", aliases: ["karachi", "کراچی"] },
  { city: "Lahore", aliases: ["lahore", "لاہور"] },
];

function normalize(value: string) {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

function hasKeyword(text: string, keyword: string) {
  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  if (/^[a-z0-9.\-/ ]+$/.test(keyword) && keyword.length <= 4) {
    return new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`, "i").test(text);
  }
  return text.includes(keyword.toLowerCase());
}

function detectLanguage(message: string): Language {
  if (/[\u0600-\u06FF]/.test(message)) return "Urdu";
  if (/\b(mujhe|chahiye|kal|subah|shaam|mein|karna|chaiye|karo|bhej|dhund)\b/i.test(message)) {
    return "Roman Urdu";
  }
  return "English";
}

function detectService(text: string): ServiceCategory {
  for (const entry of SERVICE_KEYWORDS) {
    if (entry.keywords.some((keyword) => hasKeyword(text, keyword))) {
      return entry.service;
    }
  }
  return "General Home Service";
}

function detectLocation(text: string) {
  const cityHint = CITY_ALIASES.find((city) => city.aliases.some((alias) => text.includes(alias)));
  const areaHint = AREAS.find((area) => area.aliases.some((alias) => text.includes(alias)));

  if (areaHint) {
    const city = cityHint?.city ?? areaHint.city;
    return { area: areaHint.area, city, location: `${areaHint.area}, ${city}` };
  }

  if (cityHint) {
    return { area: "Nearby", city: cityHint.city, location: cityHint.city };
  }

  return { area: "G-13", city: "Islamabad", location: "G-13, Islamabad" };
}

function detectTime(text: string) {
  const tomorrow = /\b(tomorrow|kal)\b/i.test(text) || text.includes("کل");
  const today = /\b(today|aaj|aj)\b/i.test(text) || text.includes("آج");
  const evening = /\b(evening|shaam|sham|raat|night)\b/i.test(text) || text.includes("شام") || text.includes("رات");
  const afternoon = /\b(afternoon|dupehar|dopahar|noon)\b/i.test(text) || text.includes("دوپہر");
  const morning = /\b(morning|subah|صبح)\b/i.test(text) || (!evening && !afternoon);

  const day = tomorrow ? "Tomorrow" : today ? "Today" : "Next available day";
  const part = morning ? "morning" : afternoon ? "afternoon" : "evening";
  const preferredSlot = morning ? "10:00 AM" : afternoon ? "2:00 PM" : "6:00 PM";

  return {
    time: `${day} ${part}`,
    preferredSlot,
    dayOffset: tomorrow ? 1 : 0,
  };
}

function formatDateLabel(now: Date, dayOffset: number, slot: string) {
  const date = new Date(now);
  date.setDate(date.getDate() + dayOffset);
  const day = date.toLocaleDateString("en-PK", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  return `${day} ${slot}`;
}

function distanceFor(provider: ProviderSeed, area: string, city: string) {
  if (provider.distanceByArea[area] !== undefined) return provider.distanceByArea[area];
  if (provider.city === city) return 6.5;
  return 18.0;
}

function pickSlot(provider: ProviderSeed, preferredSlot: string) {
  if (provider.availableSlots.includes(preferredSlot)) return preferredSlot;
  return provider.availableSlots[0] ?? preferredSlot;
}

export function parseServiceIntent(message: string): ServiceIntent {
  const text = normalize(message);
  const service = detectService(text);
  const location = detectLocation(text);
  const time = detectTime(text);

  const confidence =
    (service === "General Home Service" ? 0.35 : 0.4) +
    (location.area === "Nearby" ? 0.15 : 0.25) +
    0.25;

  return {
    service_type: service,
    location: location.location,
    area: location.area,
    city: location.city,
    time: time.time,
    preferred_slot: time.preferredSlot,
    language: detectLanguage(message),
    confidence: Math.min(confidence, 0.95),
    original_text: message,
  };
}

export function discoverProviders(intent: ServiceIntent): RankedProvider[] {
  const serviceMatches = PROVIDERS.filter((provider) => provider.category === intent.service_type);
  const source = serviceMatches.length > 0 ? serviceMatches : PROVIDERS;

  return source
    .map((provider) => {
      const distance = distanceFor(provider, intent.area, intent.city);
      const slot = pickSlot(provider, intent.preferred_slot);
      const serviceScore = provider.category === intent.service_type ? 30 : 8;
      const availabilityScore = provider.isAvailable ? 28 : -18;
      const distanceScore = Math.max(0, 20 - distance * 2.5);
      const ratingScore = provider.rating * 4;
      const slotScore = slot === intent.preferred_slot ? 8 : 3;
      const experienceScore = Math.min(provider.totalJobs / 45, 6);
      const score = Math.round(
        serviceScore + availabilityScore + distanceScore + ratingScore + slotScore + experienceScore,
      );

      const reasons = [
        `${distance.toFixed(1)} km away`,
        `${provider.rating.toFixed(1)}/5 rating`,
        provider.isAvailable ? `available at ${slot}` : `not available until ${slot}`,
        `${provider.totalJobs} completed jobs`,
      ];

      return {
        id: provider.id,
        name: provider.name,
        category: provider.category,
        area: provider.area,
        city: provider.city,
        rating: provider.rating,
        total_jobs: provider.totalJobs,
        is_available: provider.isAvailable,
        distance_km: Number(distance.toFixed(1)),
        distance: `${distance.toFixed(1)} km`,
        time: slot,
        price: `PKR ${provider.priceMin}-${provider.priceMax}`,
        score,
        reasons,
      };
    })
    .sort((a, b) => b.score - a.score);
}

function makeSessionId() {
  return `sess_${Math.random().toString(16).slice(2, 10)}`;
}

function makeBookingRef(now: Date) {
  const stamp = now.toISOString().slice(0, 10).replace(/-/g, "");
  return `BK-${stamp}-${Math.random().toString(16).slice(2, 5).toUpperCase()}`;
}

function makeTrace(
  agent_name: string,
  detail: string,
  tool_called: string,
  timestamp: string,
  status: AgentTraceStep["status"] = "done",
) {
  return {
    agent_name,
    status,
    detail,
    tool_called,
    timestamp,
  };
}

export function runServiceOrchestration(
  message: string,
  options?: { sessionId?: string; now?: Date; bookingRef?: string },
): OrchestratorResult {
  const now = options?.now ?? new Date();
  const traceTimestamp = now.toISOString();
  const sessionId = options?.sessionId ?? makeSessionId();
  const trace: AgentTraceStep[] = [];

  trace.push(
    makeTrace(
      "Planner Agent",
      "Created workflow: understand intent, discover providers, rank options, book slot, schedule follow-up.",
      "antigravity.plan_workflow()",
      traceTimestamp,
    ),
  );

  const intent = parseServiceIntent(message);
  trace.push(
    makeTrace(
      "Intent Agent",
      `Extracted ${intent.service_type}, ${intent.location}, ${intent.time}; language=${intent.language}; confidence=${Math.round(
        intent.confidence * 100,
      )}%.`,
      "parse_multilingual_intent()",
      traceTimestamp,
    ),
  );

  const providers = discoverProviders(intent);
  trace.push(
    makeTrace(
      "Discovery Agent",
      `Searched mock Maps/Places dataset for ${intent.service_type} near ${intent.location}; found ${providers.length} candidate providers.`,
      "mock_places_search()",
      traceTimestamp,
    ),
  );

  const availableProviders = providers.filter((provider) => provider.is_available);
  const selected = availableProviders[0] ?? providers[0];
  trace.push(
    makeTrace(
      "Decision Agent",
      `${selected.name} selected with score ${selected.score}; next best ${
        providers[1]?.name ?? "none"
      } scored ${providers[1]?.score ?? 0}.`,
      "rank_by_distance_availability_rating()",
      traceTimestamp,
    ),
  );

  const scheduledTime = formatDateLabel(now, detectTime(normalize(message)).dayOffset, selected.time);
  const booking: BookingRecord = {
    booking_ref: options?.bookingRef ?? makeBookingRef(now),
    status: "CONFIRMED",
    provider_id: selected.id,
    provider_name: selected.name,
    service_type: intent.service_type,
    scheduled_time: scheduledTime,
    slot: selected.time,
    location: intent.location,
    price_estimate: selected.price,
    confirmation_message: `Confirmed: ${selected.name} for ${intent.service_type} at ${selected.time} in ${intent.location}.`,
  };
  trace.push(
    makeTrace(
      "Booking Agent",
      `Created mock booking ${booking.booking_ref}, assigned ${selected.name}, and generated confirmation receipt.`,
      "create_mock_booking_record()",
      traceTimestamp,
    ),
  );

  const reminder = {
    trigger_at: `${intent.time.replace("morning", "morning")} - 1 hour before appointment`,
    message: `Reminder scheduled 1 hour before ${selected.name} visits ${intent.location}.`,
  };
  const followUp = {
    status_update: `Provider notification queued for ${selected.name}. Customer confirmation sent.`,
    completion_check: `After ${selected.time}, system will ask whether the ${intent.service_type} job was completed and request a rating.`,
  };
  trace.push(
    makeTrace(
      "Follow-up Agent",
      "Scheduled reminder, provider status update, and post-job completion confirmation.",
      "schedule_reminder_and_completion_check()",
      traceTimestamp,
    ),
  );

  const reasoning = `${selected.name} is the best match because it is ${selected.distance} away, available at ${selected.time}, has a ${selected.rating.toFixed(
    1,
  )} rating, and has completed ${selected.total_jobs} jobs.`;

  return {
    session_id: sessionId,
    intent,
    providers,
    selected_provider: selected,
    reasoning,
    booking,
    reminder,
    follow_up: followUp,
    trace_steps: trace,
    ai_response_text: `Samajh gaya. ${intent.location} mein ${intent.time} ke liye ${intent.service_type} chahiye. ${reasoning} Booking confirmed: ${booking.booking_ref}. Reminder bhi schedule ho gaya hai.`,
  };
}
