// https://supabase.com/docs/guides/auth
// https://supabase.com/docs/guides/auth/jwt-fields
// https://supabase.com/docs/guides/database/postgres/row-level-security

import * as z from 'zod'

const audSchema = z.literal(["anon", "authenticated"])

const amrMethodsSchema = z.literal(["oauth", "password", "otp", "totp", "recovery", "invite", "sso/saml", "magiclink", "email/signup", "email_change", "token_refresh", "anonymous"])

const jwtClaimsSchema = z.object({
  iss: z.string(),
  aud: z.union([audSchema, audSchema.array()]),
  exp: z.number(),
  iat: z.number(),
  sub: z.string(),
  role: z.literal(["anon", "authenticated", "service_role"]),
  aal: z.literal(["aal1", "aal2"]),
  session_id: z.string(),
  email: z.email(),
  phone: z.string(),
  is_anonymous: z.boolean(),
  jti: z.string().optional(),
  nbf: z.number().optional(),
  app_metadata: z.map(z.string(), z.unknown()).optional(),
  user_metadata: z.map(z.string(), z.unknown()).optional(),
  amr: z.object({
    method: amrMethodsSchema,
    timestamp: z.number(),
  }).array().optional(),
  ref: z.string().optional(), // Only in anon/service role tokens
})


const validateAndParseSupabaseToken = (token: object): boolean => {
  const result = jwtClaimsSchema.safeParse(token)

  if (result.error) {
    console.error(result.error)
    return false
  }
  // not expected but safety check
  if (!result.data) {
    return false
  }
  const parsedToken = result.data
  
  // Check expiry
  const nowSeconds = Date.now() / 1000
  if (parsedToken.exp < nowSeconds) {
    return false
  }
  if (parsedToken?.nbf && (parsedToken.nbf < nowSeconds)) {
    return false
  }
  return true
}