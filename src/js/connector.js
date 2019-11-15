
console.log('Check card-back-section');

var GRAY_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg';

window.TrelloPowerUp.initialize({
    'card-back-section': function(t, options){
        var technology = "FIBER";
        $.ajax({
            method: "POST",
            url: "http://umbrellatooltest.intern.upc.ch/Connector/GetCustomFields",
            async: false,
            data: {
                technology: technology
            },
            success: function (e) {
                console.log(e);
            }
        });
      return {
        title: 'Custom fields',    
        icon: GRAY_ICON, // Must be a gray icon, colored icons not allowed.    
        content: {
            type: 'iframe',
            url: t.signUrl('./section.html'),
            height: 230 // Max height is 500
          }
      };
    }
  });