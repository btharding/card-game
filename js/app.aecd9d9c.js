(function(){"use strict";var t={4521:function(t,e,a){var n=a(9242),r=a(3396);function i(t,e,a,n,i,s){const l=(0,r.up)("MainPane");return(0,r.wg)(),(0,r.j4)(l)}var s=a(7139);const l=t=>((0,r.dD)("data-v-604b81a0"),t=t(),(0,r.Cn)(),t),d={id:"container"},o={id:"config-content"},c=l((()=>(0,r._)("h1",null,"Players",-1))),u=["onClick"],f=l((()=>(0,r._)("h1",null,"New Card",-1))),h=l((()=>(0,r._)("br",null,null,-1))),p=["onClick"],g=["onClick"],y={class:"pane",id:"game"};function m(t,e,a,i,l,m){const C=(0,r.up)("PlayingCard");return(0,r.wg)(),(0,r.iD)("div",d,[(0,r._)("div",{class:(0,s.C_)(["pane",{open:t.configPaneIsOpen}]),id:"config"},[(0,r._)("div",{class:"icon",onClick:e[0]||(e[0]=(...t)=>m.toggleConfigPane&&m.toggleConfigPane(...t))}," ☰ "),(0,r._)("div",o,[c,(0,r._)("input",{type:"text",onKeyup:e[1]||(e[1]=(0,n.D2)(((...t)=>m.newPlayer&&m.newPlayer(...t)),["enter"]))},null,32),((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(t.players,(t=>((0,r.wg)(),(0,r.iD)("h3",{key:t.id,onClick:e=>m.deletePlayer(t.id)},(0,s.zw)(t.name),9,u)))),128)),f,(0,r._)("textarea",{onKeyup:e[2]||(e[2]=(0,n.D2)((0,n.iM)(((...t)=>m.submitCard&&m.submitCard(...t)),["ctrl"]),["enter"]))},null,32),((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(t.cardData,(t=>((0,r.wg)(),(0,r.iD)("div",{class:"cardConfig",key:t.id},[(0,r._)("span",null,(0,s.zw)(t.txt),1),h,(0,r._)("span",null,[(0,r._)("span",{onClick:e=>m.adjustInstances(t,-1),class:"dec"},"-",8,p),(0,r.Uk)(" "+(0,s.zw)(t.instances)+" ",1),(0,r._)("span",{class:"inc",onClick:e=>m.adjustInstances(t,1)},"+",8,g)])])))),128)),t.cardData.length?((0,r.wg)(),(0,r.iD)("h4",{key:0,onClick:e[3]||(e[3]=(...t)=>m.download&&m.download(...t))},"Download deck")):(0,r.kq)("",!0),(0,r._)("input",{onChange:e[4]||(e[4]=(...t)=>m.uploadDeck&&m.uploadDeck(...t)),type:"file",style:{display:"none"},ref:"fileUp",accept:".json"},null,544),(0,r._)("h4",{onClick:e[5]||(e[5]=(...t)=>m.triggerFileUpload&&m.triggerFileUpload(...t))},"Upload deck")])],2),(0,r._)("div",y,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(t.cards,((e,a)=>((0,r.wg)(),(0,r.j4)(C,{ref_for:!0,ref:e.id,key:e.id,card:e,transformations:m.calculateTransformations(a),onSelected:t=>m.handleSelectedCard(e.id),dismissedCardIds:t.dismissedCardIds,players:t.players},null,8,["card","transformations","onSelected","dismissedCardIds","players"])))),128))])])}a(6229),a(7330),a(2062),a(7658);const C={class:"card-content"},v={class:"card-detail",ref:"cardDetail"};function D(t,e,a,n,i,l){return(0,r.wg)(),(0,r.iD)("div",{onClick:e[0]||(e[0]=(...t)=>l.select&&l.select(...t)),class:(0,s.C_)(["card",{selected:t.selected}]),style:(0,s.j5)(l.style)},[(0,r._)("div",C,[(0,r._)("div",{class:"card-rear",style:(0,s.j5)(t.rearStyle)},null,4),(0,r._)("div",v,[(0,r._)("p",{style:(0,s.j5)(t.txtStyle)},(0,s.zw)(t.text),5)],512)])],6)}var w={name:"PlayingCard",directives:{},props:{card:Object,transformations:Object,dismissedCardIds:Array,players:Array},data:function(){return{selected:!1,text:"",txtStyle:"",rearStyle:""}},methods:{select:function(){this.selected||(this.text=this.formatText(),this.text.length>200?this.txtStyle="font-size: 0.5rem":this.text.length>100?(console.log("aaa"),this.txtStyle="font-size: 0.6rem"):this.txtStyle="",this.selected=!0,this.$emit("selected"))},formatText:function(){let t=this.card.txt.match(/(\$\d+)/gim);if(null==t)return this.card.txt;let e=this.card.txt,a=[],n=this.players;for(let r of t){if(a.includes(r))continue;a.push(r);let t=n[Math.floor(Math.random()*n.length)];n=n.filter((e=>e.id!==t.id)),e=e.replaceAll(r,t.name)}return e}},computed:{style(){return this.dismissedCardIds.filter((t=>t==this.card.id)).length?{display:"none"}:this.selected?{transform:"scale(3) translate(180px, 0px)"}:{transform:"translate("+this.transformations.offsetX+"px, "+this.transformations.offsetY+"px) rotate("+this.transformations.rotation+"deg)"}}}},S=a(89);const x=(0,S.Z)(w,[["render",D],["__scopeId","data-v-4a99b9d8"]]);var I=x,_={name:"MainPane",components:{PlayingCard:I},data:function(){return{configPaneIsOpen:!1,players:[],cards:[],cardData:[],currentlySelectedCardId:null,dismissedCardIds:[]}},mounted(){localStorage.players?this.players=JSON.parse(localStorage.players):localStorage.players=JSON.stringify([]),localStorage.cardData&&(this.cardData=JSON.parse(localStorage.cardData),this.cards=this.initialiseCardsFromCardData())},methods:{download:function(){let t=JSON.stringify(this.cardData);const e=new Blob([t],{type:"text/plain"}),a=document.createEvent("MouseEvents");let n=document.createElement("a");n.download="deck.json",n.href=window.URL.createObjectURL(e),n.dataset.downloadurl=["text/json",n.download,n.href].join(":"),a.initEvent("click",!0,!1,window,0,0,0,0,0,!1,!1,!1,!1,0,null),n.dispatchEvent(a)},uploadDeck:function(){let t=this.$refs.fileUp.files;if(!t.length)return;const e=new FileReader;e.onload=t=>{let e=JSON.parse(t.target.result);console.log(e),this.cardData=e,this.cards=this.initialiseCardsFromCardData(),this.dismissedCardIds=[],this.currentlySelectedCardId=null,localStorage.cardData=JSON.stringify(this.cardData)},e.readAsText(t.item(0))},triggerFileUpload:function(){this.$refs.fileUp.click()},shuffleCards:function(t){return t.sort((()=>Math.random()-.5))},adjustInstances:function(t,e){this.cardData=this.cardData.map((a=>(a.id==t.id&&(a.instances+=e),a))),this.cardData=this.cardData.filter((t=>t.instances>0)),localStorage.cardData=JSON.stringify(this.cardData),this.correctCards()},correctCards:function(){for(let t of this.cardData){let e=this.cards.filter((e=>e.parentId==t.id)).length;if(e!=t.instances)if(e<t.instances){let e={txt:t.txt,parentId:t.id,id:this.uniqueId()};this.cards.push(e)}else for(let a=0;a<e-t.instances;a++){let e=this.cards.findIndex((e=>e.parentId==t.id));this.cards.splice(e,1)}}this.cards=this.cards.filter((t=>this.cardData.filter((e=>e.id==t.parentId)).length>0))},initialiseCardsFromCardData:function(){let t=[];for(let e of this.cardData)for(let a=0;a<e.instances;a++)t.push({txt:e.txt,parentId:e.id,id:this.uniqueId()});return this.shuffleCards(t)},uniqueId:function(){return Math.random().toString(36).slice(-6)},degToRad:function(t){return t*Math.PI/180},handleSelectedCard:function(t){null!=this.currentlySelectedCardId?(this.dismissedCardIds.push(this.currentlySelectedCardId),this.currentlySelectedCardId=t):this.currentlySelectedCardId=t},calculateTransformations:function(t){let e=t*(360/this.cards.length),a=160*Math.sin(this.degToRad(e)),n=-160*Math.cos(this.degToRad(e));return{rotation:e,offsetX:a,offsetY:n}},deletePlayer:function(t){this.players=this.players.filter((e=>e.id!==t)),localStorage.players=JSON.stringify(this.players)},toggleConfigPane:function(){this.configPaneIsOpen=!this.configPaneIsOpen},addPlayer:function(t){this.players.push(t),localStorage.players=JSON.stringify(this.players)},newPlayer:function(t){let e=t.target.value.trim();e.length&&(t.target.value="",this.addPlayer({name:e,id:this.uniqueId()}))},submitCard:function(t){let e=t.target.value.trim();if(!e.length)return;t.target.value="";let a=this.uniqueId();this.cardData.push({txt:e,id:a,instances:1}),localStorage.cardData=JSON.stringify(this.cardData),this.cards.push({txt:e,parentId:a,id:this.uniqueId})}}};const k=(0,S.Z)(_,[["render",m],["__scopeId","data-v-604b81a0"]]);var O=k,b={name:"App",components:{MainPane:O}};const P=(0,S.Z)(b,[["render",i]]);var j=P;(0,n.ri)(j).mount("#app")}},e={};function a(n){var r=e[n];if(void 0!==r)return r.exports;var i=e[n]={exports:{}};return t[n].call(i.exports,i,i.exports,a),i.exports}a.m=t,function(){var t=[];a.O=function(e,n,r,i){if(!n){var s=1/0;for(c=0;c<t.length;c++){n=t[c][0],r=t[c][1],i=t[c][2];for(var l=!0,d=0;d<n.length;d++)(!1&i||s>=i)&&Object.keys(a.O).every((function(t){return a.O[t](n[d])}))?n.splice(d--,1):(l=!1,i<s&&(s=i));if(l){t.splice(c--,1);var o=r();void 0!==o&&(e=o)}}return e}i=i||0;for(var c=t.length;c>0&&t[c-1][2]>i;c--)t[c]=t[c-1];t[c]=[n,r,i]}}(),function(){a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,{a:e}),e}}(),function(){a.d=function(t,e){for(var n in e)a.o(e,n)&&!a.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={143:0};a.O.j=function(e){return 0===t[e]};var e=function(e,n){var r,i,s=n[0],l=n[1],d=n[2],o=0;if(s.some((function(e){return 0!==t[e]}))){for(r in l)a.o(l,r)&&(a.m[r]=l[r]);if(d)var c=d(a)}for(e&&e(n);o<s.length;o++)i=s[o],a.o(t,i)&&t[i]&&t[i][0](),t[i]=0;return a.O(c)},n=self["webpackChunkcard_game"]=self["webpackChunkcard_game"]||[];n.forEach(e.bind(null,0)),n.push=e.bind(null,n.push.bind(n))}();var n=a.O(void 0,[998],(function(){return a(4521)}));n=a.O(n)})();
//# sourceMappingURL=app.aecd9d9c.js.map