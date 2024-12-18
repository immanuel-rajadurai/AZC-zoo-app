# <img src="https://github.com/user-attachments/assets/f2241c49-95c6-4013-987b-dd8d3e3bd41b" alt="image" width="75"/>  AZC-zoo-app

<img src="https://github.com/user-attachments/assets/c93d812d-c349-44d7-b9ae-d2ad5ee363ad" alt="image" width="300"/>


An app that to digitalise and gamify the visitor attraction experience

## How to install all related packages (assuming you have already set up react native and expo)

### 1. Clear your npm cache

`npm cache clean --force`

NOTE: If you are on windows CMD or Powershell you should need to use the windows versions of these commands

 ### 2. Delete package-lock.json
 This removes the file that tracks all your currently stored packages 
 
`rm -rf package-lock.json`

 ### 3. Delete node_modules directory

`rm -rf node_modules`

### 4. Install all packages 

`npm install --legacy-peer-deps`

NOTE: The --legacy-peer-deps flag helps get around conflicting packages

### 5. Run the app 

either `npx expo start -c` or `npm expo start --tunnel`

*the first option is preferred as it runs locally whereas the second option hosts a remote tunnel which can result in slower load times

