// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

var skin = cc.Class({
    name: "skin",
    properties: {
        anim: {
            default: [],
            type: cc.SpriteFrame,
        },
    }
});

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },

        skin_set: {
            default: [],
            type: skin,
        },
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad: function() {
         this.animcom = this.node.getComponent("leaves").addComponent("animation");
         this.speed = 200;
         this.speedy = -40*Math.random();
        //  this.type = Math.random()*3+1;
        //  this.type = Math.floor(this.type);
         this.type = 5;
         this.node.x = -560;
         this.node.y = -225+Math.random()*475; //[-225,250]
         this._setType();
        //  console.log(this.type);
     },

     _setType: function() {
         this.animcom.frames = this.skin_set[this.type-1].anim;
         this.animcom.duration = 0.1;
         this.animcom.play_loop();
        //  this.SpriteFrame = this.skin_set[1].anim[0];
     },

     update: function(dt) {
        let x = this.speed*dt;
        let y = this.speedy*dt;
        this.node.x += x;
        this.node.y += y;
        if (this.node.x>=560||this.node.y<=-350) {
            // console.log("remove leaf");
            this.node.removeFromParent();
        }
     },
});
