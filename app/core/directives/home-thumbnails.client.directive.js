'use strict';

angular.module('core').directive('publisherThumbnail', [
    function () {
        return {
            templateUrl: 'modules/core/views/template-thumbnail.html',
            restrict: 'E',
            controller: 'HomeController',
            scope: {
                publisher: "="
            }
        };
    }
]);