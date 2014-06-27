/**
 * Game object with a scene node associated.
 *
 * @type {Entity3D}
 */
AGE.Entity3D = GE.Klass(GE.Entity, {

    //  *****************************
    //  Class definitions
    //  *****************************

    $name: "Entity3D",

    $type: "entity-3d",

    //  *****************************
    //  Attributes
    //  *****************************

    tNode: null,

    //  *****************************
    //  Engine events (only for
    //      generics game entities)
    //  *****************************

    onCreate: function() {

        if(this.tNode == null) {
            this.setNode(new THREE.Object3D());
        }
    },

    onDelete: function() {

        this.deleteNode();

    },

    //  *****************************
    //  Ctor
    //  *****************************

    initialize: function() {
        this.$super();
    },

    //  *****************************
    //  Methods
    //  *****************************

    /**
     * Links the object as node of another.
     */
    attachTo: function(root) {
        GE.efp(root).attach(this);
        return this;
    },

    detachFrom: function(root) {
        GE.efp(root).detach(this);
        return this;
    },

    /**
     * Links the object as root of another.
     */
    attach: function(node) {
        this.add(GE.efp(node).tNode);
        return this;
    },

    detach: function(node) {
        this.remove(GE.efp(node).tNode);
        return this;
    },

    add: function(object) {
        this.tNode.add(object);
        return this;
    },

    remove: function(object) {
        this.tNode.remove(object);
        return this;
    },

    setNode: function(object) {
        this.deleteNode();

        this.tNode = object;
        this.tNode.entity = this;

        GE.engine.tScene.add(this.tNode);
        return this;
    },

    deleteNode: function() {
        if (this.tNode) {
            this.tNode.parent.remove(this.tNode);
            delete this.tNode;
        }
        return this;
    },

    rotateX: function(radians) {
        this.tNode.rotateOnAxis( new THREE.Vector3(1,0,0), radians);
    },
    rotateY: function(radians) {
        this.tNode.rotateOnAxis( new THREE.Vector3(0,1,0), radians);
    },
    rotateZ: function(radians) {
        this.tNode.rotateOnAxis( new THREE.Vector3(0,0,1), radians);
    },

    /**
     * Sets the object's position.
     *
     * @param {THREE.Vector3} vec New position.
     * @method setPosition
     **/
    setPosition: function (vec) {
        this.tNode.position = vec;
    },

    /**
     * Gets the object's position.
     *
     * @method getPosition
     * @return {THREE.Vector3} Position.
     **/
    getPosition: function () {
        return this.tNode.position;
    },

    /**
     * Gets the object's x coordinate.
     *
     * @method getX
     * @return {float} X.
     **/
    getX: function() {
        return this.tNode.position.x;
    },

    /**
     * Gets the object's y coordinate.
     *
     * @method getY
     * @return {float} Y.
     **/
    getY: function() {
        return this.tNode.position.y;
    },

    /**
     * Gets the object's z coordinate.
     *
     * @method getZ
     * @return {float} Z.
     **/
    getZ: function() {
        return this.tNode.position.z;
    },


    /**
     * Sets the object's x coordinate.
     *
     * @param {float} value X.
     * @method setX
     **/
    setX: function(value) {
        this.tNode.position.x = value;
    },

    /**
     Sets the object's y coordinate.
     *
     * @param {float} value Y.
     * @method setY
     **/
    setY: function(value) {
        this.tNode.position.y = value;
    },

    /**
     * Sets the object's z coordinate.
     *
     * @return {float} value Z.
     * @method setZ
     **/
    setZ: function(value) {
        this.tNode.position.z = value;
    },

    /**
     * Adds X to local position vector.
     *
     * @param	{float} amount X to add.
     * @method moveX
     * @return {float} X.
     **/
    moveX: function (amount) {
        this.tNode.position.x += amount;
        return this.tNode.position.x;
    },

    /**
     * Adds Y to local position vector.
     *
     * @param	{float} amount Y to add.
     * @method moveY
     * @return {float} Y.
     **/
    moveY: function (amount) {
        this.tNode.position.y += amount;
        return this.tNode.position.y;
    },

    /**
     * Adds Z to local position vector.
     *
     * @param	{float} amount Z to add.
     * @method moveZ
     * @return {float} Z.
     **/
    moveZ: function (amount) {
        this.tNode.position.z += amount;
        return this.tNode.position.z;
    },

    translateX: function (amount) {
        this.tNode.translateX(amount);
        return this;
    },

    translateY: function (amount) {
        this.tNode.translateY(amount);
        return this;
    },

    translateZ: function (amount) {
        this.tNode.translateZ(amount);
        return this;
    }
});