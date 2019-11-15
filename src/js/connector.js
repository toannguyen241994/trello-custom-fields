
console.log('Check card-back-section');

var GRAY_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg';

window.TrelloPowerUp.initialize(
    {
        'card-buttons': function(t, options) {
            return [{
                icon: 'https://cdn.glitch.com/1b42d7fe-bda8-4af8-a6c8-eff0cea9e08a%2Frocket-ship.png?1494946700421',
                text: 'Add custom field',
                callback: function(t){
                    return t.popup({
                      title: "Add Custom Field",
                      url: 'customfield.html'
                    });
                  }
            }];
        },
        'card-back-section': function(t, options){
            console.log('card id:' + options.context.card);
            // $.ajax({
            //     method: 'POST',
            //     url: 'https://api.trello.com/1/customFields?key=cc57856e5af7a9464cdd18d4392623c2&token=fb8213d20972a81b10b9df437e19e99bfdc71bbad832493c14ab753b385e281b',
            //     data: {
            //         'idModel': options.context.board,
            //         'modelType': 'board',
            //         'name': 'test',
            //         'type': 'checkbox',
            //         'pos': 1,
            //         'display_cardFront': true
            //     },
            //     success: function(e) {
            //         console.log(e);
            //     }
            // });
            // return t.set(options.context.card, 'shared', '123456789', '123456789')
            //         .then(function(){
            //             console.log('create success');
            //             //call api to get card information in trello app
            //             $.ajax({
            //                 url: 'https://api.trello.com/1/cards/' + options.context.card + '?key=cc57856e5af7a9464cdd18d4392623c2&token=fb8213d20972a81b10b9df437e19e99bfdc71bbad832493c14ab753b385e281b',
            //                 success: function(e) {
            //                     console.log(e);
            //                 }
            //             });
            //         });
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