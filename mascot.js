/**
 * MSEED Mascot System v3.0
 * Portal-aware: college-student, institution, inst-partners, ev-project, junior-student
 */
(function () {
  'use strict';

  var CHARS = {
    wave:   'https://res.cloudinary.com/dn6ljz4uo/image/upload/v1772453726/2-01_jho0gj.png',
    laptop: 'https://res.cloudinary.com/dn6ljz4uo/image/upload/v1772453726/Untitled-3-01_uin6cn.png',
    thumbs: 'https://res.cloudinary.com/dn6ljz4uo/image/upload/v1772453726/Untitled-4-01_kqsmzt.png',
    think:  'https://res.cloudinary.com/dn6ljz4uo/image/upload/v1772453725/Untitled-5-01_zxq3cn.png',
    cheer:  'https://res.cloudinary.com/dn6ljz4uo/image/upload/v1772453725/10-01_stcdi5.png',
    wrench: 'https://res.cloudinary.com/dn6ljz4uo/image/upload/v1772453725/Untitled-6-01_mhijuj.png',
    point:  'https://res.cloudinary.com/dn6ljz4uo/image/upload/v1772453725/Untitled-9-01_cjtsa7.png'
  };
  Object.values(CHARS).forEach(function(s){ var i=new Image(); i.src=s; });

  /* ============================================================
     PORTAL CONFIGS
  ============================================================ */
  var CONFIGS = {};

  CONFIGS['portal'] = {
    greeting: 'Welcome to MSEED!',
    subtitle: 'Choose your portal to begin',
    char: CHARS.wave,
    tips: [
      { icon: '\uD83C\uDF93', text: 'College Student Portal', sub: 'Courses, ATS tools, Games',     act: "navigate('college-student')" },
      { icon: '\uD83C\uDFEB', text: 'Institution Portal',     sub: 'Partner with MSEED',             act: "navigate('institution')" },
      { icon: '\uD83D\uDC76', text: 'Junior Student Portal',  sub: 'School students learn & grow',   act: "navigate('junior-student')" },
      { icon: '\uD83D\uDCC4', text: 'What is MSEED?',         sub: 'Learn about our mission',         act: "navigate('mseed')" }
    ]
  };

  CONFIGS['college-student'] = {
    greeting: 'Hi Student!',
    subtitle: 'Your MSEED learning assistant',
    char: CHARS.laptop,
    tips: [
      { icon: '\uD83C\uDF93', text: 'Live Classes',          sub: 'Enroll in industry-led sessions', act: "showTab('courses')" },
      { icon: '\uD83C\uDFA5', text: 'Pre-Recorded Courses',  sub: 'Learn anytime at your pace',      act: "showTab('precourses')" },
      { icon: '\uD83D\uDCCA', text: 'ATS Resume Checker',    sub: 'Free score in 30 seconds',        act: "showTab('ats');setATSMode('checker')" },
      { icon: '\uD83C\uDFAE', text: 'Career Games',          sub: 'Quiz & mock interviews',          act: "showTab('games')" },
      { icon: '\uD83D\uDCDA', text: 'Study Resources',       sub: 'PDFs, templates & guides',        act: "showTab('resources')" },
      { icon: '\uD83D\uDE80', text: 'Enroll Now',            sub: 'Join the MSEED community',        act: "openEnrollModal('General')" }
    ]
  };

  CONFIGS['institution'] = {
    greeting: 'Hello Institution!',
    subtitle: 'MSEED partnership assistant',
    char: CHARS.thumbs,
    tips: [
      { icon: '\uD83C\uDFE0', text: 'Home',                  sub: 'Institution portal home',         act: "showInstTab('inst-tab-home')" },
      { icon: '\uD83E\uDD1D', text: 'Partnerships',          sub: 'Collaborate with MSEED',          act: "navigate('inst-partners')" },
      { icon: '\uD83D\uDCCB', text: 'Our Services',          sub: 'What we offer institutions',      act: "instNavScroll(null,'inst-services')" },
      { icon: '\uD83D\uDCF0', text: 'Articles & Insights',   sub: 'Latest education trends',         act: "instNavScroll(null,'inst-articles')" },
      { icon: '\u26A1',       text: 'EV Projects',           sub: 'Innovation labs & EV programs',   act: "window.open('ev-project.html','_self')" },
      { icon: '\uD83D\uDCDE', text: 'Contact Us',            sub: 'Get in touch with our team',      act: "instNavScroll(null,'inst-contact')" }
    ]
  };

  CONFIGS['inst-partners'] = {
    greeting: 'Partnerships!',
    subtitle: 'MSEED collaboration hub',
    char: CHARS.thumbs,
    tips: [
      { icon: '\uD83E\uDD1D', text: 'Apply for Partnership', sub: 'Start the conversation',          act: "if(window.openPartnershipModal)openPartnershipModal()" },
      { icon: '\uD83C\uDFEB', text: 'Back to Institution',   sub: 'Return to institution portal',    act: "navigate('institution')" },
      { icon: '\uD83D\uDCDE', text: 'Contact Us',            sub: 'Reach our team directly',         act: "navigate('institution');setTimeout(function(){instNavScroll(null,'inst-contact');},500)" },
      { icon: '\uD83C\uDF1F', text: 'About MSEED',           sub: 'Our mission and vision',          act: "navigate('institution');setTimeout(function(){renderAboutSection();showInstTab('inst-tab-about');},500)" }
    ]
  };

  CONFIGS['ev-project'] = {
    greeting: 'EV Innovation Labs!',
    subtitle: 'Electric vehicle programs',
    char: CHARS.cheer,
    tips: [
      { icon: '\u26A1',       text: 'View EV Programs',      sub: 'Hands-on EV learning',            act: "window.scrollTo({top:0,behavior:'smooth'})" },
      { icon: '\uD83C\uDFEB', text: 'Back to Institution',   sub: 'Return to institution portal',    act: "window.open('index.html','_self')" },
      { icon: '\uD83D\uDE80', text: 'Enroll in EV Track',    sub: 'Join the EV innovation program',  act: "if(window.openEnrollModal)openEnrollModal('EV Program')" },
      { icon: '\uD83D\uDCDE', text: 'Contact MSEED',         sub: 'Talk to our EV team',             act: "window.open('index.html','_self')" }
    ]
  };

  CONFIGS['junior-student'] = {
    greeting: 'Hey there!',
    subtitle: 'Your junior learning buddy',
    char: CHARS.cheer,
    tips: [
      { icon: '\uD83D\uDCDA', text: 'My Courses',    sub: 'Browse all junior courses',               act: "var e=document.getElementById('courses');if(e)e.scrollIntoView({behavior:'smooth'})" },
      { icon: '\uD83C\uDFAF', text: 'Practice Zone', sub: 'Sharpen your skills',                     act: "var e=document.getElementById('practice');if(e)e.scrollIntoView({behavior:'smooth'})" },
      { icon: '\uD83E\uDDD8', text: 'Zen Classes',   sub: 'Mindfulness and wellness',                act: "var e=document.getElementById('zen');if(e)e.scrollIntoView({behavior:'smooth'})" },
      { icon: '\uD83D\uDDFA', text: 'Roadmaps',      sub: 'Plan your learning path',                 act: "var e=document.getElementById('roadmaps');if(e)e.scrollIntoView({behavior:'smooth'})" },
      { icon: '\uD83C\uDF93', text: 'Scholarships',  sub: 'Funding opportunities',                   act: "var e=document.getElementById('scholarships');if(e)e.scrollIntoView({behavior:'smooth'})" },
      { icon: '\uD83D\uDC68', text: 'Find a Mentor', sub: 'Connect with expert mentors',             act: "var e=document.getElementById('mentors');if(e)e.scrollIntoView({behavior:'smooth'})" }
    ]
  };

  CONFIGS['mseed'] = {
    greeting: 'Welcome back!',
    subtitle: 'Choose your MSEED portal',
    char: CHARS.wave,
    tips: [
      { icon: '\uD83C\uDF93', text: 'College Student Portal', sub: 'For degree & diploma students',  act: "navigate('college-student')" },
      { icon: '\uD83C\uDFEB', text: 'Institution Portal',     sub: 'For colleges and schools',       act: "navigate('institution')" },
      { icon: '\uD83C\uDFE0', text: 'Back to Home',           sub: 'Return to portal selection',     act: "navigate('portal')" }
    ]
  };

  CONFIGS['junior'] = {
    greeting: 'Hi there!',
    subtitle: 'Junior portal selection',
    char: CHARS.cheer,
    tips: [
      { icon: '\uD83D\uDC76', text: 'Junior Student',         sub: 'School & college juniors',       act: "navigate('junior-student')" },
      { icon: '\uD83C\uDFEB', text: 'School / Institution',   sub: 'Junior institution program',     act: "navigate('school-inst')" },
      { icon: '\uD83C\uDFE0', text: 'Back to Home',           sub: 'Return to portal selection',     act: "navigate('portal')" }
    ]
  };

  var LABELS = {
    'portal':'Home','mseed':'MSEED Portal','college-student':'Student Portal',
    'institution':'Institution Portal','inst-partners':'Partnerships',
    'ev-project':'EV Projects','junior':'Junior Portal',
    'junior-student':'Junior Student','school-inst':'School Portal'
  };

  /* ============================================================
     STATE
  ============================================================ */
  var mascotEl      = null;
  var helpOpen      = false;
  var hideTimer     = null;
  var currentPortal = 'portal';

  /* ============================================================
     CSS
  ============================================================ */
  var css =
    '#mascot-container{position:fixed;z-index:99999;pointer-events:none;bottom:100px;right:24px;width:90px;height:90px;transition:opacity .4s ease,transform .4s cubic-bezier(.34,1.56,.64,1);opacity:0;transform:translateY(30px) scale(.8);}' +
    '#mascot-container.visible{opacity:1;transform:translateY(0) scale(1);}' +
    '#mascot-container img{width:100%;height:100%;object-fit:contain;filter:drop-shadow(0 4px 16px rgba(0,177,123,.25));}' +
    '#mascot-bubble{position:absolute;bottom:100%;right:0;background:#fff;border:2px solid #00B17B;border-radius:18px 18px 4px 18px;padding:10px 14px;font-size:12.5px;font-family:"DM Sans",sans-serif;font-weight:600;color:#1a2a1f;white-space:nowrap;box-shadow:0 4px 20px rgba(0,177,123,.15);opacity:0;transform:scale(.7) translateY(8px);transform-origin:bottom right;transition:all .3s cubic-bezier(.34,1.56,.64,1);pointer-events:none;}' +
    '#mascot-bubble.show{opacity:1;transform:scale(1) translateY(0);}' +
    '@keyframes mascot-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}' +
    '@keyframes mascot-bounce{0%,100%{transform:translateY(0) scaleY(1)}30%{transform:translateY(-18px) scaleY(1.05)}60%{transform:translateY(-4px) scaleY(.97)}}' +
    '@keyframes mascot-shake{0%,100%{transform:rotate(0)}20%{transform:rotate(-8deg)}40%{transform:rotate(8deg)}60%{transform:rotate(-5deg)}80%{transform:rotate(5deg)}}' +
    '@keyframes mascot-pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.12)}}' +
    '@keyframes mascot-wave{0%,100%{transform:rotate(0)}25%{transform:rotate(-15deg) translateX(-4px)}75%{transform:rotate(15deg) translateX(4px)}}' +
    '.mascot-float{animation:mascot-float 2.5s ease-in-out infinite;}' +
    '.mascot-bounce{animation:mascot-bounce .7s ease forwards;}' +
    '.mascot-shake{animation:mascot-shake .6s ease forwards;}' +
    '.mascot-pulse{animation:mascot-pulse 1.2s ease infinite;}' +
    '.mascot-wave{animation:mascot-wave .5s ease 3;}' +
    '#mascot-loader{position:fixed;inset:0;z-index:999999;background:#f4faf7;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;transition:opacity .6s ease;}' +
    '#mascot-loader.fade-out{opacity:0;pointer-events:none;}' +
    '#mascot-loader img{width:110px;animation:mascot-float 1.5s ease-in-out infinite;filter:drop-shadow(0 8px 24px rgba(0,177,123,.3));}' +
    '#mascot-loader .ld-text{font-family:"DM Sans",sans-serif;font-size:15px;font-weight:600;color:#00B17B;letter-spacing:.5px;}' +
    '#mascot-loader .ld-dots span{display:inline-block;width:8px;height:8px;border-radius:50%;background:#00B17B;margin:0 3px;animation:mascot-bounce 1.2s ease infinite;}' +
    '#mascot-loader .ld-dots span:nth-child(2){animation-delay:.2s}' +
    '#mascot-loader .ld-dots span:nth-child(3){animation-delay:.4s}' +
    '#mascot-loader .ld-bar-w{width:180px;height:4px;background:rgba(0,177,123,.15);border-radius:99px;overflow:hidden;}' +
    '#mascot-loader .ld-bar-f{height:100%;width:0%;background:linear-gradient(90deg,#00B17B,#00e09a);border-radius:99px;transition:width .3s ease;}' +
    '.mascot-confetti-particle{position:fixed;pointer-events:none;z-index:999998;border-radius:3px;animation:confetti-fall linear forwards;}' +
    '@keyframes confetti-fall{0%{transform:translateY(-20px) rotate(0);opacity:1}100%{transform:translateY(120vh) rotate(720deg);opacity:0}}' +
    '#mascot-help-btn{position:fixed;bottom:24px;right:24px;z-index:99998;width:60px;height:60px;cursor:pointer;pointer-events:auto;transition:transform .3s cubic-bezier(.34,1.56,.64,1);}' +
    '#mascot-help-btn:hover{transform:scale(1.15);}' +
    '#mascot-help-btn img{width:100%;height:100%;object-fit:contain;filter:drop-shadow(0 4px 12px rgba(0,177,123,.3));}' +
    '#mascot-help-btn .hb-badge{position:absolute;top:-4px;right:-4px;width:20px;height:20px;background:#00B17B;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;color:#fff;font-weight:700;animation:mascot-pulse 2s ease infinite;border:2px solid #fff;}' +
    '#mascot-help-panel{position:fixed;bottom:96px;right:24px;z-index:99997;width:288px;background:#fff;border-radius:20px;box-shadow:0 12px 40px rgba(0,0,0,.14);border:1.5px solid rgba(0,177,123,.15);overflow:hidden;transform-origin:bottom right;transform:scale(0) translateY(10px);opacity:0;transition:all .35s cubic-bezier(.34,1.56,.64,1);pointer-events:none;}' +
    '#mascot-help-panel.open{transform:scale(1) translateY(0);opacity:1;pointer-events:auto;}' +
    '.hp-hdr{background:linear-gradient(135deg,#00B17B,#00e09a);padding:16px 18px 12px;display:flex;align-items:center;gap:12px;position:relative;transition:opacity .25s ease;}' +
    '.hp-hdr img{width:44px;height:44px;object-fit:contain;filter:drop-shadow(0 2px 6px rgba(0,0,0,.15));}' +
    '.hp-hdr .hp-title{font-family:"DM Sans",sans-serif;font-weight:700;font-size:15px;color:#fff;}' +
    '.hp-hdr .hp-sub{font-size:11.5px;color:rgba(255,255,255,.85);margin-top:2px;}' +
    '.hp-hdr .hp-badge{display:inline-block;font-size:10px;font-weight:700;padding:3px 9px;border-radius:99px;background:rgba(255,255,255,.25);color:#fff;margin-top:4px;letter-spacing:.5px;}' +
    '#mhc{position:absolute;top:12px;right:14px;color:rgba(255,255,255,.8);cursor:pointer;font-size:16px;line-height:1;font-weight:700;transition:color .2s;z-index:1;}' +
    '#mhc:hover{color:#fff;}' +
    '.hp-tips{padding:12px 14px;display:flex;flex-direction:column;gap:8px;max-height:320px;overflow-y:auto;}' +
    '.hp-tip{display:flex;align-items:flex-start;gap:10px;padding:10px 12px;background:#f7fdfb;border-radius:12px;border:1px solid rgba(0,177,123,.08);cursor:pointer;transition:all .2s ease;font-family:"DM Sans",sans-serif;}' +
    '.hp-tip:hover{background:rgba(0,177,123,.08);border-color:rgba(0,177,123,.25);transform:translateX(3px);}' +
    '.hp-tip .ti{font-size:17px;flex-shrink:0;margin-top:1px;}' +
    '.hp-tip .tt{font-size:12.5px;font-weight:700;color:#1a2a1f;line-height:1.3;}' +
    '.hp-tip .ts{font-size:11px;color:#6b8f7e;margin-top:2px;font-weight:400;}' +
    '.mascot-peek-wrap{position:relative;display:inline-block;overflow:visible;}' +
    '.mascot-peek-char{position:absolute;right:-36px;top:50%;transform:translateY(-50%) translateX(12px);width:36px;height:36px;opacity:0;pointer-events:none;transition:all .3s cubic-bezier(.34,1.56,.64,1);}' +
    '.mascot-peek-wrap:hover .mascot-peek-char{opacity:1;transform:translateY(-50%) translateX(0);}' +
    '@media(max-width:600px){#mascot-container{right:12px;width:72px;height:72px;bottom:84px;}#mascot-help-btn{right:12px;bottom:16px;width:52px;height:52px;}#mascot-help-panel{right:12px;width:260px;}}';

  var sEl=document.createElement('style'); sEl.textContent=css; document.head.appendChild(sEl);

  /* ============================================================
     LOADER
  ============================================================ */
  function createLoader(){
    var el=document.createElement('div'); el.id='mascot-loader';
    el.innerHTML='<img src="'+CHARS.think+'" alt=""/><div class="ld-text">Setting things up...</div><div class="ld-dots"><span></span><span></span><span></span></div><div class="ld-bar-w"><div class="ld-bar-f" id="mld"></div></div>';
    document.body.prepend(el);
    var pct=0, t=setInterval(function(){ pct=Math.min(pct+Math.random()*18,92); var b=document.getElementById('mld'); if(b)b.style.width=pct+'%'; },200);
    function done(){ clearInterval(t); var b=document.getElementById('mld'); if(b)b.style.width='100%'; setTimeout(function(){ el.classList.add('fade-out'); setTimeout(function(){ el.remove(); },700); },400); }
    if(document.readyState==='complete') setTimeout(done,600);
    else window.addEventListener('load',function(){ setTimeout(done,500); });
  }

  /* ============================================================
     MASCOT SHOW/HIDE
  ============================================================ */
  function createMascot(){
    mascotEl=document.createElement('div'); mascotEl.id='mascot-container';
    mascotEl.innerHTML='<img id="mimg" src="'+CHARS.wave+'" alt="Buddy"/><div id="mbub"></div>';
    document.body.appendChild(mascotEl);
  }

  function showMascot(key, msg, cls, dur){
    if(dur===undefined) dur=3500;
    if(!mascotEl) createMascot();
    clearTimeout(hideTimer);
    var img=document.getElementById('mimg'), bub=document.getElementById('mbub');
    if(img){ img.src=CHARS[key]||CHARS.wave; img.className=cls||'mascot-float'; }
    if(bub){
      bub.textContent=msg||'';
      if(msg) setTimeout(function(){ bub.classList.add('show'); },200);
      else bub.classList.remove('show');
    }
    mascotEl.classList.add('visible');
    if(dur>0) hideTimer=setTimeout(hideMascot,dur);
  }

  function hideMascot(){
    if(!mascotEl) return;
    var bub=document.getElementById('mbub'); if(bub) bub.classList.remove('show');
    mascotEl.classList.remove('visible');
  }

  /* ============================================================
     CONFETTI
  ============================================================ */
  function confetti(){
    var cols=['#00B17B','#FFD700','#FF6B6B','#4ECDC4','#45B7D1','#96CEB4','#FFEAA7'];
    for(var i=0;i<40;i++){ (function(i){ setTimeout(function(){
      var p=document.createElement('div'); p.className='mascot-confetti-particle';
      p.style.cssText='left:'+Math.random()*100+'vw;top:-20px;width:'+(4+Math.random()*6)+'px;height:'+(8+Math.random()*8)+'px;background:'+cols[Math.floor(Math.random()*cols.length)]+';animation-duration:'+(1.8+Math.random()*1.5)+'s;animation-delay:'+Math.random()*.4+'s;transform:rotate('+Math.random()*360+'deg);';
      document.body.appendChild(p); setTimeout(function(){ p.remove(); },4000);
    },i*40); })(i); }
  }

  /* ============================================================
     HELP PANEL
  ============================================================ */
  function buildHelp(){
    var btn=document.createElement('div'); btn.id='mascot-help-btn'; btn.title='Need help?';
    btn.innerHTML='<img src="'+CHARS.point+'" alt="Help"/><div class="hb-badge">?</div>';

    var panel=document.createElement('div'); panel.id='mascot-help-panel';
    panel.innerHTML=
      '<div class="hp-hdr" id="hp-hdr">' +
        '<img id="hp-char" src="'+CHARS.wave+'" alt=""/>' +
        '<div>' +
          '<div class="hp-title" id="hp-greet">Hi! I\'m Buddy</div>' +
          '<div class="hp-sub" id="hp-sub">Your MSEED assistant</div>' +
          '<div class="hp-badge" id="hp-badge">Home</div>' +
        '</div>' +
        '<div id="mhc">\u2715</div>' +
      '</div>' +
      '<div class="hp-tips" id="hp-tips"></div>';

    document.body.appendChild(btn);
    document.body.appendChild(panel);

    btn.addEventListener('click',function(){
      helpOpen=!helpOpen;
      if(helpOpen){ refreshPanel(); panel.classList.add('open'); showMascot('wave','How can I help?','mascot-wave',0); }
      else { panel.classList.remove('open'); hideMascot(); }
    });
    document.getElementById('mhc').addEventListener('click',function(e){
      e.stopPropagation(); helpOpen=false; panel.classList.remove('open'); hideMascot();
    });
  }

  function refreshPanel(){
    var cfg=CONFIGS[currentPortal]||CONFIGS['portal'];
    var c=document.getElementById('hp-char'), g=document.getElementById('hp-greet'),
        s=document.getElementById('hp-sub'),  b=document.getElementById('hp-badge'),
        t=document.getElementById('hp-tips'), h=document.getElementById('hp-hdr');
    if(c) c.src=cfg.char;
    if(g) g.textContent=cfg.greeting;
    if(s) s.textContent=cfg.subtitle;
    if(b) b.textContent=LABELS[currentPortal]||'MSEED';
    if(t) t.innerHTML=cfg.tips.map(function(tip){
      return '<div class="hp-tip" onclick="'+tip.act+';document.getElementById(\'mascot-help-panel\').classList.remove(\'open\')">'+
        '<div class="ti">'+tip.icon+'</div>'+
        '<div><div class="tt">'+tip.text+'</div><div class="ts">'+tip.sub+'</div></div>'+
      '</div>';
    }).join('');
    if(h){ h.style.opacity='0'; setTimeout(function(){ h.style.opacity='1'; },80); }
  }

  /* ============================================================
     PORTAL DETECTION
  ============================================================ */
  function detect(){
    if(window.location.pathname.indexOf('ev-project')!==-1) return 'ev-project';
    var order=['college-student','institution','inst-partners','junior-student','junior','mseed','school-inst','portal'];
    for(var i=0;i<order.length;i++){
      var el=document.getElementById('page-'+order[i]);
      if(el&&el.classList.contains('active')) return order[i];
    }
    return 'portal';
  }

  function setPortal(p){
    var map={'inst-partners':'inst-partners','school-inst':'junior-student'};
    currentPortal=map[p]||p;
    if(helpOpen) refreshPanel();
  }

  /* ============================================================
     SCROLL
  ============================================================ */
  function initScroll(){
    var a=false,b=false;
    window.addEventListener('scroll',function(){
      var max=document.body.scrollHeight-window.innerHeight; if(max<=0)return;
      var pct=(window.scrollY/max)*100;
      if(!a&&pct>=40){ a=true; showMascot('wave',"You're doing great!",'mascot-wave',3000); }
      else if(!b&&pct>=70){ b=true; showMascot('point','Check out below!','mascot-float',3000); }
    },{passive:true});
  }

  /* ============================================================
     HOOKS
  ============================================================ */
  function hookAll(){

    var _nav=window.navigate;
    if(_nav) window.navigate=function(page){
      _nav.apply(this,arguments); setPortal(page);
      var m={'portal':['wave','Choose your portal!','mascot-wave'],'college-student':['laptop','Welcome, Student!','mascot-bounce'],'institution':['thumbs','Welcome, Institution!','mascot-bounce'],'inst-partners':['thumbs','Explore partnerships!','mascot-bounce'],'junior-student':['cheer','Hey Junior! Lets go!','mascot-bounce'],'junior':['cheer','Junior Portal!','mascot-bounce'],'mseed':['wave','Welcome to MSEED!','mascot-wave']};
      var r=m[page]; if(r) showMascot(r[0],r[1],r[2],3500);
    };

    var _tab=window.showTab;
    if(_tab) window.showTab=function(tab){
      _tab.apply(this,arguments);
      var m={courses:['laptop','Explore live classes!','mascot-float'],precourses:['point','Learn at your pace!','mascot-float'],ats:['think','Check your ATS score!','mascot-float'],games:['cheer','Time to play!','mascot-bounce'],resources:['thumbs','Great materials here!','mascot-float'],about:['wave','Nice to meet you!','mascot-wave']};
      var r=m[tab]; if(r) showMascot(r[0],r[1],r[2],3000);
    };

    var _itab=window.showInstTab;
    if(_itab) window.showInstTab=function(tab){
      _itab.apply(this,arguments);
      if(tab==='inst-tab-about') showMascot('wave','About MSEED!','mascot-wave',3000);
      else if(tab==='inst-tab-home') showMascot('thumbs','Institution Home!','mascot-float',3000);
    };

    var _sub=window.submitEnrolment;
    if(_sub) window.submitEnrolment=async function(){
      showMascot('think','Submitting your form...','mascot-pulse',0);
      try{
        await _sub.apply(this,arguments);
        var s=document.getElementById('enroll-step-success');
        if(s&&!s.classList.contains('hidden')){ confetti(); showMascot('cheer','You enrolled!','mascot-bounce',5000); }
        else hideMascot();
      } catch(e){ showMascot('wrench','Something went wrong...','mascot-shake',4000); throw e; }
    };

    var _upl=window.simulateUpload;
    if(_upl) window.simulateUpload=function(){
      showMascot('think','Scanning your resume...','mascot-pulse',0);
      _upl.apply(this,arguments);
      setTimeout(function(){ showMascot('thumbs','Analysis complete!','mascot-bounce',4000); },3800);
    };

    var _enr=window.openEnrollModal;
    if(_enr) window.openEnrollModal=function(){
      _enr.apply(this,arguments);
      setTimeout(function(){ showMascot('wave','Fill in your details!','mascot-wave',3500); },400);
    };

    var _om=window.openModal;
    if(_om) window.openModal=function(id){
      _om.apply(this,arguments);
      if(id==='modal-quiz') showMascot('cheer',"Let's test your skills!",'mascot-bounce',3000);
      else if(id==='modal-interview') showMascot('laptop','Practice makes perfect!','mascot-float',3000);
    };

    var _toast=window.showToast;
    if(_toast) window.showToast=function(msg,type){
      _toast.apply(this,arguments);
      if(type==='error') showMascot('wrench','Oops! Something is off...','mascot-shake',4000);
      else if(type==='success'){ confetti(); showMascot('cheer','Awesome!','mascot-bounce',4000); }
    };
  }

  /* ============================================================
     EMPTY STATE
  ============================================================ */
  function watchEmpty(){
    var obs=new MutationObserver(function(muts){ muts.forEach(function(m){ var t=m.target; if(t&&t.children&&t.children.length===0&&(t.id==='all-courses'||t.id==='all-precourses')) showMascot('laptop','No results! Try another filter.','mascot-float',4000); }); });
    ['all-courses','all-precourses'].forEach(function(id){ var el=document.getElementById(id); if(el)obs.observe(el,{childList:true}); });
  }

  /* ============================================================
     INIT
  ============================================================ */
  function init(){
    createLoader(); createMascot(); buildHelp(); initScroll(); watchEmpty();
    function boot(){
      hookAll(); currentPortal=detect();
      window.addEventListener('load',function(){
        setTimeout(function(){
          currentPortal=detect();
          var isEV=window.location.pathname.indexOf('ev-project')!==-1;
          showMascot('wave',isEV?'Welcome to EV Labs!':'Welcome to MSEED!','mascot-wave',4000);
        },1200);
      });
    }
    if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot);
    else boot();
  }

  window.MascotBuddy={ show:showMascot, hide:hideMascot, confetti:confetti, setPortal:setPortal, refresh:refreshPanel, chars:CHARS };
  init();
})();