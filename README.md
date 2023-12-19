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
