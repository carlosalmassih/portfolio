(() => {
  'use strict';
  const c = window.PORTFOLIO;
  const creditLabel = p => p.category === 'filmed' ? 'Filmed & edited' : p.category === 'edited' ? 'Edited' : '';
  if(c.phone) { const a=document.querySelector('#phone-link'); a.textContent=c.phone; a.href='tel:'+c.phone.replace(/[^+\d]/g,''); }

  const set = (selector, text) => document.querySelectorAll(selector).forEach(el => el.textContent = text);
  const make = (tag, cls, text) => { const el = document.createElement(tag); if (cls) el.className = cls; if (text) el.textContent = text; return el; };
  const safeUrl = value => { try { const u = new URL(value, document.baseURI); return ['https:', 'http:', 'file:'].includes(u.protocol) ? u.href : ''; } catch { return ''; } };
  set('[data-name]', c.name); set('[data-initials]', c.initials); set('[data-role]', c.role); set('[data-year]', new Date().getFullYear()); set('[data-intro]', c.intro); set('[data-about]', c.about); set('[data-about-second]', c.aboutSecond); set('[data-location]', c.location);
  document.title = `${c.name} — ${document.body.dataset.page === 'side-projects' ? 'Side Projects' : document.body.dataset.page === 'portfolio' ? 'Portfolio' : c.role}`;
  document.querySelector('meta[name="description"]').content = `${c.name}. ${c.intro}`;
  c.skills.forEach(skill => document.querySelector('#skills')?.append(make('span', '', skill)));
  c.experience.forEach(job => { const row = make('article', 'experience-row'); const detail = make('div'); detail.append(make('h3', '', job.role), make('span', '', job.company)); row.append(make('time', '', job.dates), detail, make('p', '', job.description)); document.querySelector('#experience-list')?.append(row); });
  if (c.email) { const email = document.querySelector('#email-link'); email.textContent = c.email; email.href = `mailto:${c.email}`; email.hidden = false; document.querySelector('#email-placeholder').hidden = true; const arrow = document.querySelector('#contact-arrow'); arrow.href = email.href; arrow.hidden = false; }
  if (document.querySelector('#cv-link') && c.cv && safeUrl(c.cv)) { const a = document.querySelector('#cv-link'); a.href = safeUrl(c.cv); a.target = '_blank'; a.rel = 'noopener'; a.hidden = false; }
  [['Instagram', c.instagram], ['WhatsApp', c.whatsapp], ['LinkedIn', c.linkedin]].forEach(([label, url]) => { if (!url || !safeUrl(url)) return; const a = make('a', 'social-button social-' + label.toLowerCase(), label + ' ↗'); a.href = safeUrl(url); a.target = '_blank'; a.rel = 'noopener noreferrer'; document.querySelector('#socials').append(a); });
  const dialog = document.querySelector('#project-dialog'), player = document.querySelector('#player');
  function openProject(project) {
    set('#dialog-title', project.title); set('#dialog-collaborators', project.collaborators ? 'Collaborators: ' + project.collaborators : ''); set('#dialog-tools', project.tools ? 'Tools: ' + project.tools : ''); set('#dialog-description', project.description); set('#dialog-credits', project.credits ? 'My role: ' + project.credits : ''); set('#dialog-category', [project.client, project.year, creditLabel(project)].filter(Boolean).join(' / '));
    dialog.classList.toggle('vertical-dialog', project.format === 'vertical');
    player.replaceChildren(); const external = document.querySelector('#external-video'); external.hidden = true;
    const url = project.video && safeUrl(project.video);
    if (!url) { player.append(make('div', 'sample-message', 'Sample project — add your own video to showcase this work.')); }
    else {
      const parsed = new URL(url); let embed = ''; const host = parsed.hostname.replace(/^www\./, '');
      if (host === 'youtu.be' || host === 'youtube.com' || host === 'm.youtube.com') {
        const id = host === 'youtu.be' ? parsed.pathname.split('/')[1] : parsed.searchParams.get('v') || parsed.pathname.split('/').filter(Boolean)[1];
        if (id && /^[a-zA-Z0-9_-]{11}$/.test(id)) embed = `https://www.youtube.com/embed/${id}?playsinline=1&rel=0${/^https?:$/.test(location.protocol) ? '&origin=' + encodeURIComponent(location.origin) : ''}`;
      } else if (host === 'vimeo.com') { const id = parsed.pathname.split('/').find(x => /^\d+$/.test(x)); if (id) { const token = parsed.pathname.split('/').filter(Boolean)[1]; embed = `https://player.vimeo.com/video/${id}?autoplay=1${token ? '&h=' + encodeURIComponent(token) : ''}`; } }
      external.href = url; external.hidden = false;
      if (embed && location.protocol === 'file:') { player.append(make('div', 'sample-message', 'Watch this video on YouTube using the link below. Embedded playback is available when this portfolio is opened from a web address.')); }
      else if (embed) { const frame = make('iframe'); frame.referrerPolicy = 'strict-origin-when-cross-origin'; frame.src = embed; frame.title = project.title; frame.allow = 'autoplay; fullscreen; picture-in-picture'; frame.allowFullscreen = true; frame.referrerPolicy = 'strict-origin-when-cross-origin'; player.append(frame); }
      else if (/\.(mp4|webm)$/i.test(parsed.pathname)) { const video = make('video'); video.src = url; video.controls = true; video.playsInline = true; video.autoplay = true; player.append(video); }
      else { player.append(make('div', 'sample-message', 'Watch this project using the original video link below.')); }
    }
    dialog.showModal(); document.body.style.overflow = 'hidden';
  }
  document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); });
  dialog.addEventListener('close', () => { player.replaceChildren(); document.body.style.overflow = ''; });
  const page = document.body.dataset.page;
  let medium=new URLSearchParams(location.search).get('media')==='photo' ? 'photo' : 'video', photoCategory='all';
  const photos=c.photos || [];
  const photoType=p=>p.collection || p.category || 'Other';
  document.querySelectorAll('nav a').forEach(a => { if(a.getAttribute('href') === page + '/') a.setAttribute('aria-current','page'); });
  const selected = id => document.querySelector('#'+id)?.value || 'all';
  function render() {
    const grid = document.querySelector('#projects'); if(!grid) return; grid.replaceChildren();
    let projects = c.projects.map((p,i)=>({...p,index:i,medium:'video'}));
    if(page==='portfolio') projects.push(...photos.map((p,i)=>({...p,index:i,medium:'photo'})));
    if(page==='home') projects=projects.slice(0,4);
    else {
      projects=projects.filter(p => (p.medium===medium) && (p.medium==='photo' ? (photoCategory==='all' || photoType(p)===photoCategory) : (selected('length-filter')==='all' || p.length===selected('length-filter')) && (selected('type-filter')==='all' || p.type===selected('type-filter')) && (selected('role-filter')==='all' || p.category===selected('role-filter'))));
      if(selected('sort-order')==='newest') projects.sort((a,b)=>Number(b.year||0)-Number(a.year||0));
      if(selected('sort-order')==='title') projects.sort((a,b)=>a.title.localeCompare(b.title));
      set('#result-count', `${projects.length} ${projects.length===1?'project':'projects'}`);
      document.querySelector('#no-results').hidden = projects.length>0;
    }
    projects.forEach(p => { if(p.medium==='photo'){grid.append(photoCard(p));return;} const i=p.index;
      const card = make('article', 'project-card'), button = make('button', 'project-open'); button.type = 'button'; button.setAttribute('aria-label', `View ${p.title}`);
      const poster = make('div', 'poster ' + (p.color || 'blue')); const number = String(i + 1).padStart(2, '0');
      if (p.thumbnail && safeUrl(p.thumbnail)) { const image = make('img'); image.src = safeUrl(p.thumbnail); image.alt = ''; image.loading = 'lazy'; image.addEventListener('error', () => { image.remove(); poster.append(make('span', 'poster-number', number)); }); poster.append(image); }
      else { poster.append(make('span', 'poster-number', number)); }
      const top = make('div', 'poster-top'); top.append(make('span', '', number + ' /'), make('span', '', p.format === 'vertical' ? 'REEL' : 'VIDEO')); poster.append(top);
      if (!p.video) poster.append(make('span', 'poster-sample', 'Sample project'));
      poster.append(make('span', 'play', '▶'));
      const title = make('div', 'project-title-row'); title.append(make('h3', '', p.title), make('span', '', '↗'));
      button.append(poster, title); button.addEventListener('click', () => openProject(p));
      card.append(button, make('p', 'project-meta', [p.type, creditLabel(p)].filter(Boolean).join(' · '))); grid.append(card);
    });
  }

  const typeSelect=document.querySelector('#type-filter');
  if(typeSelect) [...new Set(c.projects.map(p=>p.type))].sort().forEach(type=>{const option=make('option','',type);option.value=type;typeSelect.append(option);});
  document.querySelectorAll('.filter-bar select').forEach(el=>el.addEventListener('change',render));
  document.querySelector('#reset-filters')?.addEventListener('click',()=>{document.querySelectorAll('.filter-bar select').forEach(el=>el.selectedIndex=0);photoCategory='all';updateMedia();render();});
  const photoGrid=document.querySelector('#photo-grid'), photoDialog=document.querySelector('#photo-dialog');
  function openPhoto(photo){ const full=document.querySelector('#photo-full');full.src=safeUrl(photo.full||photo.src);full.alt=photo.alt||photo.title;set('#photo-caption',[photo.title,photoType(photo)].filter(Boolean).join(' / '));photoDialog.showModal();document.body.style.overflow='hidden'; }
  function photoCard(photo){const figure=make('figure','photo-card'),button=make('button','photo-open'),img=make('img');img.src=safeUrl(photo.src);img.alt=photo.alt||photo.title;img.loading='lazy';button.type='button';button.setAttribute('aria-label','Open '+photo.title);button.append(img);figure.append(button,make('figcaption','',photo.title),make('p','project-meta',photoType(photo)));button.addEventListener('click',()=>openPhoto(photo));return figure;}
  const categoryBar=document.querySelector('#photo-categories');
  if(categoryBar) ['all',...new Set([...(c.photoCategories||[]),...photos.map(photoType)])].forEach(value=>{const button=make('button','',value==='all'?'All photography':value);button.dataset.category=value;button.setAttribute('aria-pressed',String(value==='all'));button.addEventListener('click',()=>{photoCategory=value;updateMedia();if(page==='portfolio')render();else renderPhotos();});categoryBar.append(button);});
  function updateMedia(){document.querySelectorAll('[data-media]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.media===medium)));document.querySelectorAll('[data-category]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.category===photoCategory)));if(page==='portfolio'){categoryBar.hidden=medium!=='photo';document.querySelectorAll('[data-video-control]').forEach(e=>e.hidden=medium==='photo');}}
  document.querySelectorAll('[data-media]').forEach(button=>button.addEventListener('click',()=>{medium=button.dataset.media;const u=new URL(location.href);u.searchParams.set('media',medium);history.replaceState(null,'',u);photoCategory='all';document.querySelectorAll('[data-video-control] select').forEach(s=>s.selectedIndex=0);updateMedia();render();}));
  updateMedia();
  function renderPhotos(){
    if(!photoGrid) return; photoGrid.replaceChildren();
    const items=page==='home'?photos.slice(0,3):photos.filter(p=>photoCategory==='all' || photoType(p)===photoCategory);
    document.querySelector('#photo-empty').hidden=items.length>0;
    if(!items.length && photos.length) set('#photo-empty','No photographs in this category yet.');
    items.forEach(photo=>photoGrid.append(photoCard(photo)));
  }
  render();renderPhotos();
  document.querySelector('#close-photo').addEventListener('click',()=>photoDialog.close());
  photoDialog.addEventListener('close',()=>{document.body.style.overflow='';document.querySelector('#photo-full').removeAttribute('src');});
  photoDialog.addEventListener('click',e=>{if(e.target===photoDialog){const r=photoDialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)photoDialog.close();}});
  let sideFilter='all';
  function renderSide(){const grid=document.querySelector('#side-grid');if(!grid)return;grid.replaceChildren();const items=(c.sideProjects||[]).filter(p=>sideFilter==='all'||p.kind===sideFilter);document.querySelector('#side-empty').hidden=items.length>0;items.forEach(p=>{const card=make('article','side-card');if(p.image && safeUrl(p.image)){const img=make('img');img.src=safeUrl(p.image);img.alt=p.alt||p.title;img.loading='lazy';card.append(img);}card.append(make('p','eyebrow',p.kind==='music'?'Music':'Graphic design'),make('h2','',p.title),make('p','',p.description||''));if(p.audio && safeUrl(p.audio)){const audio=make('audio');audio.controls=true;audio.preload='none';audio.src=safeUrl(p.audio);card.append(audio);}if(p.url&&safeUrl(p.url)){const link=make('a','text-link',p.kind==='music'?'Listen to project ↗':'View project ↗');link.href=safeUrl(p.url);link.target='_blank';link.rel='noopener noreferrer';card.append(link);}grid.append(card);});}
  document.querySelectorAll('[data-side]').forEach(b=>b.addEventListener('click',()=>{sideFilter=b.dataset.side;document.querySelectorAll('[data-side]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));renderSide();}));renderSide();
  const hero=document.querySelector('.hero');
  const motionQuery=matchMedia('(prefers-reduced-motion: reduce)');
  const pointerQuery=matchMedia('(pointer: fine)');
  if(hero){
    let frame=0;
    const reset=()=>{cancelAnimationFrame(frame);hero.classList.remove('pointer-active');hero.style.setProperty('--title-x','0px');hero.style.setProperty('--title-y','0px');};
    hero.addEventListener('pointermove',event=>{
      if(motionQuery.matches || !pointerQuery.matches || event.pointerType==='touch')return;
      const box=hero.getBoundingClientRect(),x=(event.clientX-box.left)/box.width,y=(event.clientY-box.top)/box.height;
      cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{hero.classList.add('pointer-active');hero.style.setProperty('--pointer-x',`${x*100}%`);hero.style.setProperty('--pointer-y',`${y*100}%`);hero.style.setProperty('--title-x',`${(x-.5)*8}px`);hero.style.setProperty('--title-y',`${(y-.5)*6}px`);});
    });
    hero.addEventListener('pointerleave',reset);motionQuery.addEventListener('change',reset);
  }
})();
