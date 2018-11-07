function create3D(elementID, obj) {
  this.div = document.getElementById(elementID);
  document.body.appendChild(this.div);
  this.scene = new THREE.Scene();
  this.camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  this.keyLight = new THREE.DirectionalLight(
    new THREE.Color("hsl(30, 100%, 75%)"),
    1.0
  );
  this.keyLight.position.set(-100, 0, 100);

  this.fillLight = new THREE.DirectionalLight(
    new THREE.Color("hsl(240, 100%, 75%)"),
    0.75
  );
  this.fillLight.position.set(100, 0, 100);

  this.backLight = new THREE.DirectionalLight(0xffffff, 1.0);
  this.backLight.position.set(100, 0, -100).normalize();

  this.scene.add(this.keyLight);
  this.scene.add(this.fillLight);
  this.scene.add(this.backLight);

  this.camera.position.z = 20;

  var self = this;
  this.loader = new THREE.OBJLoader();
  this.loader.load(
    // resource URL
    obj,
    // called when resource is loaded
    function(object) {
      document.getElementById("processing-bar").innerHTML = "<h1>Done!!!</h1>";
      self.scene.add(object);
    },
    // called when loading is in progresses
    function(xhr) {
      document.getElementById("processing-bar").innerHTML =
        "<h1>Đang chạy dữ liệu...</h1>";
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    // called when loading has errors
    function(error) {
      console.log("An error happened");
    }
  );

  this.renderer = new THREE.WebGLRenderer();
  this.renderer.setSize(this.div.offsetWidth, this.div.offsetHeight);
  this.div.appendChild(this.renderer.domElement);

  this.control = new THREE.OrbitControls(this.camera, this.div);
  this.control.zoomSpeed = 10;

  this.render = function() {
    this.renderer.render(this.scene, this.camera);
  };
}

var left = new create3D("left", "model/house.obj");

function animate() {
  requestAnimationFrame(animate);
  left.render();
}

animate();
