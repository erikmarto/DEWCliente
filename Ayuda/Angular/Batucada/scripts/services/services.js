(function(){
	'use strict';
	
	angular
		.module("app")
		.provider("remoteResource", RemoteResourceProvider)
		.constant("baseUrl", "data")
		.config(config);
		
	function config(baseUrl, remoteResourceProvider){
		remoteResourceProvider.setBaseUrl(baseUrl);
	}	
	
	function ChatResource($http, $q, baseUrl) {
		/*
		this.get = function() {
			var defered=$q.defer();
			var promise=defered.promise;
			
			$http({
			  method: 'GET',
			  url: baseUrl + '/chat_1.json'
			}).success(function(data, status, headers, config) {
			  defered.resolve(data);
			}).error(function(data, status, headers, config) {
			  defered.reject(status);
			});
		
			return promise;
		}
		*/
		this.list = function() {
			var defered=$q.defer();
			var promise=defered.promise;    
			
			$http({
			  method: 'GET',
			  url: baseUrl + '/chats.json'
			}).success(function(data, status, headers, config) {
			  defered.resolve(data);
			}).error(function(data, status, headers, config) {
			  defered.reject(status);
			});
			
			return promise;
		}
	}
	
	function RemoteResourceProvider() {
	  var _baseUrl;
	  this.setBaseUrl=function(baseUrl) {
		_baseUrl=baseUrl;
	  }
	  this.$get=['$http', '$q', function($http, $q) {
		return new ChatResource($http, $q, _baseUrl);
	  }];
}
	
	
})();