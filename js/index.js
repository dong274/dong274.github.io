class create3D {
  constructor(element, color) {
    this.div = document.getElementById(element);
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(color);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.div.offsetWidth, this.div.offsetHeight);
    this.div.appendChild(this.renderer.domElement);
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.div.offsetWidth / this.div.offsetHeight,
      1,
      1000
    );
    this.camera.position.set(400, 200, 0);
    this.controls = new THREE.MapControls(
      this.camera,
      this.renderer.domElement
    );
    this.controls.maxPolarAngle = Math.PI / 2;
    var light = new THREE.DirectionalLight(0xffffff);
    light.position.set(1, 1, 1);
    this.scene.add(light);
    var light = new THREE.DirectionalLight(0x002288);
    light.position.set(-1, -1, -1);
    this.scene.add(light);
    var light = new THREE.AmbientLight(0x222222);
    this.scene.add(light);

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
  }
  getScene() {
    return this.scene;
  }
  getCamera() {
    return this.camera;
  }
  getRender() {
    this.renderer.render(this.scene, this.camera);
  }
  getControl() {
    return this.controls;
  }
  reSize() {
    this.camera.aspect = this.div.offsetWidth / this.div.offsetHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.div.offsetWidth, this.div.offsetHeight);
  }
}

var content1 = new create3D("content1", "#f4d742");

var geometry = new THREE.BoxBufferGeometry(1, 1, 1);
geometry.translate(0, 0.5, 0);
var material = new THREE.MeshPhongMaterial({
  map: new THREE.TextureLoader().load("model/building.jpg"),
  color: 0xffffff,
  flatShading: true
});
var buldings = [];
for (let i = 0; i < 100; i++) {
  let mesh = new THREE.Mesh(geometry, material.clone());
  mesh.position.x = Math.random() * 1600 - 800;
  mesh.position.y = 0;
  mesh.position.z = Math.random() * 1600 - 800;
  mesh.scale.x = 50;
  mesh.scale.y = Math.random() * 100 + 50;
  mesh.scale.z = 50;
  mesh.updateMatrix();
  mesh.matrixAutoUpdate = false;
  buldings.push(mesh);
  content1.getScene().add(mesh);
}

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var selectedObject = null;
function onclick(event) {
  mouse.x = (event.offsetX / content1.div.offsetWidth) * 2 - 1;
  mouse.y = -(event.offsetY / content1.div.offsetHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, content1.getCamera());
  var intersects = raycaster.intersectObjects(buldings);
  if (intersects.length > 0) {
    if (selectedObject == null) {
      selectedObject = intersects[0].object;
      selectedObject.material.color.set("#c11111");
      getDetail(selectedObject);
    } else {
      selectedObject.material.color.set("#ffffff");
      selectedObject = intersects[0].object;
      selectedObject.material.color.set("#c11111");
      getDetail(selectedObject);
    }
  } else {
    if (selectedObject == null) {
      console.log("missed");
    } else {
      selectedObject.material.color.set("#ffffff");
      selectedObject = null;
    }
  }
}
content1.div.addEventListener("click", onclick, false);

function animate() {
  requestAnimationFrame(animate);
  content1.getControl().update();
  content1.getRender();
}
animate();

function getDetail(object) {
  var chart = document.getElementById("content2");
  chart.innerHTML = "<b>ID: </b> " + object.uuid;
}
