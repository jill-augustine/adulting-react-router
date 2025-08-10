create or replace function update_task_type(
    id int8,
    name text,
    boop_size_id int8,
    frequency text,
    tag_ids int8[]
) returns int8
    language 'plpgsql'
    set search_path = pg_catalog, public
as
$$
begin
    -- Update the main task_types record
    update task_types
    set name         = update_task_type.name,
        boop_size_id = update_task_type.boop_size_id,
        frequency    = update_task_type.frequency
    where task_types.id = update_task_type.id;

    -- Delete existing tag associations
    delete
    from join_task_types_tags
    where join_task_types_tags.task_type_id = update_task_type.id;

    -- Insert new tag associations if provided
    if array_length(tag_ids, 1) > 0 then
        insert into join_task_types_tags(task_type_id, tag_id)
        select id, tag_id
        from unnest(tag_ids) as tag_id;
    end if;

    -- Done successfully
    return id;
exception
    when others then
        -- On error: raise the error to cause transaction rollback
        raise;
end;
$$;
