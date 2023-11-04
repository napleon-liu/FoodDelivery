package resp

type DishResp struct {
	Id         uint   `json:"id"`
	Price      uint   `json:"price"`
	Name       string `json:"name"`
	PictureURL string `json:"pictureURL"`
}

// GetAllDishResp 获取所有菜品
type GetAllDishResp struct {
	DishRespList []DishResp `json:"dishRespList"'`
}

// GetDishDetail 获取菜品细节
type GetDishDetail struct {
	Dish DishResp `json:"dish"`
}
