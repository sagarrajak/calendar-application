/**
 * Created by SAGAR on 3/4/2017.
 */
angular.module('app',['mwl.calendar','ngAnimate','ui.bootstrap','moment-picker'])
    .controller('myCon',function(moment,calendarConfig,$scope , load ){

        var vm = this;
        vm.calendarView = 'month';
        vm.viewDate = new Date();


        var actions = [{
            label: '<i class=\'glyphicon glyphicon-pencil\'></i>',
            onClick: function(args) {
                alert.show('Edited', args.calendarEvent);
            }
        }, {
            label: '<i class=\'glyphicon glyphicon-remove\'></i>',
            onClick: function(args) {
                alert.show('Deleted', args.calendarEvent);
            }
        }];


        $scope.events =[];
        $scope.moments =[];
        $scope.created={};

        //function to refresh data form backends
        vm.loadData = function(){
            load
                .getEvents()
                .then(function(succ){
                    setEvent(succ.data);
                },function(err){
                    $log.info('error in loading data :' +err );
                });
        }

        // inital load of data
        vm.loadData();

        // converting data from backend to suitable object for calender
        setEvent = function(event){

            $scope.events=[];
            $scope.moments=[];

            for(i=0;i<event.length;i++){

                $scope.events.push({

                    "title":event[i].title,
                    "startsAt": new Date(event[i].startsAt),
                    "endsAt" : new Date(event[i].endsAt),
                    "color" : calendarConfig.colorTypes.important,
                    "_id" : event[i]._id,
                    "actions" : actions

                });

                $scope.moments.push({
                    'title' :event[i].title,
                    "startsAt" : moment(event[i].startsAt),
                    "endsAt" : moment(event[i].endsAt),
                    '_id' : event[i]._id
                });
            }



        };
        // function for deleting event
        vm.deleteEve = function(id){
            load
                .deleteEvent(id)
                    .then(
                          function(succ){
                                alert("data removed!!");
                                vm.loadData();
                          },function(err){
                                alert("failed to delete event");
                          }
                    );
        },


        // function for modifying event
        vm.reset = function(data){

            if(data.startsAt.toDate() > data.endsAt.toDate() ){
                alert('event must start before it complete');
                return;
            }

            load
                .modifyEvent({

                    "title" : data.title ,
                    "startsAt" :data.startsAt.toDate(),
                    "endsAt" : data.endsAt.toDate()

                }).then(
                        function(succ){
                            alert('data modify successfully');
                            vm.loadData();
                        },
                        function(err){
                            alert('error in modifying');
                            vm.loadData();
                        }
                    );

        }

        // function for adding new event
        vm.addEvent = function(){
            if( $scope.created.title == undefined || $scope.created.startsAt == undefined||$scope.created.endsAt == undefined ){
                alert('pls fill properly!!');
                return;
            }
            else if($scope.created.startsAt > $scope.created.endsAt){
                alert('event must start before it complete');
                return;
            }

            load.addEvent(
                {
                    body : {
                        "title" : $scope.created.title ,
                        "startsAt" : $scope.created.startsAt.toDate() ,
                        "endsAt" : $scope.created.endsAt.toDate()
                    }
                }
            ).then(function(suc){
                alert("Success :");
                vm.loadData();
                $scope.created={};
            },function(err){
                alert("Error : "+err);
                vm.loadData();
            });
        };




        //code form  https://mattlewis92.github.io/angular-bootstrap-calendar/#!?example=kitchen-sink
        vm.cellIsOpen = true;
        vm.timespanClicked = function(date, cell) {

            if (vm.calendarView === 'month') {
                if ((vm.cellIsOpen && moment(date).startOf('day').isSame(moment(vm.viewDate).startOf('day'))) || cell.events.length === 0 || !cell.inMonth) {
                    vm.cellIsOpen = false;
                } else {
                    vm.cellIsOpen = true;
                    vm.viewDate = date;
                }
            } else if (vm.calendarView === 'year') {
                if ((vm.cellIsOpen && moment(date).startOf('month').isSame(moment(vm.viewDate).startOf('month'))) || cell.events.length === 0) {
                    vm.cellIsOpen = false;
                } else {
                    vm.cellIsOpen = true;
                    vm.viewDate = date;
                }
            }

        };


    })
