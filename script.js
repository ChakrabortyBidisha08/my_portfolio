// EDIT THIS OBJECT TO PERSONALIZE THE ENTIRE WEBSITE.
const profile = {
  name: "Your Name",
  roles: ["Research Scholar", "Machine Learning Enthusiast", "Creative Problem Solver"],
  intro: "I explore intelligent systems, trustworthy machine learning, and practical tools that turn research ideas into impact.",
  about: "I enjoy researching complex problems, designing experiments, and translating ideas into working prototypes. Outside research, I value creativity, curiosity, and learning.",
  email: "you@example.com",
  socials: [
    {label: "GitHub", url: "https://github.com/"},
    {label: "LinkedIn", url: "https://linkedin.com/"},
    {label: "Google Scholar", url: "https://scholar.google.com/"}
  ],
  facts: [
    {label: "Current role", value: "Research Scholar"},
    {label: "Institution", value: "Your university / organization"},
    {label: "Focus", value: "AI · Federated Learning · Privacy"}
  ],
  research: [
    {icon: "🧠", title: "Federated Learning", description: "Collaborative learning under heterogeneous, distributed data settings.", tags: ["ML", "Distributed AI"]},
    {icon: "🔒", title: "Trustworthy AI", description: "Exploring security, privacy, and responsible learning systems.", tags: ["Privacy", "Security"]},
    {icon: "✨", title: "Efficient Adaptation", description: "Learning effective models through lightweight personalization.", tags: ["Vision", "Adaptation"]}
  ],
  projects: [
    {title: "Federated Model Personalization", category: "AI/ML", icon: "🧩", description: "Prototype for personalized learning across heterogeneous clients.", details: "Describe your objective, dataset, approach, evaluations, and outcomes here. Add a repository or project page once it is public.", tags: ["Python", "PyTorch"], url: ""},
    {title: "Privacy-Aware Collaborative Training", category: "Research", icon: "🔐", description: "Research exploration of privacy-aware learning mechanisms.", details: "Explain the privacy setting, methods evaluated, limitations, and key lessons here.", tags: ["Federated Learning", "Privacy"], url: ""},
    {title: "Interactive Learning Tool", category: "Web", icon: "💻", description: "Educational visualization for algorithms and data structures.", details: "Explain how learners interact with your tool and share a demo URL when available.", tags: ["JavaScript", "Education"], url: ""}
  ],
  // Example entries only; replace with your actual public publications.
  publications: [
    {title: "Add your publication title here", venue: "Journal / Conference · Year", url: ""},
    {title: "Add your next publication or preprint", venue: "Preprint / Workshop · Year", url: ""}
  ]
};

const $ = (selector) => document.querySelector(selector);
const element = (tag, className, text) => {const e = document.createElement(tag); if(className)e.className=className; if(text!==undefined)e.textContent=text; return e;};
const validLink = (url) => {try {const x = new URL(url);return ['https:','http:','mailto:'].includes(x.protocol);}catch{return false;}};

document.querySelectorAll('[data-field]').forEach(el => {const key=el.dataset.field;if(typeof profile[key]==='string')el.textContent=profile[key];});
document.title = `${profile.name} | Research Portfolio`;
$('#year').textContent=new Date().getFullYear();
$('#emailButton').href=`mailto:${profile.email}`;
$('#emailText').textContent=profile.email;
profile.socials.forEach(s=>{if(!validLink(s.url))return;const a=element('a','',s.label+' ↗');a.href=s.url;a.target='_blank';a.rel='noopener noreferrer';$('#socialLinks').append(a);});
profile.facts.forEach(f=>{const d=element('div','fact');d.append(element('strong','',f.label),element('span','',f.value));$('#facts').append(d);});
function addTags(parent,tags){const wrap=element('div','tags');tags.forEach(t=>wrap.append(element('span','tag',t)));parent.append(wrap);}
profile.research.forEach(item=>{const d=element('article','card reveal');d.append(element('div','card-icon',item.icon),element('h3','',item.title),element('p','',item.description));addTags(d,item.tags);$('#researchCards').append(d);});
const categories=['All',...new Set(profile.projects.map(p=>p.category))];let selected='All';
function renderFilters(){const root=$('#filters');root.replaceChildren();categories.forEach(cat=>{const b=element('button',`filter ${cat===selected?'active':''}`,cat);b.type='button';b.setAttribute('aria-pressed',String(cat===selected));b.onclick=()=>{selected=cat;renderFilters();renderProjects();};root.append(b);});}
function renderProjects(){const root=$('#projectCards');root.replaceChildren();profile.projects.filter(p=>selected==='All'||selected===p.category).forEach(p=>{const b=element('button','card project-card reveal visible');b.type='button';b.append(element('div','card-icon',p.icon),element('h3','',p.title),element('p','',p.description));addTags(b,p.tags);b.append(element('span','see','View details ↗'));b.onclick=()=>showProject(p);root.append(b);});}
function showProject(p){const body=$('#modalBody');body.replaceChildren();body.append(element('div','card-icon',p.icon),element('h2','',p.title),element('p','muted',p.details));addTags(body,p.tags);if(p.url&&validLink(p.url)){const a=element('a','button primary','View project ↗');a.href=p.url;a.target='_blank';a.rel='noopener noreferrer';a.style.marginTop='22px';body.append(a);}$('#projectDialog').showModal();}
$('#closeDialog').onclick=()=>$('#projectDialog').close();$('#projectDialog').addEventListener('click',e=>{if(e.target===$('#projectDialog'))$('#projectDialog').close();});
renderFilters();renderProjects();
profile.publications.forEach(p=>{const row=element('article','publication reveal');const inner=element('div');inner.append(element('h3','',p.title),element('p','',p.venue));row.append(inner);if(p.url&&validLink(p.url)){const a=element('a','','Read paper ↗');a.href=p.url;a.target='_blank';a.rel='noopener noreferrer';row.append(a);}$('#publicationList').append(row);});
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:0.08});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const preferred=localStorage.getItem('portfolio-theme');if(preferred==='light'||(!preferred&&matchMedia('(prefers-color-scheme: light)').matches))document.documentElement.classList.add('light');
function updateThemeButton(){$('#themeToggle').textContent=document.documentElement.classList.contains('light')?'☀':'☾';}updateThemeButton();
$('#themeToggle').onclick=()=>{document.documentElement.classList.toggle('light');localStorage.setItem('portfolio-theme',document.documentElement.classList.contains('light')?'light':'dark');updateThemeButton();};
$('#menuToggle').onclick=()=>{const opened=$('#nav').classList.toggle('open');$('#menuToggle').setAttribute('aria-expanded',String(opened));};document.querySelectorAll('#nav a').forEach(a=>a.onclick=()=>{$('#nav').classList.remove('open');$('#menuToggle').setAttribute('aria-expanded','false');});
if(!matchMedia('(prefers-reduced-motion: reduce)').matches && profile.roles.length){let roleIndex=0;setInterval(()=>{roleIndex=(roleIndex+1)%profile.roles.length;$('#animatedRole').textContent=profile.roles[roleIndex];},2500);}else{$('#animatedRole').textContent=profile.roles[0]||'';}
