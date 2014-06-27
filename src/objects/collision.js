/**
 *
 * @type {*}
 */
AGE.Collision = GE.Klass({

    entity: null,

    mesh: null,

    initialize: function(entity, mesh) {
        if(typeof entity !== 'undefined')
            this.entity = entity;
        if(typeof mesh !== 'undefined')
            this.mesh = mesh;
    }

});