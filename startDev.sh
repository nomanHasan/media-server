sudo service mongod start
gnome-terminal --tab -e 'npm start --prefix ./media-server-api/' \
                --tab -e 'code ./media-server-api/' \
                --tab -e 'code ./media-server-ui/' \
                --tab -e 'npm start --prefix ./media-server-ui/'