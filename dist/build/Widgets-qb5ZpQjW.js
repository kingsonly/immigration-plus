import{a4 as j,j as e,e as o,a5 as k,T as l,a6 as w,a as $,a7 as F,a8 as R,k as c,a9 as T,aa as v,ab as C,ac as M,ad as D,ae as W,af as I,ag as L,$ as m}from"./strapi-DRcA1ayC.js";import{W as u}from"./WidgetHelpers-CkzVA7Jn.js";import{g as A,a as N}from"./users-DLc-PG84.js";const S=c(l)`
  font-size: 2.4rem;
`,z=()=>{const t=j("User",a=>a.user),s=A(t),n=N(t);return e.jsxs(o,{direction:"column",gap:3,height:"100%",justifyContent:"center",children:[e.jsx(k.Item,{delayMs:0,fallback:n}),s&&e.jsx(S,{fontWeight:"bold",textTransform:"none",textAlign:"center",children:s}),t?.email&&e.jsx(l,{variant:"omega",textColor:"neutral600",children:t?.email}),t?.roles?.length&&e.jsx(o,{marginTop:2,gap:1,wrap:"wrap",children:t?.roles?.map(a=>e.jsx(w,{children:a.name},a.id))})]})},E=c(m)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  border: 1px solid ${({theme:t})=>t.colors.neutral200};
  border-radius: ${({theme:t})=>t.borderRadius};
  overflow: hidden;
`,G=c(m)`
  border-bottom: 1px solid ${({theme:t})=>t.colors.neutral200};
  border-right: 1px solid ${({theme:t})=>t.colors.neutral200};
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  &:nth-child(2n) {
    border-right: none;
  }
  &:nth-last-child(-n + 2) {
    border-bottom: none;
  }
`,K=({locale:t,number:s})=>new Intl.NumberFormat(t,{notation:"compact",maximumFractionDigits:1}).format(s),O=()=>{const{formatMessage:t,locale:s}=$(),{data:n,isLoading:a}=F(),{data:d,isLoading:p}=R();if(p||a)return e.jsx(u.Loading,{});if(!d||!n)return e.jsx(u.Error,{});const f={entries:{label:{id:"widget.key-statistics.list.entries",defaultMessage:"Entries"},icon:{component:e.jsx(L,{}),background:"primary100",color:"primary600"}},assets:{label:{id:"widget.key-statistics.list.assets",defaultMessage:"Assets"},icon:{component:e.jsx(I,{}),background:"warning100",color:"warning600"}},contentTypes:{label:{id:"widget.key-statistics.list.contentTypes",defaultMessage:"Content-Types"},icon:{component:e.jsx(W,{}),background:"secondary100",color:"secondary600"}},components:{label:{id:"widget.key-statistics.list.components",defaultMessage:"Components"},icon:{component:e.jsx(D,{}),background:"alternative100",color:"alternative600"}},locales:{label:{id:"widget.key-statistics.list.locales",defaultMessage:"Locales"},icon:{component:e.jsx(M,{}),background:"success100",color:"success600"}},admins:{label:{id:"widget.key-statistics.list.admins",defaultMessage:"Admins"},icon:{component:e.jsx(C,{}),background:"danger100",color:"danger600"}},webhooks:{label:{id:"widget.key-statistics.list.webhooks",defaultMessage:"Webhooks"},icon:{component:e.jsx(v,{}),background:"alternative100",color:"alternative600"}},apiTokens:{label:{id:"widget.key-statistics.list.apiTokens",defaultMessage:"API Tokens"},icon:{component:e.jsx(T,{}),background:"neutral100",color:"neutral600"}}},{draft:b,published:x,modified:h}=n??{draft:0,published:0,modified:0},y=b+x+h;return e.jsx(E,{children:Object.entries(f).map(([i,r])=>{const g=d?.[i];return g!==null&&e.jsx(G,{padding:3,"data-testid":`stat-${i}`,children:e.jsxs(o,{alignItems:"center",gap:2,children:[e.jsx(o,{padding:2,borderRadius:1,background:r.icon.background,color:r.icon.color,children:r.icon.component}),e.jsxs(o,{direction:"column",alignItems:"flex-start",children:[e.jsx(l,{variant:"pi",fontWeight:"bold",textColor:"neutral500",children:t(r.label)}),e.jsx(l,{variant:"omega",fontWeight:"bold",textColor:"neutral800",children:K({locale:s,number:i==="entries"?y:g})})]})]})},`key-statistics-${i}`)})})};export{O as KeyStatisticsWidget,z as ProfileWidget};
