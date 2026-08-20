// Shared authentication utilities for Mariner's Book edge functions
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

/**
 * Generic error messages to avoid information leakage
 */
export const GENERIC_ERRORS = {
  UNAUTHORIZED: 'Authentication required',
  FORBIDDEN: 'You are not authorized for this action',
  SERVICE_ERROR: 'The service is temporarily unavailable',
  INVALID_INPUT: 'Invalid request parameters',
  RATE_LIMIT: 'Too many requests. Please wait.',
  NOT_CONFIGURED: 'Service configuration error',
} as const;

/**
 * Validate user authentication from request headers
 * Returns user object if authenticated, null otherwise
 */
export async function validateAuth(req: Request): Promise<{ user: { id: string; email?: string } | null; error: string | null }> {
  const authHeader = req.headers.get('Authorization');
  
  if (!authHeader) {
    return { user: null, error: GENERIC_ERRORS.UNAUTHORIZED };
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('[Auth] Missing Supabase configuration');
    return { user: null, error: GENERIC_ERRORS.SERVICE_ERROR };
  }

  try {
    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    });

    const { data: { user }, error } = await supabaseClient.auth.getUser();
    
    if (error || !user) {
      console.error('[Auth] User validation failed');
      return { user: null, error: GENERIC_ERRORS.UNAUTHORIZED };
    }

    return { user: { id: user.id, email: user.email }, error: null };
  } catch (e) {
    console.error('[Auth] Exception during validation');
    return { user: null, error: GENERIC_ERRORS.SERVICE_ERROR };
  }
}

/**
 * Create an unauthorized response with proper headers
 */
export function unauthorizedResponse(corsHeaders: Record<string, string>, message?: string): Response {
  return new Response(
    JSON.stringify({ error: message || GENERIC_ERRORS.UNAUTHORIZED }),
    { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

/**
 * Create a generic error response without exposing internal details
 */
export function errorResponse(
  corsHeaders: Record<string, string>, 
  status: number = 500, 
  message?: string
): Response {
  return new Response(
    JSON.stringify({ error: message || GENERIC_ERRORS.SERVICE_ERROR }),
    { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

/**
 * Log error internally without exposing to client
 */
export function logError(context: string, error: unknown): void {
  const message = error instanceof Error ? error.message : 'Unknown error';
  const stack = error instanceof Error ? error.stack : undefined;
  console.error(`[${context}]`, { message, stack, timestamp: new Date().toISOString() });
}
