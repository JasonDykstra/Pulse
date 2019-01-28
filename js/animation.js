class Animation {



  constructor(position, spriteSheetInformation, framesPerSprite = 3, scale = 1, repeat = false) {
    //spriteSheetSource, sheetWidth, sheetHeight, spriteWidth, spriteHeight, numSprites = -1
    this.coordinates = new Vector(position.x, position.y);
    this.spriteSheet = new Image();
    this.spriteSheet.src = spriteSheetInformation.src;
    this.sheetWidth = spriteSheetInformation.sheetWidth;
    this.sheetHeight = spriteSheetInformation.sheetHeight;
    this.spriteWidth = spriteSheetInformation.spriteWidth;
    this.spriteHeight = spriteSheetInformation.spriteHeight;
    this.numSprites = spriteSheetInformation.numSprites;
    this.spriteCounter = 0;
    if (framesPerSprite <= 0) {
      this.framesPerSprite = 0;
    } else {
      this.framesPerSprite = framesPerSprite;
    }
    this.scale = scale;
    this.repeat = repeat;
    this.oneCycleCompleted = false;
    this.alive = true;


    this.counter = 0;
    this.currentImagePosX = 0;
    this.currentImagePosY = 0;

    this.maxImagePosX = Math.floor(this.sheetWidth / this.spriteWidth);
    this.maxImagePosY = Math.floor(this.sheetHeight / this.spriteHeight);
  }

  update() {
    console.log(this.alive);
    //dont update if animation is only supposed to play once and it has finished one cycle
    if (this.oneCycleCompleted == true && this.repeat == false) {
      this.alive = false;
    } else {

      //update counter
      if (this.counter < this.framesPerSprite) {
        this.counter++;
      } else {
        this.counter = 0;

        //increment X position on sprite sheet
        if (this.currentImagePosX < this.maxImagePosX - 1) {
          this.spriteCounter++;
          this.currentImagePosX++;

          //if you get to the end from left to right, go down a row
        } else {
          this.currentImagePosX = 0;

          //increment Y position on sprite sheet
          if (this.currentImagePosY < this.maxImagePosY - 1) {
            this.spriteCounter++;
            this.currentImagePosY++;

            //if you get to the bottom right hand corner of sprite sheet, loop back to beginning
          } else {
            this.currentImagePosY = 0;

            //make oneCycleCompleted true if the spirte finishes 1 full animation (if numSprites is not defined)
            this.oneCycleCompleted = true;
          }
        }


        //if numSprites is defined, make sure you don't load more sprites than there are on the sheet
        if (this.numSprites != -1) {
          if (this.spriteCounter >= this.numSprites) {
            this.spriteCounter = 0;
            this.currentImagePosX = 0;
            this.currentImagePosY = 0;

            //make oneCycleCompleted true if the sprite finishes 1 full animation (if numSprites is defined)
            this.oneCycleCompleted = true;
          }
        }
      }
    }
  }

  draw(context) {

    //dont draw if animation is only supposed to play once and it has finished one cycle
    if (this.oneCycleCompleted == true && this.repeat == false) {

    } else {

      //display sprite
      context.drawImage(this.spriteSheet, //Sprite sheet source
        this.currentImagePosX * this.spriteWidth, //X Pos on sheet
        this.currentImagePosY * this.spriteHeight, //Y Pos on sheet
        this.spriteWidth, //Sprite width
        this.spriteHeight, //Sprite Height
        this.coordinates.x - this.spriteWidth / 2, //X Pos on canvas (center)
        this.coordinates.y - this.spriteHeight / 2, //Y Pos on canvas (center)
        this.spriteWidth * this.scale, //Width on screen
        this.spriteHeight * this.scale); //Height on screen
    }
  }
}
