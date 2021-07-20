package main

import (
	"testing"

	"github.com/tamagram/nesk/backend/ent/proto/entpb"
)

func TestTaskProto(t *testing.T) {
	want := map[string]string{"Title": "hogetitle", "Details": "hogedetails"}
	user := entpb.Task{
		Title:   "hogetitle",
		Details: "hogedetails",
	}
	got := map[string]string{"Title": user.GetTitle(), "Details": user.GetDetails()}
	if got["Title"] != want["Title"] {
		t.Fatalf("got %s want %s", got["Title"], want["Title"])
	}
	if got["Details"] != want["Details"] {
		t.Fatalf("got %s want %s", got["Details"], want["Details"])
	}
}
