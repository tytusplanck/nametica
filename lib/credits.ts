import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useAuthStore } from '@/lib/store/auth';

interface Credits {
  id: string;
  user_id: string;
  credits_remaining: number;
  created_at: string;
  updated_at: string;
}

export async function getUserCredits(): Promise<{
  credits: number;
  isAuthenticated: boolean;
}> {
  const supabase = createClientComponentClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return { credits: 0, isAuthenticated: false };
  }

  // For authenticated users, use Supabase
  const { data: credits, error } = await supabase
    .from('credits')
    .select<'*', Credits>('*')
    .single();

  if (error) {
    console.error('Error fetching credits:', error);
    return { credits: 0, isAuthenticated: true };
  }

  return {
    credits: credits?.credits_remaining ?? 0,
    isAuthenticated: true,
  };
}

export async function decrementCredits(): Promise<boolean> {
  const supabase = createClientComponentClient();
  const { user } = useAuthStore.getState();

  if (!user) {
    return false;
  }

  // For authenticated users, use Supabase
  const { error } = await supabase.rpc('decrement_credits');

  if (error) {
    console.error('Error decrementing credits:', error);
    return false;
  }

  return true;
}

export function hasAvailableCredits(): boolean {
  const { credits } = useAuthStore.getState();
  return credits > 0;
}

export function hasPremiumAccess(): boolean {
  const { credits } = useAuthStore.getState();
  return credits >= 20;
}

export function clearLocalCredits(): void {
  // No longer needed as we don't store local credits
  return;
}
