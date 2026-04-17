/* main.js — Python Novice to Pro course site */

/* ── NAV SCROLL EFFECT ───────────────────────────── */
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.style.background = window.scrollY > 40
      ? 'rgba(6,9,18,0.97)'
      : 'rgba(6,9,18,0.85)';
  });
}

/* ── HAMBURGER ───────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

/* ── CODE RAIN BACKGROUND ────────────────────────── */
const rainEl = document.getElementById('codeRain');
if (rainEl) {
  const snippets = [
    'def __init__(self):', 'class Shape(ABC):',
    '@property', 'yield from gen()',
    'async def fetch():', 'with conn:',
    '__enter__', '__exit__', 'nonlocal count',
    'Counter(words)', 'match code:',
    'TypeVar("T")', '@dataclass', 'sqlite3.Row',
    'threading.Lock()', 'asyncio.gather(',
    'functools.wraps', '@abstractmethod',
    'itertools.chain(', '__iter__', '__next__',
    'collections.deque', 'except* TypeError:',
    'type Vector = list[float]', 'Protocol',
  ];

  const W = window.innerWidth;
  const cols = Math.floor(W / 120);

  for (let i = 0; i < cols * 4; i++) {
    const el = document.createElement('div');
    el.style.cssText = `
      position:absolute;
      left:${Math.random() * 100}%;
      top:${Math.random() * 100}%;
      animation: rainFall ${4 + Math.random() * 8}s linear ${Math.random() * 6}s infinite;
      opacity:${0.3 + Math.random() * 0.7};
      transform:rotate(${(Math.random() - 0.5) * 10}deg);
    `;
    el.textContent = snippets[Math.floor(Math.random() * snippets.length)];
    rainEl.appendChild(el);
  }

  const style = document.createElement('style');
  style.textContent = `
    @keyframes rainFall {
      0%   { transform: translateY(-20px); opacity:0; }
      10%  { opacity:0.5; }
      90%  { opacity:0.5; }
      100% { transform: translateY(60px); opacity:0; }
    }
  `;
  document.head.appendChild(style);
}

/* ── TYPEWRITER EFFECT ───────────────────────────── */
const codeEl  = document.getElementById('typedCode');
const cursorEl = document.getElementById('cursor');

