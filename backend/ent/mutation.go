// Code generated by entc, DO NOT EDIT.

package ent

import (
	"context"
	"fmt"
	"sync"

	"github.com/tamagram/nesk/backend/ent/predicate"
	"github.com/tamagram/nesk/backend/ent/task"

	"entgo.io/ent"
)

const (
	// Operation types.
	OpCreate    = ent.OpCreate
	OpDelete    = ent.OpDelete
	OpDeleteOne = ent.OpDeleteOne
	OpUpdate    = ent.OpUpdate
	OpUpdateOne = ent.OpUpdateOne

	// Node types.
	TypeTask = "Task"
)

// TaskMutation represents an operation that mutates the Task nodes in the graph.
type TaskMutation struct {
	config
	op            Op
	typ           string
	id            *int
	title         *string
	details       *string
	clearedFields map[string]struct{}
	done          bool
	oldValue      func(context.Context) (*Task, error)
	predicates    []predicate.Task
}

var _ ent.Mutation = (*TaskMutation)(nil)

// taskOption allows management of the mutation configuration using functional options.
type taskOption func(*TaskMutation)

// newTaskMutation creates new mutation for the Task entity.
func newTaskMutation(c config, op Op, opts ...taskOption) *TaskMutation {
	m := &TaskMutation{
		config:        c,
		op:            op,
		typ:           TypeTask,
		clearedFields: make(map[string]struct{}),
	}
	for _, opt := range opts {
		opt(m)
	}
	return m
}

// withTaskID sets the ID field of the mutation.
func withTaskID(id int) taskOption {
	return func(m *TaskMutation) {
		var (
			err   error
			once  sync.Once
			value *Task
		)
		m.oldValue = func(ctx context.Context) (*Task, error) {
			once.Do(func() {
				if m.done {
					err = fmt.Errorf("querying old values post mutation is not allowed")
				} else {
					value, err = m.Client().Task.Get(ctx, id)
				}
			})
			return value, err
		}
		m.id = &id
	}
}

// withTask sets the old Task of the mutation.
func withTask(node *Task) taskOption {
	return func(m *TaskMutation) {
		m.oldValue = func(context.Context) (*Task, error) {
			return node, nil
		}
		m.id = &node.ID
	}
}

// Client returns a new `ent.Client` from the mutation. If the mutation was
// executed in a transaction (ent.Tx), a transactional client is returned.
func (m TaskMutation) Client() *Client {
	client := &Client{config: m.config}
	client.init()
	return client
}

// Tx returns an `ent.Tx` for mutations that were executed in transactions;
// it returns an error otherwise.
func (m TaskMutation) Tx() (*Tx, error) {
	if _, ok := m.driver.(*txDriver); !ok {
		return nil, fmt.Errorf("ent: mutation is not running in a transaction")
	}
	tx := &Tx{config: m.config}
	tx.init()
	return tx, nil
}

// ID returns the ID value in the mutation. Note that the ID
// is only available if it was provided to the builder.
func (m *TaskMutation) ID() (id int, exists bool) {
	if m.id == nil {
		return
	}
	return *m.id, true
}

// SetTitle sets the "title" field.
func (m *TaskMutation) SetTitle(s string) {
	m.title = &s
}

// Title returns the value of the "title" field in the mutation.
func (m *TaskMutation) Title() (r string, exists bool) {
	v := m.title
	if v == nil {
		return
	}
	return *v, true
}

// OldTitle returns the old "title" field's value of the Task entity.
// If the Task object wasn't provided to the builder, the object is fetched from the database.
// An error is returned if the mutation operation is not UpdateOne, or the database query fails.
func (m *TaskMutation) OldTitle(ctx context.Context) (v string, err error) {
	if !m.op.Is(OpUpdateOne) {
		return v, fmt.Errorf("OldTitle is only allowed on UpdateOne operations")
	}
	if m.id == nil || m.oldValue == nil {
		return v, fmt.Errorf("OldTitle requires an ID field in the mutation")
	}
	oldValue, err := m.oldValue(ctx)
	if err != nil {
		return v, fmt.Errorf("querying old value for OldTitle: %w", err)
	}
	return oldValue.Title, nil
}

// ResetTitle resets all changes to the "title" field.
func (m *TaskMutation) ResetTitle() {
	m.title = nil
}

// SetDetails sets the "details" field.
func (m *TaskMutation) SetDetails(s string) {
	m.details = &s
}

// Details returns the value of the "details" field in the mutation.
func (m *TaskMutation) Details() (r string, exists bool) {
	v := m.details
	if v == nil {
		return
	}
	return *v, true
}

// OldDetails returns the old "details" field's value of the Task entity.
// If the Task object wasn't provided to the builder, the object is fetched from the database.
// An error is returned if the mutation operation is not UpdateOne, or the database query fails.
func (m *TaskMutation) OldDetails(ctx context.Context) (v string, err error) {
	if !m.op.Is(OpUpdateOne) {
		return v, fmt.Errorf("OldDetails is only allowed on UpdateOne operations")
	}
	if m.id == nil || m.oldValue == nil {
		return v, fmt.Errorf("OldDetails requires an ID field in the mutation")
	}
	oldValue, err := m.oldValue(ctx)
	if err != nil {
		return v, fmt.Errorf("querying old value for OldDetails: %w", err)
	}
	return oldValue.Details, nil
}

