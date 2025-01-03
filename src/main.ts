import {
  Application,
  Assets,
  Sprite,
  AnimatedSprite,
  Spritesheet,
  Texture,
} from "pixi.js";
import { initDevtools } from "@pixi/devtools";

import { atlasData } from "./sprites/glasses";

(async () => {
  // Create a new application
  const app = new Application();

  // Initialize the application
  await app.init({ background: "#1099bb", resizeTo: window });

  // Append the application canvas to the document body
  document.getElementById("pixi-container")!.appendChild(app.canvas);

  initDevtools({ app });
  // Load the bunny texture
  const texture = await Assets.load("/assets/bunny.png");

  // Create a bunny Sprite
  const bunny = new Sprite(texture);
  bunny.on("pointerdown", (e) => {
    console.log("Bunny clicked!");
  });
  // test commiot
  bunny.eventMode = "static";
  // Center the sprite's anchor point
  bunny.anchor.set(0.5);
  // Move the sprite to the center of the screen
  bunny.position.set(app.screen.width / 2, app.screen.height / 2);

  // Add the bunny to the stage
  app.stage.addChild(bunny);

  const animTexture = await Assets.load(atlasData.meta.image);

  const spritesheet = new Spritesheet(animTexture, atlasData);

  await spritesheet.parse();

  const anim = new AnimatedSprite(spritesheet.animations.glass);

  anim.animationSpeed = 0.05;

  anim.play();
  app.stage.addChild(anim);

  document.addEventListener("keydown", (e) => {
    const speed = 5;
    switch (e.key) {
      case "ArrowUp":
        bunny.y -= speed;
        break;
      case "ArrowDown":
        bunny.y += speed;
        break;
      case "ArrowLeft":
        bunny.x -= speed;
        break;
      case "ArrowRight":
        bunny.x += speed;
        break;
    }
  });
  // Listen for animate update
  app.ticker.add((time) => {});
})();
