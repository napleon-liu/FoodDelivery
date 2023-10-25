package req

type UserLoginReq struct {
	account  string
	password string
	cookie   string
	role     string
}
