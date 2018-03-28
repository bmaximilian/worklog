# Worklog project

Connector to *cockpit.webteam-leipzig.net*

# Requirements
* docker
* a valid private key at the path `~/.ssh/id_rsa` to ssh to github or gitlab

# Installation

1. Copy `127.0.0.1 worklog.test www.worklog.test worklog-api.test www.worklog-api.test` to your `/etc/hosts`.
2. Rn `setup/00-setup.sh`
3. Run `docker-compose -p svc up --build`
4. Open **worklog.test** in your browser
