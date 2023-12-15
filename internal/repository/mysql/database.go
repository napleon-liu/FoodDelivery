package mysql

import (
	"elemei/internal/config"
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"log"
)

var Client *gorm.DB

func Init(conf config.MySQLConfig) error {
	dsn := fmt.Sprintf("%s:%s@tcp(%s)/%s?charset=utf8mb4&parseTime=True&loc=Local", conf.User, conf.Pass, conf.Host, conf.Name)
	// 连接mysql
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Println(fmt.Errorf("open gorm err: %v", err))
		return err
	}
	Client = db
	return nil
}
