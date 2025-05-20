import {
  createTypedArray,
  defineTypedProperty,
} from "@jrc03c/js-type-experiments"

import { makeKey } from "@jrc03c/make-key"

class Thing {
  static classRegistry = {}
  static objectRegistry = {}

  _children = []
  _components = []
  id = ""
  parent = null

  constructor(data) {
    // we'll add the class to the class registry here just in case, but it's
    // really preferable to do it immediately after the class definition!
    if (!this.constructor.classRegistry[this.constructor.name]) {
      this.constructor.classRegistry[this.constructor.name] = this.constructor
    }

    data = data || {}

    const children = createTypedArray(Thing)
    defineTypedProperty(this, "_children", children.constructor)
    this._children = children

    if (data.children) {
      data.children.forEach(child => {
        if (child instanceof Thing) {
          this.addChild(child)
        } else {
          if (!this.constructor.classRegistry[child.className]) {
            throw new Error(
              `An object with a class name of "${child.className}" wants to instantiate itself, but there's no corresponding class in the class registry!`,
            )
          }

          this.addChild(
            new this.constructor.classRegistry[child.className](child),
          )
        }
      })
    }

    const components = createTypedArray(Component)
    defineTypedProperty(this, "_components", components.constructor)
    this._components = components

    if (data.components) {
      data.components.forEach(component => {
        if (component instanceof Component) {
          this.addComponent(component)
        } else if (component.className) {
          if (!this.constructor.classRegistry[component.className]) {
            throw new Error(
              `A component with a class name of "${component.className}" wants to instantiate itself, but there's no corresponding class in the class registry!`,
            )
          }

          this.addComponent(
            new this.constructor.classRegistry[component.className](component),
          )
        }
      })
    }

    defineTypedProperty(this, "id", "string")
    this.id = data.id || makeKey(8)

    while (this.constructor.objectRegistry[this.id]) {
      this.id += "_copy"
    }

    this.constructor.objectRegistry[this.id] = this

    defineTypedProperty(this, "parent", Thing)

    if (data.parent) {
      if (data.parent instanceof Thing) {
        this.parent = data.parent
      }

      if (typeof data.parent === "string") {
        this.parent = this.constructor.objectRegistry[data.parent]
      }
    }
  }

  get children() {
    return Array.from(this._children)
  }

  set children(value) {
    throw new Error(
      "The `Thing.children` property is read-only! To add or remove children, use the `Thing.addChild` and `Thing.removeChild` methods.",
    )
  }

  get components() {
    return Array.from(this._components)
  }

  set components(value) {
    throw new Error(
      "The `Thing.components` property is read-only! To add or remove components, use the `Thing.addComponent` and `Thing.removeComponent` methods.",
    )
  }

  addChild(child) {
    if (!this._children.includes(child)) {
      this._children.push(child)
      child.parent = this
    }

    return this
  }

  addComponent(component) {
    if (!this._components.includes(component)) {
      this._components.push(component)
      component.owner = this
    }

    return this
  }

  copy() {
    return new this.constructor(this.toObject())
  }

  destroy() {
    this._children.forEach(c => c.destroy())
    this._children = null
    this._components.forEach(c => c.destroy())
    this._components = null
    this.parent = null
    delete this.constructor.objectRegistry[this.id]
    return this
  }

  removeChild(child) {
    if (this._children.includes(child)) {
      while (this._children.includes(child)) {
        this._children.splice(this._children.indexOf(child), 1)
      }

      child.parent = null
    }

    return this
  }

  removeComponent(component) {
    if (this._components.includes(component)) {
      while (this._components.includes(component)) {
        this._components.splice(this._components.indexOf(component), 1)
      }

      component.owner = null
    }

    return this
  }

  toObject() {
    return {
      className: this.constructor.name,
      children: Array.from(this._children.map(c => c.toObject())),
      components: Array.from(this._components.map(c => c.toObject())),
      id: this.id,
      parent: this.parent ? this.parent.id : undefined,
    }
  }

  update() {
    this._children.forEach(c => c.update(...arguments))
    this._components.forEach(c => c.update(...arguments))
    return this
  }
}

class Component extends Thing {
  _owner = null

  constructor(data) {
    super(...arguments)
    data = data || {}

    defineTypedProperty(this, "_owner", Thing)

    if (data.owner) {
      if (data.owner instanceof Thing) {
        this._owner = data.owner
      }

      if (typeof data.owner === "string") {
        this._owner = this.constructor.objectRegistry[data.owner]
      }
    }
  }

  // i've added these getters and setters so that subclasses can override them
  // to add functionality to and remove functionality from owners
  get owner() {
    return this._owner
  }

  set owner(v) {
    this._owner = v
  }

  destroy() {
    const out = super.destroy()
    this._owner = null
    return out
  }

  toObject() {
    return {
      ...super.toObject(),
      owner: this._owner ? this._owner.id : undefined,
    }
  }
}

Thing.classRegistry["Component"] = Component
Thing.classRegistry["Thing"] = Thing
export { Component, Thing }
