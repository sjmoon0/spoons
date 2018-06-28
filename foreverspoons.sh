#! /bin/bash
setsebool -P httpd_can_network_connect 1
forever -o out.log -e err.log --sourceDir /home/centos/spoons app.js
