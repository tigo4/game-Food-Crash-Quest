/*
@
devsoftprog.java.game.android.beans
Copyright (c) 2013,2014 tigo
@
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
@
*/

/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011      Zynga Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

var menuLayer = cc.Layer.extend({

    isMouseDown:false,
    sprite:null,

    init:function () {

        this._super();

        canvas = this;

        size = cc.director.getVisibleSize();

        if( 'keyboard' in cc.sys.capabilities ) {
            cc.eventManager.addListener({
                event: cc.EventListener.KEYBOARD,
                /*
                onKeyPressed:function(key, event) {
                    cc.log("Key down:" + key);
                },
                */
                onKeyReleased:function(key, event) {
                    _log("Key up:" + key);
                    if (key==6) {
                        if(cc.sys.os == cc.sys.OS_ANDROID)
                            cc.director.end();
                    }
                }
            }, this);
        } else {
            _log("KEYBOARD Not supported");
        }

        audioEngine.playEffect(res.e_coin);
        cc.log("aud");

        toggleSoundL0 = cc.MenuItemImage.create(
            res.toggle_soundL,
            res.toggle_soundL,
            function () {
                if (audioEngine.isMusicPlaying()) {
                    audioEngine.stopMusic();
                } else {
                    audioEngine.playMusic(res.m_game1, true);
                }
            },
            this
        );
        toggleSoundL0.setAnchorPoint(cc.p(0.5, 0.5));

        menu = cc.Menu.create(toggleSoundL0);
        menu.setPosition(cc.p(0, 0));
        this.addChild(menu, 1);
        toggleSoundL0.setPosition(cc.p(20, 20));

        toggleSoundR0 = cc.MenuItemImage.create(
            res.toggle_soundR,
            res.toggle_soundR,
            function () {
                if (audioEngine.isMusicPlaying()) {
                    audioEngine.stopMusic();
                } else {
                    audioEngine.playMusic(res.m_game2, true);
                }
                //cc.director.end();
                //history.go(-1);
            },
            this
        );
        toggleSoundR0.setAnchorPoint(cc.p(0.5, 0.5));

        menu = cc.Menu.create(toggleSoundR0);
        menu.setPosition(cc.p(0, 0));
        this.addChild(menu, 1);
        toggleSoundR0.setPosition(cc.p(size.width - 20, 20));

        this.sprite = cc.Sprite.create(res.fundo_menu);
        this.sprite.setAnchorPoint(cc.p(0.5, 0.5));
        a = size.width / 2;
        b = size.height / 2;
        this.sprite.setPosition(cc.p(a, b));
        scale = size.height/this.sprite.getContentSize().height;
        this.sprite.setScale(scale);
        this.addChild(this.sprite, 0);

        c = this.sprite.getContentSize().width / 8.5 * scale;
        d = this.sprite.getContentSize().height / 7 * scale;

        menu1 = cc.MenuItemImage.create(
            res.menu1,
            res.menu1,
            function () {
                sprites = new Array();
                tempo = null;
                countDown = 60;
                transitionScene = cc.TransitionShrinkGrow.create(0.5, new nv1Scene());
                cc.director.runScene(transitionScene);
 
            },
            this
        );
        menu1.setAnchorPoint(cc.p(0.5, 0.5));
        menu1.setScale(scale);

        menu = cc.Menu.create(menu1);
        menu.setPosition(cc.p(0, 0));
        this.addChild(menu, 1);
        menu1.setPosition(cc.p(a, b+2*d));

        /*
        if (topScore1 < 1000000) {

            menu2 = cc.MenuItemImage.create(
                res.menu2a,
                res.menu2a,
                function () {
                    //...
                },
                this
            );
            menu2.setAnchorPoint(cc.p(0.5, 0.5));
            menu2.setScale(scale);

        } else {

            menu2 = cc.MenuItemImage.create(
                res.menu2,
                res.menu2,
                function () {
                    sprites = new Array();
                    tempo = null;
                    countDown = 60;
                    transitionScene = cc.TransitionShrinkGrow.create(0.5, new nv2Scene());
                    cc.director.replaceScene(transitionScene);

                    //cc.director.end();
                    //history.go(-1);
                },
                this
            );
            menu2.setAnchorPoint(cc.p(0.5, 0.5));
            menu2.setScale(scale);

        }

        menu = cc.Menu.create(menu2);
        menu.setPosition(cc.p(0, 0));
        this.addChild(menu, 1);
        menu2.setPosition(cc.p(a, b+0.6*d));

        if (topScore2 < 500000) {

            menu3 = cc.MenuItemImage.create(
                res.menu3a,
                res.menu3a,
                function () {
                    //...
                },
                this
            );
            menu3.setAnchorPoint(cc.p(0.5, 0.5));
            menu3.setScale(scale);

        } else {

            menu3 = cc.MenuItemImage.create(
                res.menu3,
                res.menu3,
                function () {
                    sprites = new Array();
                    tempo = null;
                    countDown = 60;
                    transitionScene = cc.TransitionShrinkGrow.create(0.5, new nv3Scene());
                    cc.director.replaceScene(transitionScene);

                    //cc.director.end();
                    //history.go(-1);
                },
                this
            );
            menu3.setAnchorPoint(cc.p(0.5, 0.5));
            menu3.setScale(scale);

        }

        menu = cc.Menu.create(menu3);
        menu.setPosition(cc.p(0, 0));
        this.addChild(menu, 1);
        menu3.setPosition(cc.p(a, b-0.8*d));
        */

    /***************** /init ****************/

    }

});

    var scoresRef1 = "scores-306-1";
    var scoresRef2 = "scores-306-2";
    var scoresRef3 = "scores-306-3";
    var topScore1 = 0;
    var topScore2 = 0;
    var topScore3 = 0;

    var loadScores = function() {

        scores = cc.sys.localStorage.getItem(scoresRef1);

        if( scores === null || scores === undefined || scores === "" ) {
            topScore1 = 0;
            cc.sys.localStorage.setItem(scoresRef1, topScore1 + "");
            //cc.log(this.scores);
        } else {
            //topScore = eval( '([' + scores + '])' );
            topScore1 = scores;
        }

        scores = cc.sys.localStorage.getItem(scoresRef2);

        if( scores === null || scores === undefined || scores === "" ) {
            topScore2 = 0;
            cc.sys.localStorage.setItem(scoresRef2, topScore2 + "");
            //cc.log(this.scores);
        } else {
            //topScore = eval( '([' + scores + '])' );
            topScore2 = scores;
        }

        scores = cc.sys.localStorage.getItem(scoresRef3);

        if( scores === null || scores === undefined || scores === "" ) {
            topScore3 = 0;
            cc.sys.localStorage.setItem(scoresRef3, topScore3 + "");
            //cc.log(this.scores);
        } else {
            //topScore = eval( '([' + scores + '])' );
            topScore3 = scores;
        }

    }

    loadScores();

var menuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        layer = new menuLayer();
        this.addChild(layer);
        layer.init();
    }
});

var strScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        sprites = new Array();
        tempo = null;
        countDown = 60;
        //transitionScene = cc.TransitionShrinkGrow.create(0.5, new ncScene());
        transitionScene = cc.TransitionMoveInL.create(0.5, new menuScene());
        //cc.director.replaceScene(transitionScene);
        cc.director.runScene(transitionScene);
    }
});

