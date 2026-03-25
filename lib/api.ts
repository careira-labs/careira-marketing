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
    throw new Error(error.detail || 'Failed to join waitlist');
  }

  return res.json();
}
