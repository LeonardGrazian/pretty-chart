
/* KNOWN BUGS
  -it takes two drags to move node to sandbox
  -when there are nodes in the editor and the
    divider is pulled left over them, the show
    over the sandbox
  -Moving stuff in editor creates white space
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
  -TODO: resize node images so that their sizes are the same relative to their stroke width
*/


/* UTILITY FUNCTIONS */
var getRelativePosition = function ($anchorElem, $elem) {
  var newTop = $elem.offset().top - $anchorElem.offset().top;
  var newLeft = $elem.offset().left - $anchorElem.offset().left;

  return {'top': newTop, 'left': newLeft};
}


$( document ).ready(function () {

  // for debugging
  // $( '.factory-header' ).sortable();

  /* IMPORTANT DOM ELEMENTS */
  var $makerFactoryContainer = $( '.maker-factory-container' ).eq(0);
  var $makerSandbox = $( '.maker-sandbox' ).eq(0);
  var $editorPane = $( '.editor-pane' ).eq(0);
  var $subscribeButton = $( '.subscribe-button' ).eq(0);
  var $loginForm = $( '.login-form' ).eq(0);
  var $loginPart1 = $( '.login-part1' ).eq(0);
  var $loginPart2 = $( '.login-part2' ).eq(0);
  var $nextButton = $( '.next-button' ).eq(0);
  var $prevButton = $( '.prev-button' ).eq(0);
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


  // Make Login Form a Pop-Up
  var popUpArgs = { 'title': 'Subscribe Here!',
                      'width': 500,
                      'position': {
                        'my': 'top',
                        'at': 'top+225'
                      },
                      'autoOpen': false,
                      'closeOnEscape': true,
                      'resizable': false,
                      'draggable': false,
                      'show': {
                        'effect': 'blind',
                        'duration': 150
                      }};
  $loginForm.dialog(popUpArgs);


  // Make Login pop up on subscribe button click
  $subscribeButton.click(function () {
    $loginForm.dialog( 'open' );
  });


  // Cycle through Form
  $nextButton.click(function () {
    $loginPart2.removeClass('hide-form');
    $loginPart1.addClass('hide-form');
  });
  $prevButton.click(function () {
    $loginPart1.removeClass('hide-form');
    $loginPart2.addClass('hide-form');
  });

  // Create Square Node
  var id_counter = 0;
  var generateSquare = function () {
    // var textNodeAttrs = { 'class': 'text-node',
    //                       'rows': 8,
    //                       'cols': 25,
    //                       'placeholder': 'Enter your shit here' };
    // var $textNode = $('<textarea>', textNodeAttrs);

    var imgAttrs = { 'src': 'images/red-square.svg' };
    var $nodeImage = $('<img>', imgAttrs);

    var $nodeContainer = $('<li>', { 'id': id_counter, 'class': 'node-container' });
    $nodeContainer.append($nodeImage);
    $nodeContainer.draggable(nodeDraggableArgs);
    $nodeContainer.draggable('disable');

    $( '.editor-pane' ).eq(0).prepend($nodeContainer);

    id_counter++;
  }
  $( 'ul.factory-footer > li.square-generator' ).eq(0).click(generateSquare);


  var generateTriangle = function () {
    var imgAttrs = { 'src': 'images/green-triangle.svg' };
    var $nodeImage = $('<img>', imgAttrs);

    var $nodeContainer = $('<li>', { 'id': id_counter, 'class': 'node-container' });
    $nodeContainer.append($nodeImage);
    $nodeContainer.draggable(nodeDraggableArgs);
    $nodeContainer.draggable('disable');

    $( '.editor-pane' ).eq(0).prepend($nodeContainer);

    id_counter++;
  }
  $( 'ul.factory-footer > li.triangle-generator' ).eq(0).click(generateTriangle);


  var generateCircle = function () {
    var imgAttrs = { 'src': 'images/blue-circle.svg' };
    var $nodeImage = $('<img>', imgAttrs);

    var $nodeContainer = $('<li>', { 'id': id_counter, 'class': 'node-container' });
    $nodeContainer.append($nodeImage);
    $nodeContainer.draggable(nodeDraggableArgs);
    $nodeContainer.draggable('disable');

    $( '.editor-pane' ).eq(0).prepend($nodeContainer);

    id_counter++;
  }
  $( 'ul.factory-footer > li.circle-generator' ).eq(0).click(generateCircle);


  var generateDiamond = function () {
    var imgAttrs = { 'src': 'images/yellow-diamond.svg' };
    var $nodeImage = $('<img>', imgAttrs);

    var $nodeContainer = $('<li>', { 'id': id_counter, 'class': 'node-container' });
    $nodeContainer.append($nodeImage);
    $nodeContainer.draggable(nodeDraggableArgs);
    $nodeContainer.draggable('disable');

    $( '.editor-pane' ).eq(0).prepend($nodeContainer);

    id_counter++;
  }
  $( 'ul.factory-footer > li.diamond-generator' ).eq(0).click(generateDiamond);
});
