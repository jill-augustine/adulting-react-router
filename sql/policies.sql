-- TODO: Remove anon policies and add user-specific policies

create policy "Anon can Insert"
    on "public"."join_task_types_tags"
    as PERMISSIVE
    for INSERT
    to anon
    with check (
    true
    );

create policy "Anon can Insert"
    on "public"."task_types"
    as PERMISSIVE
    for INSERT
    to anon
    with check (
    true
    );


