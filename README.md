# Studio

This is a monorepo containing Studio source code, design system, and all their dependencies.

### Installing

Clone this repo and run:

```
pnpm install
```

> **Note:** PNPM v8+ and Node.js v18.17+ is required.

## Development

#### Run Studio locally

```
pnpm run studio
```

#### Run the Design System locally

```
pnpm run ds
```

#### Run Studio and the Design System locally at the same time

```
pnpm run dev
```

#### Build Studio for production

```
pnpm run build:studio
```

#### Build the Design System for production

```
pnpm run build:ds
```

#### Build Studio and the Design System for production

```
pnpm run build
```

## Architecture decision records

### Create a new architecture decision record

- Copy `doc/adr/0000-template.md` to a new file (e.g `doc/adr/0001-record-architecture-decisions.md`)
- Open a new PR and discuss the decision with the community
- The PR must have `kind/adr` label
- The PR Title must starts with `chore: [ADR-nnnn] name of ADR` where `nnnn` is the adr number (e.g `chore: [ADR-0001] use architecture decision records`) same us commits.

### List existing architecture decision records

See [docs/adr](docs/adr)

This PR addresses the issue mentioned in [#224](https://github.com/asyncapi/studio/issues/224). I have added the following features in this PR.

- The studio version I am testing on is hosted here: [https://studio-studio-next.vercel.app](https://studio-studio-next.vercel.app). (I will switch this to Netlify deployment once we are able to resolve [#1118](https://github.com/asyncapi/studio/issues/1118))
- The Image Generator service in charge of creating the dynamic image is hosted here: [https://ogp-studio.netlify.app](https://ogp-studio.netlify.app)
- The code for the image Generator service can be found here: https://github.com/helios2003/ogp-studio

## Features Added

- [x] Add a middleware that captures Open Graph crawler requests when they hit the website and rewrites the URL to the route `api/crawler`. This is done to serve minimal HTML when the crawler hits the page, reducing the chance of timeout.
- [x] Parse the URL and send it to the Image Generator service to add the dynamic image.
- [x] Show the default `og:image` if there is an invalid base64 string provided.
- [x] Fall back on the usual behavior added in [#1106](https://github.com/asyncapi/studio/pull/1106) if there isn't a base64 string.

## Todos

- [ ] Perform more testing to identify system failure points.
- [ ] Address unusual behavior observed:
  - For example: if I go to [https://studio-studio-next.vercel.app](https://studio-studio-next.vercel.app) and use MQTT template, then the default behavior is observed instead of dynamic tags.
  - Also, if I visit [https://studio-studio-next.vercel.app](https://studio-studio-next.vercel.app) and use IBM MQ template, all the details come as undefined in the `og:image`. I will try to make subsequent modifications to the code to get rid of these errors.
- [ ] Figuring out why sometimes the dynamic `og:image` does not appear on site like Whatsapp.
- [ ] Add additonal crawlers to the list.