# NovaWave

### Init and Project Structure

1. Three package.json folders (one in root, one in backend folder, one in frontend folder)

<br>

1. In Root package.json:
* post-install script that installs both backend and frontend dependencies (for local use)

<br>

2. In the Backend Folder package.json:
* npm install express
* npm install nodemon
* npm install --save-dev @types/node
* npm install --save-dev @types/express

<br>

3. In the Frontend Folder:
* create-react-app . --typescript

<br>

4. in frontend package json:
* npm install --save-dev @types/node
* npm install --save-dev @types/jest
* npm install --save-dev @types/react
* npm install --save-dev @types/react-dom

<br>

5. tsconfig.json file in both backend and frontend folders. dist output for each so JS files will have respective dependencies available


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
mongosh --host <INSERT_IP_HERE> --port 27017
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
