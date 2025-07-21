create or replace function add_task_type(name text, boop_size_id int8, tag_ids int8[])
    returns int8
    language plpgsql
as
$$
declare
    task_type_id int8;
begin
    -- Start of transaction
    insert into task_types(name, boop_size_id)
    values (name, boop_size_id)
    returning id into task_type_id;

    insert into join_task_types_tags(task_type_id, tag_id)
    select task_type_id, tag_id
    from unnest(tag_ids) as tag_id;

    return task_type_id;
exception
    when others then
        -- Any error: rollback entire transaction
        raise;
end;
$$;

