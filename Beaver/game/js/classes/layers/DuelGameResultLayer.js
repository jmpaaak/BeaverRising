classes.layers.DuelGameResultLayer = cc.Layer.extend({
	_houses: null,
	_resultBoard: null,
	_addFlag: false,
	_woodFlag: 0,
	_curWoodCount: null,
	_woodCount: null,
	_score: null,
	_scoreLabel: null,
	_nextFlag: null,
	_trophy: null,
	
	//positions
	_posRect: null,
	_smallRect: null,
	_pos1p: null, //include 4 cc.Rect
	_pos2p: null,
	_pos3p: null,
	_pos4p: null,
	_menus: null,
	_curMenu: 0,
	
	ctor: function (houses) {
		if (BG.SOUND) {
			classes.SoundBox.getInstance().pause("bgm_gameBGM");
		}
		this._super();
		this._houses = [];
		this._houses = houses;
	},
	init: function() {
		var that = this;
		var size = cc.Director.getInstance().getWinSize();
		this._super();
		this.setPosition(cc.p(0, 0));
		this.setKeyboardEnabled(true);
		
		this._resultBoard = cc.Sprite.create(s_ResultBoard);
		this._resultBoard.setPosition(size.width/2-100, size.height/2); //TODO: SET POINT!!!
		
		var decoBeaver = cc.Sprite.create(s_DecoBeaver);
		decoBeaver.setPosition(size.width*7.5/9, size.height/4);
		var bg = cc.Sprite.create(s_bgResult);
		bg.setPosition(size.width/2, size.height/2);
		
		//only for save pos
		var rect = cc.Sprite.create(s_ResultRect);
		rect.setPosition(size.width/2-100 + 15, size.height/2 + 5); //TODO: SET POINT!!!
		this._nextFlag = [null, false, false, false, false];
		this._curWoodCount = [];
		this._woodCount = [];
		this._woodCountLabel = [[],[],[],[],[]]; //1 2 3 4
		this._score = [];
		this._scoreLabel = [];
		this._posRect = rect.getTextureRect();
		this._posRect.x = size.width/2-100 + 15 - this._posRect.width/2; //init x if u want change this changes
		this._posRect.y = size.height/2 + 5 - this._posRect.height/2; //init y
		this._smallRect = {width:0, height:0}; //not used
		this._smallRect.width = this._posRect.width/4;
		this._smallRect.height = this._posRect.height/4;
		var x = this._posRect.x,
			y = this._posRect.y;
		var w = this._posRect.width,
			h = this._posRect.height;
		this._pos1p = [cc.p(x+w/8,y+h*7/8), cc.p(x+w*3/8+10,y+h*7/8-13), cc.p(x+w*5/8,y+h*7/8), cc.p(x+w*7/8,y+h*7/8)];
		this._pos2p = [cc.p(x+w/8,y+h*5/8), cc.p(x+w*3/8+10,y+h*5/8-13), cc.p(x+w*5/8,y+h*5/8), cc.p(x+w*7/8,y+h*5/8)];
		this._pos3p = [cc.p(x+w/8,y+h*3/8), cc.p(x+w*3/8+10,y+h*3/8-13), cc.p(x+w*5/8,y+h*3/8), cc.p(x+w*7/8,y+h*3/8)];
		this._pos4p = [cc.p(x+w/8,y+h/8), cc.p(x+w*3/8+10,y+h/8-13), cc.p(x+w*5/8,y+h/8), cc.p(x+w*7/8,y+h/8)];
		
		var mask = cc.Sprite.create(s_Mask);
        mask.setPosition(size.width / 2 , size.height / 2);	
        
		this.addChild(mask, 1);
		this.addChild(this._resultBoard, 2);
		this.addChild(decoBeaver, 3);
		this.addChild(bg, 0);
		
		for(var i=1; i<this._houses.length; i++) //caution: real houses sum is 4!
		{
			this._curWoodCount[i] = {
				small: 0,
				medium: 0,
				big: 0
			};
			this._woodCount[i] = this._houses[i].getWoodCount();
			for(var j=0; j<3; j++)
			{
				switch(j)
				{
					case 0:
						this._woodCountLabel[i][0] = cc.LabelBMFont.create(""+this._curWoodCount[i].small, s_Konqa32);
						this._woodCountLabel[i][0].setScale(0.5);
						this._woodCountLabel[i][0].setColor(cc.c3(0,0,0));
						if(i === 1) this._woodCountLabel[i][0].setPosition(this._pos1p[1].x, this._pos1p[1].y-this._smallRect.height/3);
						else if(i === 2) this._woodCountLabel[i][0].setPosition(this._pos2p[1].x, this._pos2p[1].y-this._smallRect.height/3);
						else if(i === 3) this._woodCountLabel[i][0].setPosition(this._pos3p[1].x, this._pos3p[1].y-this._smallRect.height/3);
						else if(i === 4) this._woodCountLabel[i][0].setPosition(this._pos4p[1].x, this._pos4p[1].y-this._smallRect.height/3);
						this.addChild(this._woodCountLabel[i][0], 3);
						break;
					case 1:
						this._woodCountLabel[i][1] = cc.LabelBMFont.create(""+this._curWoodCount[i].medium, s_Konqa32);
						this._woodCountLabel[i][1].setColor(cc.c3(0,0,0));
						this._woodCountLabel[i][1].setScale(0.5);
						if(i === 1) this._woodCountLabel[i][1].setPosition(this._pos1p[1].x, this._pos1p[1].y);
						else if(i === 2) this._woodCountLabel[i][1].setPosition(this._pos2p[1].x, this._pos2p[1].y);
						else if(i === 3) this._woodCountLabel[i][1].setPosition(this._pos3p[1].x, this._pos3p[1].y);
						else if(i === 4) this._woodCountLabel[i][1].setPosition(this._pos4p[1].x, this._pos4p[1].y);
						this.addChild(this._woodCountLabel[i][1], 3);
						break;
					case 2:
						this._woodCountLabel[i][2] = cc.LabelBMFont.create(""+this._curWoodCount[i].big, s_Konqa32);
						this._woodCountLabel[i][2].setColor(cc.c3(0,0,0));
						this._woodCountLabel[i][2].setScale(0.5);
						if(i === 1) this._woodCountLabel[i][2].setPosition(this._pos1p[1].x, this._pos1p[1].y+this._smallRect.height/3);
						else if(i === 2) this._woodCountLabel[i][2].setPosition(this._pos2p[1].x, this._pos2p[1].y+this._smallRect.height/3);
						else if(i === 3) this._woodCountLabel[i][2].setPosition(this._pos3p[1].x, this._pos3p[1].y+this._smallRect.height/3);
						else if(i === 4) this._woodCountLabel[i][2].setPosition(this._pos4p[1].x, this._pos4p[1].y+this._smallRect.height/3);
						this.addChild(this._woodCountLabel[i][2], 3);
						break;
				}
			}
			
			this._score[i] = 0;
			this._scoreLabel[i] = cc.LabelBMFont.create(""+this._score[i], s_Konqa32);
			this._scoreLabel[i].setScaleX(1);
			this._scoreLabel[i].setScaleY(1);
			this._scoreLabel[i].setColor(cc.c3(255,0,0));
			switch(i)
			{
        		case 1:
        			this._scoreLabel[i].setPosition(this._pos1p[2].x, this._pos1p[2].y-30);
        			break;
        		case 2:
        			this._scoreLabel[i].setPosition(this._pos2p[2].x, this._pos2p[2].y-30);
        			break;
        		case 3:
        			this._scoreLabel[i].setPosition(this._pos3p[2].x, this._pos3p[2].y-30);
        			break;
        		case 4:
        			this._scoreLabel[i].setPosition(this._pos4p[2].x, this._pos4p[2].y-30);
        			break;
        	}
			this.addChild(this._scoreLabel[i], 3);
		}
		
		this._addFlag = true;
		this.schedule(this.update, 1/10);
		
		var homeNormal = cc.Sprite.create(s_Home_Normal);
        var homeSelected = cc.Sprite.create(s_Home_Selected);
		var restartNormal = cc.Sprite.create(s_Restart_Normal);
        var restartSelected = cc.Sprite.create(s_Restart_Selected);
        
        this._menus = [
        				[homeNormal, homeSelected],
        				[restartNormal, restartSelected]
        			  ];

		homeNormal.setPosition(size.width*8.8/10, size.height*8.3/10);
		restartNormal.setPosition(size.width*8.8/10, size.height*6/10);
		
		for(var i=0; i<this._menus.length; i++)
			this.addChild(this._menus[i][0], 4);
		
		this._changeMenu();
		
		return true;
	},
	update: function() {
		var flag = [false,false,false];
		var that = this;
		if(this._addFlag)
		{
			if(this._woodFlag === 0)
			{
				this.runAction(cc.Sequence.create(
					cc.DelayTime.create(1.2),
					cc.CallFunc.create(function () {
						that._woodFlag = 1;
					})
				));
			}
			else if(this._woodFlag === 1)
			{
				if(this._nextFlag[1] === true)
					if(this._nextFlag[2] === true)
						if(this._nextFlag[3] === true)
							if(this._nextFlag[4] === true && !flag[0])
							{
								flag[0] = true;
								this.runAction(cc.Sequence.create(
									cc.CallFunc.create(function () {
										that._woodFlag = 2;										
									}),
									cc.CallFunc.create(function () {
										for(var i=1; i<that._nextFlag.length; i++)
											that._nextFlag[i] = false;
									})
								));
							}
							
				for(var i=1; i<this._houses.length; i++)
				{
					if(this._curWoodCount[i].small >= this._woodCount[i].small)
					{
						this._nextFlag[i] = true;
					}
					else
					{
						this._curWoodCount[i].small += 1;
						this._score[i] += BG.WOOD_PERCENT.SMA * 100;
						this._scoreLabel[i].setString(""+this._score[i]);
						this._woodCountLabel[i][0].setString(""+this._curWoodCount[i].small);
					}
				}
				
			}
			else if(this._woodFlag === 2)
			{
				if(this._nextFlag[1] === true)
					if(this._nextFlag[2] === true)
						if(this._nextFlag[3] === true)
							if(this._nextFlag[4] === true && !flag[1])
							{
								flag[1] = true;
								this.runAction(cc.Sequence.create(
									cc.CallFunc.create(function () {
										that._woodFlag = 3;										
									}),
									cc.CallFunc.create(function () {
										for(var i=1; i<that._nextFlag.length; i++)
											that._nextFlag[i] = false;
									})
								));
							}
				for(var i=1; i<this._houses.length; i++)
				{
					if(this._curWoodCount[i].medium >= this._woodCount[i].medium) 
					{
						this._nextFlag[i] = true;
					}
					else
					{
						this._curWoodCount[i].medium += 1;
						this._score[i] += BG.WOOD_PERCENT.MED * 100;
						this._scoreLabel[i].setString(""+this._score[i]);
						this._woodCountLabel[i][1].setString(""+this._curWoodCount[i].medium);
					}
				}
				
			}
			else if(this._woodFlag === 3)
			{
				if(this._nextFlag[1] === true)
					if(this._nextFlag[2] === true)
						if(this._nextFlag[3] === true)
							if(this._nextFlag[4] === true && !flag[2])
							{
								flag[2] = true;
								this.runAction(cc.Sequence.create(
									cc.CallFunc.create(function () {
										that._addFlag = false;
									}),
									// cc.DelayTime.create(0.8),
									cc.CallFunc.create(function () {
										that._giveTrophy();
									})
								));
							}
				for(var i=1; i<this._houses.length; i++)
				{
					if(this._curWoodCount[i].big >= this._woodCount[i].big) 
					{
						this._nextFlag[i] = true;
					}
					else
					{
						this._curWoodCount[i].big += 1;
						this._score[i] += BG.WOOD_PERCENT.BIG * 100;
						this._scoreLabel[i].setString(""+this._score[i]);
						this._woodCountLabel[i][2].setString(""+this._curWoodCount[i].big);
					}
				}
			}
		}
	},
	_giveTrophy: function () {
		this._score.sort(function(a,b){return b-a});
		for(var i=0; i<this._scoreLabel.length; i++)
		{
			for(var j=0; j<this._scoreLabel.length; j++)
			{
				
			}
			i++;
		}
		console.log(this._score[0]+" "+this._score[1]+" "+this._score[2]);
		for(var i=1; i<this._score.length; i++)
		{
			console.log(parseInt(this._scoreLabel[i].getString()));
			 if(this._score[0] == parseInt(this._scoreLabel[i].getString()))
			 {
			 	switch(i)
			 	{
			 		case 1:
			 			var gold = cc.Sprite.create(s_Trophy_Gold);
			 			gold.setPosition(this._pos1p[3].x, this._pos1p[3].y);
			 			this.addChild(gold, 5);
			 			gold.runAction(cc.Sequence.create(
			 				cc.ScaleTo.create(0.5, 2),
			 				cc.ScaleTo.create(0.1, 1)
			 			));
			 			break;
			 		case 2: 
			 			var gold = cc.Sprite.create(s_Trophy_Gold);
			 			gold.setPosition(this._pos2p[3].x, this._pos2p[3].y);
			 			this.addChild(gold, 5);
			 			gold.runAction(cc.Sequence.create(
			 				cc.ScaleTo.create(0.5, 2),
			 				cc.ScaleTo.create(0.1, 1)
			 			));
			 			break;
			 		case 3: 
			 			var gold = cc.Sprite.create(s_Trophy_Gold);
			 			gold.setPosition(this._pos3p[3].x, this._pos3p[3].y);
			 			this.addChild(gold, 5);
			 			gold.runAction(cc.Sequence.create(
			 				cc.ScaleTo.create(0.5, 2),
			 				cc.ScaleTo.create(0.1, 1)
			 			));
			 			break;
			 		case 4: 
			 			var gold = cc.Sprite.create(s_Trophy_Gold);
			 			gold.setPosition(this._pos4p[3].x, this._pos4p[3].y);
			 			this.addChild(gold, 5);
			 			gold.runAction(cc.Sequence.create(
			 				cc.ScaleTo.create(0.5, 2),
			 				cc.ScaleTo.create(0.1, 1)
			 			));
			 			break;
			 	}
			 }
			 else if(this._score[1] == parseInt(this._scoreLabel[i].getString()))
			 {
			 	switch(i)
			 	{
			 		case 1: 
			 			var silver = cc.Sprite.create(s_Trophy_Silver);
			 			silver.setPosition(this._pos1p[3].x, this._pos1p[3].y);
			 			this.addChild(silver, 5);
			 			silver.runAction(cc.Sequence.create(
			 				cc.ScaleTo.create(0.5, 2),
			 				cc.ScaleTo.create(0.1, 1)
			 			));
			 			break;
			 		case 2: 
			 			var silver = cc.Sprite.create(s_Trophy_Silver);
			 			silver.setPosition(this._pos2p[3].x, this._pos2p[3].y);
			 			this.addChild(silver, 5);
			 			silver.runAction(cc.Sequence.create(
			 				cc.ScaleTo.create(0.5, 2),
			 				cc.ScaleTo.create(0.1, 1)
			 			));
			 			break;
			 		case 3: 
			 			var silver = cc.Sprite.create(s_Trophy_Silver);
			 			silver.setPosition(this._pos3p[3].x, this._pos3p[3].y);
			 			this.addChild(silver, 5);
			 			silver.runAction(cc.Sequence.create(
			 				cc.ScaleTo.create(0.5, 2),
			 				cc.ScaleTo.create(0.1, 1)
			 			));
			 			break;
			 		case 4: 
			 			var silver = cc.Sprite.create(s_Trophy_Silver);
			 			silver.setPosition(this._pos4p[3].x, this._pos4p[3].y);
			 			this.addChild(silver, 5);
			 			silver.runAction(cc.Sequence.create(
			 				cc.ScaleTo.create(0.5, 2),
			 				cc.ScaleTo.create(0.1, 1)
			 			));
			 			break;
			 	}
			 }
			 else if(this._score[2] == parseInt(this._scoreLabel[i].getString()))
			 {
			 	switch(i)
			 	{
			 		case 1: 
			 			var bronze = cc.Sprite.create(s_Trophy_Bronze);
			 			bronze.setPosition(this._pos1p[3].x, this._pos1p[3].y);
			 			this.addChild(bronze, 5);
			 			bronze.runAction(cc.Sequence.create(
			 				cc.ScaleTo.create(0.5, 2),
			 				cc.ScaleTo.create(0.1, 1)
			 			));
			 			break;
			 		case 2: 
			 			var bronze = cc.Sprite.create(s_Trophy_Bronze);
			 			bronze.setPosition(this._pos2p[3].x, this._pos2p[3].y);
			 			this.addChild(bronze, 5);
			 			bronze.runAction(cc.Sequence.create(
			 				cc.ScaleTo.create(0.5, 2),
			 				cc.ScaleTo.create(0.1, 1)
			 			));
			 			break;
			 		case 3: 
			 			var bronze = cc.Sprite.create(s_Trophy_Bronze);
			 			bronze.setPosition(this._pos3p[3].x, this._pos3p[3].y);
			 			this.addChild(bronze, 5);
			 			bronze.runAction(cc.Sequence.create(
			 				cc.ScaleTo.create(0.5, 2),
			 				cc.ScaleTo.create(0.1, 1)
			 			));
			 			break;
			 		case 4: 
			 			var bronze = cc.Sprite.create(s_Trophy_Bronze);
			 			bronze.setPosition(this._pos4p[3].x, this._pos4p[3].y);
			 			this.addChild(bronze, 5);
			 			bronze.runAction(cc.Sequence.create(
			 				cc.ScaleTo.create(0.5, 2),
			 				cc.ScaleTo.create(0.1, 1)
			 			));
			 			break;
			 	}
			 }
		}
		
	},
	_changeMenu: function() {
		if(this._curMenu < 0) this._curMenu = this._menus.length-1;
		if(this._curMenu > this._menus.length-1) this._curMenu = 0;
		
		var changed = this._menus[this._curMenu];
		this.removeChild(changed[0]);
		changed[1].setPosition(changed[0].getPosition());
		this.addChild(changed[1], 4);
		
		for(var i=0; i<this._menus.length; i++)
		{
			if(i !== this._curMenu && this._menus[i][0].getParent() === null)
			{
				this.removeChild(this._menus[i][1]);
				this.addChild(this._menus[i][0], 4);
			}
		}
	},
	onKeyUp: function() {
	},
	onKeyDown: function(e) {
		switch(e)
		{
			//player1
			case BG.EVENT.PLAYER1.LEFT[0]:
			case BG.EVENT.PLAYER1.LEFT[1]:
				this._curMenu--;
				this._changeMenu();
				break;
			case BG.EVENT.PLAYER1.RIGHT[0]:
			case BG.EVENT.PLAYER1.RIGHT[1]:
				this._curMenu++;
				this._changeMenu();
				break;
			case BG.EVENT.PLAYER1.ITEM[0]:
			case BG.EVENT.PLAYER1.ITEM[1]:
				switch(this._curMenu)
				{
					case 0:
						classes.GameController.getInstance().setCurScene(classes.scenes.MainMenuScene.getInstance());
						var arr = classes.scenes.MainMenuScene.getInstance().getChildren();
						arr[arr.length-1].playBgmSound("on");
						break;
					case 1:
						classes.GameController.getInstance().setCurScene(new classes.scenes.DuelGameScene());
						break;
				}
				break;
		}
	}
}); 