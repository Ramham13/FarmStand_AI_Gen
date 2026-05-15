export default { swcMinify: true, webpack: (config) => { config.resolve.future = { ...config.resolve.future, __esModule: true }; return config; } }
