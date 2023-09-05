package dao

import (
	"FoodDelivery/internal/model"
)

// 执行数据迁移
func migration() {
	// 自动迁移模式
	err := _db.Set("gorm:table_options", "charset=utf8mb4").
		AutoMigrate(&model.User{}, &model.Good{}, &model.Transaction{})
	if err != nil {
		return
	}
}
