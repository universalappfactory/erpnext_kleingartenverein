# Erpnext Kleingartenverein

Club management for a 'Kleingartenverein'

**License**

AGPLv3

---

## Introduction

This is an erpnext app to manange a german 'Kleingartenverein'. As it's a very german specific thing we stick to that name.

But if you are in another country and have similar requirements just let us know.

And of course, any contributions are welcome.

At the moment this is more or less tailored for one specific club.

---

## Development Setup

All instructions to setup an dev environement are described here

https://github.com/frappe/frappe_docker/blob/main/docs/development.md

TL;DR:

```
git clone https://github.com/frappe/frappe_docker.git
cd frappe_docker
cp -R devcontainer-example .devcontainer
cp -R development/vscode-example development/.vscode

# install vs-code remote containers if you don't have this extension
code --install-extension ms-vscode-remote.remote-containers

#start vs-code
code .

# Launch the command, from Command Palette (Ctrl + Shift + P) Remote-Containers: Reopen in Container

# launch a terminal in vs-code and call bench init
nvm use v16
PYENV_VERSION=3.10.5 bench init --skip-redis-config-generation --frappe-branch version-14 frappe-bench
cd frappe-bench

bench set-config -g db_host mariadb
bench set-config -g redis_cache redis://redis-cache:6379
bench set-config -g redis_queue redis://redis-queue:6379
bench set-config -g redis_socketio redis://redis-socketio:6379

bench new-site mysite.localhost --mariadb-root-password 123 --admin-password admin --no-mariadb-socket
bench --site mysite.localhost set-config developer_mode 1
bench --site mysite.localhost clear-cache

bench get-app payments
bench get-app --branch version-14 --resolve-deps erpnext

bench --site mysite.localhost install-app erpnext
bench --site mysite.localhost install-app erpnext_kleingartenverein

bench use mysite.localhost
bench start
```
Next point your browser to

http://localhost:8000/#login
