package config

import (
	"encoding/json"
	"fmt"
	"log"
	"os"
)

var ElemeiConfig Config

type Config struct {
	MySQLConfig MySQLConfig `json:"MySQLConfig"`
	RedisConfig RedisConfig `json:"RedisConfig"`
	EmailConfig EmailConfig `json:"EmailConfig"`
}

type MySQLConfig struct {
	Name string `json:"Name"`
	Host string `json:"Host"`
	User string `json:"User"`
	Pass string `json:"Pass"`
}

type RedisConfig struct {
	Addr string `json:"Addr"`
	Pass string `json:"Pass"`
}
type EmailConfig struct {
	From     string `json:"From"`
	Host     string `json:"Host"`
	Addr     string `json:"Addr"`
	Username string `json:"Username"`
	Pass     string `json:"Pass"`
}

func Init(path string) error {
	conf, err := os.ReadFile(path)
	if err != nil {
		log.Println(fmt.Errorf("read conf err: %v", err))
		return err
	}
	err = json.Unmarshal(conf, &ElemeiConfig)
	if err != nil {
		log.Println(fmt.Errorf("conf bind json err: %v", err))
		return err
	}
	return nil
}
