  var rows      = 38;
  var scaledSize = 32;// The size I want my sprites to be;
  var spriteSize = 32;// The actual size of sprites / tiles in the tile_sheet image
  var columns   = 38;// columns and rows in map below
  var randomPokemon;
function Map(viewport)
{
  this.mapData =[[4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 9,10,11, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,15,14,14,14,14],
                 [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 9,10,11, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,15,14,14,14,14],
                 [4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 9,10,11, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 4, 4,15,14,14,14,14],
                 [4, 4, 4, 1, 1, 1, 1, 2, 2,30,31, 6,30,31,30,31, 9,10,11,30,31,30,31,30,31,30,31,30,31,30,31, 4, 4,15,14,14,14,14],
                 [4, 4, 4, 1, 1, 1, 1, 2, 8,32,33, 8,32,33,32,33, 9,10,11,32,33,32,33,32,33,32,33,32,33,32,33, 4, 4,15,14,14,14,14],
                 [4, 4, 4, 1, 1, 1, 1,12, 2,34,35, 8,34,35,34,35,27,27,27,34,35,34,35,34,35,34,35,34,35,34,35, 4, 4,15,14,14,14,14],
                 [4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 8,12, 4, 4,15,14,14,14,14],
                 [4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 8,12, 4, 4,15,14,14,14,14],
                 [4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ,1, 1, 1, 1, 1, 1, 1, 8,36,37,12, 8, 1, 1, 1, 8,12, 8, 4, 4,15,14,14,14,14],
                 [4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,12,38,39, 8, 8, 1, 1, 1, 2, 8,12, 4, 4,15,14,14,14,14],
                 [4, 4, 4, 8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8, 8, 8, 8, 8, 1, 1, 1, 8,12, 8, 4, 4,15,14,14,14,14],
                 [4, 4, 4, 8, 8, 8, 8,12, 8,23,23,23,23,23,23,23,23,23,23,23,23,10,10,10,25, 8, 8, 2, 8,12, 5, 4, 4,15,14,14,14,14],
                 [4, 4, 4, 8, 8, 8,12, 8, 2, 9,10,10,10,10,10,10,10,10,10,10,10,10,10,10,25, 2, 6, 8, 8, 8,12, 4, 4,15,14,14,14,14],
                 [4, 4, 4,12,12,12,12,12, 8,11,27,27,27,27,27,27,27,27,27,27,27,27, 9,10,25, 1, 1,12, 8,12, 8, 4, 4,15,14,14,14,14],    
                 [4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 9,10,25, 1, 1, 1, 1, 1, 1, 4, 4,15,14,14,14,14],            
                 [4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 9,10,25, 1, 1, 1, 1, 1, 1, 4, 4,15,14,14,14,14],          
                 [4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4,15,14,14,14,14],
                 [4, 4, 4, 1, 1, 1,12, 8, 1, 1, 1,30,31,30,31,16,17,17,17,17,18, 8, 9,10,25, 1, 1, 8, 8, 8,12, 4, 4,15,14,14,14,14],
                 [4, 4, 4, 1, 1, 1, 8,12, 1, 1, 1,32,33,32,33,15,14,14,14,14,19, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4,15,14,14,14,14],
                 [4, 4, 4, 1, 1, 1, 8, 2, 1, 1, 1,34,35,34,35,15,14,14,14,14,19, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4,15,14,14,14,14],
                 [4, 4, 4,12, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,13,28,28,28,28,29, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4,15,14,14,14,14],
                 [4, 4, 4, 8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4,15,14,14,14,14],
                 [4, 4, 4, 8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4,15,14,14,14,14],
                 [4, 4, 4, 8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4,15,14,14,14,14],
                 [4, 4, 4, 8, 8, 8,12, 8,12, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4,15,14,14,14,14],
                 [4, 4, 4, 8, 8,12, 8, 2,12, 6, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4,15,14,14,14,14],
                 [4, 4, 4, 8, 8, 2,12, 8, 8, 2, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8, 9,10,25, 8, 8, 8, 8,12, 6, 4, 4,15,14,14,14,14],
                 [4, 4, 4, 8, 2, 8, 8, 8, 8, 8, 6, 8,12, 8,12,12,12,12, 8,12,12,12, 9,10,25, 8, 2, 8, 8,12,12, 4, 4,15,14,14,14,14],
                 [4, 4, 4,12,12,12,12,12, 8,30,31,30,31,30,31,30,31,30,31,30,31, 8, 9,10,25, 8, 8, 2,12, 8, 6, 4, 4,15,14,14,14,14],
                 [4, 4, 4,30,31,30,31,30,31,32,33,32,33,32,33,32,33,32,33,32,33,12, 9,10,25,30,31,30,31,30,31, 4, 4,15,14,14,14,14],
                 [4, 4, 4,32,33,32,33,32,33,34,35,34,35,34,35,34,35,34,35,34,35, 6, 9,10,25,32,33,32,33,32,33, 4, 4,15,14,14,14,14],
                 [4, 4, 4,34,35,34,35,34,35,23,23,23,23,23,23,23,23,23,23,23,23,10,10,10,25,34,35,34,35,34,35, 4, 4,15,14,14,14,14],
                 [4, 4, 4,30,31,30,31,30,31, 9,10,10,10,10,10,10,10,10,10,10,10,10,10,10,25,30,31,30,31,30,31, 4, 4,15,14,14,14,14],
                 [4, 4, 4,32,33,32,33,32,33, 9,10,10,10,10,10,10,10,10,10,10,10,10,10,10,25,32,33,32,33,32,33, 4, 4,15,14,14,14,14],
                 [4, 4, 4,34,35,34,35,34,35, 9,10,11,27,27,27,27,27,27,27,27,27,27,27,27,27,34,35,34,35,34,35, 4, 4,15,14,14,14,14],
                 [4, 4, 4, 4, 4, 4, 4, 4, 4, 9,10,11, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,15,14,14,14,14],
                 [4, 4, 4, 4, 4, 4, 4, 4, 4, 9, 10,11,4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,15,14,14,14,14],
                 [4, 4, 4, 4, 4, 4, 4, 4, 4, 9, 10,11,4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,15,14,14,14,14]]

      
  
    /* Get the min and max column and row in the map to draw. */
    var xMin = Math.floor(viewport.x / scaledSize);
    var yMin = Math.floor(viewport.y / scaledSize);
    var xMax = Math.ceil((viewport.x + viewport.w) / scaledSize);
    var yMax = Math.ceil((viewport.y + viewport.h) / scaledSize);

    
     /* Check Boundary Condition */
    if (xMin < 0) xMin = 0;
    if (yMin < 0) yMin = 0;
    if (xMax> columns) xMax = columns;
    if (yMax > rows) yMax = rows;

  this.drawMap=function()
  {
    for (let i = xMin; i < xMax; i ++) {
      for (let j = yMin; j < yMax; j ++) {
        let value = this.mapData[j][i];// Tile value
          let tileX = Math.floor(i * scaledSize - viewport.x + width * 0.5 - viewport.w * 0.5);// Tile x destination for drawing
        let tileY = Math.floor(j * scaledSize - viewport.y + height * 0.5 - viewport.h * 0.5);// Tile y destination for drawing
        ctx.drawImage(tileSheet, value * spriteSize, 0, spriteSize, spriteSize, tileX, tileY, scaledSize, scaledSize);
      
        
      }
    }

  
}

}