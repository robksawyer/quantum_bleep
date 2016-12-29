var Client = IgeClass.extend({
	classId: 'Client',
	init: function () {
		ige.showStats(1);

		// Load our textures
		var self = this,
			gameTextures = {},
			backgroundTextures = {};

		var env = {
			height: $(window).height(),
			width: $(window).width()
		};

		// Load a game texture here
		backgroundTextures.a1 = new IgeTexture('./assets/backgrounds/landing.jpg');

		///////////////////////////////////////////////////////////////////////////////
		// *** PLEASE READ - BLANK PROJECT RUNNING DETAILS ***
		///////////////////////////////////////////////////////////////////////////////
		// The engine will wait for your textures to load before it starts because
		// of the code below waiting for an "on('texturesLoaded')" before executing.
		// The problem is there are no textures loaded because this is a blank project
		// so if you run this from the index.html the loading symbol will spin forever.
		// I've added an example line (line 11) to show how to load at least one
		// texture into memory but you'll have to provide an image file for it :)
		///////////////////////////////////////////////////////////////////////////////

		// Wait for our textures to load before continuing
		ige.on('texturesLoaded', function () {
			// Create the HTML canvas
			ige.createFrontBuffer(true);

			// Start the engine
			ige.start(function (success) {
				// Check if the engine started successfully
				if (success) {

					//Create the scene
					self.mainScene = new IgeScene2d()
						.id('mainScene');

					// Create a background scene node and apply
					// a background pattern to it using an isometric
					// tile so we set the 4th argument to true. If
					// using a 2d tile, we would set it to false.
					// The 3rd argument true means that as we pan
					// around the viewport with the mouse, the pattern
					// will "track" the camera as if it was the "floor".
					self.backgroundScene = new IgeScene2d()
						.id('backgroundScene')
						//http://www.isogenicengine.com/documentation/IgeEntity_backgroundPattern.html
						.backgroundPattern(backgroundTextures.a1, null, true, false)
						.ignoreCamera(true) // We want the scene to remain static
						.mount(self.mainScene);

					// Create the main viewport and set the scene
					// it will "look" at as the new scene1 we just
					// created above
					self.vp1 = new IgeViewport()
						.addComponent(IgeMousePanComponent)
						.addComponent(IgeMouseZoomComponent)
						.mousePan.enabled(false)
						.id('vp1')
						.width(env.width)
						.height(env.height)
						.scene(self.mainScene)
						.drawBounds(true)
						.mount(ige);

				}
			});
		});
	}
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = Client; }
