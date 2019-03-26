$(document).ready(function(){

        var networkDataReceive = false;
        //cek di cache, apakah sudah ada belum, ambil data dar service online
        var networkUpdate = fetch(_url).then(function(response){
            return response.json();
        }).then(function(data){
            networkDataReceive = true;
            renderPage(data);
        });
    
        
    
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
    if('serviceWorker' in navigator){
        window.addEventListener('load',function(){
            navigator.serviceWorker.register('/serviceworker.js').then(function(reg){
                console.log('SW regis sukses dengan skop',reg.scope)
                }, 
                    function(err){
                    console.log('sw regis failed',err);
            })
        })
    } 
    