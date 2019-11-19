
console.log('Check card-back-section');

var GRAY_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg';
var KEYTOKEN = 'key=cc57856e5af7a9464cdd18d4392623c2&token=fb8213d20972a81b10b9df437e19e99bfdc71bbad832493c14ab753b385e281b';

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
                                    desc = desc.substring(0, desc.indexOf('§FIELDS='));
                                    $.ajax({
                                        url: 'https://api.trello.com/1/cards/' + card.id + '?' + KEYTOKEN,
                                        type: 'PUT',
                                        data: {
                                            desc: desc
                                        },
                                        success: function(e){
                                            console.log(e);
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
                            console.log(customField);
                            switch(customField.type) {
                                case "list":
                                    $.each(customfield.options, function(j, option) {
                                        if(option.id == selectedValue[customfield.id]) {
                                            values.push({
                                                icon: 'https://cdn.glitch.com/c69415fd-f70e-4e03-b43b-98b8960cd616%2Frocket-ship-grey.png?1496162964717',
                                                text: option.value,
                                                color: option.color
                                            });
                                        }
                                    });
                                    break;
                                case "check":
                                    if(selectedValue[customfield.id] == true) {
                                        values.push({
                                            icon: 'https://cdn.glitch.com/c69415fd-f70e-4e03-b43b-98b8960cd616%2Frocket-ship-grey.png?1496162964717',
                                            text: customfield.name,
                                            color: "green"
                                        });
                                    }
                                    break;
                                default:
                                    if(selectedValue[customfield.id] != "") {
                                        values.push({
                                            icon: 'https://cdn.glitch.com/c69415fd-f70e-4e03-b43b-98b8960cd616%2Frocket-ship-grey.png?1496162964717',
                                            text: customfield.name,
                                            color: "green"
                                        });
                                    }
                                    break;
                            }
                        });
                        console.log(values);
                        return values;  
                    }
                }
            });
            
        },
        'card-back-section': function(t, options){
            console.log(options);
          return {
            title: 'Custom fields',    
            icon: GRAY_ICON, // Must be a gray icon, colored icons not allowed.    
            content: {
                type: 'iframe',
                url: t.signUrl('./section.html?cardid=' + options.context.card + '&' + KEYTOKEN),
                height: 230 // Max height is 500
              }
          };
        }
    });