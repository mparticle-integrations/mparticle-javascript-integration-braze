![Braze Logo](https://github.com/mparticle-integrations/mparticle-javascript-integration-appboy/blob/master/braze-logo.png)

⚠️⚠️⚠️
# Notice! Timeline for Breaking Changes for mParticle Web Braze Kit- 3/28/2022 - 6/8/2022
This repository renames and replaces our [mParticle Appboy Web Kit](https://github.com/mparticle-integrations/mparticle-javascript-integration-appboy), which will be archived in the future.

Braze has breaking changes between version 2.5.2 and 3.5.0 of their SDK.  As a result, we too are updating our [mParticle Braze web kit](https://github.com/mparticle-integrations/mparticle-javascript-integration-appboy) to support Braze’s Web SDK version 3.5.0.  The updated mParticle Braze Web kit will be available via CDN on June 8, 2022 and is currently available on NPM as [@mparticle/web-braze-kit](https://www.npmjs.com/package/@mparticle/web-braze-kit) v3.0.0.

**How do you know if your code is affected?**

You may notice errors on your site if you load mParticle [via snippet](https://docs.mparticle.com/developers/sdk/web/getting-started/#add-the-sdk-snippet) (as most of our clients do), and you reference any deprecated Braze APIs starting 6/8/2022.

We highly recommend that you review the changes between version 2 and 3 of the Braze Web SDK to understand these changes, which can be found [here](https://www.braze.com/docs/developer_guide/platform_integration_guides/web/changelog/#300).  To summarize:
* The `appboy.ab` namespace has been removed and everything lives under the `appboy` namespace now.
* `InAppMessage.Button` has been renamed to `InAppMessageButton`

If you reference any of the above deprecations, you will have to makes changes to your codebase before June 8, 2022 to be compatible with both version 2 and version 3 of the Braze SDK to ensure your code continues to work. We recommend a 3 step approach. Here are some code samples of what this code could look like today (step 1), preparing for the update (step 2) and after the change is live (step 3). 

The below recommendations apply only to customers who load mParticle [via snippet](https://docs.mparticle.com/developers/sdk/web/getting-started/#add-the-sdk-snippet).  Customers who [self host via NPM](https://docs.mparticle.com/developers/sdk/web/self-hosting/) can ignore step 1 and jump straight to step 3 after updating their mParticle Braze kit to v3.0.0.

Step 1: Legacy code sample. If your code references the `ab` namespace (like below) or `InAppMessage.Button`, you should change it following Step 2’s example:
```javascript
let banner = new appboy.ab.Banner(‘test’);
```

Step 2: Rollout code sample to be used before June 8, 2022:
```javascript
let banner;
if (appboy.hasOwnProperty(‘ab’)) {
    banner = new appboy.ab.Banner(‘test’);
} else {
    banner = new appboy.Banner(‘test’);
}
```
Step 3: After June 8, 2022, you can simplify your code to the following once the mParticle Braze Web kit has been released to our CDN:
```javascript
let banner = new appboy.Banner(‘test’);
```

**Push Notifications via service-worker.js**

Additionally, if you are using Push Notifications, we have updated the “service-worker.js” file.  In our testing, Braze’s push notifications work as expected regardless of what version of the service-worker is used, but we recommend updating this to ensure future compatibility.  In your `service-worker.js` file, update the code to reference `https://static.mparticle.com/sdk/js/braze/service-worker-3.5.0.js` instead of `https://static.mparticle.com/sdk/js/braze/service-worker.js`, ie:

```javascript
self.importScripts('https://static.mparticle.com/sdk/js/braze/service-worker-3.5.0.js');
```

# License

Copyright 2022 mParticle, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
