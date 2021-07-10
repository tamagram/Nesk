package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/field"
)

// Task holds the schema definition for the Task entity.
type Task struct {
	ent.Schema
}

// Fields of the Task.
func (Task) Fields() []ent.Field {
	return []ent.Field{
		field.String("title").
			Default("No title"),
		field.String("details").
			Default("No details"),
		field.Enum("status").
			Values("in_progress", "completed").
			Default("in_progress"),
		field.Int("priority").
			Default(0),
		field.Time("created_at").
			Default(time.Now).
			Immutable(),
	}
}

// Edges of the Task.
func (Task) Edges() []ent.Edge {
	return nil
}
