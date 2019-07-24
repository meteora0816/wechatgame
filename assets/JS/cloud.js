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
    },

    // LIFE-CYCLE CALLBACKS:

    genCloud() {
        let flag = false;
        for (let i=0;i<5;i++) {
            if(this.isMoving[i]===0) {
                flag = true;
                break;
            }
        }
        if (!flag) {
            let time = Math.random()*5+1;
            this.scheduleOnce(this.genCloud.bind(this), time);
            return;
        }
        
        let n = Math.random()*5+1;
        n = Math.floor(n);

        console.log(n);

        let cho=0;
        while(n!==0) {
            cho++;
            if (cho>5) cho=1;
            if (this.isMoving[cho-1]===0) n--;
        }

        this.isMoving[cho-1] = 1;
        
        console.log(cho);
        // return;
        this.node.getChildByName(cho.toString()).x = -630;
        let y = Math.random()*600 - 300;
        this.node.getChildByName(cho.toString()).y = y;
        let m1 = cc.moveTo(20, cc.v2(630,y));

        let endFunc = cc.callFunc(this.clear, this, [cho]);

        var seq = cc.sequence([m1,endFunc]);
        this.node.getChildByName(cho.toString()).runAction(seq);

        let time = Math.random()*10+1;
        this.scheduleOnce(this.genCloud.bind(this), time);
    },

    clear: function(target, data) {
        console.log(["kill",data[0]]);
        // console.log(["kill",data[0]]);
        this.isMoving[data[0]-1] = 0;
    },

    onLoad () {
        this.isMoving = [0, 0, 0, 0, 0];

        this.genCloud();

        
    },

    start () {
        this.genCloud();
    },

    // update (dt) {},
});
