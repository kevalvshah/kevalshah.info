'use strict';

var settings,
	_this,
	game = {
		settings: {
			gameboard: document.querySelector('.game-board'),
			aiSelectionElem: document.querySelector('.ai .selection'),
			aiSelection: null,
			userSelectionElem: document.querySelector('.user .selection'),
			userSelection: null,
			userWins: 0,
			userLoses: 0,
			userTies: 0,
			userWinElem: document.querySelector('.scoreboard .wins'),
			userLoseElem: document.querySelector('.scoreboard .loses'),
			userTieElem: document.querySelector('.scoreboard .ties'),
			startGameBtn: document.querySelector('.start-game'),
			playAgainBtn: document.querySelector('.play-again'),
			countDownElem: document.querySelector('.countdown'),
			previousUserChoices: [], //keeps a history of user choices, could be built for the ai to weight its options.
			selections: ['rock', 'paper', 'scissors']
		},
		init: function(){
			_this = this;

			settings = _this.settings;
			_this.setEventListeners();
		},
		setEventListeners: function(){
			settings.startGameBtn.addEventListener('click', function(){
				//removes the start button
				this.classList.add('initialized');

				_this.startCountDown();
			});

			settings.playAgainBtn.addEventListener('click', function(){
				_this.reset();
			})
		},
		ai: {
			draw: function(){
				var chosen = Math.round((Math.random()*2)),
					selection = settings.selections[chosen];

				settings.aiSelectionElem.classList.add(selection);
				settings.aiSelection = chosen;
			}
		},
		user: {
			watchForSelection: function(){
				document.addEventListener('keydown', _this.user.makeSelection);
			},
			makeSelection: function(e){
				var	selection;

				//hides the "draw" message as soon as the user makes a choice!
				settings.countDownElem.classList.add('done');

				switch(e.keyCode){
					//rock
					case 49:
						var chosen = settings.selections[0];
						selection = 0;
						settings.userSelectionElem.classList.add(chosen);
					break;
					//paper
					case 50:
						var chosen = settings.selections[1];
						selection = 1;
						settings.userSelectionElem.classList.add(chosen);
					break;
					//scissors
					case 51:
						var chosen = settings.selections[2];
						selection = 2;
						settings.userSelectionElem.classList.add(chosen);
					break;
				}

				// wanted to wait for the user to make a selection before initializing the ai, no cheating!
				_this.ai.draw();

				settings.userSelection = selection;
				settings.previousUserChoices.push(selection);

				//removes the listener so you can only pick once!
				document.removeEventListener('keydown', _this.user.makeSelection);

				//find out who won after the user makes a selection!
				settings.gameboard.querySelector('.message').innerHTML = _this.whoWins(settings.userSelection, settings.aiSelection);

				//show play again button
				settings.playAgainBtn.classList.add('active');

				// update scoreboard
				_this.updateScoreboard();
			}
		},
		
		startCountDown: function(){
			var count = 3,
				timer;

			settings.countDownElem.innerHTML = count;
			timer = setInterval(function(){
				if(count > 1){
					count--;
					settings.countDownElem.innerHTML = count;
				}else{
					settings.countDownElem.innerHTML = 'DRAW!';
					settings.gameboard.classList.add('isplaying');
					_this.user.watchForSelection();
					clearInterval(timer);
				}
			}, 1000)
		},
		whoWins: function(user, ai){
			var result;

			if(user === 0 && ai === 1){
				result = false;
			}else if(user === 0 && ai === 2){
				result = true;
			}else if(user === 1 && ai === 0){
				result = true;
			}else if(user === 1 && ai === 2){
				result = false;
			}else if(user === 2 && ai === 0){
				result = false;
			}else if(user === 2 && ai === 1){
				result = true;
			}else if(user === ai){
				result = 'tie';
			}

			if(result === true){
				settings.userWins++;
				return "You Won!";
			}else if(result === false){
				settings.userLoses++;
				return "You Lost!";
			}else if(result === 'tie'){
				settings.userTies++;
				return "You Tied";
			}
		},
		reset: function(){
			settings.playAgainBtn.classList.remove('active');
			// settings.startGameBtn.classList.remove('initialized');
			settings.userSelectionElem.classList.remove(settings.selections[settings.userSelection]);
			settings.userSelection = null;
			settings.aiSelectionElem.classList.remove(settings.selections[settings.aiSelection]);
			settings.aiSelection = null;
			settings.gameboard.classList.remove('isplaying');
			settings.countDownElem.classList.remove('done');
			settings.countDownElem.innerHTML = '';
			settings.gameboard.querySelector('.message').innerHTML = '';
			_this.startCountDown();
		}
};

(function(){
	game.init();
})();

updateScoreboard: function(){
			settings.userWinElem.innerHTML = settings.userWins;
			settings.userLoseElem.innerHTML = settings.userLoses;
			settings.userTieElem.innerHTML = settings.userTies;
		},