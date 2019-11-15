
console.log('Check card-back-section');

var GRAY_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg';

window.TrelloPowerUp.initialize({
    'card-back-section': function(t, options){
        return t.set(options.context.card, 'shared', '123456789', '123456789')
                .then(function(){
                    //call api to get card information in trello app
                    $.ajax({
                        url: 'https://api.trello.com/1/cards/' + options.context.card + '?key=cc57856e5af7a9464cdd18d4392623c2&token=fb8213d20972a81b10b9df437e19e99bfdc71bbad832493c14ab753b385e281b',
                        success: function(e) {
                            console.log(e);
                        }
                    });
                });
    //   return {
    //     title: 'Custom fields',    
    //     icon: GRAY_ICON, // Must be a gray icon, colored icons not allowed.    
    //     content: {
    //         type: 'iframe',
    //         url: t.signUrl('./section.html'),
    //         height: 230 // Max height is 500
    //       }
    //   };
    }
  });