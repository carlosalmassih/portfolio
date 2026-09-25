/* Apply before CSS to prevent a light flash. Choice is stored only in this browser. */
(() => {
  const key='carlos-portfolio-theme', system=matchMedia('(prefers-color-scheme: dark)');
  let chosen=null;
  try { const value=localStorage.getItem(key); if(value==='light'||value==='dark')chosen=value; } catch {}
  function apply(theme){
    document.documentElement.dataset.theme=theme;
    document.documentElement.style.colorScheme=theme;
    document.querySelectorAll('.theme-toggle').forEach(button=>{
      const dark=theme==='dark';button.setAttribute('aria-pressed',String(dark));button.setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode');button.querySelector('.theme-label').textContent=dark?'Light mode':'Dark mode';
    });
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content',theme==='dark'?'#141414':'#ffffff');
  }
  apply(chosen || (system.matches?'dark':'light'));
  document.addEventListener('DOMContentLoaded',()=>{
    apply(document.documentElement.dataset.theme);
    document.querySelectorAll('.theme-toggle').forEach(button=>button.addEventListener('click',()=>{
      chosen=document.documentElement.dataset.theme==='dark'?'light':'dark';apply(chosen);try{localStorage.setItem(key,chosen);}catch{}
    }));
  });
  system.addEventListener('change',()=>{if(!chosen)apply(system.matches?'dark':'light');});
})();
