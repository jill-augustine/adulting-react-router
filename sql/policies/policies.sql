/*
`authenticated` (or `anon`) are the Postgres Roles
`USING` checks if the existing row complies with the policy expression
`WITH CHECK` checks if the new row complies with the policy expression
`WITH CHECK` defaults to the same as `USING` when not provided
*/

-- (AUTHENTICATED) USER-ONLY POLICIES
-- Authenticated-only SELECT policy for boop_sizes
CREATE POLICY "all users can select boop_sizes data"
    ON public.boop_sizes
    FOR SELECT
    TO authenticated
    USING (true);

-- Authenticated-only INSERT policy for all tables except boop_sizes
DO
$$
    DECLARE
        tbl TEXT;
    BEGIN
        FOR tbl IN
            SELECT table_name
            FROM information_schema.tables
            WHERE table_schema = 'public'
              AND table_name NOT IN ('boop_sizes')
            LOOP
                EXECUTE format('
            CREATE POLICY "all users can insert %I data"
            ON public.%I
            FOR INSERT
            TO authenticated
            WITH CHECK ((select auth.uid()) = user_id);', tbl, tbl);
            END LOOP;
    END
$$;

-- USER-SPECIFIC POLICIES
-- User-specific SELECT policy
DO
$$
    DECLARE
        tbl TEXT;
    BEGIN
        FOR tbl IN
            SELECT table_name
            FROM information_schema.tables
            WHERE table_schema = 'public'
              AND table_name NOT IN ('boop_sizes')
            LOOP
                EXECUTE format('
            CREATE POLICY "user can only select own %I data"
            ON public.%I
            FOR SELECT
            TO authenticated
            USING ((select auth.uid()) = user_id);', tbl, tbl);
            END LOOP;
    END
$$;

-- User-specific UPDATE policy
DO
$$
    DECLARE
        tbl TEXT;
    BEGIN
        FOR tbl IN
            SELECT table_name
            FROM information_schema.tables
            WHERE table_schema = 'public'
              AND table_name NOT IN ('boop_sizes')
            LOOP
                EXECUTE format('
            CREATE POLICY "user can only update own %I data"
            ON public.%I
            FOR UPDATE
            TO authenticated
            USING ((select auth.uid()) = user_id);',
                               tbl, tbl);
            END LOOP;
    END
$$;
