
/* KNOWN BUGS
  -it takes two drags to move node to sandbox
  -when there are nodes in the editor and the
    divider is pulled left over them, the show
    over the sandbox
*/


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
  var nodeDraggableArgs = {   'snap': '.editor-pane',
                              'snapMode': 'inner',
                              'revert': 'invalid',
                              'containment': '.maker-container'
                            };
  var onSandboxDrop = function (event, ui) {
    ui.helper
        .clone()
        .draggable(nodeDraggableArgs)
        .appendTo(this);
    ui.draggable.remove();
  }

  var onEditorDrop = function (event, ui) {
    var $node = ui.helper.clone();
    $node.css({'position': 'relative', 'top': 0, 'left': 0});
    $node.prependTo(this);

    ui.draggable.remove();
    $node.draggable('disable');
  }


  // Make Sandbox Droppable
  var sandboxDroppableArgs = { 'tolerance': 'fit',
                                'drop': onSandboxDrop };
  $makerSandbox.droppable(sandboxDroppableArgs);


  // Make Editor Droppable
  var editorDroppableArgs = { 'tolerance': 'fit',
                              'drop': onEditorDrop };
  $editorPane.droppable(editorDroppableArgs);
  // Make Editor Sortable
  var editorSortableArgs = { 'containment': 'body' };
  $editorPane.sortable(editorSortableArgs);


  // Create Square Node
  var id_counter = 0;
  var generateSquare = function () {
    var textNodeAttrs = { 'class': 'text-node',
                          'rows': 8,
                          'cols': 25,
                          'placeholder': 'Enter your shit here' };
    var $textNode = $('<textarea>', textNodeAttrs);

    var $nodeContainer = $('<li>', { 'id': id_counter, 'class': 'node-container' });
    $nodeContainer.append($textNode);
    $nodeContainer.draggable(nodeDraggableArgs);
    $nodeContainer.draggable('disable');

    $( '.editor-pane' ).eq(0).prepend($nodeContainer);

    id_counter++;
  };
  $( 'ul.factory-footer > li.square-generator' ).eq(0).click(generateSquare);


  // $( 'ul.factory-footer > li.diamond-generator' ).eq(0).click();


  var update = function () { $logo.text('<!--' + $editorPane.html() + '-->'); }
  $( 'ul.factory-footer > li.triangle-generator' ).eq(0).click(update);


  // var getOffset = function () { $logo.text('<!--' + $( '#0' ).offset().top + '-->'); }
  // $( 'ul.factory-footer > li.rectangle-generator' ).eq(0).click(getOffset);
});
