describe('Appboy Forwarder', function () {

    var MessageType = {
            SessionStart: 1,
            SessionEnd: 2,
            PageView: 3,
            PageEvent: 4,
            CrashReport: 5,
            OptOut: 6,
            Commerce: 16
        },
        EventType = {
            Unknown: 0,
            Navigation: 1,
            Location: 2,
            Search: 3,
            Transaction: 4,
            UserContent: 5,
            UserPreference: 6,
            Social: 7,
            Other: 8,
            Media: 9,
            ProductPurchase: 16,
            getName: function () {
                return 'blahblah';
            }
        },
        CommerceEventType = {
            ProductAddToCart: 10,
            ProductRemoveFromCart: 11,
            ProductCheckout: 12,
            ProductCheckoutOption: 13,
            ProductClick: 14,
            ProductViewDetail: 15,
            ProductPurchase: 16,
            ProductRefund: 17,
            PromotionView: 18,
            PromotionClick: 19,
            ProductAddToWishlist: 20,
            ProductRemoveFromWishlist: 21,
            ProductImpression: 22
        },
        IdentityType = {
            Other: 0,
            CustomerId: 1,
            Facebook: 2,
            Twitter: 3,
            Google: 4,
            Microsoft: 5,
            Yahoo: 6,
            Email: 7,
            Alias: 8,
            FacebookCustomAudienceId: 9,
            getName: function () {  return 'CustomerID';}
        },

        MockDisplay = function(){
            var self = this;

            this.automaticallyShowNewInAppMessagesCalled = false;

            this.automaticallyShowNewInAppMessages = function(){
                self.automaticallyShowNewInAppMessagesCalled = true;
            };
        },

        MockAppboyUser = function() {
            var self = this;

            this.lastName = null;
            this.firstName = null;
            this.emailSet = null;
            this.genderSet = null;
            this.countrySet = null;
            this.homeCity = null;
            this.emailSubscribe = false;
            this.pushSubscribe = false;
            this.phoneSet = null;
            this.imageUrl = null;
            this.yearOfBirth = null;
            this.monthOfBirth = null;
            this.dayOfBirth = null;
            this.customAttribute = null;
            this.customAttributeValue = null;

            this.customAttributeSet = false;

            this.setLastName = function (name){
                self.lastName = name;
            };

            this.setFirstName = function (name){
                self.firstName = name;
            };

            this.setEmail = function (email){
                self.emailSet = email;
            };

            this.setGender = function (gender){
                self.genderSet = gender;
            };

            this.setCountry = function (country){
                self.countrySet = country;
            };

            this.setHomeCity = function (homeCity){
                self.homeCity = homeCity;
            };

            this.setEmailNotificationSubscriptionType = function (subscriptionType){
                self.emailSubscribe = subscriptionType;
            };

            this.setPushNotificationSubscriptionType = function (subscriptionType){
                self.pushSubscribe = subscriptionType;
            };

            this.setPhoneNumber = function (number){
                self.phoneSet = number;
            };

            this.setAvatarImageUrl = function (url){
                self.imageUrl = url;
            };

            this.setDateOfBirth = function (year, month, day){
                self.yearOfBirth = year;
                self.monthOfBirth = month;
                self.dayOfBirth = day;
            };

            this.setCustomUserAttribute = function (key, value){
                self.customAttributeSet = true;
                self.customAttribute = key;
                self.customAttributeValue = (!value) ? "" : value;
            };
        },

        MockAppboy = function() {
            var self = this;

            this.logCustomEventCalled = false;
            this.logPurchaseEventCalled = false;
            this.initializeCalled = false;
            this.openSessionCalled = false;
            this.inAppMessageRefreshCalled = false;

            this.logCustomEventName = null;
            this.apiKey = null;
            this.userId = null;

            this.eventProperties = [];
            this.purchaseEventProperties = [];

            this.user = new MockAppboyUser();
            this.display = new MockDisplay();

            this.initialize = function (apiKey){
                self.initializeCalled = true;
                self.apiKey = apiKey;
                return true;
            };

            this.openSession = function (){
                self.openSessionCalled = true;
            };

            this.requestInAppMessageRefresh = function (){
                self.inAppMessageRefreshCalled = true;
            };

            this.changeUser = function(id){
                self.userId = id;
            };

            this.getUser = function(){
                return self.user;
            };

            this.logCustomEvent = function (name, eventProperties){
                self.logCustomEventCalled = true;
                self.logCustomEventName = name;
                self.eventProperties.push(eventProperties);
            };

            this.logPurchase = function(sku, price, currencyType, quantity, attributes){
                self.logPurchaseEventCalled = true;
                self.purchaseEventProperties.push([sku, price, quantity, attributes]);
            };
        },

        ReportingService = function (){
            var self = this;

            this.id = null;
            this.event = null;

            this.cb = function (forwarder, event){
                self.id = forwarder.id;
                self.event = event;
            };

            this.reset = function (){
                this.id = null;
                this.event = null;
            };
        },
        reportService = new ReportingService();


    before(function () {
        mParticle.EventType = EventType;
        mParticle.IdentityType = IdentityType;
        mParticle.MessageType = MessageType;
        mParticle.CommerceEventType = CommerceEventType;
    });

    beforeEach(function () {
        window.appboy = new MockAppboy();

        mParticle.forwarder.init({
            secretKey: '123456'
        }, reportService.cb, true, null, {
            gender: 'm'
        }, [{
            Identity: 'testUser',
            Type: IdentityType.CustomerId
        }], '1.1', 'My App');
    });

    it ('should initialize with apiKey', function(){
        window.appboy.should.have.property('apiKey', '123456');
    });

    it ('should open a new session and refresh in app messages upon initialization', function(){
        window.appboy.should.have.property('initializeCalled', true);
        window.appboy.should.have.property('openSessionCalled', true);
        window.appboy.should.have.property('inAppMessageRefreshCalled', true);
    });

    it('should log event', function() {
        mParticle.forwarder.process({
            EventName: 'Test Event',
            EventDataType: MessageType.PageEvent
        });
        window.appboy.should.have.property('logCustomEventCalled', true);
        window.appboy.should.have.property('logCustomEventName', 'Test Event');
    });

    it ('should log an event with properties', function(){
        mParticle.forwarder.process({
            EventName: 'Test Event with attributes',
            EventDataType: MessageType.PageEvent,
            EventAttributes: {
                dog: 'rex'
            }
        });
        window.appboy.should.have.property('logCustomEventCalled', true);
        window.appboy.should.have.property('logCustomEventName', 'Test Event with attributes');
        window.appboy.eventProperties.should.have.lengthOf(1);
        window.appboy.eventProperties[0]['dog'].should.equal('rex');
    });

    it ('should log a purchase event', function(){
        mParticle.forwarder.process({
            EventName: 'Test Purchase Event',
            EventDataType: MessageType.Commerce,
            EventCategory: EventType.ProductPurchase,
            CurrencyCode: 'USD',
            ProductAction: {
                TransactionId: 1234,
                TotalAmount: 50,
                ProductList: [
                    {
                        Price: "50",
                        Sku: 12345,
                        TotalAmount: 50,
                        Quantity: 1,
                        Attributes: {attribute: 'whatever'}
                    }
                ]
            }
        });
        window.appboy.should.have.property('logPurchaseEventCalled', true);
        window.appboy.purchaseEventProperties.should.have.lengthOf(1);
        window.appboy.purchaseEventProperties[0][0].should.equal('12345');
        window.appboy.purchaseEventProperties[0][1].should.equal(50);
        window.appboy.purchaseEventProperties[0][2].should.equal(1);
        window.appboy.purchaseEventProperties[0][3]['attribute'].should.equal('whatever');
    });

    it ('should not log non-purchase or non-pageEvent Events', function(){
        mParticle.forwarder.process({
            EventName: 'Non-Event',
            EventDataType: MessageType.PageView
        });
        window.appboy.should.have.property('logCustomEventCalled', false);
        window.appboy.should.have.property('logPurchaseEventCalled', false);
    });

    it ('should only change user identity and set the user email', function(){
        mParticle.forwarder.setUserIdentity('123', window.mParticle.IdentityType.CustomerId);
        mParticle.forwarder.setUserIdentity('blah@gmail.com', window.mParticle.IdentityType.Email);
        mParticle.forwarder.setUserIdentity('Mr. Blah facebook id', window.mParticle.IdentityType.Facebook);
        window.appboy.userId.should.equal('123');
        window.appboy.getUser().emailSet.should.equal('blah@gmail.com');
    });

    it ('it should set default user attributes', function(){
        mParticle.forwarder.setUserAttribute('first_name', 'John');
        mParticle.forwarder.setUserAttribute('last_name', 'Doe');
        mParticle.forwarder.setUserAttribute('email', 'test@gmail.com');
        mParticle.forwarder.setUserAttribute('push_subscribe', "opted_in");
        mParticle.forwarder.setUserAttribute('gender', 'm');
        mParticle.forwarder.setUserAttribute('dob', new Date(1991, 11, 17));
        window.appboy.getUser().genderSet.should.equal('m');
        window.appboy.getUser().firstName.should.equal('John');
        window.appboy.getUser().lastName.should.equal('Doe');
        window.appboy.getUser().emailSet.should.equal('test@gmail.com');
        window.appboy.getUser().pushSubscribe.should.equal("opted_in");
        window.appboy.getUser().yearOfBirth.should.equal(1991);
        window.appboy.getUser().dayOfBirth.should.equal(17);
        window.appboy.getUser().monthOfBirth.should.equal(12);
    });

    it ('should not set default values if a string is not passed as the attribute', function(){
        mParticle.forwarder.setUserAttribute('first_name', 'John');
        mParticle.forwarder.setUserAttribute('last_name', 'Doe');
        mParticle.forwarder.setUserAttribute('first_name', 10.2);
        mParticle.forwarder.setUserAttribute('last_name', false);
        window.appboy.getUser().firstName.should.equal('John');
        window.appboy.getUser().lastName.should.equal('Doe');
    });

    it ('should set a custom user attribute', function(){
        mParticle.forwarder.setUserAttribute('test', 'result');
        window.appboy.getUser().should.have.property('customAttributeSet', true);
        window.appboy.getUser().customAttribute.should.equal('test');
        window.appboy.getUser().customAttributeValue.should.equal('result');
    });

    it ('should remove a default user attribute', function(){
        mParticle.forwarder.setUserAttribute('first_name', 'John');
        mParticle.forwarder.removeUserAttribute('first_name');
        window.appboy.getUser().firstName.should.equal('');
    });

    it ('should remove custom user attributes', function(){
        mParticle.forwarder.setUserAttribute('test', 'result');
        mParticle.forwarder.removeUserAttribute('test');
        window.appboy.getUser().customAttribute.should.equal('test');
        window.appboy.getUser().customAttributeValue.should.equal('');
    });

    it ('should not set date of birth if passed an invalid value', function(){
        mParticle.forwarder.setUserAttribute('dob', new Date(1991, 11, 17));
        mParticle.forwarder.setUserAttribute('dob', "something");
        window.appboy.getUser().yearOfBirth.should.equal(1991);
        window.appboy.getUser().dayOfBirth.should.equal(17);
        window.appboy.getUser().monthOfBirth.should.equal(12);
    });
});

