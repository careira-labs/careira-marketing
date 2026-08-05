/**
 * Waitlist API client
 * Backend: POST https://api.careira.com/waitlist/join
 */

const API_BASE = 'https://api.careira.com';

export interface WaitlistRequest {
  email: string;
  first_name?: string;
  user_type?: 'candidate' | 'recruiter' | 'employer';
  company?: string;
  country_code?: string;
  sector?: string;
  intent?: string;
}

export interface WaitlistResponse {
  success: boolean;
  message: string;
}

/**
 * Join the waitlist
 * @param data - Waitlist signup data
 * @returns Promise resolving to success/message
 * @throws Error if request fails
 */
export async function joinWaitlist(data: WaitlistRequest): Promise<WaitlistResponse> {
  const res = await fetch(`${API_BASE}/waitlist/join`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: 'Failed to join waitlist' }));
    throw new Error(detailToMessage(error.detail, 'Failed to join waitlist'));
  }

  return res.json();
}

/** FastAPI `detail` can be a string or a list of validation-error objects. */
function detailToMessage(detail: unknown, fallback: string): string {
  if (typeof detail === 'string') return detail;
  if (Array.isArray(detail)) {
    const msgs = detail.map((d: any) => d?.msg).filter(Boolean);
    if (msgs.length) return msgs.join(' ');
  }
  return fallback;
}


// ── Pilot application ──

export interface PilotJobseekerRequest {
  email: string;
  full_name: string;
  country_code: string;
  linkedin_url?: string;
  job_title?: string;
  search_duration: string;
  situation: string;
  feedback_ok: boolean;
  website?: string;
}

export interface PilotRecruiterRequest {
  email: string;
  full_name: string;
  company_name: string;
  linkedin_url?: string;
  specialization: string;
  experience_years: string;
  team_size: string;
  role_description: string;
  has_live_roles: boolean;
  website?: string;
}

export interface PilotResponse {
  success: boolean;
  message: string;
}

export async function applyForPilot(
  type: 'jobseeker' | 'recruiter',
  data: PilotJobseekerRequest | PilotRecruiterRequest,
): Promise<PilotResponse> {
  const res = await fetch(`${API_BASE}/pilot/apply/${type}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: 'Failed to submit application' }));
    throw new Error(detailToMessage(error.detail, 'Failed to submit application'));
  }

  return res.json();
}
