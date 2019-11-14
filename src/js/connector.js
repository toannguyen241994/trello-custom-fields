
console.log('Check card-back-section');

window.TrelloPowerUp.initialize({
    'card-back-section': function(t, options){
      return {
        title: 'My Card Back Section',        
        content: "test my card"
      };
    }
  });