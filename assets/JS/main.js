cc.Class({
    extends: cc.Component,

    properties: {
        leaf_prefab: {
            type: cc.Prefab,
            default: null,
        },

        leaf_number_character: {
            type: cc.Node,
            default: null,
        },

        leaf_root: {
            type: cc.Node,
            default: null,
        },

        contral_leaf: {
            type: cc.Node,
            default: null,
        },

        gameOver: {
            type: cc.Node,
            default: null,
        },

        score: {
            type: cc.Node,
            default: null,
        },
        // leaves_2_score: {
        //     type: cc.Node,
        //     default: null,
        // },

        // leaves_3_score: {
        //     type: cc.Node,
        //     default: null,
        // },

        // restartButton: {
        //     type: cc.Node,
        //     default: null,
        // },

        // backButton: {
        //     type: cc.Node,
        //     default: null,
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

    },

    score_board(vis) {
        // this.number.active = vis;
        // this.leaves_2_score.active = vis;
        // this.leaves_3_score.active = vis;
        // this.leaf_number_character.active = vis;
        // this.restartButton.active = vis;
        // this.backButton.active = vis;

        this.gameOver.active = vis;
        this.score.active = !vis;
        //更改全局按钮透明度

    },

    restart(event) {
        this.score_green = 0;
        this.score_yellow = 0;
        this.score_flower = 0;
        this.total_score = 0;
        this.change_score(0);

        this.gen = true;
        this.gen_leaf();
        this.contral_leaf.getComponent("leaf_contral").restart();
        
        this.score_board(false);
    },

    change_score(num) {
        this.total_score += num;
        this.node.getChildByName("current score").getChildByName("score").getComponent(cc.Label).string = this.total_score;
    },

    hit(type) {
        
        if (type === "green") {
            // console.log("hit green!");
            this.score_green++;
            this.change_score(10);
            this.getComponent("AudioEngine").play_music();
            // this.getComponent("AudioEngine").play_green();
        }
        else if (type === "yellow") {
            // console.log("hit yellow!");
            this.score_yellow++;
            this.change_score(1);
            this.getComponent("AudioEngine").play_music();
        }
        else if (type === "flower") {
            // console.log("hit yellow!");
            this.score_flower++;
            this.change_score(30);
            this.getComponent("AudioEngine").play_music();
        }
        else if (type === "light green") {
            this.getComponent("AudioEngine").play_music();
        }
        else {
            this.getComponent("AudioEngine").play_red();
        }

    },

    gameover() {
        this.stop_gen_leaf();

        // let button = cc.instantiate(this.leaf_prefab_restartButton);
        // this.node.addChild(button);

    
        // let leaves_2_score = this.node.getChildByName("leaves_2_score").getChildByName("Label");
        

        this.gameOver.getChildByName("leaf_number").getChildByName("green_img").getChildByName("green_number").getComponent(cc.Label).string = this.score_green;
        this.gameOver.getChildByName("leaf_number").getChildByName("yellow_img").getChildByName("yellow_number").getComponent(cc.Label).string = this.score_yellow;
        this.gameOver.getChildByName("leaf_number").getChildByName("flower_img").getChildByName("flower_number").getComponent(cc.Label).string = this.score_flower;

        this.gameOver.getChildByName("total_score").getChildByName("score").getComponent(cc.Label).string = this.score_yellow + this.score_green*10 + this.score_flower*30;

        this.score_board(true);

        // button.on("click", this.restart, this);
    },

    stop_gen_leaf() {
        this.gen = false;
    },

    gen_leaf() {
        if (this.gen === false) return;
        let leaf = cc.instantiate(this.leaf_prefab);
        this.leaf_root.addChild(leaf);
        let time = 0.5; //Math.random() * 2;
        this.scheduleOnce(this.gen_leaf.bind(this), time);
    },

    start() {
        this.score_board(false);

        console.log("start");
        this.score_green = 0;
        this.score_yellow = 0;
        this.score_flower = 0;
        this.total_score = 0;
        this.change_score(0);

        this.gen = true;
        this.gen_leaf();
    },

    // update (dt) {},
});