if (codeEl) {
  const codeSnippets = [
    {
      label: 'dunder_methods.py',
      code: `<span class="cm"># Weekend 4 — Magic methods</span>
<span class="kw">from</span> functools <span class="kw">import</span> total_ordering

@total_ordering
<span class="kw">class</span> <span class="cl">Temperature</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(self, celsius: float):
        self._c = celsius

    <span class="kw">def</span> <span class="fn">__repr__</span>(self) -> str:
        <span class="kw">return</span> <span class="st">f"Temperature({self._c})"</span>

    <span class="kw">def</span> <span class="fn">__format__</span>(self, spec):
        <span class="kw">if</span> spec == <span class="st">"F"</span>:
            <span class="kw">return</span> <span class="st">f"{self._c*9/5+32:.1f}°F"</span>
        <span class="kw">return</span> <span class="st">f"{self._c:.1f}°C"</span>

    <span class="kw">def</span> <span class="fn">__add__</span>(self, other):
        <span class="kw">return</span> Temperature(self._c + other._c)

    <span class="kw">def</span> <span class="fn">__eq__</span>(self, other):
        <span class="kw">return</span> self._c == other._c

    <span class="kw">def</span> <span class="fn">__lt__</span>(self, other):
        <span class="kw">return</span> self._c < other._c

t = Temperature(<span class="num">100</span>)
<span class="fn">print</span>(<span class="st">f"{t:F}"</span>)  <span class="cm"># → 212.0°F</span>`
    },
    {
      label: 'async_db.py',
      code: `<span class="cm"># Weekend 8 — asyncio + sqlite3 capstone</span>
<span class="kw">import</span> asyncio, sqlite3
<span class="kw">from</span> pathlib <span class="kw">import</span> Path

<span class="kw">async def</span> <span class="fn">process_tasks</span>(db_path: Path):
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row

    pending = conn.execute(
        <span class="st">"SELECT * FROM tasks WHERE status=?"</span>,
        (<span class="st">"pending"</span>,)
    ).fetchall()

    <span class="kw">async with</span> asyncio.TaskGroup() <span class="kw">as</span> tg:
        <span class="kw">for</span> task <span class="kw">in</span> pending:
            tg.create_task(
                run_with_timeout(task, conn)
            )

<span class="kw">async def</span> <span class="fn">run_with_timeout</span>(task, conn):
    <span class="kw">async with</span> asyncio.timeout(<span class="num">30.0</span>):
        <span class="kw">await</span> execute_task(task[<span class="st">"id"</span>])
        <span class="kw">with</span> conn:
            conn.execute(
                <span class="st">"UPDATE tasks SET status=?"</span>,
                (<span class="st">"done"</span>,)
            )

asyncio.run(process_tasks(Path(<span class="st">"tasks.db"</span>)))`
    },
    {
      label: 'decorators.py',
      code: `<span class="cm"># Weekend 5 — Parametrised decorator</span>
<span class="kw">import</span> functools, time

<span class="kw">def</span> <span class="fn">retry</span>(times=<span class="num">3</span>, delay=<span class="num">1.0</span>, on=(Exception,)):
    <span class="kw">def</span> <span class="fn">decorator</span>(func):
        @functools.wraps(func)
        <span class="kw">def</span> <span class="fn">wrapper</span>(*args, **kw):
            <span class="kw">for</span> n <span class="kw">in</span> range(times):
                <span class="kw">try</span>:
                    <span class="kw">return</span> func(*args, **kw)
                <span class="kw">except</span> on <span class="kw">as</span> e:
                    <span class="kw">if</span> n == times - <span class="num">1</span>: <span class="kw">raise</span>
                    time.sleep(delay)
        <span class="kw">return</span> wrapper
    <span class="kw">return</span> decorator

<span class="cm"># Stacking decorators</span>
@retry(times=<span class="num">3</span>, on=(ConnectionError,))
<span class="kw">def</span> <span class="fn">fetch_data</span>(url: str) -> dict:
    <span class="st">"""Fetch JSON with automatic retry."""</span>
    <span class="kw">import</span> urllib.request, json
    <span class="kw">with</span> urllib.request.urlopen(url) <span class="kw">as</span> r:
        <span class="kw">return</span> json.load(r)`
    }
  ];

  let snippetIdx = 0;
  let charIdx    = 0;
  let isDeleting = false;
  let pause      = false;

  function typeNext() {
    if (pause) return;

    const snippet = codeSnippets[snippetIdx];
    const rawHTML = snippet.code;

    // We type character by character using visible text length
    // but preserve HTML tags intact
    const stripped = rawHTML.replace(/<[^>]+>/g, '');

    if (!isDeleting) {
      // Build up: show more visible characters
      charIdx = Math.min(charIdx + 2, stripped.length);

      // Reconstruct HTML up to charIdx visible chars
      codeEl.innerHTML = buildHTML(rawHTML, charIdx);

      if (charIdx >= stripped.length) {
        // Finished typing — pause then start deleting
        pause = true;
        setTimeout(() => { isDeleting = true; pause = false; }, 2800);
      }
    } else {
      charIdx = Math.max(charIdx - 4, 0);
      codeEl.innerHTML = buildHTML(rawHTML, charIdx);

      if (charIdx <= 0) {
        isDeleting = false;
        snippetIdx = (snippetIdx + 1) % codeSnippets.length;
        pause = true;
        setTimeout(() => { pause = false; }, 400);
      }
    }

    const speed = isDeleting ? 20 : 30;
    setTimeout(typeNext, speed);
  }

  function buildHTML(html, visibleChars) {
    // Walk through html, count non-tag chars, stop at visibleChars
    let result = '';
    let count  = 0;
    let i      = 0;
    while (i < html.length && count < visibleChars) {
      if (html[i] === '<') {
        // Copy tag verbatim
        const end = html.indexOf('>', i);
        if (end === -1) break;
        result += html.slice(i, end + 1);
        i = end + 1;
      } else {
        result += html[i];
        count++;
        i++;
      }
    }
    // Close any open tags
    return result;
  }

  typeNext();
}

/* ── INTERSECTION OBSERVER — TOC HIGHLIGHT ─────────── */
const tocLinks = document.querySelectorAll('.toc-link');
if (tocLinks.length) {
  const modules = document.querySelectorAll('.module');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        tocLinks.forEach(l => {
          l.classList.toggle('active', l.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-80px 0px -60% 0px', threshold: 0 });

  modules.forEach(m => observer.observe(m));
}

/* ── SMOOTH ANCHOR SCROLL ────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── REVEAL ON SCROLL ────────────────────────────── */
const reveals = document.querySelectorAll(
  '.module-card, .module, .pillar, .trainer-card, .pricing-card, .dunder-group'
);
if ('IntersectionObserver' in window) {
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  reveals.forEach((el, i) => {
    el.style.cssText += `
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.5s ease ${i * 0.04}s, transform 0.5s ease ${i * 0.04}s;
    `;
    revealObs.observe(el);
  });
}
