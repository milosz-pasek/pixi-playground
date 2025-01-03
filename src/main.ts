import { Application, Assets, Sprite } from "pixi.js";

(async () => {
  // Create a new application
  const app = new Application();

  // Initialize the application
  await app.init({ background: "#1099bb", resizeTo: window });

  // Append the application canvas to the document body
  document.getElementById("pixi-container")!.appendChild(app.canvas);

  // Load the bunny texture
  const texture = await Assets.load("/assets/bunny.png");

  // Create a bunny Sprite
  const bunny = new Sprite(texture);
  bunny.on("pointerdown", (e) => {
    console.log("Bunny clicked!");
  });
  bunny.eventMode = "static";
  // Center the sprite's anchor point
  bunny.anchor.set(0.5);
  // Move the sprite to the center of the screen
  bunny.position.set(app.screen.width / 2, app.screen.height / 2);

  // Add the bunny to the stage
  app.stage.addChild(bunny);

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
  app.ticker.add((time) => {
    // Just for fun, let's rotate mr rabbit a little.
    // * Delta is 1 if running at 100% performance *
    // * Creates frame-independent transformation *
    bunny.rotation += 0.05 * time.deltaTime;
  });
})();
