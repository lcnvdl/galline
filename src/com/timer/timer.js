//
//  Events extension
//

GE.Events.Com.Timer = {
    TICK: "com-timer-tick"
};

//
//  Component
//

/**
 *  Implements a timer that raises an event at user-defined intervals.
 *
 *  @class Timer
 *  @constructor
 */
AGE.Com.Timer = GE.Klass(GE.Component, {

    //  *****************************
    //  Class Definitions
    //  *****************************

    $name: "Com.Timer",

    //  *****************************
    //  Attributes
    //  *****************************

    __timeout: null,

    __enabled: false,

    alarmId: 0,

    loop: false,

    time: 1000,

    //  *****************************
    //  Ctor
    //  *****************************

    initialize: function (name) {
        this.$super(name);
    },

    //  *****************************
    //  Component Methods
    //  *****************************

    load: function () {

        //  Create alarms attribute in entity

        if (typeof this.entity.alarms == 'undefined') {
            this.entity.__alarmId = 0;
            this.entity.alarms = {};
        }

        //  Add to entity

        this.id = ++this.entity.__alarmId;

        this.entity.alarms[this.alarmId] = this;
    },

    dispose: function () {

        //  Stop the clock

        this.stop();

        //  Remove from entity

        delete this.entity.alarms[this.alarmId];
    },

    //  *****************************
    //  Public Methods
    //  *****************************

    /**
     *   Starts the timer.
     *
     *   @method start
     *   @param {array} [options]
     *   @param {int}  [options.time=1000] Time in milliseconds.
     *   @param {boolean} [options.loop=false] Auto-restart timer?
     **/
    start: function (options) {
        if(this.__enabled) {
            console.warn("Alarm "+this.alarmId + " was enabled.");
            return this;
        }

        this.__enabled = true;

        if(options) {

            if (typeof options["time"] !== 'undefined') {
                this.time = options["time"];
            }
            if (typeof options["loop"] !== 'undefined') {
                this.loop = options["loop"];
            }
        }

        this.__timeout = setTimeout(this.__onTick, this.time);

        return this;
    },

    /**
     * TO DOC
     *
     * @return {boolean} `true` if the timer is enabled, `false` otherwise.
     */
    isEnabled: function() {
        return this.__enabled;
    },

    /**
     *  Stops the timer.
     *  @method stop
     */
    stop: function () {
        this.__enabled = false;
        if(this.__timeout) {
            clearTimeout(this.__timeout);
            this.__timeout = null;
        }

        return this;
    },

    /**
     * On tick callback.
     */
    __onTick: function() {
        this.trigger(GE.Events.Com.Timer.TICK, this);

        //  If user don't stops the timer in the tick event
        if(this.__enabled) {

            this.__timeout = null;
            this.stop();

            if(this.loop) {
                this.start();
            }

        }
    }.$bound()
});
