let vue = {
    root: 'Vue',
    commonjs: 'vue',
    commonjs2: 'vue',
    amd: 'vue'
};
let ams = {
    root: 'ams',
    commonjs: '@ams-team/ams',
    commonjs2: '@ams-team/ams',
    amd: '@ams-team/ams'
};
let element = {
    root: 'ELEMENT',
    commonjs: 'element-ui',
    commonjs2: 'element-ui',
    amd: 'element-ui'
};
let externals = [{
    '@ams-team/ams': ams,
    vue,
    'element-ui': element
}];

exports.externals = externals;

exports.alias = {
    // main: path.resolve(__dirname, "../src"),
    // packages: path.resolve(__dirname, "../packages"),
};

exports.vue = vue;
exports.ams = ams;
exports.element = element;

exports.jsexclude = /node_modules/;

exports.postcss = function(webapck) {
    return [];
};

exports.dev = {
    port: 8082
};
