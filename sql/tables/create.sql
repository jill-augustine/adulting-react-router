-- Normal (non-join) tables created in order of dependencies
CREATE TABLE public.boop_sizes
(
    name    text                                       NOT NULL UNIQUE,
    value   integer                                    NOT NULL,
    id      UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
);
ALTER TABLE boop_sizes
    ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.chores
(
    name        text                                         NOT NULL,
    description text,
    id          UUID PRIMARY KEY DEFAULT (gen_random_uuid()) NOT NULL,
    user_id     UUID             DEFAULT (auth.uid()) REFERENCES auth.users (id) ON DELETE CASCADE,
    is_hidden   boolean          DEFAULT false
);
ALTER TABLE chores
    ENABLE ROW LEVEL SECURITY;

create TABLE public.tags
(
    id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name      TEXT UNIQUE NOT NULL,
    user_id   UUID             DEFAULT (auth.uid()) REFERENCES auth.users (id) ON DELETE CASCADE,
    is_hidden boolean          DEFAULT false

);
ALTER TABLE tags
    ENABLE ROW LEVEL SECURITY;

create TABLE public.task_types
(
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name         TEXT UNIQUE NOT NULL,
    boop_size_id uuid        NOT NULL REFERENCES boop_sizes (id),
    user_id      UUID             DEFAULT (auth.uid()) REFERENCES auth.users (id) ON DELETE CASCADE,
    frequency    TEXT        NOT NULL,
    is_hidden    boolean          DEFAULT false
);
ALTER TABLE task_types
    ENABLE ROW LEVEL SECURITY;

CREATE TABLE tasks
(
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_type_id   UUID NOT NULL REFERENCES task_types (id),
    chore_id       UUID NOT NULL REFERENCES chores (id) ON DELETE CASCADE,
    start_date     DATE NOT NULL,
    due_date       DATE NOT NULL,
    date_completed DATE,
    completed_by   UUID REFERENCES tasks (id), -- Self-referencing FK
    tags           UUID REFERENCES tags (id),
    user_id        UUID             DEFAULT (auth.uid()) REFERENCES auth.users (id) ON DELETE CASCADE
);
ALTER TABLE tasks
    ENABLE ROW LEVEL SECURITY;

-- Join tables (for many:many joins)
CREATE TABLE public.chore_tags_join
(
    chore_id UUID REFERENCES chores (id) ON DELETE CASCADE,
    tag_id   UUID REFERENCES tags (id) ON DELETE CASCADE,
    user_id  UUID DEFAULT (auth.uid()) REFERENCES auth.users (id) ON DELETE CASCADE,
    PRIMARY KEY (chore_id, tag_id)
);
ALTER TABLE chore_tags_join
    ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.chore_task_types_join
(
    chore_id     UUID REFERENCES chores (id) ON DELETE CASCADE,
    task_type_id UUID REFERENCES task_types (id) ON DELETE CASCADE,
    user_id      UUID DEFAULT (auth.uid()) REFERENCES auth.users (id) ON DELETE CASCADE,
    PRIMARY KEY (chore_id, task_type_id)
);
ALTER TABLE chore_task_types_join
    ENABLE ROW LEVEL SECURITY;

CREATE TABLE tags_task_types_join
(
    task_type_id UUID REFERENCES task_types (id) ON DELETE CASCADE,
    tag_id       UUID REFERENCES tags (id) ON DELETE CASCADE,
    user_id      UUID DEFAULT (auth.uid()) REFERENCES auth.users (id) ON DELETE CASCADE,
    PRIMARY KEY (task_type_id, tag_id)
);
ALTER TABLE tags_task_types_join
    ENABLE ROW LEVEL SECURITY;
