Object.defineProperties(Room.prototype, {

  my: {
    get() {
      return this.controller && this.controller.my;
    }
  },

  sources: {
    get() {
      return this.find(FIND_SOURCES) || [];
    }
  }

});
