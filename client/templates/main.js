Meteor.startup(function() {

  var Engine = famous.core.Engine;
  var Surface = famous.core.Surface;
  var Modifier = famous.core.Modifier;
  var RenderNode = famous.core.RenderNode;
  var Transform = famous.core.Transform;
  var Quaternion = famous.math.Quaternion;

  var mainContext = Engine.createContext();

  var CanvasSurface = famous.surfaces.CanvasSurface;

  // The axis of the rotation is a Left Hand Rule vector with X Y Z (i j k) components
  var quaternion = new Quaternion(1, 0, 0, 0);
  var smallQuaternion = new Quaternion(185, 1, 1, 1);

  var rotationModifier = new Modifier({
      origin: [.5, .5],
      align: [.5, .5]
  });

  // Bind the box's rotation to the quaternion
  rotationModifier.transformFrom(function() {
      return quaternion.getTransform();
  });

  mainContext.add(rotationModifier)
             .add(createBox(260, 260, 260));

  // This is where the rotation is created
  Engine.on('prerender', function() {
      // You combine rotations through quaternion multiplication
      quaternion = quaternion.multiply(smallQuaternion);
  });

  Engine.on('click', function() {
      var x = (Math.random() * 2) - 1;
      var y = (Math.random() * 2) - 1;
      var z = (Math.random() * 2) - 1;
      smallQuaternion = new Quaternion(185, x, y, z);
  });

  // Creates box renderable
  function createBox(width, height, depth) {
      var box = new RenderNode();

      function createSide(params, type){
        var surface;
        if (type === 'Canvas')
        {
            surface = new CanvasSurface({
              size: params.size
            });

            Meteor.setTimeout(function() {
              ThreeCube.make(surface._element);
            }, 1000);
        }

        var modifier = new Modifier({
            transform: params.transform
        });

        box.add(modifier).add(surface);
      };

      // Front
      createSide({
          size: [width, height],
          transform: Transform.translate(0, 0, depth / 2)
      }, 'Canvas');

      // Back
      createSide({
          size: [width, height],
          transform: Transform.multiply(Transform.translate(0, 0, - depth / 2), Transform.multiply(Transform.rotateZ(Math.PI), Transform.rotateX(Math.PI))),
      }, 'Canvas');

      // Top
      createSide({
          size: [width, depth],
          transform: Transform.multiply(Transform.translate(0, -height / 2, 0), Transform.rotateX(Math.PI/2)),
      }, 'Canvas');

      // Bottom
      createSide({
          size: [width, depth],
          transform: Transform.multiply(Transform.translate(0, height / 2, 0), Transform.multiply(Transform.rotateX(-Math.PI/2), Transform.rotateZ(Math.PI))),
      }, 'Canvas');

      // Left
      createSide({
          size: [depth, height],
          transform: Transform.multiply(Transform.translate(-width / 2, 0, 0), Transform.rotateY(-Math.PI/2))
      }, 'Canvas');

      // Right
      createSide({
          size: [depth, height],
          transform: Transform.multiply(Transform.translate(width / 2, 0, 0), Transform.rotateY(Math.PI/2))
      }, 'Canvas');

      return box;
  }

});
