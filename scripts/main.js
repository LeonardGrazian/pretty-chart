$( document ).ready(function() {

  var resizeHandles = {'e': '.ui-resizable-e'};
  $( '.maker-factory-container' ).eq(0).resizable({handles: resizeHandles});


  var generateSquare = function(){
    var textNodeAttrs ={ 'class': 'text-node',
                          'rows': 8,
                          'cols': 25,
                          'placeholder': 'Enter your shit here'};
    var $textNode = $('<textarea>', textNodeAttrs);

    var $nodeContainer = $('<div>', {'class': 'node-container'});
    $nodeContainer.append($textNode);
    $nodeContainer.draggable();

    $( '.editor-pane' ).eq(0).prepend($nodeContainer);
  };

  $( 'ul.factory-footer > li.square-generator' ).eq(0).click(generateSquare);

});
