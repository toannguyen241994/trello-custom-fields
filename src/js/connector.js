
console.log('Implement power-up');

window.TrelloPowerUp.initialize({
    'card-back-section': function(t, options){
      return {
        title: 'My Card Back Section',
        icon: GRAY_ICON, // Must be a gray icon, colored icons not allowed.
        content: {
          type: 'iframe',
          url: t.signUrl('./section.html'),
          height: 230 // Max height is 500
        }
      };
    }
  });