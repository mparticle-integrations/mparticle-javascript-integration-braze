//
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
    var name = 'AppboyForwarder',
      MessageType = {
          PageEvent: 4,
          Commerce: 16
      };

    var constructor = function () {
        var self = this,
            forwarderSettings,
            reportingService,
            isInitialized = false,
            isTesting = false;

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
                    product.Attributes['Sku'] = product.Sku;
                    if (appboy.logPurchase(String(product.Name), parseFloat(product.Price), event.CurrencyCode, product.Quantity, product.Attributes)) {
                        reportEvent = true;
                    }
                });
            }
            return reportEvent;
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
                    value = "";
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

        /**************************/
        /** Begin mParticle API **/
        /**************************/
        function processEvent(event) {
            var reportEvent = false;

            if (isInitialized) {

                if (event.EventDataType == MessageType.PageEvent) {
                    reportEvent = appboy.logCustomEvent(event.EventName, event.EventAttributes);
                }

                /** There is no current mapping for the ProductAddToCart, ProductAddToWishlist, ProductCheckout, ProductCheckoutOption, ProductClick,
                 * ProductImpression, ProductRefund, ProductRemoveFromCart, ProductRemoveFromWishlist, ProductViewDetail, PromotionClick, or PromotionView
                 * commerce event types.
                 **/
                else if (event.EventDataType == MessageType.Commerce && event.EventCategory == mParticle.CommerceEventType.ProductPurchase) {
                    reportEvent = logPurchaseEvent(event);
                }
                else {
                    return 'Can\'t send event type to forwarder ' + name + ', event type is not supported';
                }
                if (reportEvent && reportingService) {
                    reportingService(self, event);
                }
            }
            else {
                return 'Can\'t send to forwarder ' + name + ', not initialized';
            }
        }

        function removeUserAttribute(key) {
            if (isInitialized) {
                if (!(key in DefaultAttributeMethods)) {
                    appboy.getUser().setCustomUserAttribute(key, null);
                }
                else {
                    return setDefaultAttribute(key, null);
                }
            }
            else {
                return 'Can\'t call removeUserAttribute on forwarder ' + name + ', not initialized';
            }
        }

        function setUserAttribute(key, value) {
            if (isInitialized) {
                if (!(key in DefaultAttributeMethods)) {
                    appboy.getUser().setCustomUserAttribute(key, value);
                }
                else {
                    return setDefaultAttribute(key, value);
                }
            }
            else {
                return 'Can\'t call setUserAttribute on forwarder ' + name + ', not initialized';
            }
        }

        function setUserIdentity(id, type) {
            if (isInitialized) {
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
            else {
                return 'Can\'t call setUserIdentity on forwarder ' + name + ', not initialized';
            }
        }

        function initForwarder(settings, service, testMode, trackerId, userAttributes, userIdentities, appVersion, appName) {
            try {
                forwarderSettings = settings;
                reportingService = service;
                isTesting = testMode;

                if (testMode !== true) {
                    +function() {
                        var head = document.getElementsByTagName('head')[0],
                          link = document.createElement('link');
                        link.href = 'https://js.appboycdn.com/web-sdk/1.4/appboy.min.css';
                        link.rel = 'stylesheet';
                        link.type = 'text/css';

                        var loadjs = +function(a,p,P,b,y){
                            appboy={};for(var s="destroy toggleAppboyLogging setLogger openSession changeUser requestImmediateDataFlush requestFeedRefresh subscribeToFeedUpdates logCardImpressions logCardClick logFeedDisplayed requestInAppMessageRefresh logInAppMessageImpression logInAppMessageClick logInAppMessageButtonClick subscribeToNewInAppMessages removeSubscription removeAllSubscriptions logCustomEvent logPurchase isPushSupported isPushBlocked registerAppboyPushMessages unregisterAppboyPushMessages submitFeedback ab ab.User ab.User.Genders ab.User.NotificationSubscriptionTypes ab.User.prototype.getUserId ab.User.prototype.setFirstName ab.User.prototype.setLastName ab.User.prototype.setEmail ab.User.prototype.setGender ab.User.prototype.setDateOfBirth ab.User.prototype.setCountry ab.User.prototype.setHomeCity ab.User.prototype.setEmailNotificationSubscriptionType ab.User.prototype.setPushNotificationSubscriptionType ab.User.prototype.setPhoneNumber ab.User.prototype.setAvatarImageUrl ab.User.prototype.setLastKnownLocation ab.User.prototype.setUserAttribute ab.User.prototype.setCustomUserAttribute ab.User.prototype.addToCustomAttributeArray ab.User.prototype.removeFromCustomAttributeArray ab.User.prototype.incrementCustomUserAttribute ab.InAppMessage ab.InAppMessage.SlideFrom ab.InAppMessage.ClickAction ab.InAppMessage.DismissType ab.InAppMessage.OpenTarget ab.InAppMessage.prototype.subscribeToClickedEvent ab.InAppMessage.prototype.subscribeToDismissedEvent ab.InAppMessage.prototype.removeSubscription ab.InAppMessage.prototype.removeAllSubscriptions ab.InAppMessage.Button ab.InAppMessage.Button.prototype.subscribeToClickedEvent ab.InAppMessage.Button.prototype.removeSubscription ab.InAppMessage.Button.prototype.removeAllSubscriptions ab.SlideUpMessage ab.ModalMessage ab.FullScreenMessage ab.ControlMessage ab.Feed ab.Feed.prototype.getUnreadCardCount ab.Card ab.ClassicCard ab.CaptionedImage ab.Banner display display.automaticallyShowNewInAppMessages display.showInAppMessage display.showFeed display.destroyFeed display.toggleFeed sharedLib".split(" "),i=0;i<s.length;i++){for(var k=appboy,l=s[i].split("."),j=0;j<l.length-1;j++)k=k[l[j]];k[l[j]]=function(){}}appboy.initialize=function(){console&&console.log("Appboy cannot be loaded - this is usually due to strict corporate firewalls or ad blockers.")};appboy.getUser=function(){return new appboy.ab.User};appboy.getCachedFeed=function(){return new appboy.ab.Feed};
                            (y = a.createElement(p)).type = 'text/javascript';
                            y.src = 'https://js.appboycdn.com/web-sdk/1.4/appboy.min.js';
                            (c = a.getElementsByTagName(p)[0]).parentNode.insertBefore(y, c);
                            if (y.addEventListener) {
                              y.addEventListener("load", b, false);
                            } else if (y.readyState) {
                              y.onreadystatechange = b;
                            }
                        }(document, 'script', 'link', function () {
                            if (!(appboy.initialize(forwarderSettings.apiKey))) {
                                return 'Failed to initialize: ' + name;
                            }
                            appboy.display.automaticallyShowNewInAppMessages();
                            appboy.openSession();
                            appboy.requestInAppMessageRefresh();
                        });

                        if (link.addEventListener) {
                            link.addEventListener('load', loadjs, false);
                        }
                        else if (link.readyState){
                            link.onreadystatechange = loadjs
                        }
                        head.appendChild(link);
                    }();

                    isInitialized = true;
                }
                else {
                    if (!(appboy.initialize(forwarderSettings.apiKey))) {
                        return 'Failed to initialize: ' + name;
                    }
                    appboy.display.automaticallyShowNewInAppMessages();
                    appboy.openSession();
                    appboy.requestInAppMessageRefresh();

                    isInitialized = true;
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

        this.init = initForwarder;
        this.process = processEvent;
        this.setUserIdentity = setUserIdentity;
        this.setUserAttribute = setUserAttribute;
        this.removeUserAttribute = removeUserAttribute;
    };

    if (!window || !window.mParticle || !window.mParticle.addForwarder) {
        return;
    }

    window.mParticle.addForwarder({
        name: name,
        constructor: constructor
    });

})(window);
