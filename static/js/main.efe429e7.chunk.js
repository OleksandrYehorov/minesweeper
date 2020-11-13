(this.webpackJsonpminesweeper=this.webpackJsonpminesweeper||[]).push([[0],{38:function(e,n,t){"use strict";t.r(n);var i=t(1),r=t(0),o=t(10),a=t.n(o),c=t(2),s=t(5),l=t(3),d="white",u="grey",A=function(e){var n=e?u:d,t=e?d:u;return Object(c.b)(["background-color:lightgray;border-width:0.2rem;border-style:solid;border-top-color:",";border-left-color:",";border-bottom-color:",";border-right-color:",";"],n,n,t,t)},f=A(!1),g=A(!0),b=function(e){return function(n){var t;return null===(t=n.preventDefault)||void 0===t||t.call(n),null===e||void 0===e?void 0:e(n)}},m=s.c,j=["#0000fd","#017e00","#fd0000","#010180","#830003","#008080","#000000","#808080"],h=c.c.span.withConfig({displayName:"MinesNumber__Number",componentId:"sc-1pdmxjh-0"})(["color:",";font-family:'Lato',sans-serif;font-weight:900;font-size:1.2rem;"],(function(e){return e.color})),p=function(e){var n=e.value,t=j[n-1];return Object(i.jsx)(h,{color:t,children:0===n?null:n})},x=t.p+"static/media/mine.fb25d2b3.svg",w=t.p+"static/media/crossedMine.83215a85.svg",v=t.p+"static/media/flag.4e05f810.svg",O=t(12),y=t(9),C=t(16),B=["beginner","intermediate","expert"],N={beginner:{width:9,height:9,mines:10},intermediate:{width:16,height:16,mines:40},expert:{width:30,height:16,mines:99}},M=t(15),E=t.n(M),D=E.a.mark(U);function U(e){var n,t,i,r;return E.a.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:n=e.from,t=void 0===n?0:n,i=e.to,r=t;case 2:if(!(r<i)){o.next=8;break}return o.next=5,r;case 5:r+=1,o.next=2;break;case 8:case"end":return o.stop()}}),D)}var k=function(e){var n=N[e],t=n.width,i=n.height,r=0;return Object(C.a)(U({to:i})).map((function(){return Object(C.a)(U({to:t})).map((function(){return{id:r++,isOpen:!1,isFlagged:!1,isMine:!1,adjacentMines:0}}))}))},Q=function(e){var n=e.min,t=void 0===n?0:n,i=e.max,r=void 0===i?Number.MAX_SAFE_INTEGER:i;return t=Math.ceil(t),r=Math.floor(r),Math.floor(Math.random()*(r-t+1))+t},T=function(e,n){var t=n.x,i=n.y;return[{x:t-1,y:i-1},{x:t,y:i-1},{x:t+1,y:i-1},{x:t-1,y:i},{x:t+1,y:i},{x:t-1,y:i+1},{x:t,y:i+1},{x:t+1,y:i+1}].filter((function(n){var t;return null!=(null===(t=e[n.y])||void 0===t?void 0:t[n.x])}))},z=function(e,n){return T(e,n).map((function(n){var t=n.x,i=n.y;return e[i][t]}))},S=function e(n,t){var i=t.x,r=t.y,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],a=n[r][i];if(a.isOpen=!0,null==o[r]&&(o[r]=[]),o[r][i])return!0;if(o[r][i]=!0,a.isMine)return!1;if(0===a.adjacentMines){var c=T(n,{x:i,y:r});c.forEach((function(t){return e(n,t,o)}))}return!0},W=function(e,n){var t=N[n].mines,i=e.flat().filter((function(e){return!e.isOpen}));return i.length===t&&i.every((function(e){return e.isMine}))},Z="beginner",G={status:"starting",difficulty:Z,board:k(Z)},R=Object(O.b)({name:"game",initialState:G,reducers:{initGame:function(e,n){var t=n.payload,i=void 0===t?e.difficulty:t;e.board=k(i),e.status="starting",e.difficulty=i},clickCell:function(e,n){var t,i=n.payload,r=i.x,o=i.y;"win"!==e.status&&"lose"!==e.status&&("starting"===e.status&&(!function(e,n,t){for(var i=N[n],r=i.width,o=i.height,a=i.mines,c=0;c<a;){var s=Q({max:r-1}),l=Q({max:o-1}),d=e[l][s],u=s===t.x&&l===t.y;d.isMine||u||(d.isMine=!0,c+=1)}}(e.board,e.difficulty,{x:r,y:o}),(t=e.board).forEach((function(e,n){e.forEach((function(e,i){if(!e.isMine){var r=z(t,{x:i,y:n}).filter((function(e){return e.isMine})).length;e.adjacentMines=r}}))})),e.status="playing"),S(e.board,{x:r,y:o})||(e.status="lose"),W(e.board,e.difficulty)&&(e.status="win"))},clickNumberCell:function(e,n){var t=n.payload,i=t.x,r=t.y;(function(e,n){var t=n.x,i=n.y,r=e[i][t];return!(r.isOpen&&!r.isMine&&r.adjacentMines>0&&z(e,{x:t,y:i}).filter((function(e){return e.isFlagged})).length===r.adjacentMines)||T(e,{x:t,y:i}).map((function(n){return[e[n.y][n.x],n]})).filter((function(e){var n=Object(y.a)(e,1)[0],t=n.isFlagged;return!n.isOpen&&!t})).map((function(n){var t=Object(y.a)(n,2)[1];return S(e,{x:t.x,y:t.y})})).every((function(e){return e}))})(e.board,{x:i,y:r})?W(e.board,e.difficulty)&&(e.status="win"):e.status="lose"},flagCell:function(e,n){var t=n.payload,i=t.x,r=t.y,o=e.board[r][i];"playing"===e.status&&(o.isFlagged=!o.isFlagged)}}}),V=R.actions,L=R.reducer,P=V.clickCell,F=V.clickNumberCell,q=V.flagCell,Y=V.initGame,H=L;function K(){var e=Object(l.a)(["\n  border-color: grey;\n  border-style: solid;\n  border-width: 0;\n  border-top-width: 1px;\n  border-left-width: 1px;\n"]);return K=function(){return e},e}var I=Object(c.b)(K()),X=c.c.button.withConfig({displayName:"Cell__StyledCell",componentId:"sc-1lcac3f-0"})(["box-sizing:border-box;width:1.6rem;height:1.6rem;display:flex;justify-content:center;align-items:center;padding:0;outline:none;background:none;"]),J=Object(c.c)(X).withConfig({displayName:"Cell__OpenCell",componentId:"sc-1lcac3f-1"})([""," "," & > *{margin:-1px 0 0 -1px;}"],I,(function(e){return e.exploded&&"background-color: red;"})),_=Object(c.c)(X).withConfig({displayName:"Cell__ClosedCell",componentId:"sc-1lcac3f-2"})([""," &:active:not(:disabled){","}"],f,I),$=c.c.img.withConfig({displayName:"Cell__CellIcon",componentId:"sc-1lcac3f-3"})(["width:80%;"]),ee=function(e){var n=e.coords,t=e.data,r=m((function(e){return e.game.status})),o=Object(s.b)();if(t.isOpen)return Object(i.jsx)(J,{"data-testid":"cell".concat(t.id),onClick:function(){o(F(n))},exploded:t.isMine,children:t.isMine?Object(i.jsx)($,{src:x,alt:"Mine"}):Object(i.jsx)(p,{value:t.adjacentMines})});if("lose"===r){if(t.isMine&&!t.isFlagged)return Object(i.jsx)(J,{"data-testid":"cell".concat(t.id),children:Object(i.jsx)($,{src:x,alt:"Mine"})});if(!t.isMine&&t.isFlagged)return Object(i.jsx)(J,{"data-testid":"cell".concat(t.id),children:Object(i.jsx)($,{src:w,alt:"Crossed mine"})})}return Object(i.jsx)(_,{"data-testid":"cell".concat(t.id),disabled:t.isFlagged,onClick:function(){o(P(n))},onContextMenu:b((function(){return o(q(n))})),children:(t.isFlagged||"win"===r)&&Object(i.jsx)($,{src:v,alt:"Flag"})})},ne=c.c.div.withConfig({displayName:"Board__Container",componentId:"sg654j-0"})([""," display:flex;justify-content:center;align-items:center;flex-direction:column;margin-top:0.4rem;margin-bottom:0.4rem;"],g),te=c.c.div.withConfig({displayName:"Board__Row",componentId:"sg654j-1"})(["display:flex;&:first-child ","{border-top-width:0;}",":first-child{border-left-width:0;}"],J,J),ie=b(),re=function(){var e=m((function(e){return e.game.board}));return Object(i.jsx)(ne,{"data-testid":"board",onContextMenu:ie,children:e.map((function(e,n){return Object(i.jsx)(te,{"data-testid":"row",children:e.map((function(e,t){return Object(i.jsx)(ee,{data:e,coords:{x:t,y:n}},e.id)}))},e[0].id)}))})},oe=c.c.div.withConfig({displayName:"DifficultySelect__Select",componentId:"k6908a-0"})([""," display:flex;flex-direction:column;"],g),ae=c.c.button.withConfig({displayName:"DifficultySelect__Button",componentId:"k6908a-1"})([""," opacity:",";margin:0;padding:0.2rem;outline:none;cursor:pointer;text-transform:capitalize;flex-grow:1;"],f,(function(e){return e.active?1:.6})),ce=function(){var e=Object(s.b)(),n=m((function(e){return e.game.difficulty}));return Object(i.jsx)(oe,{children:B.map((function(t){return Object(i.jsx)(ae,{active:n===t,onClick:function(){return function(n){e(Y(n))}(t)},children:t},t)}))})};function se(){var e=Object(l.a)(["\n  color: red;\n  font-family: 'DSEG7-Classic';\n  font-weight: bold;\n  font-size: 1.8rem;\n  letter-spacing: -0.1rem;\n  box-sizing: border-box;\n  padding: 0.1rem;\n"]);return se=function(){return e},e}var le=c.c.div.withConfig({displayName:"Digits__Container",componentId:"sc-1ex60se-0"})([""," position:relative;background-color:black;height:2.6rem;box-sizing:border-box;"],g),de=Object(c.b)(se()),ue=c.c.div.withConfig({displayName:"Digits__Numbers",componentId:"sc-1ex60se-1"})([""," position:absolute;top:0;right:0;"],de),Ae=c.c.div.withConfig({displayName:"Digits__GhostNumbers",componentId:"sc-1ex60se-2"})([""," opacity:0.3;"],de),fe=function(e){var n=e.value,t=Math.min(n,999);return Object(i.jsxs)(le,{children:[Object(i.jsx)(Ae,{children:"888"}),Object(i.jsx)(ue,{children:t})]})},ge=function(){var e=m((function(e){return e.game.difficulty})),n=m((function(e){return e.game.board})),t=N[e].mines-n.reduce((function(e,n){return e+n.reduce((function(e,n){return n.isFlagged?e+1:e}),0)}),0);return Object(i.jsx)(fe,{value:t})},be="data:image/png;base64,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";function me(){var e=Object(l.a)(["\n  width: 80%;\n"]);return me=function(){return e},e}function je(){var e=Object(l.a)(["\n  ","\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n  width: 2.6rem;\n  height: 2.6rem;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  cursor: pointer;\n  outline: none;\n\n  &:active {\n    ","\n  }\n"]);return je=function(){return e},e}var he=c.c.button(je(),f,g),pe=c.c.img(me()),xe={starting:Object(i.jsx)(pe,{src:be,alt:"smiling face"}),playing:Object(i.jsx)(pe,{src:be,alt:"smiling face"}),win:Object(i.jsx)(pe,{src:"data:image/png;base64,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",alt:"smiling face with sunglasses"}),lose:Object(i.jsx)(pe,{src:"data:image/png;base64,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",alt:"dizzy face"})},we=function(){var e=Object(s.b)(),n=m((function(e){return e.game.status}));return Object(i.jsx)(he,{onClick:function(){return e(Y())},children:xe[n]})},ve=function(){var e=Object(r.useState)(0),n=Object(y.a)(e,2),t=n[0],o=n[1],a=m((function(e){return e.game.status}));return Object(r.useEffect)((function(){var e;if("playing"===a)return e=setInterval((function(){o((function(e){return e+1}))}),1e3),function(){clearInterval(e)};"lose"!==a&&"win"!==a||clearInterval(e),"starting"===a&&o(0)}),[a]),Object(i.jsx)(fe,{value:t})},Oe=c.c.header.withConfig({displayName:"Header__Container",componentId:"sc-196m5fo-0"})([""," padding:0.2rem;display:flex;"],g),ye=c.c.div.withConfig({displayName:"Header__Left",componentId:"sc-196m5fo-1"})(["display:flex;align-items:center;justify-content:flex-start;flex:1;"]),Ce=c.c.div.withConfig({displayName:"Header__Center",componentId:"sc-196m5fo-2"})(["display:flex;align-items:center;"]),Be=c.c.div.withConfig({displayName:"Header__Right",componentId:"sc-196m5fo-3"})(["display:flex;align-items:center;justify-content:flex-end;flex:1;"]),Ne=function(){return Object(i.jsxs)(Oe,{children:[Object(i.jsx)(ye,{children:Object(i.jsx)(ge,{})}),Object(i.jsx)(Ce,{children:Object(i.jsx)(we,{})}),Object(i.jsx)(Be,{children:Object(i.jsx)(ve,{})})]})};function Me(){var e=Object(l.a)(["\n  ","\n  padding: 0.4rem;\n  user-select: none;\n"]);return Me=function(){return e},e}var Ee=c.c.div(Me(),f),De=function(){return Object(i.jsxs)(Ee,{children:[Object(i.jsx)(Ne,{}),Object(i.jsx)(re,{}),Object(i.jsx)(ce,{})]})},Ue=Object(O.a)({reducer:{game:H}}),ke=t(22),Qe=t(23),Te=t(24);function ze(){var e=Object(l.a)(["\n  @font-face {\n    font-family: 'DSEG7-Classic';\n    src: url(",") format('woff2'),\n    url(",") format('woff'),\n    url(",") format('truetype');\n    font-weight: bold;\n    font-style: normal;\n  }\n\n  html, body, #root {\n    height: 100%;\n  }\n\n  body {\n    margin: 0;\n    background-color: #008080;\n    background-repeat: no-repeat;\n    background-position: center;\n    background-size: 30%;\n    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',\n      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',\n      sans-serif;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n  }\n"]);return ze=function(){return e},e}var Se=Object(c.a)(ze(),ke.a,Qe.a,Te.a),We=c.c.main.withConfig({displayName:"App__AppContainer",componentId:"sc-3rr7bp-0"})(["height:100%;width:100%;display:flex;justify-content:center;align-items:center;"]),Ze=function(){return Object(i.jsx)(r.StrictMode,{children:Object(i.jsxs)(s.a,{store:Ue,children:[Object(i.jsx)(Se,{}),Object(i.jsx)(We,{children:Object(i.jsx)(De,{})})]})})},Ge=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function Re(e,n){navigator.serviceWorker.register(e).then((function(e){e.addEventListener("updatefound",(function(){var t=e.installing;null!=t&&t.addEventListener("statechange",(function(){"installed"===t.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),n&&n.onUpdate&&n.onUpdate(e)):(console.log("Content is cached for offline use."),n&&n.onSuccess&&n.onSuccess(e)))}))}))})).catch((function(e){console.error("Error during service worker registration:",e)}))}a.a.render(Object(i.jsx)(Ze,{}),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/minesweeper",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var n="".concat("/minesweeper","/service-worker.js");Ge?(!function(e,n){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(t){var i=t.headers.get("content-type");404===t.status||null!=i&&-1===i.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):Re(e,n)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(n,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):Re(n,e)}))}}()}},[[38,1,2]]]);
//# sourceMappingURL=main.efe429e7.chunk.js.map