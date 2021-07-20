package main

import (
	"context"
	"testing"

	_ "github.com/mattn/go-sqlite3"
	"github.com/tamagram/nesk/backend/ent/enttest"
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

func TestCreate(t *testing.T) {
	ctx := context.Background()
	client := enttest.Open(t, "sqlite3", "file:ent?mode=memory&cache=shared&_fk=1")
	defer client.Close()

	svc := entpb.NewTaskService(client)
	got, err := svc.Create(ctx, &entpb.CreateTaskRequest{
		Task: &entpb.Task{
			Title:   "testTitle",
			Details: "testDetails",
		},
	})
	if err != nil {
		t.Fatal(err)
	}
	if got.GetTitle() != "testTitle" {
		t.Fatalf("got %s want %s", got.GetTitle(), "testTitle")
	}
	if got.GetDetails() != "testDetails" {
		t.Fatalf("got %s want %s", got.GetDetails(), "testDetails")
	}
}

func TestGet(t *testing.T) {
	// インメモリのsqliteインスタンスに接続されたentクライアントの初期化から始めます
	ctx := context.Background()
	client := enttest.Open(t, "sqlite3", "file:ent?mode=memory&cache=shared&_fk=1")
	defer client.Close()

	// 次に、Userサービスを初期化します。 ここでは、実際にポートを開いてgRPCサーバーを作成するのではなく
	// ライブラリのコードを直接呼び出していることに注目してください。
	svc := entpb.NewTaskService(client)

	// 次に、ユーザーとカテゴリーを作成し、そのユーザーをカテゴリーの管理者に設定します。
	task := client.Task.Create().
		SetTitle("testTitle").
		SetDetails("testDetails").
		SaveX(ctx)

	// 次に、エッジの情報なしでユーザーを取得します
	got, err := svc.Get(ctx, &entpb.GetTaskRequest{
		Id: int32(task.ID),
	})
	if err != nil {
		t.Fatal("failed retrieving the created task", err)
	}
	if got.GetTitle() != "testTitle" {
		t.Fatalf("got %s want %s", got.GetTitle(), "testTitle")
	}
	if got.GetDetails() != "testDetails" {
		t.Fatalf("got %s want %s", got.GetDetails(), "testDetails")
	}
}
