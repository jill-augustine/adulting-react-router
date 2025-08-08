-- Create Task types table
create TABLE task_types
(
    id           BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name         TEXT UNIQUE NOT NULL,
    boop_size_id INT         NOT NULL REFERENCES boop_sizes (id),
    user_id      UUID DEFAULT (auth.uid()) REFERENCES auth.users (id) ON DELETE CASCADE
);

-- Create Join table (many:many) between chores and task types
CREATE TABLE join_chore_task_types
(
    chore_id     BIGINT REFERENCES chores (id) ON DELETE CASCADE,
    task_type_id INT REFERENCES task_types (id) ON DELETE CASCADE,
    user_id      UUID DEFAULT (auth.uid()) REFERENCES auth.users (id) ON DELETE CASCADE,
    PRIMARY KEY (chore_id, task_type_id)
);


-- Create tags table
create TABLE tags
(
    id      BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name    TEXT UNIQUE NOT NULL,
    user_id UUID DEFAULT (auth.uid()) REFERENCES auth.users (id) ON DELETE CASCADE
);

-- Create Join table (many:many) between chores and tags
CREATE TABLE join_chore_tags
(
    chore_id BIGINT REFERENCES chores (id) ON DELETE CASCADE,
    tag_id   INT REFERENCES tags (id) ON DELETE CASCADE,
    user_id  UUID DEFAULT (auth.uid()) REFERENCES auth.users (id) ON DELETE CASCADE,
    PRIMARY KEY (chore_id, tag_id)
);

-- Create Join table (many:many) between task_types and tags
CREATE TABLE join_task_types_tags
(
    task_type_id BIGINT REFERENCES task_types (id) ON DELETE CASCADE,
    tag_id       INT REFERENCES tags (id) ON DELETE CASCADE,
    user_id      UUID DEFAULT (auth.uid()) REFERENCES auth.users (id) ON DELETE CASCADE,
    PRIMARY KEY (task_type_id, tag_id)
);

-- Create task table and link (1:1) to chores and task types
CREATE TABLE tasks
(
    id             BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    task_type_id   INT    NOT NULL REFERENCES task_types (id),
    chore_id       BIGINT NOT NULL REFERENCES chores (id) ON DELETE CASCADE,
    start_date     DATE   NOT NULL,
    due_date       DATE   NOT NULL,
    date_completed DATE,
    completed_by   BIGINT REFERENCES tasks (id), -- Self-referencing FK
    tags           INT REFERENCES tags (id),
    user_id        UUID DEFAULT (auth.uid()) REFERENCES auth.users (id) ON DELETE CASCADE
);
