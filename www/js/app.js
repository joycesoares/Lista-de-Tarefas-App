// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic'])

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

app.config(function($stateProvider,$urlRouterProvider){
  $stateProvider

  .state('app',{
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller:'AppCtrl'
    })

  $urlRouterProvider.otherwise('/app/');

});

app.controller('mainController', function($scope,$ionicPopup,$ionicListDelegate){
  var tarefa = new getTarefa();

  $scope.lista = tarefa.items;
  $scope.mostraMarcado = false;
  $scope.removerStatus = false;

  function pegarTexto(item, novo){
    $scope.data = {};
    $scope.data.novaTarefa = item.nome;

    $ionicPopup.show({
      title:"Nova tarefa",
      scope: $scope,
      template: "<input type:'text' placeholder='Adicionar tarefa' autofocus='true' ng-model = 'data.novaTarefa'> ",
      buttons:[
        {text:"Ok",
        onTap: function(e){
          item.nome = $scope.data.novaTarefa;
          if(novo){
            tarefa.add(item);
          }
           tarefa.salvar();
        }},
        {text: "cancelar"}
      ]
    });
      $ionicListDelegate.closeOptionButtons();
  };

  $scope.onMarqueTarefa = function(item){
    item.finalizada = !item.finalizada;
    tarefa.salvar();
  };

  $scope.onEscondeItem = function(item){
      return item.finalizada && !$scope.mostraMarcado;
   };

  $scope.onAdicionarItem = function(){
    var item = {nome:"", finalizada: false};
    pegarTexto(item,true);
  };
  
  $scope.onEditarItem = function(item){
    pegarTexto(item,false);
  };

  $scope.onRemoveItem = function(item){
    tarefa.remove(item);
    tarefa.salvar();
  };

  $scope.onRemoveClick=function(){
    $scope.removerStatus = !$scope.removerStatus;
  };

});
