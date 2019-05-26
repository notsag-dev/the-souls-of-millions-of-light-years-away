const THREE = require('three');
const {room} = require('./room');

exports.mirroredRoom = {
  init(params = {}) {
    this.originalRoom = Object.create(room);
    this.boxSize = params.boxSize || {x:1000, y: 1000, z: 200};
    room.init({
      boxSize: this.boxSize,
    })
    this.group = new THREE.Group();
    this.group.add(this.originalRoom.group);
    this.rooms = this.createRooms(7);
  },

  createRooms(number) {
    for (let x = 0; x <= number * 2; x++) {
      for (let y = -number; y <= number; y++) {
        for (let z = -number; z <= number; z++) {
          const newRoom = this.originalRoom.group.clone();
          newRoom.position.set(x * this.boxSize.x, y * this.boxSize.y, z * this.boxSize.z);
          this.group.add(newRoom);
        }
      }
    }
  }
}
