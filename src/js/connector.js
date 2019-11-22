
console.log('Check card-back-section');

var GRAY_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg';
var KEYTOKEN = 'key=cc57856e5af7a9464cdd18d4392623c2&token=fb8213d20972a81b10b9df437e19e99bfdc71bbad832493c14ab753b385e281b';

window.TrelloPowerUp.initialize(
    {
        'show-authorization': function(t, options){
            console.log(options);
            console.log(t);
          },
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
                                        desc = desc.substring(0, desc.indexOf('§FIELDS='));
                                        $.ajax({
                                            url: 'https://api.trello.com/1/cards/' + card.id + '?' + KEYTOKEN,
                                            type: 'PUT',
                                            data: {
                                                desc: desc
                                            },
                                            success: function(e){
                                                
                                            }
                                        });
                                    });
                            }
                        });
                        
                    });
        },
        'card-badges' : function(t, opts) {
            return t.get('card', 'shared')
                .then(function(data) {
                
                if(data != null) {
                    var selectedValue = data[opts.context.card + '-selected'];
                    var customFields = data[opts.context.card];
                    if(customFields != null && customFields.length > 0 && selectedValue != null) {
                        var values = [];
                        $.each(customFields, function(idx, customField){
                            switch(customField.type) {
                                case "list":
                                    $.each(customField.options, function(j, option) {
                                        if(option.id == selectedValue[customField.id]) {
                                            values.push({
                                                icon: './tick-inside-circle.9d454d9d.png',
                                                text: customField.name + ': ' + option.value,
                                                color: option.color
                                            });

                                            return false;
                                        }
                                    });
                                    break;
                                case "check":
                                    if(selectedValue[customField.id] == true) {
                                        values.push({
                                            icon: './tick-inside-circle.9d454d9d.png',
                                            text: customField.name,
                                            color: "green"
                                        });
                                    }
                                    break;
                                default:
                                    if(selectedValue[customField.id] != "") {
                                        values.push({
                                            icon: './tick-inside-circle.9d454d9d.png',
                                            text: customField.name,
                                            color: "green"
                                        });
                                    }
                                    break;
                            }
                        });
                        return values;  
                    }
                }
            });
            
        },
        'card-back-section': function(t, options){
          return {
            title: 'Custom Fields',    
            icon: './settings.e55e9285.png', // Must be a gray icon, colored icons not allowed.    
            content: {
                type: 'iframe',
                url: t.signUrl('./section.html?cardid=' + options.context.card + '&boardid=' + options.context.board + '&' + KEYTOKEN),
                height: 500 // Max height is 500
              }
          };
        }
    });