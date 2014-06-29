//
//  Sole Tween Module.
//

Gln.Mod.Animation = Gln.Mod.Animation || {};

/**
 *  Dat.GUI implementation.
 *
 *  @class DatGUI
 *  @constructor
 */
Gln.Mod.Animation.Tween = GE.Klass(GE.Module, {

    //  *****************************
    //  Class Definitions
    //  *****************************

    $name: "Gln.Mod.Animation.Tween",

    name: "tween",

    //  *****************************
    //  Attributes
    //  *****************************

    file: "animation/tween/tween.min.js",

    pause: false,

    //  *****************************
    //  Ctor
    //  *****************************

    initialize: function (file) {

        this.async = true;
        this.file = file || this.file;

        //  TODO Tween is not working

        GE.engine.tween = this;
    },

    //  *****************************
    //  Overrides
    //  *****************************

    load: function (success, fail) {

        var name = this.name,
            $this = this;

        if(typeof TWEEN === 'undefined')  {
            GE.loadScript(GE.Path.combine(Gln.Folders.Modules, this.file))
                .done(function(){
                    success(name);
                    GE.engine.on("mod_tween", $this, GE.Events.Engine.POSUPDATE, $this.update);
                })
                .fail(function(){
                    fail(name);
                });
        }

    },

    dispose: function () {
        GE.engine.off("mod_tween", "all");
        TWEEN.removeAll();
    },

    //  *****************************
    //  Functions
    //  *****************************
    update: function() {
        if(!this.pause)
            TWEEN.update();
    }

});

