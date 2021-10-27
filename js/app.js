var app = new Vue({
	el: '#app',
	data: {
		cards: [],
		ids_jogada: [],
		count: 0,
		liberou: 0,
		popup: false,
		play: false
	},
	mounted() {
		this.cards = cards;

		this.shuffle(this.cards);
	},
	watch: {
		// Libera cartas para clicar quando termina o Round
	    liberou: function (val) {
	    	this.liberou = 0;

	    	for (var i = 0; i < this.cards.length; i++) {
	    		if (this.cards[i].hide == true) {
	    			this.cards[i].clickable = true;
	    		}
	    	}
	    },
	},
	methods: {
		selectCard: function(index) {
			
			// Espera tirar as 2 cartas
			if (this.ids_jogada.length < 2 && this.cards[index].clickable) {
				this.cards[index].hide = false;
				this.ids_jogada.push(this.cards[index].id);
				this.cards[index].clickable = false;
			}

			// Segundo click
			if (this.ids_jogada.length == 2) {
				if (this.ids_jogada[0] == this.ids_jogada[1]) {
					// Com vitoria na rodada
					this.count = this.count + 1;

					// Ganhou a partida
					if (this.count == this.cards.length/2) {
						this.popup = true;
					}

					this.resetRound();
				} else {
					// Sem vitoria na rodada
					let self = this;
					
					this.setClickable(false);

					setTimeout(function () { 
						for (var i = 0; i < self.cards.length; i++) {
							if (self.cards[i].id == self.ids_jogada[0] || self.cards[i].id == self.ids_jogada[1]) {
								self.cards[i].hide      = true;
								self.cards[i].clickable = true;
							}
						}

						self.liberou = 1;
						this.resetRound();
					}.bind(self), 500);
				}
			}
		},

		setClickable: function(value) {
			for (var i = 0; i < this.cards.length; i++) {
				this.cards[i].clickable = value;
			}
		},

		// Reseta cada round, para selecionar 2 cartas de novo
		resetRound: function() {
			this.ids_jogada = [];
		},

		shuffle: function (array) {
		    let currentIndex = array.length, randomIndex;

		    while (currentIndex != 0) {
		        randomIndex = Math.floor(Math.random() * currentIndex);
		        currentIndex--;

		        [array[currentIndex], array[randomIndex]] = [
		            array[randomIndex], array[currentIndex]
		        ];
		    }

		    return array;
		},

		// Reseta partida
		reset: function() {
			for (var i = 0; i < this.cards.length; i++) {
				this.cards[i].clickable = true;
				this.cards[i].hide      = true;
			}

			this.ids_jogada = [];
			this.count      = 0;
			this.popup      = false;

			this.shuffle(this.cards);
		}
	}
});