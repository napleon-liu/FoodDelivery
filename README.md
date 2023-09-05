# FoodDelivery

Food delivery system implemented by golang

# 环境配置

## 虚拟机环境

虚拟机镜像版本号 CentOS-8.2.2004-x86_64-dvd1_2

### 添加sudoers

~~~bash
sed -i '/^root.*ALL=(ALL).*ALL/a\going\tALL=(ALL) \tALL' /etc/sudoers
~~~

下面的操作不要在root权限下进行。

### 配置镜像源

由于 Red Hat 提前宣布 CentOS 8 于 2021 年 12 月 31 日停止维护，官方的 Yum 源已不可使用，所以需要切换官方的 Yum 源，这里选择阿里提供的 Yum 源。切换命令如下

~~~bash
mv /etc/yum.repos.d /etc/yum.repos.d.bak # 先备份原有的 Yum 源
mkdir /etc/yum.repos.d
wget -O /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-vault-8.5.2111.repo
yum clean all && yum makecache
~~~

## golang环境

### 下载源码

~~~bash
wget -P /tmp/ https://golang.google.cn/dl/go1.20.7.linux-amd64.tar.gz
~~~

### 解压和安装

~~~bash
mkdir -p $HOME/go
tar -xvzf /tmp/go1.20.7.linux-amd64.tar.gz -C $HOME/go
mv $HOME/go/go $HOME/go/go1.20.7
~~~

### 更新环境变量

编辑 ~/.bashrc文件

~~~bash
export GOVERSION=go1.20.7
export GO_INSTALL_DIR=$HOME/go
export GOROOT=$GO_INSTALL_DIR/$GOVERSION
export GOPATH=$WORKSPACE/golang
export PATH=$GOROOT/bin:$GOPATH/bin:$PATH
export GO111MODULE="on"
export GOPROXY=https://goproxy.cn,direct
export GOSUMDB=off

export LANG="en_US.UTF-8"
export PS1='[\u@dev \W]\$ ' 
export WORKSPACE="$HOME/workspace" 
export PATH=$HOME/bin:$PATH 
cd $WORKSPACE
~~~

更新过后，执行`source ~/.bashrc`更新环境变量

## Git配置

### 下载git

~~~bash
yum install git
~~~

检查版本`git --version` `git version 2.27.0`

### git配置

~~~bash
git config --global user.name "napleon-liu" #用户名
git config --global user.email "798936274@qq.com" #邮箱
git config --global core.longpaths true # 解决 Git 中 'Filename too long' 的错误
~~~

# 项目结构