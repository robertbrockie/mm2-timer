![Mega Man 2 Timer](https://mm2.robertbrockie.com/images/logo.png)

## About
In my free time I like to try and finish Mega Man 2 as fast as possible. This is a simple app that allows me to keep track of my runs. You can check it out live [here](https://mm2.robertbrockie.com).

## Running Locally

Clone the repo, install dependencies, and start the development server:

```bash
npm install
npm start
```

## Production Build & Apache Deployment

1. Run the build command locally:
   ```bash
   npm run build
   ```
2. Commit and push the generated `public/` directory along with your changes.
3. On the Apache server, point the site `DocumentRoot` (or VirtualHost) to the `public/` folder. Pull the repo with `git pull` — no Node.js or npm runtime required on the server.
