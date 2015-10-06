'use strict';

angular.module('core').directive('voteWidget', [
	function() {
		return {
			templateUrl: 'modules/core/views/template-votewidget.html',
			restrict: 'E',
			scope: {
				voteup: '&',
                votedown: '&',
                count: '='
			}
		};
	}
]);