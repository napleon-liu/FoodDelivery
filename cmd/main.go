package main

import (
	"elemei/internal/api/v1"
	"elemei/internal/config"
	"elemei/internal/repository/mysql"
	"fmt"
	"log"
)

func main() {
	r := api.NewRouter()
	_ = Init()
	_ = r.Run(":23462")
}

func Init() error {
	// 把配置文件里的内容读到当前进程的某个结构体内
	err := config.Init("internal/config/conf.json")
	if err != nil {
		log.Println(fmt.Errorf("config init error: %v", err))
		return err
	}
	err = mysql.Init(config.ElemeiConfig.MySQLConfig)
	if err != nil {
		log.Println(fmt.Errorf("database init error: %v", err))
		return err
	}
	return nil
}
