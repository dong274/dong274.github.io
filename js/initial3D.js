class create3D {
  constructor(element, cameraPostion) {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
      75,
      element.offsetWidth / element.offsetHeight,
      0.1,
      1000
    );
    camera.position.z = cameraPostion;
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(element.offsetWidth, element.offsetHeight);
    renderer.setClearColor(0xccccff);
    element.appendChild(renderer.domElement);
    var directionalLight = new THREE.DirectionalLight(0xffeedd);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
  }
  getScene() {
    return this.scene;
  }
  addScene(obj) {
    this.scene.add(obj);
  }
  getCamera() {
    return this.camera;
  }
  getRenderer() {
    return this.renderer;
  }
}

class loadObject {
  constructor(mtl, obj, progress) {
    var loadedObject = [];

    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.load(mtl, function(materials) {
      materials.preload();
      var objLoader = new THREE.OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.load(
        obj,
        function(object) {
          loadedObject.push(object);
        },
        function(xhr) {
          document.getElementById(progress).innerHTML =
            (xhr.loaded / xhr.total) * 100 + "% loaded";
          console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        }
      );
    });

    this.loadedObject = loadedObject;
  }
  getLoadedObject() {
    return this.loadedObject[0];
  }
}
