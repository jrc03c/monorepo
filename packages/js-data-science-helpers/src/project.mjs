import {
  assert,
  dot,
  isArray,
  isSeries,
  scale,
  Series,
  shape,
} from "@jrc03c/js-math-tools"

function project(v, u) {
  if (isSeries(v)) {
    if (isSeries(u)) {
      return new Series(project(v.values, u.values))
    } else {
      const out = v.copy()
      out.values = project(v.values, u)
      return out
    }
  }

  if (isSeries(u)) {
    const out = u.copy()
    out.values = project(v, u.values)
    return out
  }

  assert(isArray(v), "`project` only works on vectors!")
  assert(isArray(u), "`project` only works on vectors!")
  assert(shape(v).length === 1, "`project` only works on vectors!")
  assert(shape(u).length === 1, "`project` only works on vectors!")
  return scale(Number(dot(u, v)) / Number(dot(u, u)), u)
}

export { project }
