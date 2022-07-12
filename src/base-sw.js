import { clientsClaim } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration";
import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";

// Allows to publish a new service worker & have it control already-open
// webpages as soon as it activates
clientsClaim();

/* 
  -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
                    Handling Imported Fonts
  -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
*/
const fontRegex = /.*(?:googleapis|gstatic|fontawesome)\.com.*$/;
const fontRegex2 = /.*cdnjs.cloudflare.com.*$/;
registerRoute(
  ({ url }) => url.origin.match(fontRegex) || url.origin.match(fontRegex2),
  new StaleWhileRevalidate({
    cacheName: "fonts",
    plugins: [
      new ExpirationPlugin({ maxAgeSeconds: 60 * 60 * 24 * 30 }), // Refreshes cache once a month
    ],
  })
);

/* 
  -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
                    Handling Page Assets
  -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
*/
// const LOCAL_MEDIA_TYPES = [".png", ".css"];
// registerRoute(
//   ({ url }) =>
//     url.origin === self.location.origin &&
//     LOCAL_MEDIA_TYPES.some((ext) => url.pathname.endsWith(ext)),
//   new StaleWhileRevalidate({
//     cacheName: "local",
//     plugins: [
//       new ExpirationPlugin({ maxAgeSeconds: 60 * 60 * 24 * 30 }), // Refreshes cache once a month
//     ],
//   })
// );

// Ignore Urchin Tracking Module & Facebook's analytics tracking links
precacheAndRoute(self.__WB_MANIFEST, {
  ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
});