// ResetDetails resets all changes to the "details" field.
func (m *TaskMutation) ResetDetails() {
	m.details = nil
}

// Op returns the operation name.
func (m *TaskMutation) Op() Op {
	return m.op
}

// Type returns the node type of this mutation (Task).
func (m *TaskMutation) Type() string {
	return m.typ
}

// Fields returns all fields that were changed during this mutation. Note that in
// order to get all numeric fields that were incremented/decremented, call
// AddedFields().
func (m *TaskMutation) Fields() []string {
	fields := make([]string, 0, 2)
	if m.title != nil {
		fields = append(fields, task.FieldTitle)
	}
	if m.details != nil {
		fields = append(fields, task.FieldDetails)
	}
	return fields
}

// Field returns the value of a field with the given name. The second boolean
// return value indicates that this field was not set, or was not defined in the
// schema.
func (m *TaskMutation) Field(name string) (ent.Value, bool) {
	switch name {
	case task.FieldTitle:
		return m.Title()
	case task.FieldDetails:
		return m.Details()
	}
	return nil, false
}

// OldField returns the old value of the field from the database. An error is
// returned if the mutation operation is not UpdateOne, or the query to the
// database failed.
func (m *TaskMutation) OldField(ctx context.Context, name string) (ent.Value, error) {
	switch name {
	case task.FieldTitle:
		return m.OldTitle(ctx)
	case task.FieldDetails:
		return m.OldDetails(ctx)
	}
	return nil, fmt.Errorf("unknown Task field %s", name)
}

// SetField sets the value of a field with the given name. It returns an error if
// the field is not defined in the schema, or if the type mismatched the field
// type.
func (m *TaskMutation) SetField(name string, value ent.Value) error {
	switch name {
	case task.FieldTitle:
		v, ok := value.(string)
		if !ok {
			return fmt.Errorf("unexpected type %T for field %s", value, name)
		}
		m.SetTitle(v)
		return nil
	case task.FieldDetails:
		v, ok := value.(string)
		if !ok {
			return fmt.Errorf("unexpected type %T for field %s", value, name)
		}
		m.SetDetails(v)
		return nil
	}
	return fmt.Errorf("unknown Task field %s", name)
}

// AddedFields returns all numeric fields that were incremented/decremented during
// this mutation.
func (m *TaskMutation) AddedFields() []string {
	return nil
}

// AddedField returns the numeric value that was incremented/decremented on a field
// with the given name. The second boolean return value indicates that this field
// was not set, or was not defined in the schema.
func (m *TaskMutation) AddedField(name string) (ent.Value, bool) {
	return nil, false
}

// AddField adds the value to the field with the given name. It returns an error if
// the field is not defined in the schema, or if the type mismatched the field
// type.
func (m *TaskMutation) AddField(name string, value ent.Value) error {
	switch name {
	}
	return fmt.Errorf("unknown Task numeric field %s", name)
}

// ClearedFields returns all nullable fields that were cleared during this
// mutation.
func (m *TaskMutation) ClearedFields() []string {
	return nil
}

// FieldCleared returns a boolean indicating if a field with the given name was
// cleared in this mutation.
func (m *TaskMutation) FieldCleared(name string) bool {
	_, ok := m.clearedFields[name]
	return ok
}

// ClearField clears the value of the field with the given name. It returns an
// error if the field is not defined in the schema.
func (m *TaskMutation) ClearField(name string) error {
	return fmt.Errorf("unknown Task nullable field %s", name)
}

// ResetField resets all changes in the mutation for the field with the given name.
// It returns an error if the field is not defined in the schema.
func (m *TaskMutation) ResetField(name string) error {
	switch name {
	case task.FieldTitle:
		m.ResetTitle()
		return nil
	case task.FieldDetails:
		m.ResetDetails()
		return nil
	}
	return fmt.Errorf("unknown Task field %s", name)
}

// AddedEdges returns all edge names that were set/added in this mutation.
func (m *TaskMutation) AddedEdges() []string {
	edges := make([]string, 0, 0)
	return edges
}

// AddedIDs returns all IDs (to other nodes) that were added for the given edge
// name in this mutation.
func (m *TaskMutation) AddedIDs(name string) []ent.Value {
	return nil
}

// RemovedEdges returns all edge names that were removed in this mutation.
func (m *TaskMutation) RemovedEdges() []string {
	edges := make([]string, 0, 0)
	return edges
}

// RemovedIDs returns all IDs (to other nodes) that were removed for the edge with
// the given name in this mutation.
func (m *TaskMutation) RemovedIDs(name string) []ent.Value {
	return nil
}

// ClearedEdges returns all edge names that were cleared in this mutation.
func (m *TaskMutation) ClearedEdges() []string {
	edges := make([]string, 0, 0)
	return edges
}

// EdgeCleared returns a boolean which indicates if the edge with the given name
// was cleared in this mutation.
func (m *TaskMutation) EdgeCleared(name string) bool {
	return false
}

// ClearEdge clears the value of the edge with the given name. It returns an error
// if that edge is not defined in the schema.
func (m *TaskMutation) ClearEdge(name string) error {
	return fmt.Errorf("unknown Task unique edge %s", name)
}

// ResetEdge resets all changes to the edge with the given name in this mutation.
// It returns an error if the edge is not defined in the schema.
func (m *TaskMutation) ResetEdge(name string) error {
	return fmt.Errorf("unknown Task edge %s", name)
}
