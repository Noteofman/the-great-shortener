# The Great Shortener
### **An easy to use url shortener**
Built with Vue3, TypeScript, Node, Express, MongoDB, Docker and tested with Jest and Supertest.

## Project dependencies

- Node: Current LTS (14) preferred https://nodejs.org/en/
- Docker: https://docs.docker.com/get-docker/
- Open ports `27018`, `8080`, `3000`

## Disclaimer
Environment files have been commited for the sake of the demo.
Never commit .env files into git.

## How to run

Clone the repo and run `npm run development`.

## What I would have done given more time:
#### As its always fun to think about what could have been.
- Follow a much stricter view -> component paradigm. The approach I normally take with Vue and most component based
frameworks/libraries is push as much of the pure visual logic down to the component level, and leave the views to
function more as controllers/models, feeding in props and data to suit the page/view in question. Optionally I will
sometimes create a 3rd 'container' based layer which acts as the bridge to the data source (Vuex, platform specific api's, etc).
- More comprehensive error handling on the backend. Create an engine to unify error reponses to the client.
- Pull out alot of the NodeJS logic into their own common patterns.
- Create production docker steps and a production deploy pipeline.
- Expand out the server tests.
- Add vue-jest tests
- Add e2e tests if we want to get fancy and have pipeline time to burn.
- Add direct handling of server errors to the client. Client side logic only gets you so far.
- Add loading states to the client.
