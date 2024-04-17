# AI resume optimizer

This project is for all the job searchers who spend time on chatgpt optimizing their resume quickly and then spending time trying to figure out what exactly ai changed in their resume from initial resume. This project is an attempt to make this process simple by mixing chatGPT's generative AI with software engineering.

## Technology used
- **Frontend:** ReactJS 18.2
- **Backend:** Flask (Python 3.9.4)
- **API:** openAI APIs (gpt-3.5-turbo)
- **Containariztion:** Docker

## How to use

### Prequisites
You need to have OPENAI API key by creating account on openai. 

### Setting up env variables
Then in backend directory create a .env file and using reference from .env.example set variable name OPENAI_API_KEY.

Also, in the frontend directory you need .env file which you need to populate based on .env.example.

### How to run app
- You can run the app using docker being in current directory and using below command.
```shell 
$ docker-compose up -d 
```
- You can access the app using http://localhost:3007

To run the frontend and backend individually, instructions are given in Readme.md section of the frontend and backend directories.
