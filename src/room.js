const THREE = require('three');

exports.room = {
  init(params) {
    this.materials = this.createMaterials();
    this.boxSize = params.boxSize || {x: 1000, y: 1000, z: 200};
    this.room = this.createRoomBox(this.boxSize);
    this.lights = this.createLights(50);
    this.group = new THREE.Group();
    this.group.add(this.room);
    this.lights.forEach(l => {
      this.group.add(l);
    });
  },

  createRoomBox(size) {
    const geometry = new THREE.BoxGeometry(size.x, size.y, size.z);
    const material = new THREE.LineBasicMaterial({
      color: 0x000083,
      linewidth: 1,
      transparent: true,
    });
    const wireGeometry = new THREE.EdgesGeometry(geometry);
    return new THREE.LineSegments(wireGeometry, material);
  },

  createMaterials() {
    const colors = [0xff9090, 0xeef1ff, 0xffffcc, 0x0000ff, 0xff0000, 0x52ff6a];
    return colors.map(c => this.createLightMaterial(c));
  },

  getRandomPointInBox() {
    return {
      x: Math.floor(Math.random() * this.boxSize.x) - this.boxSize.x / 2,
      y: Math.floor(Math.random() * this.boxSize.y) - this.boxSize.y / 2,
      z: Math.floor(Math.random() * this.boxSize.z) - this.boxSize.z / 2,
    };
  },

  createLights(number) {
    const res = [];
    for (let i = 0; i < number; i++) {
      const sphSize = Math.floor(Math.random() * 150);
      const geometry = new THREE.SphereGeometry(sphSize, 8, 8);
      const matInd = Math.floor(Math.random() * this.materials.length);
      const material = this.materials[matInd];
      const pos = this.getRandomPointInBox();
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(pos.x, pos.y, pos.z);
      res.push(mesh);
    }
    return res;
  },

  createLightMaterial(color) {
    return new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });
  },
};
