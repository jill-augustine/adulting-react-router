create policy "authenticated non-anonymous insert"
    on "public"."join_task_types_tags"
    as PERMISSIVE
    for INSERT
    to authenticated
    with check (
    (auth.jwt() ->> 'is_anonymous'::text)::boolean = false
    );


create policy "authenticated non-anonymous insert"
    on "public"."task_types"
    as PERMISSIVE
    for INSERT
    to authenticated
    with check (
    (((auth.jwt() ->> 'is_anonymous'::text))::boolean = false)
    );

create policy "authenticated non-anonymous select"
    on "public"."task_types"
    as PERMISSIVE
    for select
    to authenticated
    using (
    (((auth.jwt() ->> 'is_anonymous'::text))::boolean = false)
    );

create policy "authenticated non-anonymous select"
    on "public"."boop_sizes"
    as PERMISSIVE
    for SELECT
    to authenticated
    using (
    (((auth.jwt() ->> 'is_anonymous'::text))::boolean = false)
    );
