/* eslint-disable no-undef */
window.appboy = require('appboy-web-sdk');
var isobject = require('isobject');
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

    var name = 'Appboy',
        moduleId = 28,
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
            $LastName: 'setLastName',
            $FirstName: 'setFirstName',
            Email: 'setEmail',
            $Gender: 'setGender',
            $Country: 'setCountry',
            $City: 'setHomeCity',
            $Mobile: 'setPhoneNumber',
            $Age: 'setDateOfBirth',
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

                    reportEvent = appboy.logPurchase(sanitizedProductName, parseFloat(product.Price), event.CurrencyCode, product.Quantity, sanitizedProperties);
                });
            }
            return reportEvent === true;
        }

        function logAppboyPageViewEvent(event) {
            var sanitizedEventName,
                sanitizedAttrs,
                attrs = event.EventAttributes || {};

            attrs.hostname = window.location.hostname;
            attrs.title = window.document.title;

            sanitizedEventName = getSanitizedValueForAppboy(window.location.pathname);
            sanitizedAttrs = getSanitizedCustomProperties(attrs);
            var reportEvent = appboy.logCustomEvent(sanitizedEventName, sanitizedAttrs);
            return reportEvent === true;
        }

        function setDefaultAttribute(key, value) {
            if (key === 'dob') {
                if (!(value instanceof Date)) {
                    return 'Can\'t call removeUserAttribute or setUserAttribute on forwarder ' + name + ', removeUserAttribute or setUserAttribute must set \'dob\' to a date';
                }
                else {
                    appboy.getUser().setDateOfBirth(value.getFullYear(), value.getMonth() + 1, value.getDate());
                }
            } else if (key === '$Age') {
                if (typeof value === 'number') {
                    var year = (new Date).getFullYear() - value;
                    appboy.getUser().setDateOfBirth(year, 1, 1);
                } else {
                    return '$Age must be a number';
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
            return reportEvent === true;
        }

        /**************************/
        /** Begin mParticle API **/
        /**************************/
        function processEvent(event) {
            var reportEvent = false;

            if (event.EventDataType == MessageType.Commerce && event.EventCategory == mParticle.CommerceEventType.ProductPurchase) {
                reportEvent = logPurchaseEvent(event);
            } else if (event.EventDataType == MessageType.Commerce) {
                var listOfPageEvents = mParticle.eCommerce.expandCommerceEvent(event);
                if (listOfPageEvents != null) {
                    for (var i = 0; i < listOfPageEvents.length; i++) {
                        // finalLoopResult keeps track of if any logAppBoyEvent in this loop returns true or not
                        var finalLoopResult = false;
                        try {
                            reportEvent = logAppboyEvent(listOfPageEvents[i]);
                            if (reportEvent === true) {
                                finalLoopResult = true;
                            }
                        }
                        catch (err) {
                            return 'Error logging page event' + err.message;
                        }
                    }
                    reportEvent = finalLoopResult === true;
                }
            } else if (event.EventDataType == MessageType.PageEvent) {
                reportEvent = logAppboyEvent(event);
            } else if (event.EventDataType == MessageType.PageView) {
                if (forwarderSettings.forwardScreenViews == 'True') {
                    reportEvent = logAppboyPageViewEvent(event);
                }
            }
            else {
                return 'Can\'t send event type to forwarder ' + name + ', event type is not supported';
            }

            if (reportEvent === true && reportingService) {
                reportingService(self, event);
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

        function primeAppBoyWebPush() {
            appboy.subscribeToNewInAppMessages(function(inAppMessages) {
                var message = inAppMessages[0];
                var pushPrimer = false;
                if (message != null) {
                    shouldDisplay = true;

                    if (message instanceof appboy.ab.InAppMessage) {
                        // Read the key-value pair for msg-id
                        var msgId = message.extras['msg-id'];

                        // If this is our push primer message
                        if (msgId == 'push-primer') {
                            pushPrimer = true;
                            // We don't want to display the soft push prompt to users on browsers that don't support push, or if the user
                            // has already granted/blocked permission
                            if (!appboy.isPushSupported() || appboy.isPushPermissionGranted() || appboy.isPushBlocked()) {
                                shouldDisplay = false;
                            }
                            if (message.buttons[0] != null) {
                                // Prompt the user when the first button is clicked
                                message.buttons[0].subscribeToClickedEvent(function() {
                                    appboy.registerAppboyPushMessages();
                                });
                            }
                        }
                    }

                    // Display the message if it's a push primer message and shouldDisplay is true
                    if ((pushPrimer && shouldDisplay) || (!pushPrimer && forwarderSettings.register_inapp === 'True')) {
                        appboy.display.showInAppMessage(message);
                    }
                }

                // Remove this message from the array of IAMs and return whatever's left
                return inAppMessages.slice(1);
            });
        }

        function openSession(forwarderSettings) {
            appboy.openSession(function() {
                if (forwarderSettings.softPushCustomEventName) {
                    appboy.logCustomEvent(forwarderSettings.softPushCustomEventName);
                }
            });
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
                options.doNotLoadFontAwesome = forwarderSettings.doNotLoadFontAwesome == 'True';

                if (forwarderSettings.safariWebsitePushId) {
                    options.safariWebsitePushId = forwarderSettings.safariWebsitePushId;
                }

                if (forwarderSettings.serviceWorkerLocation) {
                    options.serviceWorkerLocation = forwarderSettings.serviceWorkerLocation;
                }

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
                    appboy.initialize(forwarderSettings.apiKey, options);

                    primeAppBoyWebPush();
                    openSession(forwarderSettings);

                    /* eslint-enable */
                }
                else {
                    if (!(appboy.initialize(forwarderSettings.apiKey, options))) {
                        return 'Failed to initialize: ' + name;
                    }

                    primeAppBoyWebPush();
                    openSession(forwarderSettings);
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

    function getId() {
        return moduleId;
    }

    function register(config) {
        if (!config) {
            window.console.log('You must pass a config object to register the kit ' + name);
            return;
        }

        if (!isobject(config)) {
            window.console.log('\'config\' must be an object. You passed in a ' + typeof config);
            return;
        }

        if (isobject(config.kits)) {
            config.kits[name] = {
                constructor: constructor
            };
        } else {
            config.kits = {};
            config.kits[name] = {
                constructor: constructor
            };
        }
        window.console.log('Successfully registered ' + name + ' to your mParticle configuration');
    }

    if (window && window.mParticle && window.mParticle.addForwarder) {
        window.mParticle.addForwarder({
            name: name,
            constructor: constructor,
            getId: getId
        });
    }

    module.exports = {
        register: register
    };
