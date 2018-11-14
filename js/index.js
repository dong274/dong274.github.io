var div = document.getElementById("content");
var new3D = new create3D(div, 500);
var controls = new THREE.MapControls(
  new3D.getCamera(),
  new3D.getRenderer().domElement
);
var domEvent = new THREEx.DomEvents(
  new3D.getCamera(),
  new3D.getRenderer().domElement
);

var mtlLoader = new THREE.MTLLoader();
mtlLoader.load("model/odm_textured_model.mtl", function(materials) {
  materials.preload();

  var objLoader = new THREE.OBJLoader();
  objLoader.setMaterials(materials);
  objLoader.load(
    "model/odm_textured_model.obj",
    function(object) {
      domEvent.addEventListener(object, "click", () => {
        object.traverse(function(child) {
          if (child instanceof THREE.Mesh) {
            var phongMaterial = new THREE.MeshPhongMaterial({
              color: 0xffffff,
              specular: 0x111111,
              shininess: 5
            });
            child.material = phongMaterial;
            child.receiveShadow = true;
            child.castShadow = true;
          }
          document.getElementById("content2").innerHTML =
            "<h1>Texture is removed</h1>";
        });
        console.log("clicked");
      });
      new3D.getScene().add(object);
      object.position.set(0, 0, 0);
      document.getElementById("content2").innerHTML =
        "<h1>Click to object to remove texture</h1>";
    },
    function(xhr) {
      document.getElementById("progress-bar").innerHTML =
        (xhr.loaded / xhr.total) * 100 + "% loaded";
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    }
  );
});

//var controls = new THREE.OrbitControls(create3d.getScene(), div);

function animate() {
  requestAnimationFrame(animate);
  new3D.getRenderer().render(new3D.getScene(), new3D.getCamera());
  controls.update();
}

animate();
