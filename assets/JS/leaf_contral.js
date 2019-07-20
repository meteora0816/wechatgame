cc.Class({
    extends: cc.Component,

    properties: {
        leaf_root: {
            type: cc.Node,
            default: null,
        },

        main: {
            type: cc.Node,
            default: null,
        },

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        console.log("leaf fly");
        this.m = 50;
        this.ax = 0;
        this.fx = 300;
        this.speedx = 0;
        this.speed = 0;
        this.dir = 0;
        this.down();

        this.over = false;
    },

    up: function () {
        // console.log("leaf up");
        this.speed = 250;
        this.dir = 1;
    },

    down: function () {
        // console.log("leaf down");
        this.speed = 150;
        this.dir = 0;
    },

    // start () {

    // },
    hit_test() {
        for (let i = 0; i < this.leaf_root.childrenCount; i++) {
            let leaf = this.leaf_root.children[i];
            if (Math.abs(leaf.x - this.node.x) <= 30 && Math.abs(leaf.y - this.node.y) <= 30) {
                return leaf;
            }
        }
        return null;
    },

    wind(wind_f, time) {
        this.fx -= wind_f;
        this.scheduleOnce(function () {
            // console.log("back!");
            this.fx += wind_f;
        }, time);
    },

    hit(type) {
        this.main.getComponent("main").hit(type);
        this.audio
    },

    gameover() {
        if (this.over === true) return;
        this.over = true;
        this.main.getComponent("main").gameover();

    },

    restart() {
        this.node.x = 0;
        this.node.y = 0;
        this.over = false;
    },

    update(dt) {
        let y = dt * this.speed;
        if (this.dir === 1) {
            if (this.node.y <= 300) this.node.y += y;
        }
        else {
            if (this.node.y >= -300) this.node.y -= y;
        }

        this.ax = (this.fx - this.speedx * 6) / this.m;
        this.speedx += this.ax;
        let x = dt * this.speedx;
        if (x > 0 || this.node.x >= -480) this.node.x += x;
        if (this.node.x >= 510) {
            // console.log("game over!");
            if (this.over === false) this.gameover();
            return;
        }

        let leaf = this.hit_test();
        if (leaf) {
            let leaf_type = leaf.getComponent("leaves").type;
            if (leaf_type === 1) {
                console.log("green");
                this.hit("green");
                this.wind(7000, 0.3);
            }
            else if (leaf_type === 2) {
                console.log("yellow");
                this.hit("yellow");
            }
            else if (leaf_type === 3) {
                console.log("red");
                this.hit("red");
                this.wind(-4000, 0.3);
            }
            leaf.removeFromParent();
        }
    },
});
