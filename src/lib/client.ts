import {
  createBrowserClient as browser,
  createServerClient as server,
  parseCookieHeader, serializeCookieHeader
} from '@supabase/ssr'
import * as process from "node:process";

/// <reference types="vite/types/importMeta.d" />

const VITE_SUPABASE_URL = import.meta.env?.VITE_SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
const VITE_SUPABASE_ANON_KEY = import.meta.env?.VITE_SUPABASE_ANON_KEY ?? process.env.VITE_SUPABASE_ANON_KEY;
export const VITE_SUPABASE_TEST_USER_EMAIL = import.meta.env?.VITE_SUPABASE_TEST_USER_EMAIL ?? process.env.VITE_SUPABASE_TEST_USER_EMAIL;
export const VITE_SUPABASE_TEST_USER_PASSWORD = import.meta.env?.VITE_SUPABASE_TEST_USER_PASSWORD ?? process.env.VITE_SUPABASE_TEST_USER_PASSWORD;

export function createBrowserClient() {
  return browser(
    VITE_SUPABASE_URL,
    VITE_SUPABASE_ANON_KEY,
  )
}

export function createServerClient(request: Request) {
  const headers = new Headers()

  const supabase = server(
    VITE_SUPABASE_URL,
    VITE_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return parseCookieHeader(request.headers.get('Cookie') ?? '') as {
            name: string
            value: string
          }[]
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({name, value, options}) =>
            headers.append('Set-Cookie', serializeCookieHeader(name, value, options))
          )
        },
      },
    }
  )
  return {supabase, headers}
}

export const browserClient = createBrowserClient()

export const serverClient = createBrowserClient()