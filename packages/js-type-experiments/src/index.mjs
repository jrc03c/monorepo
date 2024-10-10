import { createType } from "./create-type.mjs"
import { createTypedArray } from "./create-typed-array.mjs"
import { defineTypedProperty } from "./define-typed-property.mjs"
import { isOfType } from "./is-of-type.mjs"

if (typeof window !== "undefined") {
  window.JSTypeExperiments = {
    createType,
    createTypedArray,
    defineTypedProperty,
    isOfType,
  }
}

export { createType, createTypedArray, defineTypedProperty, isOfType }
