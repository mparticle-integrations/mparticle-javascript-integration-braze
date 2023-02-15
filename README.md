![Braze Logo](https://github.com/mparticle-integrations/mparticle-javascript-integration-appboy/blob/master/braze-logo.png)

⚠️⚠️⚠️
# 2/14/2023 Notice! Opt in for Breaking Changes to mParticle Web Braze Kit coming soon
mParticle's Braze Kit currently uses Braze's V3 web SDK, and Braze has made significant changes to their newest V4 web SDK.  Previously, mParticle planned to release an update on 2/15/2023 for all of our CDN users which upgraded to the Brave V4 web SDK.  Now, rather than migrate all CDN users to V4 at the same time, you must opt in to get the latest update.  This will allow you to decide when you want to upgrade to V4 and make the appropriate code changes. Opting in to V4 will be done via a connection setting in the mParticle UI that will be available shortly.

For now, no code changes are needed, but if you implemented the code examples outlined in our docs and earlier communications, you can continue to use the V3 code until you opt in to V4 manually.  More details on that are coming soon.

If you self-host mParticle and the Braze Web Kit via npm, you can update sooner. Follow the instructions below for if you self-host or if you are on CDN and getting ready to opt in.

* <b>Note that if you are here looking at source code, the `master` branch will continue to contain Braze Web Kit version 3.X until the opt in option is available.  The `braze-v4-npm-master` branch currently contains the source code for v4.X.</b>
* If you are using version 2 of the @mparticle/web-appboy-kit, you will need to <a href="#transition-from-mparticleweb-appboy-kit-to-mparticleweb-braze-kit">transition to @mparticle/web-braze-kit per the instructions here</a> before following the below instructions as well.

## Braze Web Kit Citical Updates and Timelines

Braze occasionally makes breaking changes to their SDK, so if you call Braze directly in your code, you will have to update your code to ensure your website performs as expected when updating versions of Braze.

Please review [Braze’s Changelog notes](https://www.braze.com/docs/developer_guide/platform_integration_guides/web/changelog#400) as well as Braze’s [migration guide](https://github.com/braze-inc/braze-web-sdk/blob/master/UPGRADE_GUIDE.md) between version 3 and 4 to understand these changes and what code updates are needed from your side.  The largest change is the move from class name `appboy` to `braze`. Braze also removed and renamed some APIs.  As a result, we are also updating our mParticle Braze web kit from 3.0.X to 4.0.X in order to support Braze’s Web SDK version 4.2.1.

Customers will be able to opt in to using the latest version of Braze's Web SDK both via npm and via snippet/CDN
* Customers who self-host mParticle via npm - You can use @mparticle/web-braze-kit version 4.0.0 in your package.json now! This has been available since 10/15/2022.
* Customers who load mParticle via snippet/CDN - Opting in will be available soon via the mParticle UI in your Braze connection settings.

Note that the following is only one example.  Everywhere you manually call `appboy` needs to be updated similar to the below.

* Step 1: Legacy code sample. Find all the places where your code references the `appboy.display` namespace.  Braze has removed all instances of the `display` namespace:
```javascript
window.appboy.display.destroyFeed();
```

Step 2: Roll out code changes to be used before you opt in to using Version 4 of the Braze Web SDK so that it works under both versions:
```javascript
	if (window.appboy) {
		window.appboy.display.destroyFeed();
	} else if (window.braze) {
		window.braze.destroyFeed();
	}
```
Step 3: After opting in to Version 4 of the Braze Web SDK, you can simplify your code:
```javascript
window.braze.destroyFeed();
```

Step 4: Push Notifications via service-worker.js
If you use Push Notifications, we have updated the `service-worker.js` file.  In our testing, Braze’s push notifications work as expected regardless of what version of the service-worker is used, but we recommend updating this file to ensure future compatibility.  In your `service-worker.js` file, update the code to reference `https://static.mparticle.com/sdk/js/braze/service-worker-4.2.0.js` instead of `https://static.mparticle.com/sdk/js/braze/service-worker-3.5.0.js`.  Your `service-worker.js` file should now contain:

```javascript
self.imports('https://static.mparticle.com/sdk/js/braze/service-worker-4.2.0.js')
```

### Transition from @mparticle/web-appboy-kit to @mparticle/web-braze-kit

The legacy @mparticle/web-appboy-kit from npm includes version 2 of the Braze Web SDK.  As part of this update, we've created a new [Braze web kit repo](https://github.com/mparticle-integrations/mparticle-javascript-integration-braze) to replace our deprecated [Appboy web kit repo](https://github.com/mparticle-integrations/mparticle-javascript-integration-appboy).  If you are still using `@mparticle/web-appboy-kit`, you will need to consider the breaking changes Braze made between V2 and V3 of the Braze SDK (found [here](https://www.braze.com/docs/developer_guide/platform_integration_guides/web/changelog/#300)) as well as the instructions above to get from V2 to V4 of the Braze SDK.



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