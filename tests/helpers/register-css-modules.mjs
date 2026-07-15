import * as nodeModule from 'node:module'

const cssModuleSource =
  'export default new Proxy({}, { get: (_, key) => String(key) })'

const hooks = {
  resolve(specifier, context, nextResolve) {
    if (specifier.endsWith('.css')) {
      return {
        url: new URL(specifier, context.parentURL).href,
        shortCircuit: true,
      }
    }
    return nextResolve(specifier, context)
  },
  load(url, context, nextLoad) {
    if (url.endsWith('.css')) {
      return {
        format: 'module',
        source: cssModuleSource,
        shortCircuit: true,
      }
    }
    return nextLoad(url, context)
  },
}

const forceRegisterFallback =
  process.env.CLOUDTOPIA_FORCE_CSS_REGISTER_FALLBACK === '1'

if (!forceRegisterFallback && typeof nodeModule.registerHooks === 'function') {
  nodeModule.registerHooks(hooks)
} else {
  const requireForCss = nodeModule.createRequire(import.meta.url)
  requireForCss.extensions['.css'] = (loadedModule) => {
    loadedModule.exports = {
      __esModule: true,
      default: new Proxy({}, { get: (_, key) => String(key) }),
    }
  }

  const loaderSource = `
    const cssModuleSource = ${JSON.stringify(cssModuleSource)};
    export async function resolve(specifier, context, nextResolve) {
      if (specifier.endsWith('.css')) {
        return {
          url: new URL(specifier, context.parentURL).href,
          shortCircuit: true,
        };
      }
      return nextResolve(specifier, context);
    }
    export async function load(url, context, nextLoad) {
      if (url.endsWith('.css')) {
        return {
          format: 'module',
          source: cssModuleSource,
          shortCircuit: true,
        };
      }
      return nextLoad(url, context);
    }
  `

  nodeModule.register(
    `data:text/javascript,${encodeURIComponent(loaderSource)}`,
    import.meta.url,
  )
}
