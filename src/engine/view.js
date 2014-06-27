/**
 * View. Used for multiple views.
 *
 * @type {View}
 */
AGE.View = GE.Klass(GE.Entity, {

    //  *****************************
    //  Class definitions
    //  *****************************

    $name: "View",

    $type: "view",

    //  *****************************
    //  Attributes
    //  *****************************

    left: 0,
    bottom: 0,
    width: 0.5,
    height: 1.0,
    background: new THREE.Color().setRGB( 0, 0, 0 ),
    eye: [ 0, 300, 1800 ],
    up: [ 0, 1, 0 ],
    fov: 30,
    far: 1000,
    closer: 1,
    aspect: 0,
    camera: null,

    //  *****************************
    //  Engine events
    //  *****************************

    onCreate: function() {

        //   Disables the main camera
        GE.engine.setCamera("main", false);

        //  Creates the camera
        if(!this.camera) {
            var camera = new THREE.PerspectiveCamera(
                this.fov, this.aspect, this.closer, this.far );

            this.camera = camera;
        }

        //  Set values
        this.camera.position.x = this.eye[ 0 ];
        this.camera.position.y = this.eye[ 1 ];
        this.camera.position.z = this.eye[ 2 ];
        this.camera.up.x = this.up[ 0 ];
        this.camera.up.y = this.up[ 1 ];
        this.camera.up.z = this.up[ 2 ];

        //  Adds the camera to engine
        GE.engine.addCamera(
            this.camera,
            "view_"+this.getId(),
            (typeof this.camera.enabled !== 'undefined') ?
                this.camera.enabled : false)

    },

    onDelete: function() {

        //  Deletes the camera from engine

        GE.engine.removeCamera("view_"+this.getId());

    },

    //  *****************************
    //  Ctor
    //  *****************************

    initialize: function(args) {
        this.$super();

        var view = this;

        GE.jQuery.each(args, function(k, v) {
            view[k] = v || view[k];
        });

        if(this.aspect == 0) {
            this.aspect = window.innerWidth / window.innerHeight;
        }
    },

    //  *****************************
    //  Methods
    //  *****************************

    enable: function(enabled) {
        if(typeof enabled === 'undefined')
            return this.camera.enabled;

        this.camera.enabled = enabled;

        return this;
    },

    render: function() {
        var view = this,
            camera = this.camera,
            renderer = GE.engine.tRenderer;

        //view.updateCamera( camera, scene, mouseX, mouseY );

        var left   = Math.floor( windowWidth  * view.left );
        var bottom = Math.floor( windowHeight * view.bottom );
        var width  = Math.floor( windowWidth  * view.width );
        var height = Math.floor( windowHeight * view.height );
        renderer.setViewport( left, bottom, width, height );
        renderer.setScissor( left, bottom, width, height );
        renderer.enableScissorTest ( true );
        renderer.setClearColor( view.background );

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.render( GE.engine.getCurrentScene(), camera );
    }
});