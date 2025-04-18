// NOTE: The `sitemapUrls` property of this class refers to URLs at which
// sitemaps are located, not URLs contained within sitemaps!

import { stringify } from "@jrc03c/js-text-tools"

class RobotsConfig {
  botRules = {}
  raw = ""
  sitemapUrls = []

  static parse(raw) {
    const regexifyRuleString = rule => {
      return rule === "*"
        ? rule
        : new RegExp(rule.replaceAll(".", "\\.").replaceAll("*", "(.*?)"))
    }

    const lines = raw
      .split("\n")
      .map(line => line.trim())
      .filter(line => line.length > 0 && !line.match(/^\s*?#/g))

    const config = new RobotsConfig()
    config.raw = raw

    let agent = null

    for (const line of lines) {
      if (line.toLowerCase().trim().startsWith("user-agent")) {
        agent = line.split(":").slice(1).join(":").trim()
        config.botRules[agent] = {}
      }

      const lowerLine = line.toLowerCase().trim()

      if (agent) {
        if (
          lowerLine.match(/^\s*allow\s*:/gim) ||
          lowerLine.match(/^\s*disallow\s*:/gim)
        ) {
          const key = lowerLine.split(":")[0].trim()
          const rule = line.split(":").slice(1).join(":").trim()
          const patterns = rule.split(",").map(rule => regexifyRuleString(rule))

          if (!config.botRules[agent][key]) {
            config.botRules[agent][key] = []
          }

          config.botRules[agent][key] =
            config.botRules[agent][key].concat(patterns)
        }
      }

      if (lowerLine.match(/^\s*sitemap\s*:/gim)) {
        const sitemap = line.split(":").slice(1).join(":").trim()
        config.sitemapUrls.push(sitemap)
      }
    }

    return config
  }

  isAllowed(bot, path) {
    if (!this.botRules[bot]) {
      if (this.botRules["*"]) {
        bot = "*"
      } else {
        return true
      }
    }

    if (this.botRules[bot].allow) {
      for (const pattern of this.botRules[bot].allow) {
        if (path.match(pattern)) {
          return true
        }
      }
    }

    if (this.botRules[bot].disallow) {
      for (const pattern of this.botRules[bot].disallow) {
        if (path.match(pattern)) {
          return false
        }
      }
    }

    return true
  }

  toString() {
    const botRulesOut = {}

    Object.keys(this.botRules).forEach(agent => {
      botRulesOut[agent] = {}

      Object.keys(this.botRules[agent]).forEach(key => {
        botRulesOut[agent][key] = this.botRules[agent][key].map(v =>
          stringify(v),
        )
      })
    })

    return stringify(
      {
        botRules: botRulesOut,
        raw: this.raw,
        sitemapUrls: this.sitemapUrls,
      },
      ...arguments,
    )
  }
}

export { RobotsConfig }
