package main

import (
	"FoodDelivery/internal/api/v1"
	conf "FoodDelivery/internal/config"
	"FoodDelivery/internal/repository/mysql/dao"
)

func main() {
	loading()

	r := api.NewRouter()

	_ = r.Run(conf.HttpPort)
}

func loading() {
	// 从配置文件读入配置
	conf.Init()
	// util.InitLog()
	dao.MySQLInit()
	// cache.Redis()
}
