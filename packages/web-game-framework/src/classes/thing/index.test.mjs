import { Component, Thing } from "./index.mjs"
import { expect, test } from "@jrc03c/fake-jest"
import { isEqual, isUndefined } from "@jrc03c/js-math-tools"

test("test that the `Thing` class works as expected", () => {
  expect(Thing.classRegistry["Component"]).toBe(Component)
  expect(Thing.classRegistry["Thing"]).toBe(Thing)

  const a = new Thing()
  expect(a._children instanceof Array).toBe(true)
  expect(a._children.length).toBe(0)
  expect(a.children instanceof Array).toBe(true)
  expect(a.children.length).toBe(0)
  expect(a._children !== a.children).toBe(true)
  expect(a._components instanceof Array).toBe(true)
  expect(a._components.length).toBe(0)
  expect(a.components instanceof Array).toBe(true)
  expect(a.components.length).toBe(0)
  expect(a._components !== a.components).toBe(true)
  expect(typeof a.id).toBe("string")
  expect(a.id.length).toBe(8)
  expect(isUndefined(a.parent)).toBe(true)
  expect(a.subscriptions instanceof Object).toBe(true)
  expect(Object.keys(a.subscriptions).length).toBe(0)
  expect(Thing.objectRegistry[a.id]).toBe(a)

  const b = new Thing()
  const c = new Thing()
  expect(isEqual(b, c)).toBe(false)
  b.addChild(c)
  expect(b.children.length).toBe(1)
  expect(b.children[0]).toBe(c)
  expect(c.parent).toBe(b)

  const d = new Thing()
  const e = new Component()
  d.addComponent(e)
  expect(d.components.length).toBe(1)
  expect(d.components[0]).toBe(e)
  expect(e.owner).toBe(d)

  const f = new Thing()
  const g = new Thing()
  const h = new Component()
  let addChildEventWasTriggered = false
  let addComponentEventWasTriggered = false
  let copyEventWasTriggered = false
  let destroyEventWasTriggered = false
  let removeChildEventWasTriggered = false
  let removeComponentEventWasTriggered = false

  f.on("add-child", () => {
    addChildEventWasTriggered = true
  })

  f.on("add-component", () => {
    addComponentEventWasTriggered = true
  })

  f.on("copy", () => {
    copyEventWasTriggered = true
  })

  f.on("destroy", () => {
    destroyEventWasTriggered = true
  })

  f.on("remove-child", () => {
    removeChildEventWasTriggered = true
  })

  f.on("remove-component", () => {
    removeComponentEventWasTriggered = true
  })

  f.addChild(g)
  f.addComponent(h)

  expect(f.children.length).toBe(1)
  expect(f.children[0]).toBe(g)
  expect(g.parent).toBe(f)
  expect(f.components.length).toBe(1)
  expect(f.components[0]).toBe(h)
  expect(h.owner).toBe(f)

  f.removeChild(g)
  f.removeComponent(h)

  expect(addChildEventWasTriggered).toBe(true)
  expect(addComponentEventWasTriggered).toBe(true)
  expect(removeChildEventWasTriggered).toBe(true)
  expect(removeComponentEventWasTriggered).toBe(true)

  expect(f.children.length).toBe(0)
  expect(isUndefined(g.parent)).toBe(true)
  expect(f.components.length).toBe(0)
  expect(isUndefined(h.owner)).toBe(true)

  f.copy()
  expect(copyEventWasTriggered).toBe(true)

  const fid = f.id
  const gid = g.id
  const hid = h.id

  f.destroy()
  expect(destroyEventWasTriggered).toBe(true)

  expect(isUndefined(f._children)).toBe(true)
  expect(isUndefined(f._components)).toBe(true)
  expect(isUndefined(f.parent)).toBe(true)
  expect(isUndefined(f.subscriptions)).toBe(true)
  expect(isUndefined(Thing.objectRegistry[fid])).toBe(true)
  expect(isUndefined(Thing.objectRegistry[gid])).toBe(false)
  expect(isUndefined(Thing.objectRegistry[hid])).toBe(false)

  const j = new Thing()
  const k = new Thing()
  const l = new Component()
  j.addChild(k)
  j.addComponent(l)
  const m = j.copy()
  expect(j.children[0].parent).toBe(j)
  expect(j.children[0].parent).not.toBe(m)
  expect(j.components[0].owner).toBe(j)
  expect(j.components[0].owner).not.toBe(m)
  expect(m.children[0].parent).toBe(m)
  expect(m.children[0].parent).not.toBe(j)
  expect(m.components[0].owner).toBe(m)
  expect(m.components[0].owner).not.toBe(j)

  class SecretComponent extends Component {}
  const n = new Thing()
  n.addComponent(new SecretComponent())
  const p = n.copy()
  expect(p.components[0] instanceof SecretComponent).toBe(true)
  expect(n.components[0]).not.toBe(p.components[0])

  const q = new Thing()
  let fooTriggerCount = 0

  q.on("foo", () => {
    fooTriggerCount++
  })

  const r = q.copy()
  q.emit("foo")
  r.emit("foo")
  expect(fooTriggerCount).toBe(2)

  q.destroy()
  expect(() => q.emit("foo")).toThrow()

  r.emit("foo")
  expect(fooTriggerCount).toBe(3)
})
