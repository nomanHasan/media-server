sudo service mongod start
gnome-terminal --tab -e 'npm start --prefix ./explorer-server/' \
                --tab -e 'code ./explorer-server/' \
                --tab -e 'code ./explorer-client-angular/' \
                --tab -e 'npm start --prefix ./explorer-client-angular/'