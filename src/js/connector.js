
console.log('Check card-back-section');

window.TrelloPowerUp.initialize({
    'card-back-section': function(t, options){
      return {
        title: 'My Card Back Section',
        icon: GRAY_ICON, // Must be a gray icon, colored icons not allowed.
        content: "test my card"
      };
    }
  });