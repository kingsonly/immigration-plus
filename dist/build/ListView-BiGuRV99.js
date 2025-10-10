import{j as e,k as b,$ as p,eS as O,a as I,e as x,T as k,h as be,r as R,aF as L,I as N,f as ye,a6 as je,fS as Ce,bR as X,b3 as Z,a3 as Y,fT as we,g as K,bx as Te,bE as $e,bF as ve,cQ as ke,bi as De,b as ee,aC as Me,s as Re,D as B,d2 as Fe,V as Se,z as Ie,fa as Ae,bk as Ee,aL as _,bG as Le,fU as Oe,B as te}from"./strapi-n6a7CCaI.js";import{u as D,g as m,C as J,a as W,A as Ue,S as Ne,c as Q}from"./index-DNOYc_2D.js";import{d as Be,e as Pe,D as ze,f as Ve,a as Ze,S as We,v as He,P as Ge,c as qe,C as _e}from"./sortable.esm-D_472aUp.js";import"./groupBy-DTT6vYnZ.js";import"./_baseEach-C2Kqx9A_.js";import"./sortBy-DOogX_Hp.js";import"./_baseMap-CT9a_Rcb.js";import"./index-C0qms6oQ.js";import"./index-BRVyLNfZ.js";import"./_arrayIncludesWith-BNzMLSv9.js";const Je=t=>{let{transform:n}=t;return{...n,x:0}},Qe=b(p)`
  position: absolute;
  left: -3.4rem;
  top: 0px;

  &:before {
    content: '';
    width: 0.4rem;
    height: 1.2rem;
    background: ${({theme:t,color:n})=>t.colors[n]};
    display: block;
  }
`,Xe=b.svg`
  position: relative;
  flex-shrink: 0;
  transform: translate(-0.5px, -1px);

  * {
    fill: ${({theme:t,color:n})=>t.colors[n]};
  }
`,Ye=t=>e.jsx(Qe,{children:e.jsx(Xe,{width:"20",height:"23",viewBox:"0 0 20 23",fill:"none",xmlns:"http://www.w3.org/2000/svg",...t,children:e.jsx("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M7.02477 14.7513C8.65865 17.0594 11.6046 18.6059 17.5596 18.8856C18.6836 18.9384 19.5976 19.8435 19.5976 20.9688V20.9688C19.5976 22.0941 18.6841 23.0125 17.5599 22.9643C10.9409 22.6805 6.454 20.9387 3.75496 17.1258C0.937988 13.1464 0.486328 7.39309 0.486328 0.593262H4.50974C4.50974 7.54693 5.06394 11.9813 7.02477 14.7513Z"})})}),Ke=t=>{let n;switch(t){case"date":case"datetime":case"time":case"timestamp":n="date";break;case"integer":case"biginteger":case"decimal":case"float":n="number";break;case"string":case"text":n="text";break;case"":n="relation";break;default:n=t}return n},ne=b(p)`
  &.component-row,
  &.dynamiczone-row {
    position: relative;

    > ul:first-of-type {
      padding: 0 0 0 104px;
      position: relative;

      &::before {
        content: '';
        width: 0.4rem;
        height: ${({$isFromDynamicZone:t})=>t?"calc(100% - 65px)":"calc(100%)"};
        position: absolute;
        left: 7rem;
        border-radius: 4px;

        ${({$isFromDynamicZone:t,$isChildOfDynamicZone:n,theme:o})=>n?`background-color: ${o.colors.primary200};`:t?`background-color: ${o.colors.primary200};`:`background: ${o.colors.neutral150};`}
      }
    }
  }

  &.dynamiczone-row > ul:first-of-type {
    padding: 0;
  }
`,oe=({component:t,isFromDynamicZone:n=!1,firstLoopComponentUid:o})=>{const{components:s}=D(),l=O(s,t);return e.jsx(ne,{$isChildOfDynamicZone:n,className:"component-row",children:e.jsx(le,{type:l,firstLoopComponentUid:o||t,isFromDynamicZone:n,isSub:!0,secondLoopComponentUid:o?t:null})})},et=({type:t,customField:n=null,repeatable:o=!1,multiple:s=!1})=>{const{formatMessage:l}=I();let r=t;return["integer","biginteger","float","decimal"].includes(t)?r="number":["string"].includes(t)&&(r="text"),n?l({id:m("attribute.customField"),defaultMessage:"Custom field"}):e.jsxs(e.Fragment,{children:[o&&l({id:m("component.repeatable"),defaultMessage:"Repeatable"}),s&&l({id:m("media.multiple"),defaultMessage:"Multiple"})," ",l({id:m(`attribute.${r}`),defaultMessage:t})]})},tt=({isActive:t=!1,icon:n="dashboard"})=>{const o=J[n]||J.dashboard;return e.jsx(x,{alignItems:"center",background:t?"primary200":"neutral200",justifyContent:"center",height:8,width:8,borderRadius:"50%",children:e.jsx(o,{height:"2rem",width:"2rem"})})},ie=b(p)`
  position: absolute;
  display: none;
  top: 5px;
  right: 0.8rem;

  svg {
    width: 1rem;
    height: 1rem;

    path {
      fill: ${({theme:t})=>t.colors.primary600};
    }
  }
`,nt=b(x)`
  width: 14rem;
  height: 8rem;
  position: relative;
  border: 1px solid ${({theme:t})=>t.colors.neutral200};
  background: ${({theme:t})=>t.colors.neutral100};
  border-radius: ${({theme:t})=>t.borderRadius};
  max-width: 100%;

  &.active,
  &:focus,
  &:hover {
    border: 1px solid ${({theme:t})=>t.colors.primary200};
    background: ${({theme:t})=>t.colors.primary100};
    color: ${({theme:t})=>t.colors.primary600};

    ${ie} {
      display: block;
    }

    /* > ComponentIcon */
    > div:first-child {
      background: ${({theme:t})=>t.colors.primary200};
      color: ${({theme:t})=>t.colors.primary600};

      svg {
        path {
          fill: ${({theme:t})=>t.colors.primary600};
        }
      }
    }
  }
`,ot=({component:t,dzName:n,index:o,isActive:s=!1,isInDevelopmentMode:l=!1,onClick:r,forTarget:i,targetUid:c,disabled:f})=>{const{components:y,removeComponentFromDynamicZone:v}=D(),a=O(y,t),{icon:d,displayName:u}=a?.info||{},w=T=>{T.stopPropagation(),v({forTarget:i,targetUid:c,dzName:n,componentToRemoveIndex:o})};return e.jsxs(nt,{alignItems:"center",direction:"column",className:s?"active":"",borderRadius:"borderRadius",justifyContent:"center",paddingLeft:4,paddingRight:4,shrink:0,onClick:r,role:"tab",tabIndex:s?0:-1,cursor:"pointer","aria-selected":s,"aria-controls":`dz-${n}-panel-${o}`,id:`dz-${n}-tab-${o}`,children:[e.jsx(tt,{icon:d,isActive:s}),e.jsx(p,{marginTop:1,maxWidth:"100%",children:e.jsx(k,{variant:"pi",fontWeight:"bold",ellipsis:!0,children:u})}),l&&!f&&e.jsx(ie,{cursor:"pointer",tag:"button",onClick:w,children:e.jsx(be,{})})]})},it=b(L)`
  width: 3.2rem;
  height: 3.2rem;
  padding: 0.9rem;
  border-radius: 6.4rem;
  background: ${({theme:t,disabled:n})=>n?t.colors.neutral100:t.colors.primary100};
  path {
    fill: ${({theme:t,disabled:n})=>n?t.colors.neutral600:t.colors.primary600};
  }
`,st=b(x)`
  flex-shrink: 0;
  width: 14rem;
  height: 8rem;
  justify-content: center;
  align-items: center;
`,at=({components:t=[],addComponent:n,name:o,forTarget:s,targetUid:l,disabled:r=!1})=>{const{isInDevelopmentMode:i}=D(),[c,f]=R.useState(0),{formatMessage:y}=I(),v=d=>{c!==d&&f(d)},a=()=>{n(o)};return e.jsx(ne,{className:"dynamiczone-row",$isFromDynamicZone:!0,children:e.jsxs(p,{children:[e.jsx(p,{padding:2,paddingLeft:"104px",children:e.jsxs(x,{role:"tablist",gap:2,wrap:"wrap",children:[i&&e.jsx("button",{type:"button",onClick:a,disabled:r,style:{cursor:r?"not-allowed":"pointer"},children:e.jsxs(st,{direction:"column",alignItems:"stretch",gap:1,children:[e.jsx(it,{disabled:r}),e.jsx(k,{variant:"pi",fontWeight:"bold",textColor:r?"neutral600":"primary600",children:y({id:m("button.component.add"),defaultMessage:"Add a component"})})]})}),t.map((d,u)=>e.jsx(ot,{dzName:o||"",index:u,component:d,isActive:c===u,isInDevelopmentMode:i,onClick:()=>v(u),forTarget:s,targetUid:l,disabled:r},d))]})}),e.jsx(p,{children:t.map((d,u)=>e.jsx(p,{id:`dz-${o}-panel-${u}`,role:"tabpanel","aria-labelledby":`dz-${o}-tab-${u}`,style:{display:c===u?"block":"none"},children:e.jsx(oe,{isFromDynamicZone:!0,component:d},d)},d))})]})})},rt=b(x)`
  justify-content: space-between;

  border-top: ${({theme:t,$isOverlay:n})=>n?"none":`1px solid ${t.colors.neutral150}`};

  padding-top: ${({theme:t})=>t.spaces[4]};
  padding-bottom: ${({theme:t})=>t.spaces[4]};

  opacity: ${({$isDragging:t})=>t?0:1};
  align-items: center;
`,lt=b(p)`
  list-style: none;
  list-style-type: none;
`,se=R.forwardRef((t,n)=>{const{style:o,...s}=t;return e.jsx(lt,{tag:"li",ref:n,...t.attributes,style:o,background:"neutral0",shadow:t.isOverlay?"filterShadow":"none","aria-label":t.item.name,children:e.jsx(dt,{...s})})}),dt=R.memo(t=>{const{item:n,firstLoopComponentUid:o,isFromDynamicZone:s,addComponentToDZ:l,secondLoopComponentUid:r,type:i,isDragging:c,isOverlay:f,handleRef:y,listeners:v}=t,a=f||c,[d,u]=R.useState(!0),w=i.status==="REMOVED",{contentTypes:T,removeAttribute:F,isInDevelopmentMode:M}=D(),{onOpenModalEditField:A,onOpenModalEditCustomField:S}=W(),{formatMessage:g}=I(),[h,j]=R.useState(!1),C=n.status==="REMOVED",P=n.type==="relation"&&n.relation.includes("morph"),de=["integer","biginteger","float","decimal"].includes(n.type)?"number":n.type,E=n.type==="relation"?O(T,n.target):null,H=O(E,"plugin"),ce="target"in n&&n.target?"relation":de,ue=$=>{$.stopPropagation(),Q(T,n.name).length>0?j(!0):F({forTarget:i.modelType,targetUid:i.uid,attributeToRemoveName:n.name})},pe=()=>{F({forTarget:i.modelType,targetUid:i.uid,attributeToRemoveName:n.name}),j(!1)},ge=()=>{j(!1)},G=()=>{if(!P&&n.configurable!==!1){const $=r||o||i.uid,z=Ke(n.type),xe=n.type==="component"?"2":null;n.customField?S({forTarget:i.modelType,targetUid:$,attributeName:n.name,attributeType:z,customFieldUid:n.customField}):A({forTarget:i.modelType,targetUid:$,attributeName:n.name,attributeType:z,step:xe})}};let U;r&&o?U=2:o?U=1:U=0;const q=!w&&!C,me=!w&&!C,fe=w||C?"not-allowed":"move",he=M&&n.configurable!==!1&&!P&&q;return e.jsxs(e.Fragment,{children:[e.jsxs(rt,{$isOverlay:f,$isDragging:c,onClick:he?G:void 0,paddingLeft:4,paddingRight:4,children:[e.jsxs(x,{alignItems:"center",overflow:"hidden",gap:2,children:[U!==0&&!f&&e.jsx(Ye,{color:s?"primary200":"neutral150"}),M&&e.jsx(N,{cursor:fe,role:"Handle",ref:y,...v,variant:"ghost",withTooltip:!1,label:`${g({id:"app.utils.drag",defaultMessage:"Drag"})} ${n.name}`,disabled:w||C,children:e.jsx(ye,{})}),e.jsxs(x,{gap:4,children:[e.jsxs(x,{gap:4,alignItems:"center",children:[e.jsx(Ue,{type:ce,customField:n.customField}),e.jsxs(k,{textColor:"neutral800",fontWeight:"bold",textDecoration:C?"line-through":"none",ellipsis:!0,overflow:"hidden",children:[n.name,"required"in n&&n.required&&e.jsx(k,{textColor:"danger600",children:"* "})]})]}),e.jsx(x,{children:e.jsxs(k,{textColor:"neutral600",children:[e.jsx(et,{type:n.type,customField:n.customField,repeatable:"repeatable"in n&&n.repeatable,multiple:"multiple"in n&&n.multiple}),"conditions"in n&&n.conditions&&Object.keys(n.conditions).length>0&&e.jsx(je,{margin:4,children:"conditional"}),n.type==="relation"&&e.jsxs(e.Fragment,{children:[" (",Ce(n.relation,n.targetAttribute),") ",E&&g({id:m("modelPage.attribute.with"),defaultMessage:"with"})," ",E&&e.jsx(X,{onClick:$=>$.stopPropagation(),tag:Y,to:`/plugins/content-type-builder/content-types/${E.uid}`,children:Z(E.info.displayName)}),H&&`(${g({id:m("from"),defaultMessage:"from"})}: ${H})`]}),n.type==="component"&&e.jsx(ut,{uid:n.component})]})})]})]}),e.jsx(p,{children:e.jsx(x,{justifyContent:"flex-end",gap:1,onClick:$=>$.stopPropagation(),children:e.jsxs(e.Fragment,{children:[e.jsx(p,{children:n.status&&e.jsx(Ne,{status:n.status})}),["component","dynamiczone"].includes(n.type)&&e.jsx(N,{onClick:$=>{$.preventDefault(),$.stopPropagation(),u(!d)},"aria-expanded":d,label:g({id:"app.utils.toggle",defaultMessage:"Toggle"}),variant:"ghost",withTooltip:!1,children:e.jsx(we,{"aria-hidden":!0,fill:"neutral500",style:{transform:`rotate(${d?"0deg":"-90deg"})`,transition:"transform 0.5s"}})}),M&&n.configurable!==!1?e.jsxs(e.Fragment,{children:[!P&&e.jsx(N,{onClick:G,label:`${g({id:"app.utils.edit",defaultMessage:"Edit"})} ${n.name}`,variant:"ghost",disabled:!q,children:e.jsx(K,{})}),e.jsx(N,{onClick:ue,label:`${g({id:"global.delete",defaultMessage:"Delete"})} ${n.name}`,variant:"ghost",disabled:!me,children:e.jsx(Te,{})}),e.jsx($e.Root,{open:h,onOpenChange:j,children:e.jsx(ve,{onConfirm:pe,onCancel:ge,children:e.jsx(p,{children:e.jsxs(k,{children:[g({id:m("popUpWarning.bodyMessage.delete-attribute-with-conditions"),defaultMessage:"The following fields have conditions that depend on this field: "}),e.jsx(k,{fontWeight:"bold",children:Q(T,n.name).map(({attribute:$})=>$).join(", ")}),g({id:m("popUpWarning.bodyMessage.delete-attribute-with-conditions-end"),defaultMessage:". Are you sure you want to delete it?"})]})})})})]}):e.jsx(x,{padding:2,children:e.jsx(ke,{fill:"neutral500"})})]})})})]}),e.jsxs(ct,{$shouldHideNestedInfos:a,$isOpen:d,children:[n.type==="component"&&e.jsx(oe,{...n,isFromDynamicZone:s,firstLoopComponentUid:o}),n.type==="dynamiczone"&&e.jsx(at,{...n,disabled:w||n.status==="REMOVED",addComponent:l,forTarget:i.modelType,targetUid:i.uid})]})]})}),ct=b(p)`
  display: ${({$shouldHideNestedInfos:t})=>t?"none":"block"};
  max-height: ${({$isOpen:t})=>t?"9999px":"0px"};
  overflow: hidden;

  transition: ${({$isOpen:t})=>t?"max-height 1s ease-in-out":"max-height 0.5s cubic-bezier(0, 1, 0, 1)"};
`,ut=({uid:t})=>{const{components:n}=D(),o=O(n,t);return e.jsxs(e.Fragment,{children:[" (",e.jsx(X,{onClick:s=>s.stopPropagation(),tag:Y,to:`/plugins/content-type-builder/component-categories/${o.category}/${o.uid}`,children:Z(o.info.displayName)}),")"]})},ae=b(p)`
  height: 2.4rem;
  width: 2.4rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    height: 1rem;
    width: 1rem;
  }

  svg path {
    fill: ${({theme:t,color:n})=>t.colors[`${n}600`]};
  }
`,re=b(p)`
  border-radius: 0 0 ${({theme:t})=>t.borderRadius} ${({theme:t})=>t.borderRadius};
  display: block;
  width: 100%;
  border: none;
  position: relative;
`,pt=({children:t,icon:n,color:o,...s})=>e.jsx(re,{paddingBottom:4,paddingTop:4,paddingLeft:"6rem",tag:"button",type:"button",...s,children:e.jsxs(x,{children:[e.jsx(ae,{color:o,"aria-hidden":!0,background:`${o}200`,children:n}),e.jsx(p,{paddingLeft:3,children:e.jsx(k,{variant:"pi",fontWeight:"bold",textColor:`${o}600`,children:t})})]})}),gt=({children:t,icon:n,color:o,...s})=>e.jsxs("div",{children:[e.jsx(De,{}),e.jsx(re,{tag:"button",background:`${o}100`,padding:5,...s,children:e.jsxs(x,{children:[e.jsx(ae,{color:o,"aria-hidden":!0,background:`${o}200`,children:n}),e.jsx(p,{paddingLeft:3,children:e.jsx(k,{variant:"pi",fontWeight:"bold",textColor:`${o}600`,children:t})})]})})]}),mt=b(p)`
  white-space: nowrap;
  list-style: none;
  list-style-type: none;
`,ft=t=>{const{isInDevelopmentMode:n}=D(),{isDragging:o,attributes:s,listeners:l,setNodeRef:r,transform:i,transition:c,setActivatorNodeRef:f}=qe({disabled:!n||t.item.status==="REMOVED"||t.type.status==="REMOVED",id:t.item.id,data:{index:t.item.index}}),y={transform:_e.Transform.toString({x:i?.x??0,y:i?.y??0,scaleX:1,scaleY:1}),transition:c};return e.jsx(se,{ref:r,handleRef:f,isDragging:o,attributes:s,listeners:l,style:y,...t})},le=({addComponentToDZ:t,firstLoopComponentUid:n,isFromDynamicZone:o=!1,isMain:s=!1,isSub:l=!1,secondLoopComponentUid:r,type:i})=>{const{formatMessage:c}=I(),{trackUsage:f}=ee(),{isInDevelopmentMode:y,moveAttribute:v}=D(),{onOpenModalAddField:a}=W(),d=i?.attributes.map((h,j)=>({id:`${i.uid}_${h.name}`,index:j,...h})),[u,w]=R.useState(null),T=i?.status==="REMOVED",F=Be(Pe(Ge));function M({active:h}){h&&w(h.id)}function A(h){const{active:j,over:C}=h;w(null),C&&j.id!==C.id&&v({forTarget:i.modelType,targetUid:i.uid,from:j.data.current.index,to:C.data.current.index})}const S=d.find(h=>h.id===u),g=()=>{T||(f("hasClickedCTBAddFieldBanner"),a({forTarget:i?.modelType,targetUid:i.uid}))};return i?.attributes.length===0&&s?e.jsx(Me,{action:e.jsx(B,{onClick:g,size:"L",startIcon:e.jsx(L,{}),variant:"secondary",children:c({id:m("table.button.no-fields"),defaultMessage:"Add new field"})}),content:c(i.modelType==="contentType"?{id:m("table.content.no-fields.collection-type"),defaultMessage:"Add your first field to this Collection-Type"}:{id:m("table.content.no-fields.component"),defaultMessage:"Add your first field to this component"}),hasRadius:!0,icon:e.jsx(Re,{width:"16rem"})}):e.jsxs(ze,{sensors:F,collisionDetection:Ve,onDragEnd:A,onDragStart:M,onDragCancel:()=>w(null),modifiers:[Je],children:[e.jsxs(mt,{tag:"ul",children:[Fe.createPortal(e.jsx(Ze,{zIndex:10,children:S&&e.jsx(se,{isOverlay:!0,item:S,firstLoopComponentUid:n,isFromDynamicZone:o,secondLoopComponentUid:r,type:i,addComponentToDZ:t})}),document.body),e.jsx(We,{items:d,strategy:He,children:d.map(h=>e.jsx(ft,{item:h,firstLoopComponentUid:n,isFromDynamicZone:o,secondLoopComponentUid:r,type:i,addComponentToDZ:t},h.id))})]}),s&&y&&e.jsx(gt,{cursor:T?"normal":"pointer",icon:e.jsx(L,{}),onClick:g,color:T?"neutral":"primary",children:c({id:m(`form.button.add.field.to.${i.modelType==="component"?"component":i.kind}`),defaultMessage:"Add another field"})}),l&&y&&e.jsx(pt,{cursor:T?"normal":"pointer",icon:e.jsx(L,{}),onClick:g,color:o&&!T?"primary":"neutral",children:c({id:m("form.button.add.field.to.component"),defaultMessage:"Add another field"})})]})},V={collectionTypesConfigurations:[{action:"plugin::content-manager.collection-types.configure-view",subject:null}],componentsConfigurations:[{action:"plugin::content-manager.components.configure-layout",subject:null}],singleTypesConfigurations:[{action:"plugin::content-manager.single-types.configure-view",subject:null}]},ht=t=>t.modelType==="contentType"?t.kind==="singleType"?V.singleTypesConfigurations:V.collectionTypesConfigurations:V.componentsConfigurations,xt=t=>{switch(t.modelType){case"contentType":switch(t.kind){case"singleType":return`/content-manager/single-types/${t.uid}/configurations/edit`;case"collectionType":return`/content-manager/collection-types/${t.uid}/configurations/edit`}case"component":return`/content-manager/components/${t.uid}/configurations/edit`}},bt=b(B)`
  white-space: nowrap;
`,yt=R.memo(({disabled:t,type:n})=>{const{formatMessage:o}=I(),s=Se(),l=ht(n),r=o({id:"content-type-builder.form.button.configure-view",defaultMessage:"Configure the view"}),i=()=>{if(t)return!1;const y=xt(n);return s(y),!1},{isLoading:c,allowedActions:f}=Ie(l);return c||!f.canConfigureView&&!f.canConfigureLayout?null:e.jsx(bt,{startIcon:e.jsx(Ae,{}),variant:"tertiary",onClick:i,disabled:t,children:r})}),jt=b(te.Header)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,St=()=>{const{isInDevelopmentMode:t,contentTypes:n,components:o,isLoading:s}=D(),{formatMessage:l}=I(),{trackUsage:r}=ee(),{contentTypeUid:i,componentUid:c}=Ee(),{onOpenModalAddComponentsToDZ:f,onOpenModalAddField:y,onOpenModalEditSchema:v}=W(),a=i?n[i]:c?o[c]:null;if(s)return null;if(!a){const j=Object.values(n).filter(C=>C.visible===!0&&!C.plugin).map(C=>C.uid).sort();return j.length>0?e.jsx(_,{to:`/plugins/content-type-builder/content-types/${j[0]}`}):e.jsx(_,{to:"/plugins/content-type-builder/content-types/create-content-type"})}const d="plugin"in a&&a?.plugin!==void 0,u=i?"contentType":"component",w=a?.info?.displayName??"",T=t&&!d,F=j=>{f({dynamicZoneTarget:j,targetUid:a.uid})},M=()=>{if("kind"in a){a?.kind==="collectionType"&&r("willEditNameOfContentType"),a?.kind==="singleType"&&r("willEditNameOfSingleType"),v({modalType:u,forTarget:u,targetUid:a.uid,kind:a?.kind});return}v({modalType:u,forTarget:u,targetUid:a.uid})},A=l({id:m("table.button.no-fields"),defaultMessage:"Add new field"}),S=l({id:m("button.attributes.add.another"),defaultMessage:"Add another field"}),g=a.status==="REMOVED",h=t&&e.jsxs(x,{gap:2,children:[e.jsx(yt,{type:a,disabled:a.status==="NEW"||g},"link-to-cm-settings-view"),e.jsx(B,{startIcon:e.jsx(K,{}),variant:"tertiary",onClick:M,disabled:!T||g,children:l({id:"app.utils.edit",defaultMessage:"Edit"})}),e.jsx(B,{startIcon:e.jsx(L,{}),variant:"secondary",minWidth:"max-content",onClick:()=>{y({forTarget:u,targetUid:a.uid})},disabled:g,children:a.attributes.length===0?A:S})]});return e.jsxs(e.Fragment,{children:[e.jsx(Le.contentTypeBuilder.Introduction,{children:e.jsx(p,{paddingTop:5})}),g&&e.jsx(x,{background:"danger100",justifyContent:"center",padding:4,children:e.jsxs(x,{gap:2,children:[e.jsx(Oe,{fill:"danger600",height:"2rem",width:"2rem"}),e.jsx(k,{children:l({id:m("table.warning.deleted"),defaultMessage:"This {kind} has been deleted"},{kind:a.modelType==="contentType"?"Content Type":"Component"})})]})}),e.jsx(jt,{id:"title",primaryAction:h,title:Z(w)}),e.jsx(te.Content,{children:e.jsx(p,{background:"neutral0",shadow:"filterShadow",hasRadius:!0,overflow:"auto",borderColor:"neutral150",children:e.jsx(le,{type:a,addComponentToDZ:F,isMain:!0})})})]})};export{St as default};
