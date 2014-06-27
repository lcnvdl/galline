/**
 * Model.
 *
 * @type {Texture}
 */
AGE.Res.Model = GE.Klass(GE.Resource, {

    //  *****************************
    //  Class Definitions
    //  *****************************

    $name: "Model",

    type: "model",

    $statics: {
        loaders: {
            "dae": THREE.ColladaLoader,
            "obj": THREE.OBJLoader,
            "obj+mtl": THREE.OBJMTLLoader,
            "stl": THREE.STLLoader,
            "vtk": THREE.VTKLoader
        }
    },

    //  *****************************
    //  Attributes
    //  *****************************

    /**
     * Url (or urls in obj+mtl format).
     */
    url: null,

    /**
     * Object with model.
     */
    node: null,

    /**
     * Texture url.
     */
    texture: null,

    /**
     * Selected format.
     */
    format: null,

    //  *****************************
    //  Constructor
    //  *****************************

    initialize: function(opts) {
        this.$super(opts);
        this.url = opts.url || '';
        this.format = (opts.format || this.getUrlExtension() || 'obj').toLowerCase();
    },


    //  *****************************
    //  Methods
    //  *****************************

    getUrlExtension: function() {

        if(typeof this.url === 'array') {
            return "obj+mtl";
        }

        var i = this.url.lastIndexOf(".");

        if(i == -1) {
            return null;
        }

        if(this.url.length - 1== i) {
            return null;
        }

        return this.url.substr(i+1).toLowerCase();
    },

    load: function(args) {

        this.url = typeof args === 'string' ? args : this.url;

        var $this = this,
            loaderClass = AGE.Res.Model.$static.loaders[this.format];

        if(!loaderClass) {
            this.fail("Unknown model format: \""+this.format+"\".");
            return this;
        }

        var loader = new loaderClass(),
            extra = undefined;

        if(this.format == 'ctm') {
            extra = {
                useWorker: true
            };
        }
        else if(this.format == 'dae') {
            loader.options.convertUpAxis = true;
        }

        /*if(this.texture && this.texture != "" ){
            extra = this.texture;
        }*/

        if(typeof this.url === 'string') {

            loader.load(this.url,
                function(result) {
                    $this.success($this.processResult(result));
                }, extra);
        }
        else {
            loader.load(this.url[0], this.url[1],
                function(result) {
                    $this.success($this.processResult(result));
                }, extra);
        }

        return this;
    },

    setMaterial: function(material) {
        console.log(this.node.traverse);
        this.node.traverse(function ( child ) {

            if ( child.material ) {

                /*var shader = THREE.ShaderUtils.lib[ "normal" ];
                var uniforms = THREE.UniformsUtils.clone( shader.uniforms );

                uniforms[ "tDiffuse" ].texture = THREE.ImageUtils.loadTexture( child.material.name + "-color.jpg" );
                uniforms[ "tNormal" ].texture = THREE.ImageUtils.loadTexture( child.material.name + "-normal.jpg" );
                uniforms[ "tSpecular" ].texture = THREE.ImageUtils.loadTexture( child.material.name + "-spec.jpg" );

                uniforms[ "enableDiffuse" ].value = true;
                uniforms[ "enableSpecular" ].value = true;      */

                //child.geometry.computeTangents();

                child.material = material;/*new THREE.ShaderMaterial( {
                    uniforms: uniforms,
                    vertexShader: shader.vertexShader,
                    fragmentShader: shader.fragmentShader,
                    lights: true
                } );*/

            }

        } );
    },

    processResult: function(result) {
        if(this.format == "dae") {
            this.node = result.scene;
            this.node.doubleSided = true;
        }
        else {
            this.node = result;
        }

        return result;
    }
});