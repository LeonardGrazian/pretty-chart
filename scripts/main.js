
/* KNOWN BUGS
  -it takes two drags to move node to sandbox
  -when there are nodes in the editor and the
    divider is pulled left over them, the show
    over the sandbox
  -cannot edit node text in editor (cannot edit text in sandbox!)
*/


/* UTILITY FUNCTIONS */
var getRelativePosition = function ($anchorElem, $elem) {
  var newTop = $elem.offset().top - $anchorElem.offset().top;
  var newLeft = $elem.offset().left - $anchorElem.offset().left;

  return {'top': newTop, 'left': newLeft};
}


$( document ).ready(function () {

  // for debugging
  $( '.factory-header' ).sortable();

  /* IMPORTANT DOM ELEMENTS */
  var $makerFactoryContainer = $( '.maker-factory-container' ).eq(0);
  var $makerSandbox = $( '.maker-sandbox' ).eq(0);
  var $editorPane = $( '.editor-pane' ).eq(0);
  var $logo = $( '.logo' ).eq(0);


  /* FUNCTIONS */
  var onSandboxDrop = function (event, ui) {
    var $node = $('#' + ui.draggable.attr('id'));

    if ( !$node.hasClass('disable-sort') ) {
      $node.addClass('disable-sort');
    }

    if ( $node.draggable('option', 'disabled') ) {
      $node.draggable('enable');
    }

    if ( !$node.parent().hasClass('maker-sandbox') ) {
      $node.detach();
      $makerSandbox.append($node);

      var oldOffset = ui.offset;
      $node.offset({'top': oldOffset.top, 'left': oldOffset.left});
    }
  }

  var onEditorDrop = function (event, ui) {
    var $node = $('#' + ui.draggable.attr('id')); //ui.draggable;

    if ( $node.hasClass('disable-sort') ) {
      $node.removeClass('disable-sort');
    }

    if ( !$node.draggable('option', 'disabled') ) {
      $node.draggable('disable');
    }

    if ( !$node.parent().hasClass('editor-pane') ) {
      $node.detach();
      $editorPane.prepend($node);
      $node.css({'top': 0, 'left': 0});
    }
  }


  /* PARAMS */
  var nodeDraggableArgs = {   'disabled': true,
                              'snap': '.editor-pane',
                              'snapMode': 'inner',
                              'revert': 'invalid',
                              'containment': '.maker-container' };

  var sandboxDroppableArgs = { 'tolerance': 'fit',
                                'drop': onSandboxDrop };

  var editorDroppableArgs = { 'tolerance': 'fit',
                              'drop': onEditorDrop };

  var editorSortableArgs = { 'containment': 'body',
                              'cancel': '.disable-sort',
                            };
  /* END PARAMS */


  // Make Vertical Divider Movable
  var resizeHandles = {'e': '.ui-resizable-e'};
  $makerFactoryContainer.resizable({handles: resizeHandles});


  // Make Sandbox Droppable
  $makerSandbox.droppable(sandboxDroppableArgs);


  // Make Editor Droppable
  $editorPane.droppable(editorDroppableArgs);


  // Create Square Node
  var id_counter = 0;
  var generateSquare = function () {
    var textNodeAttrs ={ 'class': 'text-node',
                          'rows': 8,
                          'cols': 25,
                          'placeholder': 'Enter your shit here' };
    var $textNode = $('<textarea>', textNodeAttrs);

    var $nodeContainer = $('<li>', {'id': id_counter, 'class': 'node-container'});
    $nodeContainer.append($textNode);
    $nodeContainer.draggable(nodeDraggableArgs);

    $( '.editor-pane' ).eq(0).prepend($nodeContainer);

    id_counter = id_counter + 1;
  };
  $( 'ul.factory-footer > li.square-generator' ).eq(0).click(generateSquare);


  // Make Editor Sortable
  var makeSortable = function () {
    $editorPane.sortable(editorSortableArgs);
    // $editorPane.disableSelection();
  }
  $( 'ul.factory-footer > li.diamond-generator' ).eq(0).click(makeSortable);


  var update = function () {$logo.text('<!--' + $makerSandbox.html() + '-->');}
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

  -TODO: make sure nodes hide behind sandbox when we pull the divider far left
*/
