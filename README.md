<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Brickers Connect — Prototype</title>
<style>
  :root{
    --blue:#1557ff;
    --blue-dark:#0d2f8f;
    --blue-soft:#eaf0ff;
    --ink:#101828;
    --muted:#667085;
    --line:#e6eaf0;
    --bg:#f7f9fc;
    --white:#ffffff;
    --green:#0c9b67;
    --yellow:#f6c84c;
    --shadow:0 14px 40px rgba(16,24,40,.10);
  }
  *{box-sizing:border-box}
  body{
    margin:0;
    font-family:Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    color:var(--ink);
    background:linear-gradient(180deg,#f9fbff 0%,#f3f6fb 100%);
  }
  button,input,select{font:inherit}
  button{cursor:pointer}
  .app{
    max-width:1180px;
    margin:0 auto;
    min-height:100vh;
    background:var(--white);
    box-shadow:0 0 0 1px rgba(16,24,40,.04);
  }
  .topbar{
    position:sticky;
    top:0;
    z-index:30;
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding:18px 28px;
    border-bottom:1px solid var(--line);
    background:rgba(255,255,255,.94);
    backdrop-filter:blur(12px);
  }
  .brand{
    display:flex;
    align-items:center;
    gap:12px;
    font-weight:800;
    letter-spacing:-.02em;
  }
  .brandmark{
    width:38px;height:38px;border-radius:12px;
    background:var(--blue);
    display:grid;place-items:center;
    color:#fff;font-weight:900;
    box-shadow:0 8px 20px rgba(21,87,255,.25);
  }
  .brand small{display:block;color:var(--muted);font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin-top:1px}
  .top-actions{display:flex;gap:10px;align-items:center}
  .ghost,.primary,.chip,.navbtn,.smallbtn{
    border:none;border-radius:999px;
    transition:.2s ease;
  }
  .ghost{background:#fff;border:1px solid var(--line);padding:10px 14px;color:var(--ink);font-weight:700}
  .primary{background:var(--blue);color:#fff;padding:11px 16px;font-weight:800;box-shadow:0 8px 20px rgba(21,87,255,.18)}
  .primary:hover,.smallbtn:hover{transform:translateY(-1px)}
  .page{display:none}
  .page.active{display:block}
  .hero{
    padding:72px 28px 50px;
    background:
      radial-gradient(circle at 85% 15%, rgba(21,87,255,.14), transparent 28%),
      linear-gradient(180deg,#fff 0%,#f7f9ff 100%);
  }
  .eyebrow{
    display:inline-flex;
    gap:8px;
    align-items:center;
    padding:8px 12px;
    border-radius:999px;
    background:var(--blue-soft);
    color:var(--blue-dark);
    font-size:13px;
    font-weight:800;
  }
  h1{
    max-width:760px;
    font-size:clamp(42px,7vw,78px);
    line-height:.98;
    letter-spacing:-.055em;
    margin:20px 0 22px;
  }
  .hero p{
    max-width:690px;
    color:var(--muted);
    font-size:19px;
    line-height:1.6;
    margin:0;
  }
  .choice-grid{
    display:grid;
    grid-template-columns:repeat(2,minmax(0,1fr));
    gap:18px;
    margin-top:34px;
    max-width:800px;
  }
  .choice{
    text-align:left;
    border:1px solid var(--line);
    background:#fff;
    border-radius:22px;
    padding:24px;
    box-shadow:var(--shadow);
    transition:.2s ease;
  }
  .choice:hover{transform:translateY(-3px);border-color:#bfd0ff}
  .choice .icon{
    width:46px;height:46px;border-radius:14px;
    display:grid;place-items:center;
    background:var(--blue-soft);
    color:var(--blue);
    font-size:22px;
    margin-bottom:14px;
  }
  .choice h3{margin:0 0 7px;font-size:21px}
  .choice p{font-size:14px;line-height:1.5}
  .section{padding:40px 28px}
  .section-head{
    display:flex;
    align-items:end;
    justify-content:space-between;
    gap:18px;
    margin-bottom:18px;
  }
  .section-head h2{font-size:30px;letter-spacing:-.03em;margin:0}
  .section-head p{color:var(--muted);margin:6px 0 0}
  .textlink{border:none;background:none;color:var(--blue);font-weight:800}
  .cards{
    display:grid;
    grid-template-columns:repeat(4,minmax(0,1fr));
    gap:16px;
  }
  .card{
    border:1px solid var(--line);
    border-radius:20px;
    overflow:hidden;
    background:#fff;
    box-shadow:0 7px 24px rgba(16,24,40,.05);
  }
  .card-cover{
    height:135px;
    padding:18px;
    display:flex;
    align-items:flex-end;
    font-size:12px;
    font-weight:900;
    letter-spacing:.08em;
    text-transform:uppercase;
    color:#fff;
  }
  .c1{background:linear-gradient(135deg,#273dce,#7b92ff)}
  .c2{background:linear-gradient(135deg,#0c7660,#58c79a)}
  .c3{background:linear-gradient(135deg,#b26316,#f0b653)}
  .c4{background:linear-gradient(135deg,#8e3153,#d96f92)}
  .card-body{padding:18px}
  .tag{color:var(--blue);font-size:12px;font-weight:900;text-transform:uppercase;letter-spacing:.06em}
  .card h3{font-size:18px;margin:8px 0 7px;line-height:1.3}
  .card p{margin:0;color:var(--muted);font-size:13px;line-height:1.5}
  .card-actions{display:flex;gap:8px;margin-top:15px}
  .smallbtn{
    padding:8px 10px;
    background:var(--blue);
    color:#fff;
    font-weight:800;
    font-size:12px;
  }
  .smallbtn.alt{background:#f2f4f7;color:var(--ink)}
  .bottomnav{
    position:sticky;
    bottom:0;
    z-index:20;
    display:grid;
    grid-template-columns:repeat(4,1fr);
    background:#fff;
    border-top:1px solid var(--line);
    padding:8px 10px 12px;
  }
  .navbtn{
    background:transparent;
    padding:10px 4px;
    color:#7b8494;
    font-size:12px;
    font-weight:800;
  }
  .navbtn.active{color:var(--blue);background:var(--blue-soft)}
  .panel{
    min-height:680px;
    padding:48px 28px 80px;
    background:var(--bg);
  }
  .panel-title{max-width:720px;margin-bottom:26px}
  .panel-title h2{font-size:42px;letter-spacing:-.045em;margin:0 0 10px}
  .panel-title p{color:var(--muted);font-size:16px;line-height:1.6}
  .formbox{
    max-width:760px;
    padding:24px;
    border:1px solid var(--line);
    border-radius:24px;
    background:#fff;
    box-shadow:var(--shadow);
  }
  .label{font-size:13px;font-weight:900;margin:0 0 10px}
  .chips{display:flex;gap:9px;flex-wrap:wrap}
  .chip{
    border:1px solid var(--line);
    background:#fff;
    padding:10px 13px;
    font-weight:700;
    color:#475467;
  }
  .chip.selected{background:var(--blue-soft);border-color:#b8c8ff;color:var(--blue-dark)}
  .fieldrow{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:22px}
  .field label{display:block;font-size:12px;font-weight:800;margin-bottom:7px;color:#475467}
  .field input,.field select{
    width:100%;
    padding:12px 13px;
    border:1px solid var(--line);
    border-radius:12px;
    outline:none;
    background:#fff;
  }
  .field input:focus,.field select:focus{border-color:#9bb2ff;box-shadow:0 0 0 4px rgba(21,87,255,.08)}
  .submitrow{display:flex;align-items:center;justify-content:space-between;gap:14px;margin-top:22px}
  .note{font-size:12px;color:var(--muted)}
  .resultbox{
    display:none;
    margin-top:18px;
    padding:18px;
    border-radius:16px;
    background:#eefbf6;
    border:1px solid #c4eedf;
  }
  .resultbox.show{display:block}
  .resultbox strong{color:#08714f}
  .discover-tools{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:20px}
  .discover-tools input{
    flex:1;
    min-width:240px;
    padding:13px 14px;
    border:1px solid var(--line);
    border-radius:13px;
  }
  .mini-statbar{
    display:grid;
    grid-template-columns:repeat(3,1fr);
    gap:14px;
    margin-top:34px;
    max-width:760px;
  }
  .stat{
    padding:17px;
    border-radius:17px;
    background:#fff;
    border:1px solid var(--line);
  }
  .stat b{display:block;font-size:24px}
  .stat span{font-size:12px;color:var(--muted);font-weight:700}
  .modal{
    display:none;
    position:fixed;
    inset:0;
    background:rgba(16,24,40,.55);
    z-index:100;
    padding:20px;
    align-items:center;
    justify-content:center;
  }
  .modal.show{display:flex}
  .modal-card{
    width:min(560px,100%);
    background:#fff;
    border-radius:24px;
    padding:26px;
    box-shadow:0 30px 80px rgba(0,0,0,.24);
  }
  .modal-card h3{font-size:28px;margin:0 0 10px;letter-spacing:-.03em}
  .modal-card p{color:var(--muted);line-height:1.6}
  .modal-card .actions{display:flex;gap:10px;margin-top:20px}
  .foot{
    padding:26px 28px 32px;
    background:#0f1f4b;
    color:#fff;
  }
  .foot b{font-size:18px}
  .foot p{max-width:620px;color:#c8d1ea;font-size:13px;line-height:1.6}
  @media(max-width:850px){
    .cards{grid-template-columns:repeat(2,minmax(0,1fr))}
    .choice-grid{grid-template-columns:1fr}
  }
  @media(max-width:560px){
    .topbar{padding:14px 16px}
    .top-actions .ghost{display:none}
    .hero,.section,.panel{padding-left:18px;padding-right:18px}
    .cards{grid-template-columns:1fr}
    .fieldrow,.mini-statbar{grid-template-columns:1fr}
    .hero{padding-top:50px}
    .panel-title h2{font-size:34px}
  }
</style>
</head>
<body>
<div class="app">
  <header class="topbar">
    <div class="brand">
      <div class="brandmark">B</div>
      <div>Brickers Connect<small>by The Brickers Foundation</small></div>
    </div>
    <div class="top-actions">
      <button class="ghost" onclick="openModal('pitch')">Why this exists</button>
      <button class="primary" onclick="go('help')">Find support</button>
    </div>
  </header>

  <main>
    <section id="home" class="page active">
      <div class="hero">
        <span class="eyebrow">● Community support, made easier to find</span>
        <h1>What can we help you connect to?</h1>
        <p>Tell Brickers what you need, or what you have to offer. We’ll help connect the dots between people, nonprofits, resources, and opportunities.</p>

        <div class="choice-grid">
          <button class="choice" onclick="go('help')">
            <div class="icon">⌕</div>
            <h3>I need help</h3>
            <p>Find organizations, programs, scholarships, services, and resources based on what you need.</p>
          </button>
          <button class="choice" onclick="go('offer')">
            <div class="icon">+</div>
            <h3>I want to help</h3>
            <p>Offer time, skills, supplies, sponsorship, space, or other support to organizations doing the work.</p>
          </button>
        </div>

        <div class="mini-statbar">
          <div class="stat"><b>10</b><span>Impact areas represented</span></div>
          <div class="stat"><b>1 hub</b><span>For resources + visibility</span></div>
          <div class="stat"><b>2 paths</b><span>Find help or offer help</span></div>
        </div>
      </div>

      <div class="section">
        <div class="section-head">
          <div>
            <h2>Discover organizations doing the work</h2>
            <p>Built from the stories and nonprofits Brickers already amplifies.</p>
          </div>
          <button class="textlink" onclick="go('discover')">Explore all →</button>
        </div>

        <div class="cards">
          <article class="card">
            <div class="card-cover c1">Stability + essentials</div>
            <div class="card-body">
              <div class="tag">Nonprofit Highlight</div>
              <h3>Women Giving Back</h3>
              <p>Clothing support for women and children rebuilding stability.</p>
              <div class="card-actions">
                <button class="smallbtn" onclick="showOrg('Women Giving Back','Clothing and essential support for women and children.')">View match</button>
                <button class="smallbtn alt" onclick="go('offer')">Help</button>
              </div>
            </div>
          </article>

          <article class="card">
            <div class="card-cover c2">Career pathways</div>
            <div class="card-body">
              <div class="tag">Resource Spotlight</div>
              <h3>FareStart</h3>
              <p>Job training paired with support that helps people move forward.</p>
              <div class="card-actions">
                <button class="smallbtn" onclick="showOrg('FareStart','Career training and employment support resources.')">View match</button>
                <button class="smallbtn alt" onclick="go('offer')">Help</button>
              </div>
            </div>
          </article>

          <article class="card">
            <div class="card-cover c3">Health + wellness</div>
            <div class="card-body">
              <div class="tag">Resource Spotlight</div>
              <h3>NorthLakes Community Clinic</h3>
              <p>Accessible healthcare and support for rural communities.</p>
              <div class="card-actions">
                <button class="smallbtn" onclick="showOrg('NorthLakes Community Clinic','Community healthcare and wellness resources.')">View match</button>
                <button class="smallbtn alt" onclick="go('offer')">Help</button>
              </div>
            </div>
          </article>

          <article class="card">
            <div class="card-cover c4">Community support</div>
            <div class="card-body">
              <div class="tag">Nonprofit Highlight</div>
              <h3>Firm Foundation VA</h3>
              <p>A Brickers-featured organization helping people find hope and support.</p>
              <div class="card-actions">
                <button class="smallbtn" onclick="showOrg('Firm Foundation VA','Community support featured by The Brickers Foundation.')">View match</button>
                <button class="smallbtn alt" onclick="go('offer')">Help</button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section id="help" class="page panel">
      <div class="panel-title">
        <span class="eyebrow">Find support</span>
        <h2>Start with what you need.</h2>
        <p>This prototype shows how Brickers could route someone toward relevant organizations, articles, programs, and opportunities without expecting them to already know where to look.</p>
      </div>

      <div class="formbox">
        <p class="label">What are you looking for?</p>
        <div class="chips" id="needChips">
          <button class="chip" onclick="pick(this)">Youth programs</button>
          <button class="chip" onclick="pick(this)">Career support</button>
          <button class="chip" onclick="pick(this)">Financial literacy</button>
          <button class="chip" onclick="pick(this)">Health & wellness</button>
          <button class="chip" onclick="pick(this)">Scholarships</button>
          <button class="chip" onclick="pick(this)">Small business</button>
          <button class="chip" onclick="pick(this)">Basic needs</button>
          <button class="chip" onclick="pick(this)">Community support</button>
        </div>

        <div class="fieldrow">
          <div class="field">
            <label>Your ZIP code</label>
            <input id="zip" placeholder="e.g. 20166" />
          </div>
          <div class="field">
            <label>Who is this for?</label>
            <select>
              <option>Me</option>
              <option>My family</option>
              <option>A young person</option>
              <option>My nonprofit</option>
              <option>Someone I’m helping</option>
            </select>
          </div>
        </div>

        <div class="submitrow">
          <span class="note">Prototype: sample recommendations are generated locally.</span>
          <button class="primary" onclick="showMatches()">Show my matches</button>
        </div>

        <div class="resultbox" id="matches">
          <strong>3 possible connections found</strong>
          <div style="margin-top:10px;color:#344054;line-height:1.6">
            • A nonprofit spotlight matching your selected need<br>
            • A related Brickers resource story<br>
            • A current opportunity or program category
          </div>
          <button class="smallbtn" style="margin-top:12px" onclick="go('discover')">Browse matches</button>
        </div>
      </div>
    </section>

    <section id="offer" class="page panel">
      <div class="panel-title">
        <span class="eyebrow">Offer support</span>
        <h2>What can you bring to the table?</h2>
        <p>Businesses, volunteers, creatives, venues, professionals, and community members could tell Brickers how they are able to help. The platform can then connect that capacity to real nonprofit needs.</p>
      </div>

      <div class="formbox">
        <p class="label">I can offer…</p>
        <div class="chips">
          <button class="chip" onclick="pick(this)">Volunteer time</button>
          <button class="chip" onclick="pick(this)">Professional skills</button>
          <button class="chip" onclick="pick(this)">Supplies</button>
          <button class="chip" onclick="pick(this)">Event space</button>
          <button class="chip" onclick="pick(this)">Media exposure</button>
          <button class="chip" onclick="pick(this)">Mentorship</button>
          <button class="chip" onclick="pick(this)">Sponsorship</button>
          <button class="chip" onclick="pick(this)">Transportation</button>
        </div>

        <div class="fieldrow">
          <div class="field">
            <label>Name / organization</label>
            <input placeholder="Your name or organization" />
          </div>
          <div class="field">
            <label>Where can you help?</label>
            <select>
              <option>Locally</option>
              <option>Virtually</option>
              <option>Anywhere in the U.S.</option>
              <option>Internationally</option>
            </select>
          </div>
        </div>

        <div class="submitrow">
          <span class="note">This could feed a Brickers-managed partner pipeline.</span>
          <button class="primary" onclick="offerSuccess()">Find organizations</button>
        </div>

        <div class="resultbox" id="offerResult">
          <strong>Your offer has potential matches.</strong>
          <div style="margin-top:10px;color:#344054;line-height:1.6">
            The full product could surface nonprofit needs by category, geography, urgency, and type of support.
          </div>
        </div>
      </div>
    </section>

    <section id="discover" class="page panel">
      <div class="panel-title">
        <span class="eyebrow">Explore the network</span>
        <h2>Discover resources and organizations.</h2>
        <p>The Brickers content library becomes useful in a new way: searchable by the problem someone is trying to solve.</p>
      </div>

      <div class="discover-tools">
        <input id="searchBox" placeholder="Search: jobs, healthcare, youth, clothing..." oninput="filterCards()" />
        <button class="ghost" onclick="document.getElementById('searchBox').value='';filterCards()">Clear</button>
      </div>

      <div class="cards" id="discoverCards">
        <article class="card searchable" data-search="women children clothing stability essentials">
          <div class="card-cover c1">Stability + essentials</div>
          <div class="card-body"><div class="tag">Nonprofit Highlight</div><h3>Women Giving Back</h3><p>Clothing and dignity-centered support.</p><div class="card-actions"><button class="smallbtn" onclick="showOrg('Women Giving Back','Clothing and essential support for women and children.')">Open</button></div></div>
        </article>
        <article class="card searchable" data-search="job career training employment workforce">
          <div class="card-cover c2">Career pathways</div>
          <div class="card-body"><div class="tag">Resource Spotlight</div><h3>FareStart</h3><p>Career training and employment support.</p><div class="card-actions"><button class="smallbtn" onclick="showOrg('FareStart','Career training and employment support resources.')">Open</button></div></div>
        </article>
        <article class="card searchable" data-search="health wellness clinic healthcare rural medical">
          <div class="card-cover c3">Health + wellness</div>
          <div class="card-body"><div class="tag">Resource Spotlight</div><h3>NorthLakes Community Clinic</h3><p>Accessible community healthcare.</p><div class="card-actions"><button class="smallbtn" onclick="showOrg('NorthLakes Community Clinic','Community healthcare and wellness resources.')">Open</button></div></div>
        </article>
        <article class="card searchable" data-search="hope community support family nonprofit">
          <div class="card-cover c4">Community support</div>
          <div class="card-body"><div class="tag">Nonprofit Highlight</div><h3>Firm Foundation VA</h3><p>Community-centered support and hope.</p><div class="card-actions"><button class="smallbtn" onclick="showOrg('Firm Foundation VA','Community support featured by The Brickers Foundation.')">Open</button></div></div>
        </article>
      </div>
    </section>
  </main>

  <nav class="bottomnav">
    <button class="navbtn active" data-page="home" onclick="go('home')">⌂ Home</button>
    <button class="navbtn" data-page="help" onclick="go('help')">⌕ Find Help</button>
    <button class="navbtn" data-page="offer" onclick="go('offer')">＋ Offer Help</button>
    <button class="navbtn" data-page="discover" onclick="go('discover')">◫ Discover</button>
  </nav>

  <footer class="foot">
    <b>Brickers Connect — Concept Prototype</b>
    <p>A sample product direction for The Brickers Foundation: one place to connect people, nonprofits, resources, opportunities, and community support. This prototype uses illustrative functionality and is not connected to live Brickers data.</p>
  </footer>
</div>

<div class="modal" id="modal">
  <div class="modal-card">
    <h3 id="modalTitle">Brickers Connect</h3>
    <p id="modalText"></p>
    <div class="actions">
      <button class="primary" onclick="closeModal()">Got it</button>
      <button class="ghost" onclick="go('help');closeModal()">Try matching</button>
    </div>
  </div>
</div>

<script>
function go(page){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById(page).classList.add('active');
  document.querySelectorAll('.navbtn').forEach(b=>b.classList.toggle('active',b.dataset.page===page));
  window.scrollTo({top:0,behavior:'smooth'});
}
function pick(el){ el.classList.toggle('selected'); }
function showMatches(){ document.getElementById('matches').classList.add('show'); }
function offerSuccess(){ document.getElementById('offerResult').classList.add('show'); }
function showOrg(name,desc){
  document.getElementById('modalTitle').textContent=name;
  document.getElementById('modalText').textContent=desc+" In a live version, this page could include the Brickers story, verified programs, location/service area, current needs, ways to help, and direct next steps.";
  document.getElementById('modal').classList.add('show');
}
function openModal(type){
  document.getElementById('modalTitle').textContent='Why Brickers Connect?';
  document.getElementById('modalText').textContent='Brickers already amplifies nonprofit work and helps people find support, direction, and opportunity. This concept turns that existing mission and content into a searchable connection layer: start with a need, or start with what you can offer.';
  document.getElementById('modal').classList.add('show');
}
function closeModal(){ document.getElementById('modal').classList.remove('show'); }
function filterCards(){
  const q=document.getElementById('searchBox').value.toLowerCase().trim();
  document.querySelectorAll('.searchable').forEach(card=>{
    card.style.display=(card.dataset.search+" "+card.innerText.toLowerCase()).includes(q)?'block':'none';
  });
}
document.getElementById('modal').addEventListener('click',e=>{if(e.target.id==='modal')closeModal()});
</script>
</body>
</html>
