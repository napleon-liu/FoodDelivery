package dao

import (
	"FoodDelivery/internal/model"
	"context"

	"gorm.io/gorm"
)

type TransactionDao struct {
	*gorm.DB
}

func NewTransactionDao(c context.Context) *TransactionDao {
	if c == nil {
		c = context.Background()
	}
	return &TransactionDao{NewDBClient(c)}
}

// Create one transaction
func (dao *TransactionDao) CreateTransaction(trans *model.Transaction) error {
	return dao.Model(&model.Transaction{}).Create(&trans).Error
}

// func (dao *TransactionDao) FindTransById(id uint) (r *model.Transaction, err error) {
// }
