/**
 * Created by mamirmozafari on 5/21/2019.
 */
'use strict';
angular.module('myApp.user.user-directive', [])

    .directive('appUser', ['user', function(user) {
        return function(scope , elm , attr) {
            elm.text(JSON.parse(user).Name);
        };
    }]);