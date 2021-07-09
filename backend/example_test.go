package task

import (
	"context"
	"fmt"
	"log"

	"entgo.io/ent/dialect"
	_ "github.com/mattn/go-sqlite3"
	"github.com/tamagram/nesk/backend/ent"
)

func ExampleTask() {
	// インメモリーのSQLiteデータベースを持つent.Clientを作成
	client, err := ent.Open(dialect.SQLite, "file:ent?mode=memory&cache=shared&_fk=1")
	if err != nil {
		log.Fatalf("failed to opening connection to sqlite3: %v", err)
	}
	defer client.Close()
	ctx := context.Background()
	// 自動マイグレーションツールを実行して、すべてのスキーマリソースを作成
	if err := client.Schema.Create(ctx); err != nil {
		log.Fatalf("failed creating schema resources: %v", err)
	}
	// 出力
	task1, err := client.Task.Create().Save(ctx)
	if err != nil {
		log.Fatalf("failed creating a Task: %v", err)
	}
	fmt.Println(task1)
	// Output:
	// Task(id=1, title=No title, details=No details)
}
