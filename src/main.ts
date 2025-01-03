import {
  Application,
  Assets,
  Sprite,
  AnimatedSprite,
  Spritesheet,
  TilingSprite,
  DisplacementFilter,
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
  bunny.scale.set(2)
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
  anim.loop = false
  anim.eventMode = "static"
  anim.on("pointerdown", (e) => {
    console.log("Glass clicked!");
    return anim.play();
  })

  anim.onComplete = () => {
    anim.destroy()
  }
  app.stage.addChild(anim);

  const keysDown: Record<string, boolean> = {};

  document.addEventListener("keydown", (e) => {
    keysDown[e.key] = true;
  });
  
  document.addEventListener("keyup", (e) => {
    keysDown[e.key] = false;
  });
  
  app.ticker.add(() => {
    const speed = 1;
    if (keysDown["ArrowUp"]) bunny.y -= speed;
    if (keysDown["ArrowDown"]) bunny.y += speed;
    if (keysDown["ArrowLeft"]) bunny.x -= speed;
    if (keysDown["ArrowRight"]) bunny.x += speed;
  });
  // Listen for animate update
  // app.ticker.add((time) => {
  //   bunny.rotation += 0.01;

  // });

  const displacementTexture = await Assets.load("https://pixijs.com/assets/tutorials/fish-pond/displacement_map.png");
  const displacementTest = new Sprite({
    texture: displacementTexture,
    width: app.screen.width,
    height: app.screen.height,
});

const filter = new DisplacementFilter({
  sprite: displacementTest,
  scale: 50,
});
app.stage.filters = [filter];
})();
