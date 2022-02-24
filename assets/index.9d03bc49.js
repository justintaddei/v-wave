import{d as m,r as g,a as _,b as y,c as r,e as c,f as v,u as p,w as l,F as b,g as w,o as a,h as d,i as V,p as x,V as O}from"./vendor.82daf37f.js";const L=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function u(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=u(e);fetch(e.href,t)}};L();var C="/assets/logo.af44a489.png";const k=w('<img alt="Vue logo" src="'+C+'"><h1>v-wave</h1><div class="badges"><img src="https://github.com/justintaddei/v-wave/workflows/Tests/badge.svg" alt=""><img src="https://img.shields.io/github/issues-raw/justintaddei/v-wave.svg?style=flat" alt=""><img src="https://img.shields.io/npm/v/v-wave.svg?style=flat" alt=""></div><p>The material-ripple directive for Vue that actually works</p><p><a href="https://github.com/justintaddei/v-wave">Back to Github</a></p><br>',6),E={class:"editor"},N={class:"editorWrapper"},P={class:"previewWrapper"},B={class:"otherExamples"},T=c("h2",null,"Other Examples",-1),j={class:"box"},A=d("Default"),D=[A],F={style:{color:"#fff",background:"#333"},class:"box"},W=d("default (currentColor demo)"),S=[W],q={style:{"border-radius":"50% 10px"},class:"box"},z=d(" border-radius "),G=[z],I={class:"box"},K=d(" radial-gradient "),M=[K],H=m({setup(h){let o=g(`
<!-- Edit me -->
<div
  class="box"
  v-wave="{
    color: 'currentColor',
    easing: 'ease-out',
    duration: 0.4,
    initialOpacity: 0.2,
    finalOpacity: 0.1,
    cancellationPeriod: 75
  }"
>
  Click here
</div>`),u=s=>o.value=s;return(s,e)=>{const t=_("VueLiveEditor"),i=_("VueLivePreview"),n=y("wave");return a(),r(b,null,[k,c("div",E,[c("div",N,[v(t,{code:p(o),onChange:p(u)},null,8,["code","onChange"])]),c("div",P,[v(i,{code:p(o)},null,8,["code"])])]),c("div",B,[T,l((a(),r("div",j,D)),[[n]]),l((a(),r("div",F,S)),[[n]]),l((a(),r("div",q,G)),[[n,{color:"#09f",initialOpacity:.7,finalOpacity:.5}]]),l((a(),r("div",I,M)),[[n,{duration:2,color:"radial-gradient(closest-side, #3f87a6, #ebf8e1, #f69d3c)",initialOpacity:.7,finalOpacity:.3,easing:"cubic-bezier(0,.57,.89,0)"}]])])],64)}}}),f=V(H);f.use(x).use(O);f.mount("#app");
