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
        leaf_root: {
            type: cc.Node,
            default: null,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        console.log("leaf fly");
        this.dir = 0;
        this.m = 50;
        this.ax = 0;
        this.fx = 300;
        this.speedx = 0;
        this.speed = 10;
        this.down();
    },

    up: function() {
        // console.log("leaf up");
        this.speed = 250;
        this.dir = 1;
    },

    down: function() {
        // console.log("leaf down");
        this.speed = 150;
        this.dir = 0;
    },

    // start () {

    // },
    hit_test() {
        for (let i=0; i < this.leaf_root.childrenCount; i++) {
            let leaf = this.leaf_root.children[i];
            if (Math.abs(leaf.x-this.node.x) <= 30 &&  Math.abs(leaf.y-this.node.y) <= 30) {
                return leaf;
            }
        }
        return null;
    },

    wind(wind_f) {
        this.fx -= wind_f;
        let time = 0.3;
        this.scheduleOnce(function() {
            // console.log("back!");
            this.fx += wind_f;
        }, time);
    },

    update (dt) {
        let y = dt*this.speed;
        if (this.dir===1) {
            if (this.node.y<=300) this.node.y += y;
        }
        else {
            if (this.node.y>=-300) this.node.y -= y;
        }
        
        this.ax = (this.fx-this.speedx*6)/this.m;
        this.speedx += this.ax;
        let x = dt*this.speedx;
        if (x>0 || this.node.x>=-480) this.node.x += x;

        let leaf = this.hit_test();
        if (leaf) {
            console.log("hit!");
            let leaf_type = leaf.getComponent("leaves");
            console.log(leaf_type.type);
            if (leaf_type.type===1) {
                this.wind(7000);
            }
            leaf.removeFromParent();
        }
    },
});
