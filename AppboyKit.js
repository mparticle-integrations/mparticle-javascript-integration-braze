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
    var name = 'AppboyKit',
        MessageType = {
                SessionStart: 1,
                SessionEnd: 2,
                PageView: 3,
                PageEvent: 4,
                CrashReport: 5,
                OptOut: 6,
                Commerce: 16
            };

    var constructor = function () {
        var self = this,
            forwarderSettings,
            reportingService,
            isInitialized = false,
            isTesting = false;

        self.name = name;

        function processEvent(event) {
            var reportEvent = false,
                watchedEventBuilder,
                productQuantity = 0;

            if (isInitialized) {
                if (event.EventDataType == MessageType.PageEvent) {
                 
                }
                else if(event.EventDataType == MessageType.Commerce) {
                   
                }

                if(reportEvent && reportingService) {
                    reportingService(self, event);
                }
            }
            else {
                return 'Can\'t send to forwarder ' + name + ', not initialized';
            }
        }

        function removeUserAttribute(key) {
            var attr = {};

            if(isInitialized) {
                attr[key] = null;
                //remove appboy attribute
            }
            else {
                return 'Can\'t call removeUserAttributes on forwarder ' + name + ', not initialized';
            }
        }

        function setUserAttributes(attrs) {
            if(isInitialized) {
                //set appboy attribute
            }
            else {
                return 'Can\'t call setUserAttributes on forwarder ' + name + ', not initialized';
            }
        }

        function setUserAttribute(key, value) {
            var attr = {};

            if(isInitialized) {
                //set appboy attribute
            }
            else {
                return 'Can\'t call setUserAttribute on forwarder ' + name + ', not initialized';
            }
        }

        function setUserIdentity(id, type) {

            if (isInitialized) {

                switch(type) {
                    case mParticle.IdentityType.CustomerId:
                    case mParticle.IdentityType.Facebook:
                    case mParticle.IdentityType.Twitter:
                    case mParticle.IdentityType.Google:
                    case mParticle.IdentityType.Email:
                    case mParticle.IdentityType.FacebookCustomAudienceId:
                    case mParticle.IdentityType.Microsoft:
                    case mParticle.IdentityType.Yahoo:
                    case mParticle.IdentityType.Other:
                    default:
                        credentialSet = false;
                }

                if(credentialSet) {
                   //set user identity in appboy
                }
                else {
                    return 'Can\'t call setUserIdentity on forwarder ' + name + ', identity type not supported.';
                }
            }
            else {
                return 'Can\'t call setUserIdentity on forwarder ' + name + ', not initialized';
            }
        }

        function initForwarder(settings,
            service,
            testMode,
            trackerId,
            userAttributes,
            userIdentities,
            appVersion,
            appName) {

            var initAppboy = function () {
                //replace this with the correct appboy init API...
                Appboy.init(forwarderSettings.secretKey, appName, appVersion);

                //sync current user identities
                if(userIdentities && userIdentities.length > 0) {
                    userIdentities.forEach(function(identity) {
                        setUserIdentity(identity.Identity, identity.Type);
                    });
                }

                if(userAttributes) {
                    setUserAttributes(userAttributes);
                }

                isInitialized = true;
            };

            try {
                forwarderSettings = settings;
                reportingService = service;
                isTesting = testMode;

                if(testMode !== true) {
                    (function () {
                       ///put the Appboy js snippet/import here
                    })();
                }
                else {
                    initAppboy();
                }

                return 'Successfully initialized: ' + name;
            }
            catch (e) {
                return 'Failed to initialize: ' + name;
            }
        }

        function logOut(event) {
            if(isInitialized) {
                //if appboy supports logout

                if(reportingService) {
                    reportingService(self, event);
                }
            }
        }

        this.init = initForwarder;
        this.process = processEvent;
        this.setUserIdentity = setUserIdentity;
        this.setUserAttribute = setUserAttribute;
        this.logOut = logOut;
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
