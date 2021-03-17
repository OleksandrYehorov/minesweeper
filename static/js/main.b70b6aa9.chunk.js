(this.webpackJsonpminesweeper=this.webpackJsonpminesweeper||[]).push([[0],{59:function(n,e,t){"use strict";t.r(e);var i=t(1),r=t(25),o=t(3),a=t(2),c="white",l="grey",s=function(n){var e=n?l:c,t=n?c:l;return Object(o.b)(["background-color:lightgray;border-width:0.2rem;border-style:solid;border-top-color:",";border-left-color:",";border-bottom-color:",";border-right-color:",";"],e,e,t,t)},d=s(!1),u=s(!0),f=t(31),A=t(6),g=t(63),b=t(64),h=t(21),m=(t(60),function(){return(new Date).getTime()}),p={apiKey:"AIzaSyDJdOEpo7tADYFOhGZwyHJrKQ66tLUZ_Sk",authDomain:"minesweeper-12668.firebaseapp.com",projectId:"minesweeper-12668",storageBucket:"minesweeper-12668.appspot.com",messagingSenderId:"227670634951",appId:"1:227670634951:web:e4cd4f9c038577b7c369e2",measurementId:"G-BT2Q977QMC"},j=(h.a.initializeApp(p),h.a.analytics()),w=function(n,e){null===j||void 0===j||j.logEvent(n,e)},x=function(n){var e=n.win,t=n.difficulty,i=n.startedAt,r=m(),o=r-i,a=Object(g.a)({start:i,end:r}),c=Object(b.a)(a);w(e?"win_game":"lose_game",{difficulty:t,durationMs:o,durationFormatted:c})},O=function(n){w("start_game",n)},v=function(n){x(Object(A.a)({win:!0},n))},y=function(n){x(Object(A.a)({win:!1},n))},C=t(5),B=t(22),N=["beginner","intermediate","expert"],M={beginner:{width:9,height:9,mines:10},intermediate:{width:16,height:16,mines:40},expert:{width:30,height:16,mines:99}},E=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=n.min,t=void 0===e?0:e,i=n.max,r=void 0===i?Number.MAX_SAFE_INTEGER:i,o=Math.ceil(t),a=Math.floor(r);return Math.floor(Math.random()*(a-o+1))+o},D=t(12),U=t.n(D),k=U.a.mark(Q);function Q(n){var e,t,i,r;return U.a.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:e=n.from,t=void 0===e?0:e,i=n.to,r=t;case 2:if(!(r<i)){o.next=8;break}return o.next=5,r;case 5:r+=1,o.next=2;break;case 8:case"end":return o.stop()}}),k)}var S,T,z=function(n){var e=M[n],t=e.width,i=e.height;return Object(B.a)(Q({to:i})).map((function(){for(var n=arguments.length,e=new Array(n),i=0;i<n;i++)e[i]=arguments[i];var r=e[1];return Object(B.a)(Q({to:t})).map((function(){for(var n=arguments.length,e=new Array(n),t=0;t<n;t++)e[t]=arguments[t];var i=e[1];return{id:"cell x".concat(i," y").concat(r),isOpen:!1,isFlagged:!1,isMine:!1,adjacentMines:0}}))}))},G=function(n,e){var t=e.x,i=e.y;return[{x:t-1,y:i-1},{x:t,y:i-1},{x:t+1,y:i-1},{x:t-1,y:i},{x:t+1,y:i},{x:t-1,y:i+1},{x:t,y:i+1},{x:t+1,y:i+1}].filter((function(e){var t;return null!=(null===(t=n[e.y])||void 0===t?void 0:t[e.x])}))},Z=function(n,e){return G(n,e).map((function(e){var t=e.x,i=e.y;return n[i][t]}))},W=function n(e,t){var i=t.x,r=t.y,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],a=e[r][i];if(a.isOpen=!0,null==o[r]&&(o[r]=[]),o[r][i])return!0;if(o[r][i]=!0,a.isMine)return!1;if(0===a.adjacentMines){var c=G(e,{x:i,y:r});c.forEach((function(t){return n(e,t,o)}))}return!0},F=function(n,e){var t=M[e].mines,i=n.flat().filter((function(n){return!n.isOpen}));return i.length===t&&i.every((function(n){return n.isMine}))},V=t(30),R="beginner",P=Object(f.a)((S={status:"starting",difficulty:R,board:z(R),startedAt:m()},T=function(n,e){return{initGame:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:e().difficulty;n((function(n){n.board=z(t),n.status="starting",n.difficulty=t}))},clickCell:function(e){var t=e.x,i=e.y;n((function(n){var e;"win"!==n.status&&"lose"!==n.status&&("starting"===n.status&&(function(n,e,t){for(var i=M[e],r=i.width,o=i.height,a=i.mines,c=0;c<a;){var l=E({max:r-1}),s=E({max:o-1}),d=n[s][l],u=l===t.x&&s===t.y;d.isMine||u||(d.isMine=!0,c+=1)}}(n.board,n.difficulty,{x:t,y:i}),(e=n.board).forEach((function(n,t){n.forEach((function(n,i){if(!n.isMine){var r=Z(e,{x:i,y:t}).filter((function(n){return n.isMine})).length;n.adjacentMines=r}}))})),n.status="playing",n.startedAt=m(),O({difficulty:n.difficulty})),W(n.board,{x:t,y:i})||(n.status="lose",y({difficulty:n.difficulty,startedAt:n.startedAt})),F(n.board,n.difficulty)&&(n.status="win",v({difficulty:n.difficulty,startedAt:n.startedAt})))}))},clickNumberCell:function(e){var t=e.x,i=e.y;n((function(n){!function(n,e){var t=e.x,i=e.y,r=n[i][t];return!(r.isOpen&&!r.isMine&&r.adjacentMines>0&&Z(n,{x:t,y:i}).filter((function(n){return n.isFlagged})).length===r.adjacentMines)||G(n,{x:t,y:i}).map((function(e){return[n[e.y][e.x],e]})).filter((function(n){var e=Object(C.a)(n,1)[0],t=e.isFlagged;return!e.isOpen&&!t})).map((function(e){var t=Object(C.a)(e,2)[1];return W(n,{x:t.x,y:t.y})})).every((function(n){return n}))}(n.board,{x:t,y:i})?n.status="lose":F(n.board,n.difficulty)&&(n.status="win")}))},flagCell:function(e){var t=e.x,i=e.y;n((function(n){var e=n.board[i][t];"playing"===n.status&&(e.isFlagged=!e.isFlagged)}))}}},function(n,e,t){return Object(A.a)(Object(A.a)({},S),T((function(e){return n((function(n){return Object(V.a)(n,e)}))}),e,t))})),L=Object(o.b)(["-ms-overflow-style:none;scrollbar-width:none;&::-webkit-scrollbar{display:none;}"]),q=function(n){return function(e){var t;return null===e||void 0===e||null===(t=e.preventDefault)||void 0===t||t.call(e),null===n||void 0===n?void 0:n(e)}},I=t(10),Y=t(8),H=t(65),K=["#0000fd","#017e00","#fd0000","#010180","#830003","#008080","#000000","#808080"],X=function(n){var e=n.value,t=K[e-1];return 0===e?null:Object(i.jsx)(J,{color:t,children:e})},J=o.c.span.withConfig({displayName:"MinesNumber__Number",componentId:"sc-1pdmxjh-0"})(["color:",";font-family:'Lato',sans-serif;font-weight:900;font-size:1.2rem;"],(function(n){return n.color})),_=t.p+"static/media/mine.c649c95a.svg",$=t.p+"static/media/crossedMine.dbbc8897.svg",nn=t.p+"static/media/flag.8176e812.svg";function en(){var n=Object(I.a)(["\n  &:active:not(:disabled) {\n    ","\n  }\n"]);return en=function(){return n},n}function tn(){var n=Object(I.a)(["\n      background-color: red;\n    "]);return tn=function(){return n},n}function rn(){var n=Object(I.a)(["\n  border-color: grey;\n  border-style: solid;\n  border-width: 0;\n  border-top-width: 1px;\n  border-left-width: 1px;\n"]);return rn=function(){return n},n}var on=Object(a.memo)((function(n){var e=n.x,t=n.y,r=P((function(n){return n.status})),o=P((function(n){return n.board[t][e]})),a=P((function(n){return n.clickCell})),c=P((function(n){return n.clickNumberCell})),l=P((function(n){return n.flagCell})),s=function(){return a({x:e,y:t})},d=function(){return c({x:e,y:t})},u=function(){return l({x:e,y:t})},f=Object(H.a)(u);return Object(Y.match)([o,r]).with([{isOpen:!0,isMine:!0},Y.__],(function(n){var r=Object(C.a)(n,1)[0];return Object(i.jsx)(ln,{"aria-label":"open mine cell x".concat(e," y").concat(t),exploded:r.isMine,children:Object(i.jsx)(fn,{})})})).with([{isOpen:!0,isMine:!1},Y.__],(function(n){var r=Object(C.a)(n,1)[0];return Object(i.jsx)(ln,{"aria-label":"open number cell x".concat(e," y").concat(t),onClick:d,exploded:r.isMine,children:Object(i.jsx)(X,{value:r.adjacentMines})})})).with([{isMine:!0,isFlagged:!1},"lose"],(function(){return Object(i.jsx)(ln,{"aria-label":"open mine cell x".concat(e," y").concat(t),children:Object(i.jsx)(fn,{})})})).with([{isMine:!1,isFlagged:!0},"lose"],(function(){return Object(i.jsx)(ln,{"aria-label":"open flagged cell x".concat(e," y").concat(t),children:Object(i.jsx)(An,{})})})).with([{isFlagged:!0},Y.__],(function(){return Object(i.jsx)(dn,Object(A.a)(Object(A.a)({"aria-label":"closed flagged cell x".concat(e," y").concat(t),onContextMenu:q(u),isFlagged:!0},f),{},{children:Object(i.jsx)(un,{})}))})).otherwise((function(){return Object(i.jsx)(dn,Object(A.a)({"aria-label":"closed cell x".concat(e," y").concat(t),disabled:o.isFlagged,isFlagged:!1,onClick:s,onContextMenu:q(u)},f))}))})),an=Object(o.b)(rn()),cn=o.c.button.withConfig({displayName:"Cell__StyledCell",componentId:"sc-1lcac3f-0"})(["box-sizing:border-box;width:28px;height:28px;display:flex;justify-content:center;align-items:center;padding:0;outline:none;background:none;"]),ln=Object(o.c)(cn).withConfig({displayName:"Cell__OpenCell",componentId:"sc-1lcac3f-1"})([""," "," & > *{margin:-1px 0 0 -1px;}"],an,(function(n){return n.exploded&&Object(o.b)(tn())})),sn=Object(o.b)(en(),an),dn=Object(o.c)(cn).withConfig({displayName:"Cell__ClosedCell",componentId:"sc-1lcac3f-2"})([""," ",""],d,(function(n){return n.isFlagged?null:sn})),un=o.c.img.attrs({src:nn,alt:"flag"}).withConfig({displayName:"Cell__FlagIcon",componentId:"sc-1lcac3f-3"})(["width:18px;height:18px;"]),fn=o.c.img.attrs({src:_,alt:"mine"}).withConfig({displayName:"Cell__MineIcon",componentId:"sc-1lcac3f-4"})(["width:21px;height:21px;"]),An=o.c.img.attrs({src:$,alt:"crossed mine"}).withConfig({displayName:"Cell__CrossedMineIcon",componentId:"sc-1lcac3f-5"})(["width:21px;height:21px;"]),gn=q(),bn=function(){var n=P((function(n){return n.board}));return Object(i.jsx)(hn,{onContextMenu:gn,role:"none",children:n.map((function(n,e){return Object(i.jsx)(mn,{"data-testid":"row",children:n.map((function(n,t){return Object(i.jsx)(on,{x:t,y:e},n.id)}))},n[0].id)}))})},hn=o.c.div.withConfig({displayName:"Board__Container",componentId:"sg654j-0"})([""," "," box-sizing:border-box;width:100%;overflow:scroll;display:flex;align-items:flex-start;flex-direction:column;margin-top:0.4rem;margin-bottom:0.4rem;"],u,L),mn=o.c.div.withConfig({displayName:"Board__Row",componentId:"sg654j-1"})(["display:flex;&:first-child ","{border-top-width:0;}",":first-child{border-left-width:0;}"],ln,ln),pn=t(14),jn=t(16),wn=function(n,e){var t=Object(jn.parse)(window.location.search),i=Object(jn.stringify)(Object(A.a)(Object(A.a)({},t),{},Object(pn.a)({},n,e)));!function(n){var e="".concat(window.location.protocol,"//").concat(window.location.host).concat(window.location.pathname).concat(n);window.history.pushState({path:e},"",e)}("?".concat(i))},xn=function(n,e){var t,i=Object(a.useState)(null!==(t=function(n){return Object(jn.parse)(window.location.search,{parseBooleans:!0,parseNumbers:!0})[n]}(n))&&void 0!==t?t:e),r=Object(C.a)(i,2),o=r[0],c=r[1];return[o,Object(a.useCallback)((function(e){c(e),wn(n,e)}),[n])]},On=function(){var n=P((function(n){return n.difficulty})),e=P((function(n){return n.initGame})),t=xn("difficulty","beginner"),r=Object(C.a)(t,2),o=r[0],c=r[1],l=Object(a.useCallback)((function(n){e(n),c(n)}),[e,c]);return Object(a.useEffect)((function(){l(o)}),[o,l]),Object(i.jsx)(vn,{children:N.map((function(e){return Object(i.jsx)(yn,{active:n===e,onClick:function(){return l(e)},children:e},e)}))})},vn=o.c.div.withConfig({displayName:"DifficultySelect__Select",componentId:"k6908a-0"})([""," display:flex;flex-direction:column;"],u),yn=o.c.button.withConfig({displayName:"DifficultySelect__Button",componentId:"k6908a-1"})([""," opacity:",";margin:0;padding:0.2rem;outline:none;cursor:pointer;text-transform:capitalize;flex-grow:1;"],d,(function(n){return n.active?1:.6}));function Cn(){var n=Object(I.a)(["\n  color: red;\n  font-family: 'DSEG7-Classic';\n  font-weight: bold;\n  font-size: 1.8rem;\n  letter-spacing: -0.1rem;\n  box-sizing: border-box;\n  padding: 0.1rem;\n"]);return Cn=function(){return n},n}var Bn=function(n){var e=n.value,t=n["aria-label"],r=Math.min(e,999);return Object(i.jsxs)(Nn,{children:[Object(i.jsx)(Dn,{children:"888"}),Object(i.jsx)(En,{"aria-label":t,children:r})]})},Nn=o.c.div.withConfig({displayName:"Digits__Container",componentId:"sc-1ex60se-0"})([""," position:relative;background-color:black;height:2.6rem;box-sizing:border-box;"],u),Mn=Object(o.b)(Cn()),En=o.c.div.withConfig({displayName:"Digits__Numbers",componentId:"sc-1ex60se-1"})([""," position:absolute;top:0;right:0;"],Mn),Dn=o.c.div.withConfig({displayName:"Digits__GhostNumbers",componentId:"sc-1ex60se-2"})([""," opacity:0.3;"],Mn),Un=function(){var n=P((function(n){return n.difficulty})),e=P((function(n){return n.board})),t=M[n].mines-e.reduce((function(n,e){return n+e.reduce((function(n,e){return e.isFlagged?n+1:n}),0)}),0);return Object(i.jsx)(Bn,{value:t,"aria-label":"mines count"})},kn="data:image/png;base64,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",Qn=function(){var n,e=P((function(n){return n.status})),t=P((function(n){return n.initGame})),r=(n=e,Object(Y.match)(n).with("starting",(function(){return Object(i.jsx)(Tn,{src:kn,alt:"smiling face"})})).with("playing",(function(){return Object(i.jsx)(Tn,{src:kn,alt:"smiling face"})})).with("win",(function(){return Object(i.jsx)(Tn,{src:"data:image/png;base64,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",alt:"smiling face with sunglasses"})})).with("lose",(function(){return Object(i.jsx)(Tn,{src:"data:image/png;base64,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",alt:"dizzy face"})})).run());return Object(i.jsx)(Sn,{"aria-label":"restart",onClick:function(){return t()},children:r})},Sn=o.c.button.withConfig({displayName:"StartGameButton__Button",componentId:"sc-1n9bfoo-0"})([""," padding:0;margin:0;box-sizing:border-box;width:2.6rem;height:2.6rem;display:flex;justify-content:center;align-items:center;cursor:pointer;outline:none;&:active{","}"],d,u),Tn=o.c.img.withConfig({displayName:"StartGameButton__Emoji",componentId:"sc-1n9bfoo-1"})(["width:80%;"]),zn=function(){var n=Object(a.useState)(0),e=Object(C.a)(n,2),t=e[0],r=e[1],o=P((function(n){return n.status}));return Object(a.useEffect)((function(){var n;return Object(Y.match)(o).with("playing",(function(){return n=window.setInterval((function(){r((function(n){return n+1}))}),1e3),function(){window.clearInterval(n)}})).with("lose","win",(function(){window.clearInterval(n)})).with("starting",(function(){r(0)})).run()}),[o]),Object(i.jsx)(Bn,{value:t,"aria-label":"timer"})},Gn=function(){return Object(i.jsxs)(Zn,{children:[Object(i.jsx)(Wn,{children:Object(i.jsx)(Un,{})}),Object(i.jsx)(Fn,{children:Object(i.jsx)(Qn,{})}),Object(i.jsx)(Vn,{children:Object(i.jsx)(zn,{})})]})},Zn=o.c.header.withConfig({displayName:"Header__Container",componentId:"sc-196m5fo-0"})([""," padding:0.2rem;display:flex;"],u),Wn=o.c.div.withConfig({displayName:"Header__Left",componentId:"sc-196m5fo-1"})(["display:flex;align-items:center;justify-content:flex-start;flex:1;overflow:hidden;"]),Fn=o.c.div.withConfig({displayName:"Header__Center",componentId:"sc-196m5fo-2"})(["display:flex;align-items:center;"]),Vn=o.c.div.withConfig({displayName:"Header__Right",componentId:"sc-196m5fo-3"})(["display:flex;align-items:center;justify-content:flex-end;flex:1;overflow:hidden;"]),Rn=function(){return Object(i.jsxs)(Pn,{children:[Object(i.jsx)(Gn,{}),Object(i.jsx)(bn,{}),Object(i.jsx)(On,{})]})},Pn=o.c.div.withConfig({displayName:"Game__Container",componentId:"rflwwk-0"})([""," box-sizing:border-box;padding:0.4rem;user-select:none;display:flex;flex-direction:column;justify-content:space-between;max-width:100%;max-height:100%;"],d),Ln=t(32),qn=t(33),In=t(34);function Yn(){var n=Object(I.a)(["\n  @font-face {\n    font-family: 'DSEG7-Classic';\n    src: url(",") format('woff2'),\n    url(",") format('woff'),\n    url(",") format('truetype');\n    font-weight: bold;\n    font-style: normal;\n  }\n\n  html, body, #root {\n    height: 100%;\n  }\n\n  body {\n    margin: 0;\n    background-color: #008080;\n    background-repeat: no-repeat;\n    background-position: center;\n    background-size: 30%;\n    overscroll-behavior: none;\n    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',\n      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',\n      sans-serif;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n  }\n\n  ","\n"]);return Yn=function(){return n},n}var Hn=Object(o.b)(["html,body{position:fixed;overflow:hidden;}#root{width:100vw;height:100vh;overflow-y:auto;}"]),Kn=Object(o.a)(Yn(),Ln.a,qn.a,In.a,Hn),Xn=function(){return Object(i.jsxs)(a.StrictMode,{children:[Object(i.jsx)(Kn,{}),Object(i.jsx)(Jn,{children:Object(i.jsx)(Rn,{})})]})},Jn=o.c.main.withConfig({displayName:"App__AppContainer",componentId:"sc-3rr7bp-0"})(["height:100%;width:100%;display:flex;justify-content:center;align-items:center;"]),_n=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function $n(n,e){navigator.serviceWorker.register(n,{scope:"/minesweeper/"}).then((function(n){n.onupdatefound=function(){var t=n.installing;null!=t&&(t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA."),e&&e.onUpdate&&e.onUpdate(n)):(console.log("Content is cached for offline use."),e&&e.onSuccess&&e.onSuccess(n)))})}})).catch((function(n){console.error("Error during service worker registration:",n)}))}Object(r.render)(Object(i.jsx)(Xn,{}),document.getElementById("root")),function(n){if("serviceWorker"in navigator){if(new URL("/minesweeper",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var e="".concat("/minesweeper","/service-worker.js");_n?(!function(n,e){fetch(n,{headers:{"Service-Worker":"script"}}).then((function(t){var i=t.headers.get("content-type");404===t.status||null!=i&&-1===i.indexOf("javascript")?navigator.serviceWorker.ready.then((function(n){n.unregister().then((function(){window.location.reload()}))})):$n(n,e)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(e,n),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://cra.link/PWA")}))):$n(e,n)}))}}()}},[[59,1,2]]]);
//# sourceMappingURL=main.b70b6aa9.chunk.js.map