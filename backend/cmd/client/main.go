package main

import (
	"context"
	"fmt"
	"log"
	"math/rand"
	"time"

	"github.com/tamagram/nesk/backend/ent/proto/entpb"
	"google.golang.org/grpc"
	"google.golang.org/grpc/status"
)

func main() {
	rand.Seed(time.Now().UnixNano())

	// サーバーとのコネクションを開く
	conn, err := grpc.Dial(":5000", grpc.WithInsecure())
	if err != nil {
		log.Fatalf("failed connecting to server: %s", err)
	}
	defer conn.Close()

	// コネクション上にTaskサービスクライアントを作成
	client := entpb.NewTaskServiceClient(conn)

	// サーバーにランダムなTaskの作成を依頼する
	ctx := context.Background()
	task := randomTask()
	created, err := client.Create(ctx, &entpb.CreateTaskRequest{
		Task: task,
	})
	if err != nil {
		se, _ := status.FromError(err)
		log.Fatalf("failed creating user: status=%s message=%s", se.Code(), se.Message())
	}
	log.Printf("user created with id: %d", created.Id)

	// 別のRPC呼び出しで、先に作成したUserを取得
	get, err := client.Get(ctx, &entpb.GetTaskRequest{
		Id: created.Id,
	})
	if err != nil {
		se, _ := status.FromError(err)
		log.Fatalf("failed retrieving user: status=%s message=%s", se.Code(), se.Message())
	}
	log.Printf("retrieved user with id=%d: %v", get.Id, get)
}

func randomTask() *entpb.Task {
	return &entpb.Task{
		Title:   fmt.Sprintf("task title %d", rand.Int()),
		Details: fmt.Sprintf("task details %d", rand.Int()),
	}
}
