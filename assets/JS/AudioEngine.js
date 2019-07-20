cc.Class({
    extends: cc.Component,

    properties: {
        audio_green: {
            type: cc.AudioClip,
            default: null
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    play_green: function () {
        cc.audioEngine.play(this.audio_green, false, 1);
    },


    // update (dt) {},
});
