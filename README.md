# Love Wallet Api

## Requirement analysis

- [ ] create a account
  - [ ] store user data
  - [ ] send confirmation email
- [ ] make a coop wallet
  - [ ] send invite in email
  - [ ] 1 user 1 wallet
- [ ] wallet management
  - [ ] add bill
  - [ ] show sumary

## Probably routes

- [ ] User - `/user`
  - [ x ] create user `POST /user`
  - [ x ] show user `GET /user/{id}`
  - [ x ] edit user `PUT /user/{id}`
  - [ x ] delete user `DELETE /user/{id}`
  - [ ] group users `PUT /user/group/{id}`
- [ ] Login `Post /login`
- [ ] Logout `Post /logout`
- [ ] balance `/balance`
  - [ ] add balance `POST /balance/add`
  - [ ] remove balance `DELETE /balance/{id}`
  - [ ] edit balance `PUT /balance/{id}`
  - [ ] list 1 balance `GET /balance/{id}`
  - [ ] list balance day `GET /balance/`
  - [ ] list balance weekly `GET /balance/weekly`
  - [ ] list balance monthly `GET /balance/monthly`
  - [ ] ~list all balances~
