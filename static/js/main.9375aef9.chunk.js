(this["webpackJsonpgoit-react-hw-07-phonebook"]=this["webpackJsonpgoit-react-hw-07-phonebook"]||[]).push([[0],{16:function(e,t,n){e.exports={form:"ContactForm_form__1fuOn",label:"ContactForm_label__378f8",fieldInput:"ContactForm_fieldInput__3zV51",validatorError:"ContactForm_validatorError__3ngg1"}},196:function(e,t,n){},197:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),o=n(33),s=n.n(o),r=n(6),i=n(8),l=(n(95),n(38)),u=n(19),d=n(50),b=n(84),j=n(79),m=n.n(j),h=n(2),p=["type","onClick","disabled","children"],O=function(e){var t=e.type,n=void 0===t?"button":t,a=e.onClick,c=e.disabled,o=void 0!==c&&c,s=e.children,r=Object(b.a)(e,p);return Object(h.jsx)("button",Object(d.a)(Object(d.a)({type:n,className:m.a.button,disabled:o,onClick:a},r),{},{children:s}))},f=n(16),x=n.n(f),_=n(80),C=n(7),v=Object(_.a)({reducerPath:"contactsApi",baseQuery:Object(C.d)({baseUrl:"https://61ac9aa5d228a9001703ab59.mockapi.io"}),tagTypes:["Contact"],endpoints:function(e){return{getContacts:e.query({query:function(e){return"contacts?sortBy=name&name=".concat(e)},providesTags:["Contact"]}),deleteContact:e.mutation({query:function(e){return{url:"/contacts/".concat(e),method:"DELETE"}},invalidatesTags:["Contact"]}),createContact:e.mutation({query:function(e){return{url:"/contacts",method:"POST",body:e}},invalidatesTags:["Contact"]})}}}),y=v.useGetContactsQuery,N=v.useDeleteContactMutation,g=v.useCreateContactMutation;function k(e){var t=e.contacts,n=g(),a=Object(i.a)(n,1)[0],c=function(e){var n=e.name,c=e.phone;(function(e){return e=e.toLowerCase(),t.filter((function(t){return t.name.toLowerCase().includes(e)})).length>0})(n)?alert("".concat(n," is already in contacts")):a({name:n,phone:c})};return Object(h.jsxs)("div",{children:[Object(h.jsx)(u.d,{initialValues:{name:"",phone:""},validationSchema:l.a({name:l.b().required().matches(/^[a-zA-Z\u0430-\u044f\u0410-\u042f]+(([' -][a-zA-Z\u0430-\u044f\u0410-\u042f ])?[a-zA-Z\u0430-\u044f\u0410-\u042f]*)*$/,"Name can contain only letters, ', - and space."),phone:l.b().required().matches(/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,"Phone number should contain only numbers and it also could contain spaces, dash, parenthesis and starts with +")}),onSubmit:function(e,t){var n=t.resetForm;c(e),n()},children:Object(h.jsxs)(u.c,{className:x.a.form,children:[Object(h.jsxs)("label",{className:x.a.label,children:["Name:",Object(h.jsx)(u.b,{className:x.a.fieldInput,name:"name",type:"text",placeholder:"enter your name"}),Object(h.jsx)(u.a,{name:"name",component:"span",className:x.a.validatorError})]}),Object(h.jsxs)("label",{className:x.a.label,children:["Phone number:",Object(h.jsx)(u.b,{className:x.a.fieldInput,name:"phone",type:"tel",placeholder:"enter your phone number"}),Object(h.jsx)(u.a,{name:"phone",component:"span",className:x.a.validatorError})]}),Object(h.jsx)(O,{type:"submit",children:"Add contact"})]})}),Object(h.jsx)("hr",{})]})}var w=n(83),E=n(26),P=n.n(E);function F(e){var t=e.contacts,n=e.onDelete;return Object(h.jsx)("ul",{className:P.a.list,children:t.map((function(e){var t=e.id,a=e.name,c=e.phone;return Object(h.jsxs)("li",{className:P.a.item,children:[Object(h.jsx)("span",{className:P.a.itemName,children:a}),Object(h.jsx)("span",{className:P.a.itemPhone,children:c}),Object(h.jsx)(O,{onClick:function(){return n(t)},"aria-label":"Delete contact",children:Object(h.jsx)(w.a,{size:"18"})})]},t)}))})}var I=n(81),T=n.n(I);function A(e){var t=e.filterContacts,n=Object(a.useState)(""),c=Object(i.a)(n,2),o=c[0],s=c[1];Object(a.useEffect)((function(){t(o)}),[o,t]);return Object(h.jsx)("div",{children:Object(h.jsxs)("label",{children:["Find contacts by name:",Object(h.jsx)("input",{type:"text",name:"filter",value:o,onChange:function(e){s(e.target.value)},className:T.a.fieldInput})]})})}function L(){var e=Object(a.useState)(""),t=Object(i.a)(e,2),n=t[0],c=t[1],o=y(n).data,s=N(),r=Object(i.a)(s,1)[0];return Object(h.jsxs)("div",{className:"App",children:[Object(h.jsx)("h1",{children:"Phonebook"}),Object(h.jsx)(k,{contacts:o}),Object(h.jsx)("h2",{children:"Contacts"}),Object(h.jsx)(A,{filterContacts:function(e){c(e)}}),o&&Object(h.jsx)(F,{contacts:o,onDelete:r})]})}var S=n(37),q=n(5),z=n(82),D=n.n(z),B=n(1),Z=[].concat(Object(q.a)(Object(B.e)()),[D.a,v.middleware]),M=Object(B.a)({reducer:Object(S.a)({},v.reducerPath,v.reducer),middleware:Z,devTools:!1});n(196);s.a.render(Object(h.jsx)(c.a.StrictMode,{children:Object(h.jsx)(r.a,{store:M,children:Object(h.jsx)(L,{})})}),document.getElementById("root"))},26:function(e,t,n){e.exports={list:"ContactList_list__2T7aG",item:"ContactList_item__3YsZK",itemName:"ContactList_itemName__3linx",itemPhone:"ContactList_itemPhone__2aABR"}},79:function(e,t,n){e.exports={button:"FormButton_button__2-gNS"}},81:function(e,t,n){e.exports={fieldInput:"Filter_fieldInput__1at_C"}},95:function(e,t,n){}},[[197,1,2]]]);
//# sourceMappingURL=main.9375aef9.chunk.js.map