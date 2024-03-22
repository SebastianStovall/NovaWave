# NovaWave

### Local Replication

* if facing compile issues, run 'tsc' in backend and/or frontend folder

1. from root ---> npm i (installs dependencies for backend and frontend)
2. cd backend ---> npm start
3. cd frontend ---> npm start


## Dev Notes


### Render Build Command

1. npm install ---> runs 'postinstall' script which installs dependencies in both backend and frontend package.json

2. npm run render-postbuild ---> generates the react build folder to serve react app to production ( the path to serve assets to this folder can be found in app.ts... this pathing only relevant for production, since thats the only time its served with the build folder. use NODE_ENV)

3. npm run build ---> runs the 'db-reset' script in the backend package json, which sets up database seeding

### Render Start Command

4. npm start ---> runs the  'start-production' script in backend package.json which spins up the express server

<br>

1. In the Backend Folder package.json:
* npm install express
* npm install nodemon
* npm install --save-dev @types/node
* npm install --save-dev @types/express

<br>

2. In the Frontend Folder:
* create-react-app . --typescript

<br>

3. in frontend package json:
* npm install --save-dev @types/node
* npm install --save-dev @types/jest
* npm install --save-dev @types/react
* npm install --save-dev @types/react-dom

<br>

5. tsconfig.json file in both backend and frontend folders. dist output for backend only


## MONGODB LOCAL SETUP FOR LINUX

* sudo apt update   (ensure ubuntu system packages up to date)
* sudo apt upgrade  (ensure ubuntu system packages up to date)

<br />

1. install some required packages if they are not already
```bash
sudo apt-get install gnupg curl
```

<br />

2. add the pgp key... required to verify authenticity of the mongodb packages neeeded for install
```bash
curl -fsSl https://pgp.mongodb.com/server-6.0.asc | \sudo gpg -o /etc/apt/trusted.gpg.d//mongodb-server-6.0.gpg \--dearmor
```

<br />

3. add the mongodb repository
```bash
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
```

<br />

4. update the system again
```bash
sudo apt update
```

<br />

5. install mongodb
```bash
sudo apt install mongodb-org
```

<br />

6. start Mongodb manually (leave this open, open another terminal and perform next command. To exit ---> ctrl + c)
```bash
sudo /usr/bin/mongod --dbpath /var/lib/mongodb
```

<br />

7. check mongodb status and connect (To exit ---> ctrl + d)
```bash
mongosh --host 127.0.0.1 --port 27017
```

<br />

8. check version installed
```bash
mongod --version
```


### Install MongoDB Compass GUI for Ubuntu Linux Subsytem for Windows

1. [Install compass here](https://www.mongodb.com/try/download/atlascli) Choose Ubuntu 64 bit version

2. Drag to home root folder of Ubuntu system

3. install the package
```bash
sudo dpkg -i mongodb-compass_*.deb
```

4. run this command if any dependencies are missing
```bash
sudo apt-get install -f
```

5. to run compass, use this command
```bash
mongodb-compass
```

### S3 Bucket CORS Caching Issue (not setting Access-Control-Allow-Orgin Response Header)

* Chrome has a bug where it wont set the appropriate CORS response header info on S3 bucket images when fetching to bucket. If you dont have direct access to the fetch, you need to set 'Cache-Control: 'no-cache' as a Metadata field option on each S3 object. If you do have access to the fetch, you can specify the origin and 'Cache-Control' directly
