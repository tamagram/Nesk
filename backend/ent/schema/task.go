package schema

import (
	"entgo.io/contrib/entproto"
	"entgo.io/ent"
	"entgo.io/ent/schema"
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
			Default("No title").
			Annotations(
				entproto.Field(2),
			),
		field.String("details").
			Default("No details").
			Annotations(
				entproto.Field(3),
			),
		// field.Enum("status").
		// 	Values("in_progress", "completed").
		// 	Default("in_progress").
		// 	Annotations(
		// 		entproto.Field(4),
		// 	),
		// field.Int("priority").
		// 	Default(0).
		// 	Annotations(
		// 		entproto.Field(5),
		// 	),
		// field.Time("created_at").
		// 	Default(time.Now).
		// 	Immutable().
		// 	Annotations(
		// 		entproto.Field(6),
		// 	),
	}
}

func (Task) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entproto.Message(),
		entproto.Service(),
	}
}
