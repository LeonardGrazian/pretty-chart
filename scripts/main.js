

/* UTILITY FUNCTIONS */
var getRelativePosition = function ($anchorElem, $elem) {
  var newTop = $elem.offset().top - $anchorElem.offset().top;
  var newLeft = $elem.offset().left - $anchorElem.offset().left;

  return {'top': newTop, 'left': newLeft};
}

$( document ).ready(function () {

  var resizeHandles = {'e': '.ui-resizable-e'};
  $( '.maker-factory-container' ).eq(0).resizable({handles: resizeHandles});


  // $( '.factory-header' ).sortable();
  // $( '.opt-button' ).draggable();


  var nodeDraggableArgs = { //'snap': '.editor-pane',
                              'drag': onDrag,
                              'stop': onStop,
                              //'connectToSortable': '.editor-pane',
                              //'helper': 'clone',
                              'snap': '.editor-pane',
                              'snapMode': 'inner',
                              'revert': 'invalid',
                              'containment': '.maker-container' };
  var $makerSandbox = $( '.maker-sandbox' ).eq(0);
  var onSandboxDrop = function (event, ui) {
    var $node = ui.draggable;
    if ( !$node.parent().hasClass('maker-sandbox') ) {
      var oldOffset = ui.offset;
      // $node.draggable(nodeDraggableArgs);
      $node.detach();
      $makerSandbox.append($node);
      // $( '.logo' ).eq(0).text($node.parent().hasClass('maker-sandbox'));
      $node.offset({'top': oldOffset.top, 'left': oldOffset.left});

      // alert('adding to sandbox');
    }
  }
  var sandboxDroppableArgs = { 'tolerance': 'fit',
                                'drop': onSandboxDrop };
  $makerSandbox.droppable(sandboxDroppableArgs);


  var $editorPane = $( '.editor-pane' ).eq(0);
  var $logo = $( '.logo' ).eq(0);
  var onEditorDrop = function (event, ui) {
    var $node = ui.draggable;
    // $logo.text($node.parent().attr('class'));
    if ( !$node.parent().hasClass('editor-pane') ) {

      $node.detach();
      // $editorPane.text('added');
      $editorPane.prepend($node);
      $node.css({'top': 0, 'left': 0});

      alert('adding to editor');
    }
    $logo.text('<!--' + $editorPane.html() + '-->');
  }
  var editorDroppableArgs = { 'tolerance': 'fit',
                                'drop': onEditorDrop}
  $editorPane.droppable(editorDroppableArgs);


  var $logo = $( '.logo' ).eq(0);
  var onDrag = function (event, ui) {
    // $logo.text(ui.position.top + ',  ' + ui.position.left);
  }
  var onStop = function (event, ui) {
    // $logo.text($logo.text() + '   '
    //           + ui.position.top + ',   '
    //           + ui.position.left + '   |');
  }
  var generateSquare = function () {
    var textNodeAttrs ={ 'class': 'text-node',
                          'rows': 8,
                          'cols': 25,
                          'placeholder': 'Enter your shit here' };
    var $textNode = $('<textarea>', textNodeAttrs);

    var $nodeContainer = $('<li>', {'class': 'node-container'});
    $nodeContainer.append($textNode);
    $nodeContainer.draggable(nodeDraggableArgs);

    $( '.editor-pane' ).eq(0).prepend($nodeContainer);
  };

  $( 'ul.factory-footer > li.square-generator' ).eq(0).click(generateSquare);

  // var makeSortable = function () {$( '.editor-pane' ).sortable();}
  // $( 'ul.factory-footer > li.diamond-generator' ).eq(0).click(makeSortable);

  var update = function () {$logo.text('<!--' + $editorPane.html() + '-->');}
  $( 'ul.factory-footer > li.triangle-generator' ).eq(0).click(update);
});

/* WHAT I WANT:
  -create nodes with button (DONE)
  -have lovely list where I can edit several created nodes (DONE)
  -drag items from list to sandbox (DONE)
    -this removes element from editor-pane and adds it to maker-sandbox (DONE)
    -node should stay where we drop it (DONE)
    -if node is not dropped in sandbox, node floats back to editor (DONE)
  -move items around sandbox, cannot cross boundaries (DONE)
  -move items from sandbox to list
    -this only happens once the node snaps to the editor (DONE)
    -if a snap does not occur, the node drifts back to sandbox (DONE)
    -re-adds node to appropriate place in editor-pane
    -removes element from sandbox (DONE)
*/
