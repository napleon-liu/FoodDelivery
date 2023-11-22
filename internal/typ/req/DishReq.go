package req

// GetAllDishReq 获取所有菜品请求
type GetAllDishReq struct {
}

// GetDishDetailReq 获取某项菜品的详细信息
type GetDishDetailReq struct {
	ID uint `json:"id" binding:"required"`
}

// UpdateDishReq 更新某项菜品
type UpdateDishReq struct {
	ID          uint   `json:"id" binding:"required"`
	Name        string `json:"name"`
	Price       uint   `json:"price"`
	PictureURL  string `json:"pictureURL"`
	Description string `json:"description"`
}

// CreateDishReq 创建某项菜品
type CreateDishReq struct {
	Name        string `json:"name" binding:"required"`
	Price       uint   `json:"price" binding:"required"`
	PictureURL  string `json:"pictureURL"`
	Description string `json:"description"`
}

// DeleteDishReq 删除某项菜品
type DeleteDishReq struct {
	IDs []uint `json:"ids" binding:"required"`
}
