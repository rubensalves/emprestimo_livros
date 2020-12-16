appname="emprestimo_livros"
host="localhost"

echo $1 $2

run() {
	echo "docker run \
		$env \
		$cond \
		--name=$appname \
		-p 8000:8000 \
		-d \
		--restart=unless-stopped $appname"
}

if [ $1 == "local" ]
  then
  	cond="--net='host'"

	if [ $2 == "deploy" ]
	  then
		docker build -t $appname .
		docker stop $appname
		docker rm $appname
		eval $(run)
	fi

	if [ $2 == "stop" ]
	  then
		docker stop $appname
	fi

	if [ $2 == "logs" ]
	  then
		docker logs -f $appname
	fi
fi