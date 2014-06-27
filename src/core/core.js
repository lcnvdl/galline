Gln.Engine = GE.Klass(GE.Engine, {

    $name: "Gln.Engine",

    tClock: null,
    gRenderer: null,
    gContainer: null,
    gScene: null,
    tControls: null,
    tEffects: null,
    gRenderFn: null,
    tAssignedRenderer: null,

    gScreen: {
        w: 0,
        h: 0,
        aspect: 0
    },

    initialize: function(containerId) {
        this.$super();

        if(typeof containerId === 'undefined') {
            containerId = "game-container";
            GE.jQuery("<div>").attr("id", containerId).appendTo("body");
        }

        if(containerId.indexOf("#") != 0) {
            containerId = "#" + containerId;
        }

        this.gContainer = GE.jQuery(containerId);
        this.trigger(GE.Events.Engine.READY);
    },

    start: function(args) {

        //
        //  Preparation
        //

        var def = Gln.defaults;

        this.tClock = new THREE.Clock();
        this.gScene = new PIXI.Stage(0x66FF99);
        
        var size = def.View.size;
        
        if(typeof size === 'string') {
            if(size == "screen") {
                this.gScreen.w = window.innerWidth;
                this.gScreen.h = window.innerHeight; 
            }
            else {
                throw "Invalid size";
            }
        }
        else {
            this.gScreen.x = size[0];
            this.gScreen.y = size[1];
        }
        
        this.gScreen.aspect = this.gScreen.w/this.gScreen.h;

        //
        //  Renderer
        //

        this.gRenderer = PIXI.autoDetectRenderer(400, 300);
        this.gRenderFn = this.__render;

        this.gContainer.append(this.gContainer.view);

        if(def.DEBUG && Stats) {

            var stats = new Stats();
            stats.domElement.style.position = 'absolute';
            stats.domElement.style.bottom = '0px';
            stats.domElement.style.zIndex = 100;
            this.gContainer.append( stats.domElement );

            this.on("stats", stats, GE.Events.Engine.POSUPDATE, function() {
                this.update();
            });

        }

        //
        //  Start
        //
        
        var $this = this;

        this.$super(args, function() {

            $this.trigger(GE.Events.Engine.START);
            $this.animate();

        });

        return this;
    },

    animate: function() {
        requestAnimationFrame( function() {GE.engine.animate();} );

        this.render();
        this.update(this.tClock.getDelta());
    },

    /**
     * Adds an effect.
     *
     * @param name
     * @param [opts]
     * @param [fn]
     * @returns {*}
     */
    addEffect: function(name, opts, fn) {

        return this;
    },

    clearEffects: function() {

        return this;
    },

    getScreen: function() {
        return {
            width: this.gScreen.w,
            height: this.gScreen.h
        };
    },

    updateScreenSize: function() {
        /*var e = GE.engine,
            assigned = e.tAssignedRenderer,
            renderer = e.tRenderer,
            w = window.innerWidth,
            h = window.innerHeight,
            a = w/h;

        renderer.setSize( w, h );

        if(assigned != renderer && typeof assigned.setSize !== 'undefined') {
            assigned.setSize(w, h);
        }

        GE.jQuery.each(e.getSceneCameras(), function(name, cam) {
            cam.aspect = a;
            cam.updateProjectionMatrix();
        });*/
    },

    render: function() {
        var scene = this.getCurrentScene();

        if(!scene)
            return;

        this.tRenderFn();
    },

    __render: function() {

        var renderer = this.tRenderer,
            world = this.tScene;
            
        renderer.render(world);

    }
});