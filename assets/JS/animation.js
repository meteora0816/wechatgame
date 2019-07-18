// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        frames: {
            default: [],
            type: cc.SpriteFrame,
        },
        duration: 0.1,
        //play_onload: false,
    },

    onLoad () {
        let com = this.node.getComponent(cc.Sprite);
        if (!com) {
            com = this.node.addComponent(cc.Sprite);
        }
        this.sprite = com;
        this.is_playing = false;
        this.play_time = 0;

        // if (this.play_onload) {
        //     this.sprite.SpriteFrame = this.frames[0];
        //     this.play_loop();
        // }
    },

    play_loop() {
        this.play_time = 0;
        this.is_playing = true;
    },

    update (dt) {
        if (this.is_playing==false) return;
        this.play_time += dt;
        let index = Math.floor(this.play_time/this.duration);
        while (index >= this.frames.length) {
            index -= this.frames.length;
            this.play_time -= (this.duration * this.frames.length);
        }
        this.sprite.spriteFrame = this.frames[index];
    },
});
