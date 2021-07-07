package schema

import "entgo.io/ent"
import "entgo.io/ent/schema/field"

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
	}
}

// Edges of the Task.
func (Task) Edges() []ent.Edge {
	return nil
}
