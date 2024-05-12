# Image Optimizer

![app](https://media.dev.to/cdn-cgi/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fh0ulqw17f35epzvvwjvd.png)

## What is this?

This is submission to https://dev.to/devteam/join-us-for-the-netlify-dynamic-site-challenge-3000-in-prizes-3mfn

It uses Netlify's CDN and blob store to optimize images on the fly.

More info here: https://dev.to/pavelee/minify-your-images-and-save-the-planet-4bnc

## Developing Locally

1. Clone this repository, then run `npm install` in its root directory.

2. For the starter to have full functionality locally (e.g. edge functions, blob store), please ensure you have an up-to-date version of Netlify CLI. Run:

```
npm install netlify-cli@latest -g
```

3. Link your local repository to the deployed Netlify site. This will ensure you're using the same runtime version for both local development and your deployed site.

```
netlify link
```

4. Then, run the Next.js development server via Netlify CLI:

```
netlify dev
```

If your browser doesn't navigate to the site automatically, visit [localhost:8888](http://localhost:8888).

### Running locally on MacOs

You need to install curl on your local machine to run the netlify dev command. You can install curl using the following command:

```
brew install curl
```
