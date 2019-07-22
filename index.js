const { sync: loadPostcssConfig } = require('postcss-load-config')

module.exports = opts => {
	// prepare configuration
	const pcssConfigCtx = { cwd: __dirname, env: process.env.NODE_ENV }
	const pcssConfigPath = __dirname
	const pcssConfig = safelyLoadPostcssConfig(pcssConfigCtx, pcssConfigPath, opts)

	// rescript configuration used when no PostCSS configuration is present
	const pcssNoopConfig = config => config

	// rescript configuration used when a PostCSS configuration is present
	const pcssUsesConfig = config => {
		forEachPcssLoader(config, loader => {
			// support *.pcss files
			if (loader.test) {
				loader.test = updateCssRegExp(loader.test)
			}

			if (loader.exclude) {
				loader.exclude = updateCssRegExp(loader.exclude)
			}

			// support PostCSS configurations
			loader.use.forEach(use => {
				const isUseConfigurable = typeof use === 'object'

				if (isUseConfigurable) {
					// support "map" configuration
					const shouldUpdateMap = 'map' in pcssConfig.options

					if (shouldUpdateMap) {
						const sourceMap = Boolean(pcssConfig.options.map)

						use.options.sourceMap = sourceMap
					}

					// support "plugins" configuration
					const shouldUpdatePlugins = use.options.plugins && pcssConfig.plugins.length

					if (shouldUpdatePlugins) {
						use.options.plugins = pcssConfig.plugins
					}
				}
			})
		})

		return config
	}

	return pcssConfig ? pcssUsesConfig : pcssNoopConfig
}

function safelyLoadPostcssConfig (ctx, cwd) {
	try {
		/**
		* @params (ctx, path, options)
		* @return {
		* 	plugins,
		* 	options: { cwd, env, ...additionalOptsFromConfigFile },
		* 	file
		* }
		*/
		return loadPostcssConfig(ctx, cwd)
	} catch (error) {
		return null
	}
}

function forEachPcssLoader (config, cb) {
	const filterLoader = array => array.filter(object => JSON.stringify(object).includes('postcss-loader'))

	filterLoader(config.module.rules).forEach(rule => {
		filterLoader(rule.oneOf).forEach(oneOf => {
			cb(oneOf)
		})
	})
}

function updateCssRegExp (prevTestRegExp) {
	const cssRegExp = /\.css/g

	if (cssRegExp.test(prevTestRegExp)) {
		// update \.css references to \.p?css
		const prevTestString = String(prevTestRegExp).slice(1, -1)
		const nextTestString = prevTestString.replace(/\.css/g, '.p?css')
		const nextTestRegExp = new RegExp(nextTestString)

		return nextTestRegExp
	}

	return prevTestRegExp
}
