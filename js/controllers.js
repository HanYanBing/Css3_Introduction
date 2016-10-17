'use strict';

/**
 * @ngdoc directive
 * @name csdpWeb20App.directive:tables/tablepagination2
 * @description
 * # tables/tablepagination2
 */
angular.module('csdpWeb20App')
	.directive('tablePagination2', function ($rootScope) {
		return {
			templateUrl: 'views/templates/tablepagination2.html',
			restrict: 'EA',
			scope: {
				columns: '=columns',
				store: '=store',
				events: '=events',
				operations: '=operations'
			},
			//link:function(scope){
			//
			//},
			link: function postLink(scope) {
				scope.actionRoleList = $rootScope.actionRoleList;
				scope.$on('ngRepeatFinished',function(){
					angular.element('a[data-hover="dropdown"]').dropdownHover();
				});

				scope.actionRoleList = $rootScope.actionRoleList;
				scope.$on('ngRepeatFinished',function(){
					angular.element('a[data-hover="dropdown"]').dropdownHover();
				});
				scope.actionRoleList = $rootScope.actionRoleList;
				scope.$on('ngRepeatFinished', function(){
					angular.element('a[data-hover="dropdown"]').dropdownHover();
				});
				if(!scope.events){

				}else if(scope.events && scope.events.options && scope.events.options.multiSelect){
					var selectHash = {};
					scope.checked = function(data){
						if(data.selected === undefined){
							data.selected = false;
						}
						data.selected = !data.selected;
						if(data.selected){
							selectHash[data.$$hashKey] = data;
						}else{
							selectHash[data.$$hashKey] = null;
						}
						var selected = [];
						angular.forEach(selectHash, function(value){
							if(value){
								this.push(value);
							}
						}, selected);
						if(scope.events.checked){
							scope.events.checked(selected);
						}
					};
				}else if(scope.events && scope.events.checked){
					//checkbox选中
					scope.checked = function(data){
						scope.checkItem = data;
						scope.events.checked(data);
					};
				}

				scope.pagination = {
					total: 0,
					currentPage: 1,
					pageCount: 0,
					pagesize: 10,
					goToFirst : function(){
						this.currentPage = 1;
						scope.events.load(this);
					},
					goToPrevious : function(){
						if(this.currentPage === 1){
							return;
						}
						this.currentPage--;
						scope.events.load(this);
					},
					goToNext : function(){
						if(this.currentPage ===this.pageCount){
							return;
						}
						this.currentPage++;
						scope.events.load(this);
					},
					goToLast : function(){
						this.currentPage = this.pageCount;
						scope.events.load(this);
					},
					setTotal : function(total){
						this.total = total;
						if (this.total % this.pagesize === 0) {
							this.pageCount = this.total / this.pagesize;
						} else {
							this.pageCount = Math.floor(this.total / this.pagesize) + 1;
						}
					}
				};

				if(scope.events && scope.events.load){
					scope.events.load(scope.pagination);
				}
			}
		};
	});
