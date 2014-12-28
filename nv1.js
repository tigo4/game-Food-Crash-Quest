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

var nv1Layer = cc.Layer.extend({

    isMouseDown:false,
    sprite:null,

    init:function () {

        this._super();
    
        var canvas = this;

        var size = cc.director.getVisibleSize();

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

        cc.Sequence.createWithArray = function(arr) {
            if (arr.length === 0) {
                return cc.Sequence.create();
            } else if (arr.length === 1) {
                return cc.Sequence.create(arr[0]);
            } else if (arr.length === 2) {
                return cc.Sequence.create(arr[0], arr[1]);
            } else {
                var last = arr.pop();
                return cc.Sequence.create(cc.Sequence.createWithArray(arr), last);
            }
        };

        loadScores();

        toggleSoundL0 = cc.MenuItemImage.create(
            res.toggle_soundL,
            res.toggle_soundL,
            function () {
                if (audioEngine.isMusicPlaying()) {
                    audioEngine.stopMusic();
                } else {
                    audioEngine.playMusic(res.m_game1, true);
                }
                //cc.director.end();
                //history.go(-1);
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

        this.sprite = cc.Sprite.create(res.s_fundo);
        this.sprite.setAnchorPoint(cc.p(0.5, 0.5));
        var a = size.width / 2;
        var b = size.height / 2;
        this.sprite.setPosition(cc.p(a, b));
        var scale = size.height/this.sprite.getContentSize().height;
        this.sprite.setScale(scale);
        this.addChild(this.sprite, 0);
        var c = this.sprite.getContentSize().width / 8.5 * scale;
        var d = this.sprite.getContentSize().height / 7 * scale;

        numeroTop = Math.floor((Math.random()*23)+1);

        getFadeAction = function(fadeInterval, offSet) {
            sequences = [];
            for (var i=0; i<24; i++) {
                //ii = i + offSet;
                //if (ii>23) ii = ii - 24;
                ii = Math.floor((Math.random()*23)+1);
                increaseNr = Math.floor((Math.random()*2)+1);
                if (increaseNr == 1)
                    ii = numeroTop;
                sequences.push(
                    cc.FadeTo.create(fadeInterval,255), 
                    cc.CallFunc.create(updateBotaoNv1, this, ii),
                    cc.CallFunc.create(updateTag, this, ii)
                    //cc.FadeTo.create(fadeInterval,150)
                );
            }
            fadeAction = cc.RepeatForever.create(
                cc.Sequence.createWithArray(
                    sequences
                )
            );
            return fadeAction;
        }

        //timmer = 0.6;
        //timmer = 0.9;
        timmer = 1.5;

        novoBotao(this, res.s_amarela, a-3*c, b+2*d, scale, 11, timmer, 0);
        cc.log(a-3*c + "-" + b+2*d);
        novoBotao(this, res.s_vermelha, a-c, b+2*d, scale, 12, timmer, 1);
        novoBotao(this, res.s_azul, a+c, b+2*d, scale, 13, timmer, 2);
        novoBotao(this, res.s_verde, a+3*c, b+2*d, scale, 14, timmer, 3);

        novoBotao(this, res.s_amarela, a-3*c, b+d, scale, 21, timmer, 4);
        novoBotao(this, res.s_vermelha, a-c, b+d, scale, 22, timmer, 5);
        novoBotao(this, res.s_azul, a+c, b+d, scale, 23, timmer, 6);
        novoBotao(this, res.s_verde, a+3*c, b+d, scale, 24, timmer, 7);

        novoBotao(this, res.s_amarela, a-3*c, b, scale, 31, timmer, 8);
        novoBotao(this, res.s_vermelha, a-c, b, scale, 32, timmer, 9);
        novoBotao(this, res.s_azul, a+c, b, scale, 33, timmer, 10);
        novoBotao(this, res.s_verde, a+3*c, b, scale, 34, timmer, 11);

        novoBotao(this, res.s_amarela, a-3*c, b-d, scale, 41, timmer, 12);
        novoBotao(this, res.s_vermelha, a-c, b-d, scale, 42, timmer, 13);
        novoBotao(this, res.s_azul, a+c, b-d, scale, 43, timmer, 14);
        novoBotao(this, res.s_verde, a+3*c, b-d, scale, 44, timmer, 15);

        novoBotao(this, res.s_amarela, a-3*c, b-2*d, scale, 51, timmer, 16);
        novoBotao(this, res.s_vermelha, a-c, b-2*d, scale, 52, timmer, 17);
        novoBotao(this, res.s_azul, a+c, b-2*d, scale, 53, timmer, 18);
        novoBotao(this, res.s_verde, a+3*c, b-2*d, scale, 54, timmer, 19);

        novoBotao(this, res.s_amarela, a-3*c, b-3*d, scale, 61, timmer, 20);
        novoBotao(this, res.s_vermelha, a-c, b-3*d, scale, 62, timmer, 22);
        novoBotao(this, res.s_azul, a+c, b-3*d, scale, 63, timmer, 22);
        novoBotao(this, res.s_verde, a+3*c, b-3*d, scale, 64, timmer, 23);

        ampulheta = novaSprite(res.s_ampulheta, a-3.7*c, b+3.1*d, scale, 501);
        this.addChild(ampulheta, 1);

        vidas = 5;
        pontos = 0;
        intervalo = 0;

        coracao1 = novaSprite(res.s_coracao, a-3.1*c, b+3.25*d, scale, 601);
        this.addChild(coracao1, 1);
        coracao2 = novaSprite(res.s_coracao, a-2.6*c, b+3.25*d, scale, 602);
        this.addChild(coracao2, 1);
        coracao3 = novaSprite(res.s_coracao, a-2.1*c, b+3.25*d, scale, 603);
        this.addChild(coracao3, 1);
        coracao4 = novaSprite(res.s_coracao, a-1.6*c, b+3.25*d, scale, 604);
        this.addChild(coracao4, 1);
        coracao5 = novaSprite(res.s_coracao, a-1.1*c, b+3.25*d, scale, 605);
        this.addChild(coracao5, 1);

        tempo = cc.LabelTTF.create("01:00", "res/fonts/racing.ttf", 28);
        tempo.setPosition(cc.p(a-2.8*c, b+3*d));
        tempo.setColor(cc.color(218, 31, 203));
        tempo.setScale(scale);
        tempo.schedule(timerUpdate, 1.0);
        this.addChild(tempo, 1);

        score = cc.LabelTTF.create("0", "res/fonts/racing.ttf", 32);
        score.setPosition(cc.p(a-2.5*c, b+2.68*d));
        score.setColor(cc.color(255, 94, 0));
        score.setScale(scale);
        this.addChild(score, 1);

        topScoreLabel = cc.LabelTTF.create(topScore1 + "", "res/fonts/racing.ttf", 32);
        topScoreLabel.setPosition(cc.p(a-2.5*c, b+2.5*d));
        topScoreLabel.setColor(cc.color(255, 94, 0));
        topScoreLabel.setScale(scale/1.5);
        this.addChild(topScoreLabel, 1);

        lupa = novaSprite(res.s_lupa, a+0.28*c, b+3.4*d, scale*1.8, 502);
        //lupa.setRotation(250);
        this.addChild(lupa, 1);

        sol = novaSprite(res.s_sol, a+3*c, b+3*d, scale, 503);
        this.addChild(sol, 1);
        solFw = new cc.ParticleFireworks();
        solFw.initWithTotalParticles(250);
        solFw.setPosition(sol.getPosition());
        this.addChild(solFw, 1);

        numero = cc.Sprite.create("res/nv1/"+ numeroTop + ".png");
        numero.setPosition(cc.p(a, b+2.95*d));
        numero.setScale(scale);
        this.addChild(numero, 1);

        palavra = cc.LabelTTF.create("um", "res/fonts/racing.ttf", 45);
        palavra.setPosition(cc.p(a, b+2.8*d));
        palavra.setColor(cc.color(234, 120, 178));
        palavra.setScale(scale);
        palavra.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);

        processLocation = function(locat) {

            for (var i in sprites) {

                currentSprite = sprites[i];
                if (cc.rectContainsPoint(currentSprite.getBoundingBox(), locat)) {
                    if (numeroTop == currentSprite.getTag()) {
                        goSprite = currentSprite;
                        //alert(contaPontos);
                        if (contaPontos == "on") {

                        contaPontos = "off";
                        if (intervalo == 0) intervalo = 0.1;
                        if (vidas>0 && countDown>0) {
                            tapPontos = 10/intervalo;
                            pontos = pontos + tapPontos;
                            intervalo = 0;
                            //alert(pontos);
                            score.setString(Math.round(pontos * 100) + "");
                            actionGrow = cc.ScaleBy.create(0.001, 1.1);

                            emitter = cc.ParticleFlower.create();
                            //emitter.setShapeType(cc.PARTICLE_STAR_SHAPE);
                            emitter._shapeType = 0;
                            emitter.initWithTotalParticles(50);
                            //emitter.setTexture(cc.TextureCache.getInstance().addImage("res/fire.png"));
                            emitter.setPosition(cc.p(currentSprite.getContentSize().width/2, currentSprite.getContentSize().height/2));
                            emitter.setTag(300);
                            currentSprite.addChild(emitter, 1);

                            var fw = new cc.ParticleFireworks();
                            fw.initWithTotalParticles(250);
                            fw.setPosition(cc.p(currentSprite.getContentSize().width/2, currentSprite.getContentSize().height/2));
                            currentSprite.addChild(fw, 1);

                            actionReset = cc.ScaleTo.create(0.0001, scale);
                            currentSprite.runAction(actionReset);
                            currentSprite.runAction(cc.Sequence.create(actionGrow, cc.DelayTime.create(0.1), actionGrow.reverse()));
                            //this.removeChildByTag(300, false);

                            pontosLabel = cc.LabelTTF.create(Math.round(tapPontos * 100) + "", "res/fonts/racing.ttf", 32);
                            //pontosLabel.setPosition(currentSprite.getPosition());
                            pontosLabelPosX = currentSprite.getContentSize().width/2;
                            pontosLabelPosY = currentSprite.getContentSize().height/2;
                            pontosLabel.setPosition(cc.p(pontosLabelPosX+c/2, pontosLabelPosY+d/2));
                            pontosLabel.setColor(cc.color(255, 255, 255));
                            pontosLabel.setScale(scale);
                            currentSprite.addChild(pontosLabel, 1);

                            emitter.runAction(cc.Sequence.create(cc.DelayTime.create(1), cc.Hide.create()));
                            fw.runAction(cc.Sequence.create(cc.DelayTime.create(1), cc.Hide.create()));
                            pontosLabel.runAction(cc.Sequence.create(cc.DelayTime.create(1), cc.Hide.create()));

                            }

                        }
                        //currentSprite.runAction(actionGrow.reverse());
                    } else {
                        //contaPontos = "on";
                        if (contaVidas == "on") {
                        contaVidas = "off";
                        vidas = vidas - 1;
                        canvas.removeChildByTag("60" + (vidas + 1), false);
                        actionReset = cc.ScaleTo.create(0.0001, scale);
                        currentSprite.runAction(actionReset);
                        actionShrink = cc.ScaleBy.create(0.001, 0.9);
                        currentSprite.runAction(cc.Sequence.create(actionShrink, cc.DelayTime.create(0.1), actionShrink.reverse()));
                        }
                        //currentSprite.runAction(actionShrink.reverse());
                    }
                    actionReset = cc.ScaleTo.create(0.1, scale);
                    currentSprite.runAction(cc.Sequence.create(cc.DelayTime.create(1), actionReset));
                    //currentSprite.setScale(scale);
                    //currentSprite.runAction(cc.ScaleBy.create(0.001, 1));
                    //currentSprite.runAction(cc.Sequence.create(cc.DelayTime.create(0.5), cc.ScaleBy.create(0.001, scale)));
                    if (vidas == 0) {
                        gameOver();
                        //cc.director.pause();
                        //actionGrow = cc.ScaleBy.create(0.001, 1.1);
                        //gameOverLabel.runAction(cc.Sequence.create(actionGrow, cc.DelayTime.create(0.1), actionGrow.reverse()));
                    }
                    break;
                }

            }

        }

        var endTouch = new Date().getTime();
        var lastTouch = cc.p(0, 0);
        var goSprite = null;

        var listener = cc.EventListener.create({

            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false, 

            onTouchBegan : function(touches, event) {
                //cc.log("began");
                startLoc = touches.getLocation();
                deltaX = startLoc.x - lastTouch.x;
                if (deltaX < 0) deltaX = deltaX * (-1);
                deltaY = startLoc.y - lastTouch.y;
                if (deltaY < 0) deltaY = deltaY * (-1);
                if (deltaX > c/4) {
                    contaPontos = "on";
                    //alert(deltaX + " X " + c/2);
                }
                if (deltaY > c/4) {
                    contaPontos = "on";
                    //alert(deltaY + " Y " + d/4);
                }

                contaVidas = "on";
                now = new Date().getTime();
                /* multi tap */
                variacao = (now - endTouch) / 1000; 
                if (variacao > timmer/4)
                    contaPontos = "on";
                processLocation(touches.getLocation());
                return true;
            },

            onTouchEnded : function(touches, event) {
                //cc.log("ended");
                now = new Date().getTime();
                /* multi tap */
                variacao = (now - endTouch) / 1000;
                if (variacao > timmer/4)
                    contaPontos = "on";
 
                endTouch = new Date().getTime();
                processLocation(touches.getLocation());
                lastTouch = touches.getLocation();
            },

            onTouchMoved : function(touches, event) {
                //cc.log("moved");
                //loc = touches[0].getLocation();
                delta = touches.getDelta();
                deltaX = delta.x;
                if (deltaX < 0) deltaX = deltaX * (-1);
                deltaY = delta.y;
                if (deltaY < 0) deltaY = deltaY * (-1);
                //alert(delta.x + " " + c + " " + " " + d + " " + delta.y);
            
                if (deltaX > c/4) {
                    contaPontos = "on";
                    contaVidas = "on";
                }
                if (deltaY > c/4) {
                    contaPontos = "on";
                    contaVidas = "on";
                }
                processLocation(touches.getLocation());
            },

            onTouchCancelled: function(touches, event) {}

        });
        cc.eventManager.addListener(listener, this);

        gameOver = function() {
    
            isGameOver = "true";
            if (Math.round(pontos * 100) > topScore1)           
                cc.sys.localStorage.setItem(scoresRef1, Math.round(pontos * 100) + "");

            gameOverLabel = cc.LabelTTF.create("game over", "res/fonts/racing.ttf", 60);
            gameOverLabel.setPosition(cc.p(size.width/2, size.height/2));
            gameOverLabel.setColor(cc.color(71, 44, 17));
            gameOverLabel.setScale(scale);
            canvas.addChild(gameOverLabel, 1);
            sequences = [];
            actionGrow = cc.ScaleBy.create(1, 1.1);
            sequences.push(
                actionGrow,
                actionGrow.reverse()
            );
            gameOverAction = cc.RepeatForever.create(
                cc.Sequence.createWithArray(
                    sequences
                )
            );
            gameOverLabel.runAction(gameOverAction);
            
            /*******restart***********/
            var closeItem = cc.MenuItemImage.create(
                res.s_start,
                res.s_start,
                function () {
                    sprites = new Array();
                    tempo = null;
                    countDown = 60;
                    cc.director.resume();
                    isGameOver = "false";
                    scene = cc.TransitionShrinkGrow.create(0.5, new nv1Scene());
                    //cc.director.replaceScene(scene);
                    cc.director.runScene(scene);
                    //cc.director.init();
                    //history.go(-1);
                },
                this
            );
            closeItem.setAnchorPoint(cc.p(0.5, 0.5));
            closeItem.setPosition(cc.p(a-0.01*c, b-2.5*d));
            closeItem.setScale(scale*2);

            var menu = cc.Menu.create(closeItem);
            menu.setPosition(cc.p(0, 0));
            canvas.addChild(menu, 1);
            /******************/

        }

    /***************** /init ****************/

    }

});

var nv1Scene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        layer = new nv1Layer();
        this.addChild(layer);
        layer.init();
    }
});

