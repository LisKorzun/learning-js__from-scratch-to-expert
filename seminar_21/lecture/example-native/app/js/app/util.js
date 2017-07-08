define(['jquery'],
    function ($) {
        return {
            generateId: function () {
                return 'id' + (new Date()).getTime();
            },
            
            getFileExtension: function (fileName) {
                return /(?:\.([^.]+))?$/.exec(fileName);
            },
            
            getRandomColor: function () {
                var letters = '0123456789ABCDEF';
                var color = '#';
                for (var i = 0; i < 6; i++) {
                    color += letters[Math.floor(Math.random() * 16)];
                }
                return color;
            },
            
            getData: function (type, url, success, error, data) {
                $.ajax({
                    dataType: "json",
                    url: url,
                    data: data,
                    success: success
                });
            }
        };
    });
