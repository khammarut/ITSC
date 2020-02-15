var app = angular.module("myApp",['ui.bootstrap']);

app.controller('empController',function($scope,$http,$uibModal,$rootScope){
  //$http.defaults.headers.common.Authorization = 'user4  n7phBw3bJR5EfTMjM0kW';

  $scope.displayData = function(){
    $http.get('rget.php').then(function(res){
        $scope.data = res.data.rs;
    });
  }

  $rootScope.$on('displayData',function(){
    $scope.displayData();
  });

  $scope.open = function(fname) {
    var modalInstance =  $uibModal.open({
      templateUrl: "insert.html",
      controller: "insertController",
      size: '',
      resolve: {
        data: {
          'fname' : fname,
        }
      }
    });


    modalInstance.result.then(function(response){
        $scope.result = `${response} button hitted`;
    });
  }

  $scope.openUp = function(fname,lname,birthday,email,id) {
    var modalInstance =  $uibModal.open({
      templateUrl: "update.html",
      controller: "updateController",
      size: '',
      resolve: {
        data: {
          'fname' : fname,
          'lname' : lname,
          'birthday' : birthday,
          'email' : email,
          'id' : id
        }
      }
    });


    modalInstance.result.then(function(response){
        $scope.result = `${response} button hitted`;
    });
  }

  $scope.deleteData = function(id){
    swal({
            title: "ต้องการลบข้อมูลหรือไม่?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "ตกลง!",
            cancelButtonText: "ยกเลิก!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
        function (isConfirm) {
            if (isConfirm) {
              swal({ title: "", text: "=", timer: 3000, showConfirmButton: false });
              swal("ลบข้อมูลสำเร็จ!", "" ,"success");
              $http.post('delete.php',{
                'id' : id
              }).then(function(res){
                $scope.displayData();
              });
            }else {
                swal({ title: "", text: "=", timer: 3000, showConfirmButton: false });
                swal("ยกเลิก", "", "error");
            }
        })
  }
});

app.controller('insertController', function($scope, $uibModalInstance,data,$http,$rootScope) {
  $scope.datepickerOptions = {
      dateDisabled: false,
      maxDate: new Date(),
  };

  $scope.fname = data.fname;
  $scope.ok = function(fname,lname,birthday,email){

    var ubd = birthday.getFullYear() + "-" + ("0" + (birthday.getMonth() + 1)).slice(-2) + "-" +  ("0" + (birthday.getDate())).slice(-2) ;
      $http.post('rinsert.php',{
        'fname' : fname,
        'lname' : lname,
        'birthday' : ubd,
        'email' : email
      }).then(function(res){
        $uibModalInstance.close();
        $rootScope.$emit('displayData',{});
        swal("บันทึกข้อมูลสำเร็จ!", "", "success");
      });
    }

  $scope.cancel = function(){
    $uibModalInstance.close();
  }

});

app.controller('updateController', function($scope, $uibModalInstance,data,$http,$rootScope) {
  $scope.datepickerOptions = {
      dateDisabled: false,
      maxDate: new Date(),
  };
  var bd = new Date(data.birthday);
  $scope.fname = data.fname;
  $scope.lname = data.lname;
  $scope.birthday = bd;
  $scope.email = data.email;
  $scope.id = data.id;
  $scope.ok = function(){

    var ubd = $scope.birthday.getFullYear() + "-" + ("0" + ($scope.birthday.getMonth() + 1)).slice(-2) + "-" +  ("0" + ($scope.birthday.getDate())).slice(-2) ;
      $http.post('update.php',{
        'fname' : $scope.fname,
        'lname' : $scope.lname,
        'birthday' : ubd,
        'email' : $scope.email,
        'id' : $scope.id
      }).then(function(res){
        $uibModalInstance.close();
        $rootScope.$emit('displayData',{});
        swal("แก้ไขข้อมูลสำเร็จ!", "", "success");
      });
   }

  $scope.cancel = function(){
    $uibModalInstance.close();
  }

});
