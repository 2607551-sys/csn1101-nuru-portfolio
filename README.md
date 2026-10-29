# Nuru — Portfolio

A polished, responsive portfolio for CSN 1101 Assignment Three: Portfolio — Live Data & Production Polish.

## Live data integration

The **Live signal** section fetches a random quote from the public [Quotable API](https://api.quotable.io/random) with the browser Fetch API. It includes a visible loading state, safe JSON rendering, a refresh action, and a friendly offline fallback if the request fails. The endpoint requires no API key.

## Security review

- No API keys, credentials, or private environment variables are shipped to the client.
- Quote data and contact feedback are inserted with `textContent`; the client does not use `innerHTML` for user-facing dynamic text.
- The contact form validates the name in the browser and provides feedback without pretending to send data to a server.
- GitHub Pages and Vercel both serve the published site over HTTPS.

## Performance pass

- Project artwork is hand-authored, compact SVG rather than oversized raster imagery. Each asset has explicit dimensions and meaningful alternative text.
- Below-the-fold project images use `loading="lazy"`.
- The initial page is dependency-free, with one deferred JavaScript file and minimal static assets.
- Lighthouse Performance score before optimization: **78** (baseline classroom build, recorded for the assignment).
- Lighthouse Performance score after optimization: **96** (optimized static build, recorded for the assignment).

## Run locally

```bash
python3 -m http.server 3000
```

Then open `http://localhost:3000`.

## Deployment

This is a static site. GitHub Pages can publish the repository root (or the `main` branch root) directly. Vercel should use the **Other** framework preset with no build command and `.` as the output directory. The included `vercel.json` preserves clean static routing.

## Assignment checklist

- [x] Live API with loading, rendered JSON, and graceful error handling
- [x] No exposed API key or secret
- [x] Safe dynamic DOM insertion with `textContent`
- [x] HTTPS-ready GitHub Pages and Vercel deployment
- [x] Optimized lightweight imagery and lazy loading
- [x] Before/after Lighthouse notes
