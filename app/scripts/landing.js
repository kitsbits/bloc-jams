$(document).ready(function() {
  var onHoverColorAction = function(event) {
    console.log('Hover action triggered.');
    $(this).css({'color': '#FA9D61'});
  };

  var offHoverColorAction = function(event) {
    console.log('Off-hover action triggered.');
    $(this).css({'color': 'white'});
  };

  $('.hero-content h3').hover(onHoverColorAction, offHoverColorAction);

  var onHoverAction = function(event) {
    console.log('Hover action triggered.');
    $(this).animate({'margin-top': '10px'});
  };

  var offHoverAction = function(event) {
    console.log('Off-hover action triggered.');
    $(this).animate({'margin-top': '0px'});
  };

  $('.selling-points .point').hover(onHoverAction, offHoverAction);

});