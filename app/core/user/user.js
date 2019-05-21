/**
 * Created by mamirmozafari on 5/21/2019.
 */
'use strict';
angular.module('myApp.user', [
    'myApp.user.user-directive'
])
    .value('user', sessionStorage.getItem('user'));