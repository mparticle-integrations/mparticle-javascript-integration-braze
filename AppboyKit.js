/* eslint-disable no-undef */
//  Copyright 2015 mParticle, Inc.
//
//  Licensed under the Apache License, Version 2.0 (the "License");
//  you may not use this file except in compliance with the License.
//  You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
//  Unless required by applicable law or agreed to in writing, software
//  distributed under the License is distributed on an "AS IS" BASIS,
//  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  See the License for the specific language governing permissions and
//  limitations under the License.

(function (window) {
    var name = 'Appboy',
        MessageType = {
            PageView: 3,
            PageEvent: 4,
            Commerce: 16
        };

    var clusterMapping = {
        '01': 'https://dev.appboy.com/api/v3',
        '02': 'https://sdk-02.iad.appboy.com/api/v3',
        '03': 'https://sdk.iad-03.appboy.com/api/v3',
        EU: 'https://sdk.api.appboy.eu/api/v3'
    };

    var constructor = function () {
        var self = this,
            forwarderSettings,
            options = {},
            reportingService;

        self.name = name;

        var DefaultAttributeMethods = {
            last_name: 'setLastName',
            first_name: 'setFirstName',
            email: 'setEmail',
            gender: 'setGender',
            country: 'setCountry',
            home_city: 'setHomeCity',
            email_subscribe: 'setEmailNotificationSubscriptionType',
            push_subscribe: 'setPushNotificationSubscriptionType',
            phone: 'setPhoneNumber',
            image_url: 'setAvatarImageUrl',
            dob: 'setDateOfBirth'
        };

        function logPurchaseEvent(event) {
            var reportEvent = false;
            if (event.ProductAction.ProductList) {
                event.ProductAction.ProductList.forEach(function (product) {
                    if (product.Attributes == null) {
                        product.Attributes = {};
                    }
                    product.Attributes['Sku'] = product.Sku;
                    var sanitizedProductName = getSanitizedValueForAppboy(String(product.Name));
                    var sanitizedProperties = getSanitizedCustomProperties(product.Attributes);

                    if (sanitizedProperties == null) {
                        return 'Properties did not pass validation for ' + sanitizedProductName;
                    }

                    if (appboy.logPurchase(sanitizedProductName, parseFloat(product.Price), event.CurrencyCode, product.Quantity, sanitizedProperties)) {
                        reportEvent = true;
                    }
                });
            }
            return reportEvent;
        }

        function logAppboyPageViewEvent(event) {
            var sanitizedEventName,
                sanitizedAttrs,
                attrs = event.EventAttributes || {};

            attrs.hostname = window.location.hostname;
            attrs.title = window.document.title;

            sanitizedEventName = getSanitizedValueForAppboy(window.location.pathname);
            sanitizedAttrs = getSanitizedCustomProperties(attrs);
            appboy.logCustomEvent(sanitizedEventName, sanitizedAttrs);
        }

        function setDefaultAttribute(key, value) {
            if (key == 'dob') {
                if (!(value instanceof Date)) {
                    return 'Can\'t call removeUserAttribute or setUserAttribute on forwarder ' + name + ', removeUserAttribute or setUserAttribute must set \'dob\' to a date';
                }
                else {
                    appboy.getUser().setDateOfBirth(value.getFullYear(), value.getMonth() + 1, value.getDate());
                }
            }
            else {
                if (value == null) {
                    value = '';
                }
                if (!(typeof value === 'string')) {
                    return 'Can\'t call removeUserAttribute or setUserAttribute on forwarder ' + name + ', removeUserAttribute or setUserAttribute must set this value to a string';
                }
                var params = [];
                params.push(value);
                var u = appboy.getUser();
                //This method uses the setLastName, setFirstName, setEmail, setCountry, setHomeCity, setPhoneNumber, setAvatarImageUrl, setDateOfBirth, setGender, setEmailNotificationSubscriptionType, and setPushNotificationSubscriptionType methods
                if (!u[DefaultAttributeMethods[key]].apply(u, params)) {
                    return 'removeUserAttribute or setUserAttribute on forwarder ' + name + ' failed to call, an invalid attribute value was passed in';
                }
            }
        }

        function logAppboyEvent(event) {
            var sanitizedEventName = getSanitizedValueForAppboy(event.EventName);
            var sanitizedProperties = getSanitizedCustomProperties(event.EventAttributes);

            if (sanitizedProperties == null) {
                return 'Properties did not pass validation for ' + sanitizedEventName;
            }

            var reportEvent = appboy.logCustomEvent(sanitizedEventName, sanitizedProperties);
            if (reportEvent && reportingService) {
                reportingService(self, event);
            }
        }

        /**************************/
        /** Begin mParticle API **/
        /**************************/
        function processEvent(event) {
            var reportEvent = false;

            if (event.EventDataType == MessageType.Commerce && event.EventCategory == mParticle.CommerceEventType.ProductPurchase) {
                reportEvent = logPurchaseEvent(event);
                if (reportEvent && reportingService) {
                    reportingService(self, event);
                }
                return;
            }
            if (event.EventDataType == MessageType.Commerce) {
                var listOfPageEvents = mParticle.eCommerce.expandCommerceEvent(event);
                if (listOfPageEvents != null) {
                    for (var i = 0; i < listOfPageEvents.length; i++) {
                        try {
                            logAppboyEvent(listOfPageEvents[i]);
                        }
                        catch (err) {
                            return 'Error logging page event' + err.message;
                        }
                    }
                }
            } else if (event.EventDataType == MessageType.PageEvent) {
                logAppboyEvent(event);
            } else if (event.EventDataType == MessageType.PageView) {
                if (forwarderSettings.forwardScreenViews == 'True') {
                    logAppboyPageViewEvent(event);
                }
            }
            else
            {
                return 'Can\'t send event type to forwarder ' + name + ', event type is not supported';
            }
        }

        function removeUserAttribute(key) {
            if (!(key in DefaultAttributeMethods)) {
                var sanitizedKey = getSanitizedValueForAppboy(key);
                appboy.getUser().setCustomUserAttribute(sanitizedKey, null);
            }
            else {
                return setDefaultAttribute(key, null);
            }
        }

        function setUserAttribute(key, value) {
            if (!(key in DefaultAttributeMethods)) {
                var sanitizedKey = getSanitizedValueForAppboy(key);
                var sanitizedValue = getSanitizedValueForAppboy(value);
                if (value != null && sanitizedValue == null) {
                    return 'Value did not pass validation for ' + key;
                }
                appboy.getUser().setCustomUserAttribute(sanitizedKey, sanitizedValue);
            }
            else {
                return setDefaultAttribute(key, value);
            }
        }

        function setUserIdentity(id, type) {
            if (type == window.mParticle.IdentityType.CustomerId) {
                appboy.changeUser(id);
            }
            else if (type == window.mParticle.IdentityType.Email) {
                appboy.getUser().setEmail(id);
            }
            else {
                return 'Can\'t call setUserIdentity on forwarder ' + name + ', identity type not supported.';
            }
        }

        function initForwarder(settings, service, testMode, trackerId, userAttributes, userIdentities, appVersion, appName) {  // eslint-disable-line no-unused-vars
            try {
                forwarderSettings = settings;
                reportingService = service;
                isTesting = testMode;
                // 30 min is Appboy default
                options.sessionTimeoutInSeconds = forwarderSettings.ABKSessionTimeoutKey || 1800;
                options.sdkFlavor = 'mparticle';
                options.enableHtmlInAppMessages = forwarderSettings.enableHtmlInAppMessages == 'True';

                var cluster = forwarderSettings.cluster || forwarderSettings.dataCenterLocation;

                if (clusterMapping.hasOwnProperty(cluster)) {
                    options.baseUrl = clusterMapping[cluster];
                } else {
                    var customUrl = decodeClusterSetting(cluster);
                    if (customUrl) {
                        options.baseUrl = customUrl;
                    }
                }

                if (testMode !== true) {
                    /* eslint-disable */
                    +function() {
                        +function(a, p, P, b, y) {
                            appboy = {};
                            appboyQueue = [];
                            for (var s = "initialize destroy getDeviceId toggleAppboyLogging setLogger openSession changeUser requestImmediateDataFlush requestFeedRefresh subscribeToFeedUpdates logCardImpressions logCardClick logFeedDisplayed requestInAppMessageRefresh logInAppMessageImpression logInAppMessageClick logInAppMessageButtonClick logInAppMessageHtmlClick subscribeToNewInAppMessages removeSubscription removeAllSubscriptions logCustomEvent logPurchase isPushSupported isPushBlocked isPushGranted isPushPermissionGranted registerAppboyPushMessages unregisterAppboyPushMessages submitFeedback trackLocation stopWebTracking resumeWebTracking ab ab.User ab.User.Genders ab.User.NotificationSubscriptionTypes ab.User.prototype.getUserId ab.User.prototype.setFirstName ab.User.prototype.setLastName ab.User.prototype.setEmail ab.User.prototype.setGender ab.User.prototype.setDateOfBirth ab.User.prototype.setCountry ab.User.prototype.setHomeCity ab.User.prototype.setLanguage ab.User.prototype.setEmailNotificationSubscriptionType ab.User.prototype.setPushNotificationSubscriptionType ab.User.prototype.setPhoneNumber ab.User.prototype.setAvatarImageUrl ab.User.prototype.setLastKnownLocation ab.User.prototype.setUserAttribute ab.User.prototype.setCustomUserAttribute ab.User.prototype.addToCustomAttributeArray ab.User.prototype.removeFromCustomAttributeArray ab.User.prototype.incrementCustomUserAttribute ab.User.prototype.addAlias ab.InAppMessage ab.InAppMessage.SlideFrom ab.InAppMessage.ClickAction ab.InAppMessage.DismissType ab.InAppMessage.OpenTarget ab.InAppMessage.ImageStyle ab.InAppMessage.TextAlignment ab.InAppMessage.Orientation ab.InAppMessage.CropType ab.InAppMessage.prototype.subscribeToClickedEvent ab.InAppMessage.prototype.subscribeToDismissedEvent ab.InAppMessage.prototype.removeSubscription ab.InAppMessage.prototype.removeAllSubscriptions ab.InAppMessage.Button ab.InAppMessage.Button.prototype.subscribeToClickedEvent ab.InAppMessage.Button.prototype.removeSubscription ab.InAppMessage.Button.prototype.removeAllSubscriptions ab.SlideUpMessage ab.ModalMessage ab.FullScreenMessage ab.HtmlMessage ab.ControlMessage ab.Feed ab.Feed.prototype.getUnreadCardCount ab.Card ab.ClassicCard ab.CaptionedImage ab.Banner ab.WindowUtils display display.automaticallyShowNewInAppMessages display.showInAppMessage display.showFeed display.destroyFeed display.toggleFeed sharedLib".split(" "), i = 0; i < s.length; i++) {
                                for (var m = s[i], k = appboy, l = m.split("."), j = 0; j < l.length - 1; j++) k = k[l[j]];
                                k[l[j]] = (new Function("return function " + m.replace(/\./g, "_") + "(){appboyQueue.push(arguments)}"))()
                            }
                            appboy.getUser = function() {
                                return new appboy.ab.User
                            };
                            appboy.getCachedFeed = function() {
                                return new appboy.ab.Feed
                            };

                            (y = p.createElement(P)).type = 'text/javascript';
                            y.src = 'https://js.appboycdn.com/web-sdk/2.0/appboy.min.js';

                            y.async = 1;
                            (b = p.getElementsByTagName(P)[0]).parentNode.insertBefore(y, b)
                        }(window, document, 'script');

                        appboy.initialize(forwarderSettings.apiKey, options);

                        if (forwarderSettings.register_inapp == 'True') {
                            appboy.display.automaticallyShowNewInAppMessages();
                        }

                        appboy.openSession();
                        appboy.requestInAppMessageRefresh();
                    }();
                    /* eslint-enable */
                }
                else {
                    if (!(appboy.initialize(forwarderSettings.apiKey, options))) {
                        return 'Failed to initialize: ' + name;
                    }
                    if (forwarderSettings.register_inapp == 'True') {
                        appboy.display.automaticallyShowNewInAppMessages();
                    }

                    appboy.openSession();
                    appboy.requestInAppMessageRefresh();
                }
                return 'Successfully initialized: ' + name;
            }
            catch (e) {
                return 'Failed to initialize: ' + name + ' with error: ' + e.message;
            }
        }
        /**************************/
        /** End mParticle API **/
        /**************************/

        function decodeClusterSetting(clusterSetting) {
            if (clusterSetting) {
                var decodedSetting = clusterSetting.replace(/&amp;/g, '&');
                decodedSetting = clusterSetting.replace(/&quot;/g, '"');
                try {
                    var clusterSettingObject = JSON.parse(decodedSetting);
                    if (clusterSettingObject && clusterSettingObject.JS) {
                        return 'https://' + clusterSettingObject.JS + '/api/v3';
                    }
                } catch (e) {
                    console.log('Unable to configure custom Appboy cluster: ' + e.toString());
                }
            }
        }

        function getSanitizedStringForAppboy(value) {
            if (typeof(value) === 'string') {
                if (value.substr(0, 1) === '$') {
                    return value.replace(/^\$+/g, '');
                } else {
                    return value;
                }
            }
            return null;
        }

        function getSanitizedValueForAppboy(value) {
            if (typeof(value) === 'string') {
                return getSanitizedStringForAppboy(value);
            }

            if (Array.isArray(value)) {
                var sanitizedArray = [];
                for (var i in value) {
                    var element = value[i];
                    var sanitizedElement = getSanitizedStringForAppboy(element);
                    if (sanitizedElement == null) {
                        return null;
                    }
                    sanitizedArray.push(sanitizedElement);
                }
                return sanitizedArray;
            }
            return value;
        }

        function getSanitizedCustomProperties(customProperties) {
            var sanitizedProperties = {}, value, sanitizedPropertyName, sanitizedValue;

            if (customProperties == null) {
                customProperties = {};
            }

            if (typeof(customProperties) !== 'object') {
                return null;
            }

            for (var propertyName in customProperties) {
                value = customProperties[propertyName];
                sanitizedPropertyName = getSanitizedValueForAppboy(propertyName);
                sanitizedValue = typeof(value) === 'string' ? getSanitizedValueForAppboy(value) : value;
                sanitizedProperties[sanitizedPropertyName] = sanitizedValue;
            }
            return sanitizedProperties;
        }

        this.init = initForwarder;
        this.process = processEvent;
        this.setUserIdentity = setUserIdentity;
        this.setUserAttribute = setUserAttribute;
        this.removeUserAttribute = removeUserAttribute;
        this.decodeClusterSetting = decodeClusterSetting;
    };

    if (!window || !window.mParticle || !window.mParticle.addForwarder) {
        return;
    }

    window.mParticle.addForwarder({
        name: name,
        constructor: constructor
    });

})(window);
