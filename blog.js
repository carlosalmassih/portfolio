(() => {
  'use strict';
  const make = (tag, cls, text) => { const el=document.createElement(tag); if(cls)el.className=cls; if(text)el.textContent=text; return el; };
  const url = value => { if(!value)return ''; try {const u=new URL(value,location.href);return ['http:','https:','file:'].includes(u.protocol)?u.href:'';}catch{return '';}};
  const photos=window.PORTFOLIO.photos||[];
  const photoFor = media => media?.photoId ? photos.find(p=>p.id===media.photoId) : media;
  const posts=(window.BLOG_POSTS||[]).filter(p=>p.published===true && p.slug && p.title).sort((a,b)=>String(b.date||'').localeCompare(String(a.date||'')));
  const href = p => 'post.html?post='+encodeURIComponent(p.slug);
  const date = p => /^\d{4}-\d{2}-\d{2}$/.test(p.date||'') && !isNaN(Date.parse(p.date)) ? new Date(p.date+'T12:00:00').toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'}) : '';
  function visual(media, cover=false){
    const photo=photoFor(media), figure=make('figure',cover?'journal-cover':'story-photo');
    if(!photo || !url(photo.src)){figure.append(make('div','journal-placeholder',cover?'Notes & observations':'Photograph unavailable'));return figure;}
    const img=make('img');img.src=url(photo.src);img.alt=photo.alt||photo.title||'';img.loading=cover?'eager':'lazy';img.decoding='async';
    img.addEventListener('error',()=>{img.hidden=true;figure.prepend(make('div','journal-placeholder','Photograph unavailable'));},{once:true});
    figure.append(img);if(!cover && (media.caption||photo.title))figure.append(make('figcaption','',media.caption||photo.title));return figure;
  }
  const page=document.body.dataset.page;
  document.querySelector('nav a[href="blog.html"]')?.setAttribute('aria-current','page');
  if(page==='home')document.querySelector('nav a[href="blog.html"]')?.removeAttribute('aria-current');
  if(page==='blog'){document.title='Journal — '+window.PORTFOLIO.name;document.querySelector('meta[name="description"]').content='Photo stories, creative process, and product notes by '+window.PORTFOLIO.name;}
  const grid=document.querySelector('#blog-grid');
  if(grid){
    let category='All posts';const filters=document.querySelector('#blog-filters');
    function render(){const items=posts.filter(p=>category==='All posts'||(p.category||'Notes')===category);grid.replaceChildren();(page==='home'?items.slice(0,3):items).forEach(p=>{const card=make('article','journal-card'),a=make('a');a.href=href(p);a.append(visual(p.cover,true),make('p','eyebrow',p.category||'Notes'),make('h3','',p.title),make('p','journal-excerpt',p.excerpt||''),make('p','journal-date',date(p)),make('span','text-link','Read story ↗'));card.append(a);grid.append(card);});document.querySelector('#blog-empty').hidden=items.length>0;const count=document.querySelector('#blog-count');if(count)count.textContent=items.length+' '+(items.length===1?'story':'stories');}
    if(filters && posts.length)['All posts',...new Set(posts.map(p=>p.category||'Notes'))].forEach(c=>{const b=make('button','',c);b.type='button';b.setAttribute('aria-pressed',String(c===category));b.addEventListener('click',()=>{category=c;filters.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));render();});filters.append(b);});render();
  }
  const root=document.querySelector('#post-content');if(!root)return;
  const post=posts.find(p=>p.slug===new URLSearchParams(location.search).get('post'));
  if(!post){document.title='Post not found — '+window.PORTFOLIO.name;return;}
  document.title=post.title+' — '+window.PORTFOLIO.name;document.querySelector('meta[name="description"]').content=post.excerpt||post.title;
  root.replaceChildren();const back=make('a','text-link','← All stories');back.href='blog.html';
  const header=make('header','story-heading');header.append(make('p','eyebrow',post.category||'Notes'),make('h1','page-title',post.title),make('p','story-deck',post.excerpt||''),make('p','journal-date',[window.PORTFOLIO.name,date(post)].filter(Boolean).join(' / ')));
  root.append(back,header);if(post.cover)root.append(visual(post.cover,true));
  const body=make('div','story-body');
  (post.blocks||[]).forEach(b=>{if(b.type==='photo')body.append(visual(b));else if(b.type==='heading')body.append(make('h2','',b.text));else if(b.type==='quote')body.append(make('blockquote','',b.text));else if(b.type==='link' && url(b.url)){const p=make('p'),a=make('a','text-link',b.text||'View product ↗');a.href=url(b.url);a.target='_blank';a.rel=b.sponsored?'sponsored noopener noreferrer':'noopener noreferrer';p.append(a);body.append(p);}else if(b.type==='paragraph')body.append(make('p','',b.text));});
  root.append(body);const foot=make('div','story-end');const work=make('a','text-link','Explore the photography ↗');work.href='portfolio.html?media=photo';foot.append(work);root.append(foot);
})();
