
console.log('Check card-back-section');

var GRAY_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg';
var KEYTOKEN = 'key=51b33d44c2f01e940b6758069495d976&token=fb0ce81c114bb48215cf18a17acab23edcd53721f22aba0f4c2588df2c0f6742';

window.TrelloPowerUp.initialize(
    {
        'board-buttons': function (t, opts) {
            return t.cards('id', 'desc')
                    .then(function (data) {
                        $.each(data, function(i, card) {
                            var desc = card.desc;
                            if (desc.indexOf('§FIELD_SELECTED=') > -1) {
                                var selectedValue = desc.substring(desc.indexOf('§FIELD_SELECTED='), desc.indexOf('END_SELECTED§')).replace('§FIELD_SELECTED=', '').replace('END_SELECTED§', '');
                                var selectedCustom = JSON.parse(selectedValue);
                                console.log(selectedValue);
                                var replaceStr = '§FIELD_SELECTED=' + selectedValue + 'END_SELECTED§';
                                return t.set(card.id, 'shared', card.id + '-selected', selectedCustom)
                                    .then(function(){
                                        desc = desc.replace(replaceStr, '');
                                        $.ajax({
                                            url: 'https://api.trello.com/1/cards/' + card.id + '?' + KEYTOKEN,
                                            type: 'PUT',
                                            data: {
                                                desc: desc
                                            },
                                            success: function(e){
                                                if (desc.indexOf('§FIELDS=') > -1) {
                                                    var length = desc.indexOf('§FIELD_SELECTED=') > -1 ? desc.indexOf('§FIELD_SELECTED=') : desc.length;
                                                    var value = desc.substring(desc.indexOf('§FIELDS='), length).replace('§FIELDS=', '').replace('§', '');
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
                                            }
                                        });
                                    });
                            } else {
                                if (desc.indexOf('§FIELDS=') > -1) {
                                    var length = desc.length;
                                    var value = desc.substring(desc.indexOf('§FIELDS='), length).replace('§FIELDS=', '').replace('§', '');
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
                                        console.log(option.color);
                                        if(option.id == selectedValue[customField.id]) {
                                            values.push({
                                                icon: './tick-inside-circle.9d454d9d.png',
                                                text: customField.name + ': ' + option.value.text,
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
                height: 200 // Max height is 500
              }
          };
        }
    }, {
        appKey: 'cc57856e5af7a9464cdd18d4392623c2',
        appName: 'umbrella-custom-field'
    });