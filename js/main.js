$(document).ready(function(){

        //belajar notifikasi
        Notification.requestPermission(function(status){
            console.log('Notification permission status : ',status);
        });
        function displayNotification(){
            if(Notification.permission === 'granted'){
                navigator.serviceWorker.getRegistration()
                    .then(function(reg){
                        var options = {
                            body : 'Ini body notifikasi',
                            icon : 'images/pistel.jpg',
                            vibrate : [100,50,200],
                            data : {
                                dateOfArrival : Date.now(),
                                primaryKey : 1
                            },
                            actions : [
                                {action : 'explosure', title: 'Kunjungi Situs'},
                                {action : 'close', title: 'Tutup'}
                            ]
                        }
                        reg.showNotification('Judul Notifikasi',options);
                    })
            }
        }
        $('#btn-notification').on('click', function(){
            displayNotification();
        })
    });     
    f ('serviceWorker' in navigator){
        window.addEventListener('load', function () {
            navigator.serviceWorker.register('/serviceworker.js').then(
                function (reg) {
                    // registerasi service worker berhasil
                    console.log('SW registration success, scope :',reg.scope);
                }, function (err) {
                    // reg failed
                    console.log('SW registration faild : ', err);
                }
            )
        })
    }
    