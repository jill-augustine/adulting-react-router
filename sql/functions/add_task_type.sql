create or replace function add_task_type(name text, boop_size_id int8, frequency text, tag_ids int8[])
    returns int8
    language 'plpgsql'
    set search_path = pg_catalog, public
as
$$
declare
    task_type_id int8;
begin
    -- Start of transaction
    insert into task_types(name, boop_size_id, frequency)
    values (name, boop_size_id, frequency)
    returning id into task_type_id;

    if array_length(tag_ids, 1) > 0 then
        insert into tags_task_types_join(task_type_id, tag_id)
        select task_type_id, tag_id
        from unnest(tag_ids) as tag_id;
    end if;

    return task_type_id;
exception
    when others then
        -- Any error: rollback entire transaction
        raise;
end;
$$;

