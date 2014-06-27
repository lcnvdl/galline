/**
 * Texture.
 *
 * @type {Texture}
 */
AGE.Res.Texture = GE.Klass(GE.Resource, {

    //  *****************************
    //  Class Definitions
    //  *****************************

    $name: "Texture",

    //  *****************************
    //  Attributes
    //  *****************************

    url: null,

    //  *****************************
    //  Constructor
    //  *****************************

    initialize: function(opts) {
        this.$super(opts);
        this.url = opts.url || '';
    },


    //  *****************************
    //  Methods
    //  *****************************

    load: function(args) {

        this.url = typeof args === 'string' ? args : this.url;

        var $this = this;

        THREE.ImageUtils.loadTexture(this.url, undefined,
            function(result) {
                $this.success(result);
            },
            function(error) {
                $this.fail(error);
            });

        return this;
    }
});