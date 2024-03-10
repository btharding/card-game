<template>
    <div id="container">
      <div class = "pane" :class="{open: configPaneIsOpen}" id = "config">
        <div class="icon" @click="toggleConfigPane">
          <span v-if="configPaneIsOpen">👻</span>
          <span v-else>🪦</span>
        </div>
        <div id="config-content">
          <h1>Players</h1>
          <input type = "text"  @keyup.enter = "newPlayer"/>
          <h3 v-for="player in players" :key="player.id" @click="deletePlayer(player.id)">{{ player.name }}</h3>
          <h1>New Card</h1>
          <textarea @keyup.ctrl.enter="submitCard"></textarea>
          <div class="cardConfig" v-for = "card in cardData" :key="card.id">
            <span>{{ card.txt }}</span>
            <br/>
            <span><span @click="adjustInstances(card, -1)" class = "dec">-</span> {{ card.instances }} <span class = "inc" @click="adjustInstances(card, 1)">+</span></span>
          </div>
          <h4 @click="download" v-if="cardData.length">Download deck</h4>
          <input @change="uploadDeck" type = "file" style="display:none" ref="fileUp" accept=".json"/>
          <h4 @click="triggerFileUpload">Upload deck</h4>
        </div>
      </div>
      <div class="pane" id = "game">
        <PlayingCard v-for="(card, index) in cards" :ref="card.id" :key = "card.id" :card="card" :transformations="calculateTransformations(index)" @selected="handleSelectedCard(card.id)" :dismissedCardIds="dismissedCardIds" :players="players"></PlayingCard>
      </div>
    </div>
</template>

<script>
import PlayingCard from './PlayingCard.vue';
export default {
  name: 'ResizablePane',
  components: {
    PlayingCard
  },
  data: function () {
    return {
      configPaneIsOpen: false,
      players: [],
      cards: [],
      cardData: [],
      currentlySelectedCardId: null,
      dismissedCardIds: []
    }
  },
  mounted() {
    if (localStorage.players) {
      this.players = JSON.parse(localStorage.players);
    } else {
      localStorage.players = JSON.stringify([]);
    }
    if (localStorage.cardData) {
      this.cardData = JSON.parse(localStorage.cardData);
      this.cards = this.initialiseCardsFromCardData();
    }
  },
  methods: {
    download: function () {
      let data = JSON.stringify(this.cardData);
      const blob = new Blob([data], {type: 'text/plain'});
      const e = document.createEvent('MouseEvents')
      let a = document.createElement('a');
      a.download = "deck.json";
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
      e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      a.dispatchEvent(e);
    },
    uploadDeck: function () {
      let files = this.$refs.fileUp.files;
      if (!files.length) {
        return;
      }
      const fr = new FileReader();

      fr.onload = e => {
        let result = JSON.parse(e.target.result);
        console.log(result);
        this.cardData = result;
        this.cards = this.initialiseCardsFromCardData();
        this.dismissedCardIds = []
        this.currentlySelectedCardId = null;
        localStorage.cardData = JSON.stringify(this.cardData);
      }

      fr.readAsText(files.item(0));
    },
    triggerFileUpload: function () {
      this.$refs.fileUp.click();
    },
    shuffleCards: function (cards) {
      return cards.sort(() => Math.random() - 0.5);
    },
    adjustInstances: function (card, adjustment) {
      this.cardData = this.cardData.map((c) => {
        if (c.id == card.id) {
          c.instances += adjustment;
        }
        return c;
      });
      this.cardData = this.cardData.filter((c) => {
        return c.instances > 0;
      });
      localStorage.cardData = JSON.stringify(this.cardData);
      this.correctCards();
    },
    correctCards: function () {
      for (let parentCard of this.cardData) {
        let actualInstances = this.cards.filter((c) => {return c.parentId == parentCard.id}).length;
        if (actualInstances == parentCard.instances) {
          continue;
        }
        if (actualInstances < parentCard.instances) {
          let card = {'txt': parentCard.txt, 'parentId': parentCard.id, 'id': this.uniqueId()};
          this.cards.push(card);
          continue;
        }
        for (let i = 0; i < (actualInstances - parentCard.instances); i++) {
          let index = this.cards.findIndex((c) => {return c.parentId == parentCard.id});
          this.cards.splice(index, 1);
        }
      }
      this.cards = this.cards.filter((c) => {
        return this.cardData.filter((parentCard) => { return parentCard.id == c.parentId }).length > 0;
      })
    },
    initialiseCardsFromCardData: function () {
      let cards = [];
      for (let card of this.cardData) {
        for (let i = 0; i < card.instances; i ++) {
          cards.push({'txt': card.txt, 'parentId': card.id, 'id': this.uniqueId()});
        }
      }
      return this.shuffleCards(cards);
    },
    uniqueId: function () {
      return Math.random().toString(36).slice(-6);
    },
    degToRad: function(deg) {
      return deg*Math.PI/180;
    },
    handleSelectedCard: function(cardId) {
      if (this.currentlySelectedCardId == null) {
        this.currentlySelectedCardId = cardId;
        return;
      }
      this.dismissedCardIds.push(this.currentlySelectedCardId);
      this.currentlySelectedCardId = cardId;
    },

    calculateTransformations: function (index) {
      let rotation = index * (360/this.cards.length);
      let offsetX = 160 * Math.sin(this.degToRad(rotation));
      let offsetY = -160 * Math.cos(this.degToRad(rotation));
      return {
        'rotation': rotation,
        'offsetX': offsetX,
        'offsetY': offsetY
      }
    },
    deletePlayer: function (playerId) {
      this.players = this.players.filter((p) => {
        return p.id !== playerId;
      });
      localStorage.players = JSON.stringify(this.players);
    },
    toggleConfigPane: function () {
      this.configPaneIsOpen = !this.configPaneIsOpen;
    },
    addPlayer: function(player) {
      this.players.push(player);
      localStorage.players = JSON.stringify(this.players);
    },
    newPlayer: function(event) {
      let playerName = event.target.value.trim();
      if (!playerName.length) {
        return;
      }
      event.target.value = '';
      this.addPlayer({'name' : playerName, 'id': this.uniqueId()});
    },
    submitCard: function(event) {
      let cardText = event.target.value.trim();
      if (!cardText.length) {
        return;
      }
      event.target.value = '';
      let uid = this.uniqueId();
      this.cardData.push({'txt': cardText, 'id': uid, 'instances': 1});
      localStorage.cardData = JSON.stringify(this.cardData);
      this.cards.push({'txt': cardText, 'parentId': uid, 'id': this.uniqueId});
    }
  }
}
</script>

<style scoped>
  .cardConfig {
    width: 80%;
    min-height: 100px;
    border: 1px solid #d0cfd7;
    margin: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  #game {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background-color: #4b7186;
  }

  textarea.err {
    background-color: lightcoral;
  }
  #container {
    width: 100%;
    height: 100%;
    display: flex;
  }
  .pane {
    border: 1px solid lightgray;
    height: 100%;
    overflow: auto;
    min-width: 40px;
  }

  #config {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 5 px;
    background-color: #000f09;
    color: #d0cfd7;

  }

  #config::-webkit-scrollbar {
    display:none;
  }

  #config.open #config-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #config-content {
    display: none;
  }

  #config.open {
    min-width: 500px;
    resize: horizontal;
  }

  #config .icon {
    margin: 5px;
    font-size: 3rem;
  }


  #game {
    flex-grow: 1;
  }
</style>
