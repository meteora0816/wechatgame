var audio = cc.Class({
    name: "audio",
    properties: {
        audio: {
            default: [],
            type: cc.AudioClip,
        },
    }
});

cc.Class({
    extends: cc.Component,

    properties: {
        audio_green: {
            type: cc.AudioClip,
            default: null
        },

        // C: {
        //     type: cc.AudioClip,
        //     default: null
        // },

        // D: {
        //     type: cc.AudioClip,
        //     default: null
        // },

        // E: {
        //     type: cc.AudioClip,
        //     default: null
        // },

        // F: {
        //     type: cc.AudioClip,
        //     default: null
        // },

        // G: {
        //     type: cc.AudioClip,
        //     default: null
        // },

        // A: {
        //     type: cc.AudioClip,
        //     default: null
        // },
        
        // B: {
        //     type: cc.AudioClip,
        //     default: null
        // },

        audio: {
            default: [],
            type: audio,
        },

        red: {
            default: null,
            type: cc.AudioClip,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.cur = 0;
    },

    start () {

    },

    play_music: function () {
        // cc.audioEngine.play(this.audio_green, false, 1);
        //C D E F G A B
        //1 2 3 4 5 6 7
        this.cur++;
        if (this.cur===21) this.cur = 0;
        cc.audioEngine.play(this.audio[0].audio[this.cur], false, 1);
    },

    play_red: function() {
        let id = cc.audioEngine.play(this.red, false, 1);
        cc.audioEngine.setVolume(id, 0.3);
        this.cur = 0;
    }
    // update (dt) {},
});
