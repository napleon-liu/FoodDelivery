package req

// UserLoginReq 用户登录请求
type UserLoginReq struct {
	Account  string `json:"account"`
	Password string `json:"password"`
	Cookie   string `json:"cookie"`
	Role     int    `json:"role"`
}

// UserRegisterReq 注册账号请求
type UserRegisterReq struct {
	Account  string `json:"account"`
	Name     string `json:"name"`
	Password string `json:"password"`
	Role     string `json:"role"`
}

// UserDetailReq 获取用户的个人信息
type UserDetailReq struct {
	ID uint `json:"id"`
}
