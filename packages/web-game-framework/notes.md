# notes

## ontology

this is my little attempt to create an ontology. it'll be very similar to unity's because that's where i started learning game dev.

1. **game:** a _game_ is a collection of scenes. only one scene can play at a time, and the game is responsible for switching between scenes. a game holds a reference to a canvas; and while it doesn't itself draw on the canvas, it passes the canvas to the scene when the scene is initialized.
2. **scene:** a _scene_ holds a collection of game objects and draws on a canvas. it's responsible for starting, pausing, and stopping the primary update-and-draw loop. at the beginning of each loop, it computes how much time has elapsed since the previous loop, resets & clears the canvas, then passes the elapsed time and canvas reference to each of its game objects so that they can update themselves and draw on the canvas.
3. **game object:** a _game object_ is an entity that does something interesting while the scene is playing. that will probably usually involve drawing something to the canvas, though that's not necessary. a game object could be a gui element, a sprite, a physics entity, etc. each game object has a collections of components and a collection of child game objects.
4. **component:** a _component_ is a little unit that adds functionality to a game object. this makes it possible to mix-and-match functionality without having to worry about creating a robust taxonomy / hierarchy / inheritance scheme of game objects, which could easily grow complicated when trying to make sure the right functionality ends up at the right level, etc.

in the godot engine (based on my _very_ limited experience with it), everything is a "scene" (or a "node"? now i'm not sure...). as i look back over my notes above, there's something appealing about the idea of having an extremely simply ontology that consists only of a single kind of thing. i'm tempted to try to do something similar, and i'm not actually sure yet which entity system would be easier to think about and manage. anyway, i'm just mentioning godot's system here as a point of comparison in case it makes sense later to switch from one to the other.

## html & css

my initial strategy, whenever i restart this kind of thing, is to draw everything to the `<canvas>`. but chris mccormick makes the strong case that many games can be built in html and css, with js added for functionality. there are a few advantages to this approach:

1. gui things are extremely easy. the browser's whole thing is gui, so buttons, forms, images, etc., are all extremely simple to add. creating gui things in the `<canvas>`, on the other hand, requires a ton of boilerplate and reinvention of the wheel. also, transformations, especially involving child elements, are extremely easy to accomplish with some simple css.
2. css animations a free. again, writing animations in js requires lots of boilerplate and wheel reinventions. also, css animations are (i think) hardware-accelerated, which means they're automatically very smooth and performant.
3. the dom is a hierarchical model, which matches how games often work.
