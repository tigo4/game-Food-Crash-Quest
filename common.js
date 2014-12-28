
/**************************************/
var sprites = new Array();
var tempo = null;
var countDown = 60;
var botoesPosicoes = [11, 12, 13, 14];
var audioEngine = cc.audioEngine;
/**************************************/

        var toast_log = function(msg) {
            msg = "===" + msg;
            cc.log(msg);
            if(cc.sys.os == cc.sys.OS_ANDROID)
                jsb.reflection.callStaticMethod("org/cocos2dx/js_tests/AppActivity", "showToast", "(Ljava/lang/String;)V", msg);
        }

        var _log = function(msg) {
            msg = "===" + msg;
            cc.log(msg);
        }

        novoBotao = function(layer, res, x, y, scale, tag, fadeInterval, offSet) {
            botao = novaSprite(res, x, y, scale, tag);
            layer.addChild(botao, 1);
            numeroBotao = novoNumeroBotao(botao, scale);
            botao.addChild(numeroBotao, 1);
            botao.runAction(getFadeAction(fadeInterval, offSet));
            //botao.runAction(getFadeAction(fadeInterval), this);
        }

var updateBotaoNv1 = function(sprite, string) {
    //botaoNumero = sprite.getChildByTag(12345);
    //botaoNumero.setString(string + "");
    sprite.removeAllChildren();
    ico = cc.Sprite.create("res/nv1/" + string + ".png");
    ico.setScale(scale);
    ico.setPosition(cc.p(sprite.getContentSize().width/2, sprite.getContentSize().height/2));
    sprite.addChild(ico, 1);
}

var contaPontos = "on";
var contaVidas = "on";
var isGameOver = "false";

var timerUpdate = function() {
    if (isGameOver == "true") return;
    countDown = countDown - 1;
    tempo.setString(countDown + "");
    intervalo = intervalo + 1;
    if (countDown == 0) {
        //cc.director.end();
        gameOver();
        //cc.director.pause();
    }
}

var novoNumeroBotao = function(botao, scale) {
    numeroBotao = cc.LabelTTF.create("", "res/fonts/racing.ttf", 88);
    numeroBotao.setPosition(cc.p(botao.getContentSize().width/2, botao.getContentSize().height/2));
    numeroBotao.setColor(cc.color(0, 0, 0));
    numeroBotao.setScale(scale*0.8);
    numeroBotao.setTag(12345);
    return numeroBotao;
}

var novaSprite = function(res, linha, coluna, escala, tag) {
    //cc.log("new")
    sprite = cc.Sprite.create(res);
    sprite.retain();
    sprite.setAnchorPoint(cc.p(0.5, 0.5));
    sprite.setScale(escala);
    sprite.setPosition(cc.p(linha, coluna));
    sprite.setTag(tag);

    sprites.push(sprite);

    return sprite;
}

var updateTag = function(sprite, tag) {
    item = sprites.indexOf(sprite);
    sprites.splice(item, 1);
    sprite.setTag(tag);
    sprites.push(sprite);
}

