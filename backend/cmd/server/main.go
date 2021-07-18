package main

import (
	"context"
	"log"
	"net"

	_ "github.com/mattn/go-sqlite3"
	"github.com/tamagram/nesk/backend/ent"
	"github.com/tamagram/nesk/backend/ent/proto/entpb"
	"google.golang.org/grpc"
)

func main() {
	// entクライアントの初期化
	client, err := ent.Open("sqlite3", "file:ent?mode=memory&cache=shared&_fk=1")
	if err != nil {
		log.Fatalf("failed opening connection to sqlite: %v", err)
	}
	defer client.Close()

	// マイグレーションツールの実行（テーブルの作成など）
	if err := client.Schema.Create(context.Background()); err != nil {
		log.Fatalf("failed creating schema resources: %v", err)
	}

	// 新しいgRPCサーバの作成 (複数のサービスを1つのサーバーに接続できます)
	server := grpc.NewServer()
	// 生成されたTaskサービスの初期化
	svc := entpb.NewTaskService(client)
	// サービスをサーバーに登録
	entpb.RegisterTaskServiceServer(server, svc)

	// トラフィックをリッスンするために5000番ポートを開きます
	lis, err := net.Listen("tcp", ":5000")
	if err != nil {
		log.Fatalf("failed listening: %s", err)
	}
	// トラフィックを無期限にリッスン
	if err := server.Serve(lis); err != nil {
		log.Fatalf("server ended: %s", err)
	}
}
