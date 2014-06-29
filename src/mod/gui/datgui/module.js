//
//  Dat.GUI Module.
//

Gln.Mod.GUI = Gln.Mod.GUI || {};

/**
 *  Dat.GUI implementation.
 *
 *  @class DatGUI
 *  @constructor
 */
Gln.Mod.GUI.DatGUI = GE.Klass(GE.Module, {

    //  *****************************
    //  Class Definitions
    //  *****************************

    $name: "Mod.GUI.DatGUI",

    name: "datgui",

    //  *****************************
    //  Attributes
    //  *****************************

    file: "gui/datgui/dat.gui.min.js",

    //  *****************************
    //  Ctor
    //  *****************************

    initialize: function (file) {

        this.async = true;
        this.file = file || this.file;

        //GE.engine.datgui = this;

    },

    //  *****************************
    //  Overrides
    //  *****************************

    load: function (success, fail) {

        if(!document.dat || !document.dat.gui)  {
            var name = this.name;
            if(typeof TWEEN === 'undefined')  {
                GE.loadScript(GE.Path.combine(Gln.Folders.Modules, this.file))
                    .done(function(){success(name);})
                    .fail(function(){fail(name);});
            }
        }

    },

    dispose: function () {
    }

});

