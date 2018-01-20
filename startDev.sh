current_dir=$PWD
cd explorer_client
gnome-terminal -e ./startDev.sh
cd "$current_dir"
code .
npm run start
