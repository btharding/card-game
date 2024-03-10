<template>
    <div @click="select" class="card" :class="{selected: selected}" :style="style">
        <div class="card-content">
            <div class="card-rear" :style="rearStyle">
            </div>
            <div class="card-detail" ref="cardDetail">
                <p :style="txtStyle">{{ text }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "PlayingCard",
    directives: {
    },
    props: {
        card: Object,
        transformations: Object,
        dismissedCardIds: Array,
        players: Array
    },
    data: function () {
        return {
            selected: false,
            text: '',
            txtStyle: '',
            rearStyle: '',
        }
    },
    methods: {
        select: function () {
            if (this.selected) {
                return;
            }
            this.text = this.formatText();
            if (this.text.length > 200) {
                this.txtStyle = 'font-size: 0.5rem';
            } else if (this.text.length > 100) {
                console.log('aaa');
                this.txtStyle = 'font-size: 0.6rem';
            } else {
                this.txtStyle = '';
            }
            this.selected = true;
            this.$emit('selected');
        },
        formatText: function () {
            let wildCards = this.card.txt.match(/(\$\d+)/gmi);
            
            if (wildCards == null) {
                return this.card.txt;
            }
            let cardText = this.card.txt;
            let handledWildCards = [];
            let availableNames = this.players;
            for (let wildCard of wildCards) {
                if (handledWildCards.includes(wildCard)) {
                    continue;
                }
                handledWildCards.push(wildCard);
                let replacement = availableNames[Math.floor(Math.random()*availableNames.length)];
                availableNames = availableNames.filter((n) => {return n.id !== replacement.id});
                cardText = cardText.replaceAll(wildCard, replacement.name);
            }
            return cardText;
        }
    },
    computed: {
        style () {
            if (this.dismissedCardIds.filter((id) => {return id == this.card.id}).length) {
                return {display: 'none'};
            }
            if (!this.selected) {
                return { transform: 'translate(' + this.transformations.offsetX + 'px, ' + this.transformations.offsetY + 'px) rotate(' + this.transformations.rotation + 'deg)'}
            }
            return { transform: 'scale(3) translate(180px, 0px)'};
        },  
    }
}
</script>

<style scoped>
    p {
        font-size: 0.75rem;
    }
    .card {
        width: 80px;
        height: 160px;
        position: absolute;
        top: calc(50%-80px);
        left: 360px;
        transition: all 0.8s;
    }

    .card-content {
        position: relative;
        width: 100%;
        height: 100%;
        transition: transform 1.2s;
        transform-style: preserve-3d;
        text-align: center;
    }

    .card.selected .card-content {
        transform: rotateY(-180deg);
    }

    .card-rear, .card-detail {
        position: absolute;
        width: 80px;
        height: 160px;
        -webkit-backface-visibility: hidden; /* Safari */
        backface-visibility: hidden;
    }

    .card-rear {
        border: 3px solid #FFFFEE;
        background-color: #C72B1E;
        border-radius: 8px;
    }

    .card-detail {
        background-color: #FFFFEE;
        color: #110011;
        transform: rotateY(-180deg);
        border-radius: 8px;
    }
</style>