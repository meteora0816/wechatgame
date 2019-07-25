cc.Class({
    extends: cc.Component,

    properties: {
        fadeMask: {
            default: null,
            type: cc.Prefab,
        },
    },


    fade(fadeMaskNode, interval = .5, callback = () => {}) 
    {
        let fadeAction = this.isTransparent(fadeMaskNode) ? cc.fadeIn(interval) : cc.fadeOut(interval);
    
        fadeMaskNode.runAction(
            cc.sequence(
                fadeAction,
                cc.callFunc(() => callback())
            )
        );
    },
    
    isTransparent(fadeMaskNode) 
    {
        return Boolean(!fadeMaskNode.opacity);
    },

    loadScene(fadeMaskNode, interval = .3, nextScene = "") 
    {
        if (nextScene) {
            cc.director.preloadScene(nextScene, () => {
                this.fade(fadeMaskNode, interval, () => {
                    cc.director.loadScene(nextScene);
                });
            });
        } else {
            this.fade(fadeMaskNode, interval);
        }
    },

    fadeIntoWhite(nextScene, interval) 
    {
        let fadeMaskNode = cc.instantiate(this.fadeMask);
        fadeMaskNode.opacity = 0;
        this.node.addChild(fadeMaskNode);
        this.loadScene(fadeMaskNode, interval, nextScene);
    },
    
    fadeFromWhite(interval) 
    {
        let fadeMaskNode = cc.instantiate(this.fadeMask);
        fadeMaskNode.opacity = 255;
        this.node.addChild(fadeMaskNode);
        this.fade(fadeMaskNode, interval);
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
