function dfToJSONString(df, axis) {
  return JSON.stringify(df.toObject(axis))
}

export default dfToJSONString
