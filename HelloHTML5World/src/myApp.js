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


var myCars = new Array("club_brown", "club_cyan", "club_green", "club_purple", "club_red", "club_yellow", "club_blue");



var CircleSprite = cc.Sprite.extend({
    _degree:0,
    ctor:function () {
        this._super();
    },
    draw:function () {
        cc.drawingUtil.setDrawColor4B(255,255,255,255);

        if (this._degree < 0)
            this._degree = 360;
        cc.drawingUtil.drawCircle(cc.PointZero(), 30, cc.DEGREES_TO_RADIANS(this._degree), 60, true);
    },
    myUpdate:function (dt) {
        this._degree -= 6;
    }
});


var BatSprite = cc.Sprite.extend({
    _degree: 0,
    ctor: function () {
        this._super();
        cc.Sprite.create("res/pinyata.png");
        this.sprite.setPosition(cc.p(size.width / 2, size.height / 2));
    },
    draw: function () {
        cc.drawingUtil.setDrawColor4B(255, 255, 255, 255);

        if (this._degree < 0)
            this._degree = 360;
        cc.drawingUtil.drawCircle(cc.PointZero(), 30, cc.DEGREES_TO_RADIANS(this._degree), 60, true);
    },
    myUpdate: function (dt) {
        this._degree -= 6;
    }
});


var PiniataSprite = cc.Sprite.extend({
    _degree: 0,
    ctor: function () {
        this._super();
    },
    draw: function () {
        cc.drawingUtil.setDrawColor4B(255, 255, 255, 255);

        if (this._degree < 0)
            this._degree = 360;
        cc.drawingUtil.drawCircle(cc.PointZero(), 30, cc.DEGREES_TO_RADIANS(this._degree), 60, true);
    },
    myUpdate: function (dt) {
        this._degree -= 6;
    }
});

var Helloworld = cc.Layer.extend({
    isMouseDown: false,
    helloImg: null,
    helloLabel: null,
    circle: null,
    sprite: null,
    velocity: null,
    scr_left: null,
    scr_right: null,
    dir: null,

    init: function () {
        var selfPointer = this;
        //////////////////////////////
        // 1. super init first
        this._super();


        velocity = cc.p(2, 0);
        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask director the window size
        var size = cc.Director.getInstance().getWinSize();

        scr_left = 100;
        scr_right = size.width - 100;
        dir = 1;

        // add a "close" icon to exit the progress. it's an autorelease object
        var closeItem = cc.MenuItemImage.create(
            "res/CloseNormal.png",
            "res/CloseSelected.png",
            function () {
                history.go(-1);
            }, this);
        closeItem.setAnchorPoint(cc.p(0.5, 0.5));

        var menu = cc.Menu.create(closeItem);
        menu.setPosition(cc.PointZero());
        this.addChild(menu, 1);
        closeItem.setPosition(cc.p(size.width - 20, 20));

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        this.helloLabel = cc.LabelTTF.create("Hello World", "Arial", 38);
        // position the label on the center of the screen
        this.helloLabel.setPosition(cc.p(size.width / 2, 0));
        // add the label as a child to this layer
        this.addChild(this.helloLabel, 5);

        var lazyLayer = cc.Layer.create();
        this.addChild(lazyLayer);

        // add "HelloWorld" splash screen"
        this.sprite = cc.Sprite.create("res/pinyata.png");
        this.sprite.setPosition(cc.p(size.width / 2, size.height / 2));
        //this.sprite.setScale(0.5);
        //this.sprite.setRotation(180);

        lazyLayer.addChild(this.sprite, 0);

        //var rotateToA = cc.RotateTo.create(2, 0);
        //var scaleToA = cc.ScaleTo.create(2, 1, 1);

        //this.sprite.runAction(cc.Sequence.create(rotateToA, scaleToA));

        this.circle = new CircleSprite();
        this.circle.setPosition(cc.p(40, size.height - 60));
        this.addChild(this.circle, 2);
        this.circle.schedule(this.circle.myUpdate, 1 / 60);

        this.helloLabel.runAction(cc.Spawn.create(cc.MoveBy.create(2.5, cc.p(0, size.height - 40)), cc.TintTo.create(2.5, 255, 125, 0)));

        this.setTouchEnabled(true);
        return true;
    },
    // a selector callback
    menuCloseCallback: function (sender) {
        cc.Director.getInstance().end();
    },
    onTouchesBegan: function (touches, event) {
        this.isMouseDown = true;
    },
    onTouchesMoved: function (touches, event) {
        if (this.isMouseDown) {
            if (touches) {
                this.sprite.setPosition(cc.p(touches[0].getLocation().x, touches[0].getLocation().y));
            }
        }
    },
    moveMyPiniata: function (x, y) {
        this.sprite.setPosition(cc.p(x, y));
    },
    onTouchesEnded: function (touches, event) {
        this.isMouseDown = false;
    },
    onTouchesCancelled: function (touches, event) {
        console.log("onTouchesCancelled");
    },
    myUpdate: function (dt) {
       // console.log(this.sprite.getPosition().x);


        if (this.sprite.getPosition().x > scr_right)
            dir = -1;
        if (this.sprite.getPosition().x < scr_left)
            dir = 1;


        this.sprite.setPosition(cc.p(this.sprite.getPosition().x + velocity.x * dir, this.sprite.getPosition().y));
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new Helloworld();
        layer.init();
        this.addChild(layer);

        layer.schedule(layer.myUpdate, 1 / 60);
    }
});

