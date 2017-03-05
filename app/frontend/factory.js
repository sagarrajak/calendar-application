/**
 * Created by SAGAR on 3/5/2017.
 */
angular.module("app")
    .factory("load",function($http){
        return{
            // a factory to fetch data


            getEvents : function(){
                return $http.get('/api');
            },
            addEvent : function(event){
                var send = {
                  data : event.body,
                  config : {
                      'Content-Type' : 'application/x-www-form-urlencoded;charset=utf-8;'
                  }
                };
                return $http.post('/api',send.data , send.config);
            },
            deleteEvent : function(id){
                url = '/api';
                url+='/'+id;
                return $http.delete(url);
            },

            modifyEvent : function(event){
                var send = {
                    data : event,
                    config : {
                        'Content-Type' : 'application/x-www-form-urlencoded;charset=utf-8;'
                    }
                };
                return $http.put('/api',send.data , send.config);
            }

        }
    });
