# COEN291-Homophone-Bot

## Commands to get started
```
npm install
```
### Discord API
You will need to: 
* create a bot app on discord
* create an api token and add it to your .env

### Open AI ChatGPT
You will need to:
* Make an account
* create an api token and add it to your .env

### Google Cloud CLI
Download the Google Cloud CLI, then run:
```
./google-cloud-sdk/bin/gcloud init
```
It will ask you to sign in with your google account and select the project you're working on.
```
gcloud auth application-default login
```
* There will be no api key for Google Cloud
* Make sure to follow the example .env for the rest of the api keys.

Finally, run:
```npm run dev```
