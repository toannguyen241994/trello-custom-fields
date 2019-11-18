
console.log('Check card-back-section');

var GRAY_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg';

window.TrelloPowerUp.initialize(
    {
        'board-buttons': function (t, opts) {
            return t.cards('id', 'desc')
                .then(function (data) {
                    $.each(data, function(i, card) {
                        var desc = card.desc;
                        
                        if (desc.indexOf('§FIELDS=') > -1) {
                            var value = desc.substring(desc.indexOf('§FIELDS='), desc.length).replace('§FIELDS=', '').replace('§', '');
                            var customFields = JSON.parse(value);
                            return t.set(card.id, 'shared', card.id, customFields)
                                .then(function(){
                                    console.log('create custom filed');
                                });
                        }
                    });
                    
                });
        },
        'card-buttons': function(t, options) {
            return [{
                icon: 'https://cdn.glitch.com/1b42d7fe-bda8-4af8-a6c8-eff0cea9e08a%2Frocket-ship.png?1494946700421',
                text: 'Add custom field',
                callback: function(t){
                    var customFields = [{
                        id: Math.floor((Math.random() * 10) + 1),
                        name: "KKF", 
                        type: "list", 
                        options: [{ name: "item 1" }]
                    }];
                    return t.set(options.context.card, 'shared', Math.floor((Math.random() * 10) + 1), customFields)
                            .then(function(){
                                console.log('create custom filed');
                            });
                  }
            }];
        },
        'card-back-section': function(t, options){
            console.log(options);
          return {
            title: 'Custom fields',    
            icon: GRAY_ICON, // Must be a gray icon, colored icons not allowed.    
            content: {
                type: 'iframe',
                url: t.signUrl('./section.html?cardid=' + options.context.card),
                height: 230 // Max height is 500
              }
          };
        }
    });