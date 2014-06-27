var Gln = Gln || {};

Gln.Com = {};

Gln.Mod = {};

Gln.Res = {};

Gln.Entities = {
    Shapes: {},
    Test: {}
};

Gln.defaults = {

    DEBUG: true,

    EXAMPLE: true,

    View: {
        size: [400, 300]    //  Array or string ("screen")
    },

    Renderer: {

        WebGL: {
            antialias: true
        },

        WebGLProperties: {
            shadowMapEnabled: false
        },

        Canvas: {

        }
    },

    Physics: {
        UPS: 60     //  Updates per second
    }
};
