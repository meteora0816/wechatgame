cc.Class({
    extends: cc.Component,

    properties: {
        leaf_prefab: {
            type: cc.Prefab,
            default: null,
        },

        leaf_prefab_character: {
            type: cc.Prefab,
            default: null,
        },

        leaf_prefab_restartButton: {
            type: cc.Prefab,
            default: null,
        },

        leaf_root: {
            type: cc.Node,
            default: null,
        },

        contral_leaf: {
            type: cc.Node,
            default: null,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

    },

    restart(event) {
        this.score = 0;
        this.gen = true;
        this.gen_leaf();
        this.contral_leaf.getComponent("leaf_contral").restart();
        for (let i = 0; i < this.node.childrenCount; i++) {
            console.log(this.node.children[i]);
            if (this.node.children[i].name === "number") {
                this.node.children[i].removeFromParent();
            }
        }

        for (let i = 0; i < this.node.childrenCount; i++) {
            console.log(this.node.children[i]);
            if (this.node.children[i].name === "New Button") {
                this.node.children[i].removeFromParent();
            }
        }
    },

    hit(type) {
        if (type === "green") {
            console.log("hit green!");
            this.score++;
        }
    },

    gameover() {
        this.stop_gen_leaf();
        let button = cc.instantiate(this.leaf_prefab_restartButton);
        this.node.addChild(button);

        let character = cc.instantiate(this.leaf_prefab_character);
        this.node.addChild(character);

        this.node.getChildByName("leaves_2_score").getChildByName("Label").getComponent(cc.Label).string = this.score;
        console.log(this.node.getChildByName("leaves_2_score").getChildByName("Label").getComponent(cc.Label).String);

        button.on("click", this.restart, this);
    },

    stop_gen_leaf() {
        this.gen = false;
    },

    gen_leaf() {
        if (this.gen === false) return;
        let leaf = cc.instantiate(this.leaf_prefab);
        this.leaf_root.addChild(leaf);
        let time = Math.random() * 2;
        this.scheduleOnce(this.gen_leaf.bind(this), time);
    },

    start() {
        console.log("start");
        this.score = 0;
        this.gen = true;
        this.gen_leaf();
    },

    // update (dt) {},
});
