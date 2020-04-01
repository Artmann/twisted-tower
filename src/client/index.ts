import io from 'socket.io-client';

type ImageLibrary = { [index: string]: HTMLImageElement };

interface Assets {
  images: ImageLibrary;
}

function loadImage(name: string): Promise<HTMLImageElement> {
  const url = `/assets/images/${ name }.png`;

  const image = new Image();

  return new Promise((resolve) => {
    image.onload = () => {
      resolve(image);
    };

    image.src = url;
  });
}

async function loadImages(): Promise<ImageLibrary> {
  const names = ['bricks1', 'bricks2', 'bricks3'];
  const images = await Promise.all(names.map(loadImage));

  return names
    .map((name, i) => ({ name, image: images[i] }))
    .reduce((carry: { [index:string]: HTMLImageElement}, item) => {
      carry[item.name] = item.image;

      return carry;
    }, {});
}

async function loadAssets(): Promise<Assets> {
  const images = await loadImages();

  return {
    images
  };
}

function setupRendering(assets: Assets) {
  const canvas = <HTMLCanvasElement> document.getElementById('canvas');
  const context = canvas.getContext('2d');

  if (!context) {
    console.error('Could not initialize context.');

    return;
  }

  const draw = () => {
    const { innerWidth: windowWidth, innerHeight: windowHeight } = window;
    const gameWidth = windowWidth;
    const gameHeight = gameWidth / 16 * 9;
    const sceneWidth = 48;
    const sceneHeight = 27;
    const unit = { x: gameWidth / sceneWidth, y: gameHeight / sceneHeight };
    const offsetTop = windowHeight / 2 - gameHeight / 2;
    const dpi = window.devicePixelRatio;

    canvas.style.top = `${ offsetTop }px`;

    let styleHeight = +getComputedStyle(canvas).getPropertyValue('height').slice(0, -2);
    let styleWidth = +getComputedStyle(canvas).getPropertyValue('width').slice(0, -2);

    canvas.setAttribute('height', `${ styleHeight * dpi }px`);
    canvas.setAttribute('width', `${ styleWidth * dpi }px`);

    context.fillStyle = '#c444b7';
    context.fillRect(0, 0, gameWidth, gameHeight);

    const images = ['bricks1', 'bricks2', 'bricks1', 'bricks1', 'bricks3', 'bricks1'];

    for (let x = 0; x < gameWidth; x++) {
      for (let y = 0; y < 100; y++) {
        const image = images[(x + y) % images.length];

        const sx = unit.x * 2;
        const sy = unit.y * 2;

        context.drawImage(assets.images[image], x * sx, y * sy, sx, sy);
      }
    }

    requestAnimationFrame(() => {
      draw();
    })
  };

  draw();
}


function joinGame() {
  const socket = io();

  socket.on('connect', function() {
    console.log('Connected to server.');
  });

  socket.on('GameStarted', () => {
    console.log('Game Started');
  });
}


(async function() {

  const assets = await loadAssets();

  setupRendering(assets);
  console.log('Hello World');

  joinGame();
})();

