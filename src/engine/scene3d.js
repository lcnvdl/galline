/**
 * Scene with 3D support.
 *
 * @type {Scene3D}
 */
AGE.Scene3D = GE.Klass(GE.Scene, {

    //  *****************************
    //  Class definitions
    //  *****************************

    $name: "Scene3D",

    $type: "scene-3d",

    //  *****************************
    //  Attributes
    //  *****************************

    tCameras: {},

    //  *****************************
    //  Ctor
    //  *****************************

    initialize: function() {
        this.$super();
    },

    //  *****************************
    //  Overrides
    //  *****************************

    start: function(persistents) {

        this.$super(persistents);

        /*if(GE.sizeOf(this.tCameras) == 0) {
            this.addBasicCamera("main", true);
        }*/

    },

    change: function(nextScene, args) {

        var $this = this;

        GE.jQuery.each(this.tCameras, function(k, v) {
            $this.removeCamera(k);
        });

        this.$super(nextScene, args);

    },

    //  *****************************
    //  Methods
    //  *****************************

    addBasicCamera: function(name, enabled, controls) {

        var def = AGE.defaults;

        var cam = new THREE.PerspectiveCamera(
            def.Camera.VIEW_ANGLE,
            GE.engine.tScreen.aspect,
            def.Camera.NEAR,
            def.Camera.FAR);

        cam.position.set(0, 150, 400);
        cam.lookAt(GE.engine.tScene.position);

        //
        //  Controls
        //

        if(typeof controls === 'undefined' || controls)
            cam.controls = new THREE.OrbitControls(cam, GE.engine.tRenderer.domElement );

        if(typeof enabled === 'undefined') {
            enabled = true;
        }

        if(typeof name === 'undefined') {
            name = "default";
        }

        return this.addCamera(cam, name, enabled);
    },

    addCamera: function(camera, name, enabled) {

        if(typeof name === 'undefined' || name === "") {
            throw "The camera must be a name.";
        }

        if(this.tCameras[name]) {
            throw "Camera '"+name+"' already exists.";
        }

        camera.enabled = enabled || false;
        camera.name = name;
        this.tCameras[name] = camera;

        GE.engine.tScene.add(camera);

        return this;
    },

    getCamera: function(name) {
        if(typeof name === 'undefined') {
            var cams = this.tCameras;
            for(var n in cams) {
                if(cams.hasOwnProperty(n)) {
                    if(cams[n].enabled) {
                        return cams[n];
                    }
                }
            }

            return null;
        }
        else {
            return this.tCameras[name];
        }
    },

    removeCamera: function(name) {

        if(!this.tCameras[name]) {
            throw "Camera '"+name+"' doesn't exists.";
        }

        GE.engine.tScene.remove(this.tCameras[name]);
        delete this.tCameras[name];

        return this;
    },

    setCamera: function(name, enabled, alone) {

        if(alone) {
            GE.jQuery.each(this.tCameras, function() {
                if(this.enabled) {
                    this.enabled = false;
                }
            });
        }

        var cam = this.tCameras[name];
        if(cam)
        {
            cam.enabled = enabled;
        }

        return this;
    },

    countCameras: function() {
        return GE.sizeOf(this.tCameras);
    }
});