
# 未配置流水线之前本地打包发布脚本, 已废弃

npm install --registry=https://registry.npm.taobao.org
npm run build
# 同步文件
rsync -avz --delete dist/*  root@106.52.242.121:/home/fn1/home
