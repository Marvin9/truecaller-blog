.PHONY:server
server:
	cd server && yarn start

.PHONY:client
client:
	cd client && yarn dev

.PHONY:run-both
run:
	make client& make server