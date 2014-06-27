/**
 * Generic resource.
 *
 * @type {Generic}
 */
AGE.Res.Generic = GE.Klass(GE.Resource, {

    //  *****************************
    //  Class Definitions
    //  *****************************

    $name: "Generic",

    //  *****************************
    //  Attributes
    //  *****************************

    fn: null,

    //  *****************************
    //  Constructor
    //  *****************************

    initialize: function(opts) {
        this.$super(opts);
        this.fn = opts.fn || null;
    },


    //  *****************************
    //  Methods
    //  *****************************

    load: function(args) {

        if(this.fn) {
            this.fn(this);
        }

        this.loaded = true;

        return this;
    }
});