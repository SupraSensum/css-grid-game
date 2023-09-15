// add event listeners
// switch statement to listen for keys we care about
// 
//    up    = -1 / 0 / -1 / 0
//    down  = 1 / 0 / 1 / 0
//    left  = 0 / -1 / 0 / -1
//    right = 0 / 1 / 0 / 1
// 
//    Update array accordingly with list above
// 
// movePlayer()
//
//    apply maths
//    
//    if beyond a boundary
//       do nothing
//    else
//       move player

document.addEventListener('keydown', (e) => determinePlayerShiftSet(e))

function determinePlayerShiftSet(e) {
   let shiftSet = [];

   
   switch (e.key) {
      case 'ArrowUp':
         shiftSet = [-1, 0, -1, 0];
         break;
      case 'ArrowDown':
         shiftSet = [1, 0, 1, 0];
         break;
      case 'ArrowLeft':
         shiftSet = [0, -1, 0, -1];
         break;
      case 'ArrowRight':
         shiftSet = [0, 1, 0, 1];
         break;
      default:
         return;
   }

   movePlayer(shiftSet);

   return;
}

function movePlayer(shiftSet) {
   const playerDivElement = document.querySelector('.the-game > .display > .the-player');
   const newPlayerDivElementCoordinates = isInBounds(shiftSet, playerDivElement);

   if (newPlayerDivElementCoordinates) {
      playerDivElement.style.gridRowStart = newPlayerDivElementCoordinates[0]
      playerDivElement.style.gridColumnStart = newPlayerDivElementCoordinates[1]
      playerDivElement.style.gridRowEnd = newPlayerDivElementCoordinates[2]
      playerDivElement.style.gridColumnEnd = newPlayerDivElementCoordinates[3]
   }

   return;
}

function isInBounds(shiftSet, playerDivElement) {
   let newGridRowStart = Number(window.getComputedStyle(playerDivElement).getPropertyValue('grid-row-start')) + shiftSet[0]
   let newGridColumnStart = Number(window.getComputedStyle(playerDivElement).getPropertyValue('grid-column-start')) + shiftSet[1]
   let newGridRowEnd = Number(window.getComputedStyle(playerDivElement).getPropertyValue('grid-row-end')) + shiftSet[2]
   let newGridColumnEnd = Number(window.getComputedStyle(playerDivElement).getPropertyValue('grid-column-end')) + shiftSet[3]
   const gridDims = determineGridLinesQuantities();

   if (newGridRowStart < 1 || newGridRowStart > gridDims[1])
      return false;
   else if (newGridColumnStart < 1 || newGridColumnStart > gridDims[0])
      return false;
   else if (newGridRowEnd < 1 || newGridRowEnd > gridDims[1])
      return false;
   else if (newGridColumnEnd < 1 || newGridColumnEnd > gridDims[0])
      return false;
   else
      return [newGridRowStart, newGridColumnStart, newGridRowEnd, newGridColumnEnd];
}

// returns an array [numColumns, numRows] for the current grid
function determineGridLinesQuantities() {
   const gridContainer = document.querySelector('.display');
   const gridStyles = window.getComputedStyle(gridContainer);
   // calculate for columns
   const gridColumnValue = gridStyles.getPropertyValue('grid-template-columns');
   const columnValues = gridColumnValue.split(' '); // Split by space
   const numberOfColumns = columnValues.length;
   // calculate for rows
   const gridRowValue = gridStyles.getPropertyValue('grid-template-rows');
   const rowValues = gridRowValue.split(' '); // Split by space
   const numberOfRows = rowValues.length;

   return [numberOfColumns > 0 ? numberOfColumns + 1 : 0, numberOfRows > 0 ? numberOfRows + 1 : 0];
}