'use strict';
const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu(){menu.setAttribute('aria-expanded','false');navigation.classList.remove('open');}
menu.addEventListener('click',()=>{const expanded=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!expanded));navigation.classList.toggle('open',!expanded);});
navigation.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}});
const steps=[
  'Define the information a property enquiry needs: contact details, property interest and a preferred way to be reached. Explore a structured intake form as the starting point.',
  'Plan a central lead tracker with clear fields and statuses. Consider how to spot incomplete records and duplicate enquiries before they move through the workflow.',
  'Explore how to confirm availability, coordinate a suitable appointment and communicate the next step. Decide where a human review is needed before automation can act.',
  'Plan a way to record appointment outcomes, assign a follow-up action and keep the lead status visible. Test the proposed workflow with sample data before reporting any results.'
];
const tabs=Array.from(document.querySelectorAll('.workflow-step'));
function selectStep(index,focus=false){tabs.forEach((tab,i)=>{tab.classList.toggle('active',i===index);tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1;});document.querySelector('#step-panel').setAttribute('aria-labelledby',tabs[index].id);document.querySelector('.detail-label').textContent=`PLANNED STEP ${String(index+1).padStart(2,'0')}`;document.querySelector('#step-description').textContent=steps[index];if(focus)tabs[index].focus();}
tabs.forEach((tab,index)=>{tab.addEventListener('click',()=>selectStep(index));tab.addEventListener('keydown',event=>{let next=index;if(event.key==='ArrowDown'||event.key==='ArrowRight')next=(index+1)%tabs.length;else if(event.key==='ArrowUp'||event.key==='ArrowLeft')next=(index+tabs.length-1)%tabs.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=tabs.length-1;else return;event.preventDefault();selectStep(next,true);});});
