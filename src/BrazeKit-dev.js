/* eslint-disable no-undef */
window.braze = require('@braze/web-sdk');
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

// This should remain Appboy and not Braze until the core SDK is able to parse the moduleID and not the name (go.mparticle.com/work/SQDSDKS-4655)
var name = 'Appboy',
    suffix = 'v4',
    moduleId = 28,
    version = '4.1.4',
    MessageType = {
        PageView: 3,
        PageEvent: 4,
        Commerce: 16,
    },
    CommerceEventType = mParticle.CommerceEventType;

var clusterMapping = {
    '01': 'sdk.iad-01.braze.com',
    '02': 'sdk.iad-02.braze.com',
    '03': 'sdk.iad-03.braze.com',
    '04': 'sdk.iad-04.braze.com',
    '05': 'sdk.iad-05.braze.com',
    '06': 'sdk.iad-06.braze.com',
    '08': 'sdk.iad-08.braze.com',
    EU: 'sdk.fra-01.braze.eu',
    EU02: 'sdk.fra-02.braze.eu',
};

var constructor = function () {
    var self = this,
        forwarderSettings,
        options = {},
        reportingService,
        mpCustomFlags;

    self.name = name;
    self.suffix = suffix;

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
        dob: 'setDateOfBirth',
    };

    var bundleCommerceEventData = false;
    var forwardSkuAsProductName = false;

    // A purchase event can either log a single event with all products
    // or multiple purchase events (one per product)
    function logPurchaseEvent(event) {
        var reportEvent = false;

        if (bundleCommerceEventData) {
            reportEvent = logSinglePurchaseEventWithProducts(event);
        } else {
            reportEvent = logPurchaseEventPerProduct(event);
        }
        return reportEvent === true;
    }

    function logSinglePurchaseEventWithProducts(event) {
        var quantity = 1;
        var eventAttributes = mergeObjects(event.EventAttributes, {
            products: [],
        });
        var eventName = getCommerceEventName(event.EventCategory);

        // All commerce events except for promotion/impression events will have a
        // ProductAction property, but if this ever changes in the future, this
        // check will prevent errors
        if (!event.ProductAction) {
            return false;
        }

        if (event.ProductAction.TransactionId) {
            eventAttributes['Transaction Id'] =
                event.ProductAction.TransactionId;
        }

        if (
            event.ProductAction.ProductList &&
            event.ProductAction.ProductList.length
        ) {
            eventAttributes.products = addProducts(
                event.ProductAction.ProductList
            );
        }

        kitLogger(
            'braze.logPurchase',
            eventName,
            event.ProductAction.TotalAmount,
            event.CurrencyCode,
            quantity,
            eventAttributes
        );

        reportEvent = braze.logPurchase(
            eventName,
            event.ProductAction.TotalAmount,
            event.CurrencyCode,
            quantity,
            eventAttributes
        );
    }

    function logPurchaseEventPerProduct(event) {
        if (event.ProductAction.ProductList) {
            event.ProductAction.ProductList.forEach(function(product) {
                var productName;

                if (forwardSkuAsProductName) {
                    productName = product.Sku;
                } else {
                    productName = product.Name;
                }
                var sanitizedProductName = getSanitizedValueForBraze(
                    productName
                );

                if (product.Attributes == null) {
                    product.Attributes = {};
                }

                product.Attributes['Sku'] = product.Sku;

                var productAttributes = mergeObjects(product.Attributes, {
                    'Transaction Id': event.ProductAction.TransactionId,
                });

                var sanitizedProperties = getSanitizedCustomProperties(
                    productAttributes
                );

                if (sanitizedProperties == null) {
                    return (
                        'Properties did not pass validation for ' +
                        sanitizedProductName
                    );
                }
                var price = parseFloat(product.Price);

                kitLogger(
                    'braze.logPurchase',
                    sanitizedProductName,
                    price,
                    event.CurrencyCode,
                    product.Quantity,
                    sanitizedProperties
                );

                reportEvent = braze.logPurchase(
                    sanitizedProductName,
                    price,
                    event.CurrencyCode,
                    product.Quantity,
                    sanitizedProperties
                );
            });
        }
        return reportEvent === true;
    }

    function getCommerceEventName(eventType) {
        const eventNamePrefix = 'eCommerce';
        let eventName;

        switch (eventType) {
            case CommerceEventType.ProductAddToCart:
                eventName = 'add_to_cart';
                break;
            case CommerceEventType.ProductRemoveFromCart:
                eventName = 'remove_from_cart';
                break;
            case CommerceEventType.ProductCheckout:
                eventName = 'checkout';
                break;
            case CommerceEventType.ProductCheckoutOption:
                eventName = 'checkout_option';
                break;
            case CommerceEventType.ProductClick:
                eventName = 'click';
                break;
            case CommerceEventType.ProductViewDetail:
                eventName = 'view_detail';
                break;
            case CommerceEventType.ProductPurchase:
                eventName = 'purchase';
                break;
            case CommerceEventType.ProductRefund:
                eventName = 'refund';
                break;
            case CommerceEventType.ProductAddToWishlist:
                eventName = 'add_to_wishlist';
                break;
            case CommerceEventType.ProductRemoveFromWishlist:
                eventName = 'remove_from_wishlist';
                break;
            case CommerceEventType.PromotionView:
                eventName = 'view';
                break;
            case CommerceEventType.PromotionClick:
                eventName = 'click';
                break;
            case CommerceEventType.ProductImpression:
                eventName = 'Impression';
                break;
            default:
                eventName = 'unknown';
                break;
        }
        return [eventNamePrefix, eventName].join(' - ');
    }

    function logBrazePageViewEvent(event) {
        var sanitizedEventName,
            sanitizedAttrs,
            eventName,
            attrs = event.EventAttributes || {};

        attrs.hostname = window.location.hostname;
        attrs.title = window.document.title;

        if (forwarderSettings.setEventNameForPageView === 'True') {
            eventName = event.EventName;
        } else {
            eventName = window.location.pathname;
        }
        sanitizedEventName = getSanitizedValueForBraze(eventName);
        sanitizedAttrs = getSanitizedCustomProperties(attrs);

        kitLogger('braze.logCustomEvent', sanitizedEventName, sanitizedAttrs);

        var reportEvent = braze.logCustomEvent(
            sanitizedEventName,
            sanitizedAttrs
        );
        return reportEvent === true;
    }

    function setDefaultAttribute(key, value) {
        if (key === 'dob') {
            if (!(value instanceof Date)) {
                return (
                    "Can't call removeUserAttribute or setUserAttribute on forwarder " +
                    name +
                    ", removeUserAttribute or setUserAttribute must set 'dob' to a date"
                );
            } else {
                kitLogger(
                    'braze.getUser().setDateOfBirth',
                    value.getFullYear(),
                    value.getMonth() + 1,
                    value.getDate()
                );

                braze
                    .getUser()
                    .setDateOfBirth(
                        value.getFullYear(),
                        value.getMonth() + 1,
                        value.getDate()
                    );
            }
        } else if (key === '$Age') {
            if (typeof value === 'number') {
                var year = new Date().getFullYear() - value;

                kitLogger('braze.getUser().setDateOfBirth', year, 1, 1);

                braze.getUser().setDateOfBirth(year, 1, 1);
            } else {
                return '$Age must be a number';
            }
        } else {
            if (value == null) {
                value = '';
            }
            if (!(typeof value === 'string')) {
                return (
                    "Can't call removeUserAttribute or setUserAttribute on forwarder " +
                    name +
                    ', removeUserAttribute or setUserAttribute must set this value to a string'
                );
            }
            var params = [];
            params.push(value);

            kitLogger(
                'braze.getUser().' + DefaultAttributeMethods[key],
                params
            );

            var u = braze.getUser();

            //This method uses the setLastName, setFirstName, setEmail, setCountry, setHomeCity, setPhoneNumber, setAvatarImageUrl, setDateOfBirth, setGender, setEmailNotificationSubscriptionType, and setPushNotificationSubscriptionType methods
            if (!u[DefaultAttributeMethods[key]].apply(u, params)) {
                return (
                    'removeUserAttribute or setUserAttribute on forwarder ' +
                    name +
                    ' failed to call, an invalid attribute value was passed in'
                );
            }
        }
    }

    function logBrazeEvent(event) {
        var sanitizedEventName = getSanitizedValueForBraze(event.EventName);
        var sanitizedProperties = getSanitizedCustomProperties(
            event.EventAttributes
        );

        if (sanitizedProperties == null) {
            return (
                'Properties did not pass validation for ' + sanitizedEventName
            );
        }

        kitLogger(
            'braze.logCustomEvent',
            sanitizedEventName,
            sanitizedProperties
        );

        var reportEvent = braze.logCustomEvent(
            sanitizedEventName,
            sanitizedProperties
        );

        return reportEvent === true;
    }

    /**************************/
    /** Begin mParticle API **/
    /**************************/
    function processEvent(event) {
        var reportEvent = false;

        if (event.EventDataType == MessageType.Commerce) {
            reportEvent = logCommerceEvent(event);
        } else if (event.EventDataType == MessageType.PageEvent) {
            reportEvent = logBrazeEvent(event);
        } else if (event.EventDataType == MessageType.PageView) {
            if (forwarderSettings.forwardScreenViews == 'True') {
                reportEvent = logBrazePageViewEvent(event);
            }
        } else {
            return (
                "Can't send event type to forwarder " +
                name +
                ', event type is not supported'
            );
        }

        if (reportEvent === true && reportingService) {
            reportingService(self, event);
        }
    }

    // mParticle commerce events use different Braze methods depending on if they are
    // a purchase event or a non-purchase commerce event
    function logCommerceEvent(event) {
        if (event.EventCategory === CommerceEventType.ProductPurchase) {
            reportEvent = logPurchaseEvent(event);
            return reportEvent === true;
        } else {
            reportEvent = logNonPurchaseCommerceEvent(event);
            return reportEvent === true;
        }
    }

    // A non-purchase commerce event can either log a single event with all products
    // or one event per product when the commerce event is expanded
    function logNonPurchaseCommerceEvent(event) {
        if (bundleCommerceEventData) {
            return logNonPurchaseCommerceEventWithProducts(event);
        } else {
            return logExpandedNonPurchaseCommerceEvents(event);
        }
    }

    function logNonPurchaseCommerceEventWithProducts(mpEvent) {
        const commerceEventAttrs = {};
        const eventName = getCommerceEventName(mpEvent.EventCategory);

        try {
            switch (mpEvent.EventCategory) {
                case CommerceEventType.PromotionClick:
                case CommerceEventType.PromotionView:
                    commerceEventAttrs.promotions = addPromotions(
                        mpEvent.PromotionAction
                    );
                    break;
                case CommerceEventType.ProductImpression:
                    commerceEventAttrs.impressions = addImpressions(
                        mpEvent.ProductImpressions
                    );
                    break;
                default:
                    if (mpEvent.ProductAction.ProductList) {
                        commerceEventAttrs.products = addProducts(
                            mpEvent.ProductAction.ProductList
                        );
                    }
                    var transactionId = mpEvent.ProductAction.TransactionId;
                    var totalAmount = mpEvent.ProductAction.TotalAmount;
                    var taxAmount = mpEvent.ProductAction.TaxAmount;
                    var shippingAmount = mpEvent.ProductAction.ShippingAmount;
                    var affiliation = mpEvent.ProductAction.Affiliation;

                    if (transactionId) {
                        commerceEventAttrs['Transaction Id'] = transactionId;
                    }
                    if (totalAmount) {
                        commerceEventAttrs['Total Amount'] = totalAmount;
                    }
                    if (taxAmount) {
                        commerceEventAttrs['Tax Amount'] = taxAmount;
                    }
                    if (shippingAmount) {
                        commerceEventAttrs['Shipping Amount'] = shippingAmount;
                    }
                    if (affiliation) {
                        commerceEventAttrs['Affiliation'] = affiliation;
                    }
            }

            var sanitizedProperties = getSanitizedCustomProperties(
                mpEvent.EventAttributes
            );

            const brazeEvent = {
                EventName: eventName,
                EventAttributes: mergeObjects(
                    commerceEventAttrs,
                    sanitizedProperties
                ),
            };

            reportEvent = logBrazeEvent(brazeEvent);
            return reportEvent;
        } catch (err) {
            return 'Error logging commerce event' + err.message;
        }
    }

    function addPromotions(promotionAction) {
        if (promotionAction && promotionAction.PromotionList) {
            return promotionAction.PromotionList;
        }
        return [];
    }

    function addImpressions(productImpressions) {
        if (productImpressions.length) {
            return productImpressions.map(function(impression) {
                return {
                    'Product Impression List': impression.ProductImpressionList,
                    products: addProducts(impression.ProductList),
                };
            });
        } else {
            return [];
        }
    }

    function addProducts(productList) {
        const productArray = [];
        if (!productList || productList.length === 0) {
            return productArray;
        }

        productList.forEach(function(product) {
            {
                var sanitizedProduct = parseProduct(
                    getSanitizedCustomProperties(product)
                );
                productArray.push(sanitizedProduct);
            }
        });

        return productArray;
    }

    function parseProduct(_product) {
        var product = {};
        for (var key in _product) {
            switch (key) {
                case 'Sku':
                    product.Id = _product[key];
                    break;
                case 'Name':
                    product.Name = forwardSkuAsProductName
                        ? _product.Sku
                        : _product.Name;
                    break;
                case 'CouponCode':
                    product['Coupon Code'] = _product[key];
                    break;
                case 'TotalAmount':
                    product['Total Product Amount'] = _product[key];
                    break;
                default:
                    product[key] = _product[key];
            }
        }

        return product;
    }

    function logExpandedNonPurchaseCommerceEvents(event) {
        var listOfPageEvents = mParticle.eCommerce.expandCommerceEvent(event);
        if (listOfPageEvents !== null) {
            for (var i = 0; i < listOfPageEvents.length; i++) {
                // finalLoopResult keeps track of if any logBrazeEvent in this loop returns true or not
                var finalLoopResult = false;
                try {
                    reportEvent = logBrazeEvent(listOfPageEvents[i]);
                    if (reportEvent === true) {
                        finalLoopResult = true;
                    }
                } catch (err) {
                    return 'Error logging page event' + err.message;
                }
            }
            reportEvent = finalLoopResult === true;
        }
        return reportEvent;
    }

    function removeUserAttribute(key) {
        if (!(key in DefaultAttributeMethods)) {
            var sanitizedKey = getSanitizedValueForBraze(key);

            kitLogger(
                'braze.getUser().setCustomUserAttribute',
                sanitizedKey,
                null
            );

            braze.getUser().setCustomUserAttribute(sanitizedKey, null);
        } else {
            return setDefaultAttribute(key, null);
        }
    }

    function setUserAttribute(key, value) {
        if (!(key in DefaultAttributeMethods)) {
            var sanitizedKey = getSanitizedValueForBraze(key);
            var sanitizedValue = getSanitizedValueForBraze(value);
            if (value != null && sanitizedValue == null) {
                return 'Value did not pass validation for ' + key;
            }

            kitLogger(
                'braze.getUser().setCustomUserAttribute',
                sanitizedKey,
                sanitizedValue
            );

            braze
                .getUser()
                .setCustomUserAttribute(sanitizedKey, sanitizedValue);
        } else {
            return setDefaultAttribute(key, value);
        }
    }

    function setUserIdentity(id, type) {
        // Only use this method when mParicle core SDK is version 1
        // Other versions use onUserIdentified, which is called after setUserIdentity from core SDK
        if (window.mParticle.getVersion().split('.')[0] === '1') {
            if (type == window.mParticle.IdentityType.CustomerId) {
                kitLogger('braze.changeUser', id);

                braze.changeUser(id);
            } else if (type == window.mParticle.IdentityType.Email) {
                kitLogger('braze.getUser().setEmail', id);

                braze.getUser().setEmail(id);
            } else {
                return (
                    "Can't call setUserIdentity on forwarder " +
                    name +
                    ', identity type not supported.'
                );
            }
        }
    }

    // onUserIdentified is not used in version 1 so there is no need to check for version number
    function onUserIdentified(user) {
        kitLogger('calling MpBrazeKit.onUserIdentified');

        try {
            var brazeUserIDType,
                userIdentities = user.getUserIdentities().userIdentities;

            if (forwarderSettings.userIdentificationType === 'MPID') {
                brazeUserIDType = user.getMPID();
            } else {
                brazeUserIDType =
                    userIdentities[
                        forwarderSettings.userIdentificationType.toLowerCase()
                    ];
            }

            if (brazeUserIDType) {
                kitLogger('braze.changeUser', brazeUserIDType);

                braze.changeUser(brazeUserIDType);
            }

            if (userIdentities.email) {
                kitLogger('braze.getUser().setEmail', userIdentities.email);

                braze.getUser().setEmail(userIdentities.email);
            }
        } catch (e) {
            kitLogger(
                'Error in calling MpBrazeKit.onUserIdentified',
                e.message
            );
        }
    }

    function primeBrazeWebPush() {
        // The following code block is based on Braze's best practice for implementing
        // their push primer.  We only modify it to include pushPrimer and register_inapp settings.
        // https://www.braze.com/docs/developer_guide/platform_integration_guides/web/push_notifications/integration/#soft-push-prompts
        braze.subscribeToInAppMessage(function (inAppMessage) {
            var shouldDisplay = true;
            var pushPrimer = false;
            if (inAppMessage instanceof braze.InAppMessage) {
                // Read the key-value pair for msg-id
                var msgId = inAppMessage.extras['msg-id'];

                // If this is our push primer message
                if (msgId == 'push-primer') {
                    pushPrimer = true;
                    // We don't want to display the soft push prompt to users on browsers that don't support push, or if the user
                    // has already granted/blocked permission
                    if (
                        !braze.isPushSupported() ||
                        braze.isPushPermissionGranted() ||
                        braze.isPushBlocked()
                    ) {
                        shouldDisplay = false;
                    }
                    if (inAppMessage.buttons[0] != null) {
                        // Prompt the user when the first button is clicked
                        inAppMessage.buttons[0].subscribeToClickedEvent(
                            function() {
                                braze.requestPushPermission();
                            }
                        );
                    }
                }
            }

            // Display the message if it's a push primer message and shouldDisplay is true
            if (
                (pushPrimer && shouldDisplay) ||
                (!pushPrimer && forwarderSettings.register_inapp === 'True')
            ) {
                braze.showInAppMessage(inAppMessage);
            }
        });
    }

    function openSession(forwarderSettings) {
        braze.openSession();
        if (forwarderSettings.softPushCustomEventName) {
            kitLogger(
                'braze.logCustomEvent',
                forwarderSettings.softPushCustomEventName
            );

            braze.logCustomEvent(forwarderSettings.softPushCustomEventName);
        }
    }

    function initForwarder(
        settings,
        service,
        testMode,
        trackerId,
        userAttributes,
        userIdentities,
        appVersion,
        appName,
        customFlags
    ) {
        // check to see if there is a logger for backwards compatibility, and if not, mock one to avoid errors
        if (!self.logger) {
            // create a logger
            self.logger = {
                verbose: function() {},
            };
        }
        // eslint-disable-line no-unused-vars
        mpCustomFlags = customFlags;
        try {
            forwarderSettings = settings;
            bundleCommerceEventData =
                forwarderSettings.bundleCommerceEventData === 'True';
            forwardSkuAsProductName =
                forwarderSettings.forwardSkuAsProductName === 'True';
            reportingService = service;
            // 30 min is Braze default
            options.sessionTimeoutInSeconds =
                forwarderSettings.ABKSessionTimeoutKey || 1800;
            options.sdkFlavor = 'mparticle';
            options.enableHtmlInAppMessages =
                forwarderSettings.enableHtmlInAppMessages == 'True';
            options.doNotLoadFontAwesome =
                forwarderSettings.doNotLoadFontAwesome == 'True';

            if (forwarderSettings.safariWebsitePushId) {
                options.safariWebsitePushId =
                    forwarderSettings.safariWebsitePushId;
            }

            if (forwarderSettings.serviceWorkerLocation) {
                options.serviceWorkerLocation =
                    forwarderSettings.serviceWorkerLocation;
            }

            var cluster =
                forwarderSettings.cluster ||
                forwarderSettings.dataCenterLocation;

            if (clusterMapping.hasOwnProperty(cluster)) {
                options.baseUrl = clusterMapping[cluster];
            } else {
                var customUrl = decodeClusterSetting(cluster);
                if (customUrl) {
                    options.baseUrl = customUrl;
                }
            }

            if (mpCustomFlags && mpCustomFlags[moduleId.toString()]) {
                var brazeFlags = mpCustomFlags[moduleId.toString()];
                if (typeof brazeFlags.initOptions === 'function') {
                    brazeFlags.initOptions(options);
                }
            }

            if (testMode !== true) {
                braze.initialize(forwarderSettings.apiKey, options);
                finishBrazeInitialization(forwarderSettings);
            } else {
                if (!braze.initialize(forwarderSettings.apiKey, options)) {
                    return 'Failed to initialize: ' + name;
                }
                finishBrazeInitialization(forwarderSettings);
            }
            return 'Successfully initialized: ' + name;
        } catch (e) {
            return (
                'Failed to initialize: ' + name + ' with error: ' + e.message
            );
        }
    }

    function finishBrazeInitialization(forwarderSettings) {
        braze.addSdkMetadata(['mp']);
        primeBrazeWebPush();

        const currentUser = mParticle.Identity != null ? mParticle.Identity.getCurrentUser() : null;
        const mpid = currentUser.getMPID();
        
        if (currentUser && mpid) {
            onUserIdentified(currentUser);
        }

        openSession(forwarderSettings);
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
                console.log(
                    'Unable to configure custom Braze cluster: ' + e.toString()
                );
            }
        }
    }

    function getSanitizedStringForBraze(value) {
        if (typeof value === 'string') {
            if (value.substr(0, 1) === '$') {
                return value.replace(/^\$+/g, '');
            } else {
                return value;
            }
        }
        return null;
    }

    function getSanitizedValueForBraze(value) {
        if (typeof value === 'string') {
            return getSanitizedStringForBraze(value);
        }

        if (Array.isArray(value)) {
            var sanitizedArray = [];
            for (var i in value) {
                var element = value[i];
                var sanitizedElement = getSanitizedStringForBraze(element);
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
        var sanitizedProperties = {},
            value,
            sanitizedPropertyName,
            sanitizedValue;

        if (customProperties == null) {
            customProperties = {};
        }

        if (typeof customProperties !== 'object') {
            return null;
        }

        for (var propertyName in customProperties) {
            value = customProperties[propertyName];
            sanitizedPropertyName = getSanitizedValueForBraze(propertyName);
            sanitizedValue =
                typeof value === 'string'
                    ? getSanitizedValueForBraze(value)
                    : value;
            sanitizedProperties[sanitizedPropertyName] = sanitizedValue;
        }
        return sanitizedProperties;
    }

    this.init = initForwarder;
    this.process = processEvent;
    this.setUserIdentity = setUserIdentity;
    this.setUserAttribute = setUserAttribute;
    this.onUserIdentified = onUserIdentified;
    this.removeUserAttribute = removeUserAttribute;
    this.decodeClusterSetting = decodeClusterSetting;

    /* An example output of this logger if we pass in a purchase event for 1 iPhone
     with a SKU of iphoneSku that cost $999 with a product attribute of 
     color: blue would be:
     mParticle - Braze Web Kit log:
     braze.logPurchase:
     iphone,
     999,
     USD,
     1,
     {\"color\":\"blue\",\"Sku":"iphoneSKU"},\n`;
     */
    function kitLogger(method) {
        var msg = 'mParticle - Braze Web Kit log:';

        var nonMethodArguments = Array.prototype.slice.call(arguments, 1);
        msg += '\n' + method + ':\n';

        nonMethodArguments.forEach(function(arg) {
            if (isObject(arg) || Array.isArray(arg)) {
                msg += JSON.stringify(arg);
            } else {
                msg += arg;
            }
            msg += ',\n';
        });

        self.logger.verbose(msg);
    }
};

function getId() {
    return moduleId;
}

function register(config) {
    var forwarderNameWithSuffix = [name, suffix].join('-');
    if (!config) {
        window.console.log(
            'You must pass a config object to register the kit ' +
                forwarderNameWithSuffix
        );
        return;
    }

    if (!isObject(config)) {
        window.console.log(
            "'config' must be an object. You passed in a " + typeof config
        );
        return;
    }

    if (isObject(config.kits)) {
        config.kits[forwarderNameWithSuffix] = {
            constructor: constructor,
        };
    } else {
        config.kits = {};
        config.kits[forwarderNameWithSuffix] = {
            constructor: constructor,
        };
    }
    window.console.log(
        'Successfully registered ' +
            forwarderNameWithSuffix +
            ' to your mParticle configuration'
    );
}

if (window && window.mParticle && window.mParticle.addForwarder) {
    window.mParticle.addForwarder({
        name: name,
        constructor: constructor,
        getId: getId,
        // A suffix is added if there are multiple different versions of
        // a client kit.  This matches the suffix in the DB.
        suffix: suffix,
    });
}

function mergeObjects() {
    var resObj = {};
    for (var i = 0; i < arguments.length; i += 1) {
        var obj = arguments[i],
            keys = Object.keys(obj);
        for (var j = 0; j < keys.length; j += 1) {
            resObj[keys[j]] = obj[keys[j]];
        }
    }
    return resObj;
}

function isObject(val) {
    return (
        val != null && typeof val === 'object' && Array.isArray(val) === false
    );
}

module.exports = {
    register: register,
    getVersion: function () {
        return version;
    },
};
