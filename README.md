# Ứng dụng internet banking, phân hệ nhân viên
## Cách cài đặt và khởi chạy
### Môi trường local (development)
1. npm install
2. npm run dev
### Môi trường production (Heroku)
1. npm install
2. npm run build
3. serve -s build
### Môi trường production (Jenkins)
1. npm install pm2 -g
2. npm install
3. BUILD_ID=Internet_Banking_Administrator pm2 restart internet_banking_administrator || BUILD_ID=Internet_Banking_Administrator pm2 start 'npm run jenkins' --name internet_banking_administrator
## URL
### Môi trường production (Heroku): https://internet-banking-administrator.herokuapp.com
### Môi trường production (Jenkins): http://34.92.149.125:3003