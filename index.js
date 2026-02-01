(function () {
  emailjs.init("A_s_StaRloickiciaKVwC");
})();

document.addEventListener("DOMContentLoaded", () => {
  
  window.addEventListener("load", () => {
  const loader = document.getElementById("page-loader");
  loader.classList.add("hidden");
});

  
  /* =========================
     Scroll Reveal Observer
  ========================= */
  const revealCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('active');
    });
  };

  const observer = new IntersectionObserver(revealCallback, { threshold: 0.1 });
  document.querySelectorAll('section').forEach(section => {
    section.classList.add('reveal');
    observer.observe(section);
  });

  /* =========================
     Skill Filtering
  ========================= */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const skills = document.querySelectorAll(".skill-item");

  const filterSkills = (filter) => {
    skills.forEach(skill => {
      if (skill.classList.contains(filter)) {
        skill.classList.remove("hidden");
        skill.style.display = "flex";
      } else {
        skill.classList.add("hidden");
        setTimeout(() => { if(skill.classList.contains("hidden")) skill.style.display = "none"; }, 400);
      }
    });
  };

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      filterSkills(btn.getAttribute("data-filter"));
    });
  });

  filterSkills("frontend");

  /* =========================
     Timeline Toggle
  ========================= */
  const toggleBtns = document.querySelectorAll(".toggle-btn");
  const groups = document.querySelectorAll(".timeline-group");

  toggleBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      toggleBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const target = btn.getAttribute("data-target");
      groups.forEach(g => g.id === target ? g.classList.remove("hidden") : g.classList.add("hidden"));
    });
  });

  /* =========================
     GitHub API
  ========================= */
  const fetchGitHub = async () => {
    try {
      const res = await fetch("https://api.github.com/users/mani1183/repos?sort=updated&per_page=6");
      const repos = await res.json();
      const container = document.getElementById("projects-container");
      
      if (!repos.length) return;
      container.innerHTML = "";

      repos.filter(r => !r.fork).slice(0, 4).forEach(repo => {
        container.innerHTML += `
          <div class="card-bg rounded-2xl p-8 flex flex-col justify-between group">
            <div>
              <div class="flex justify-between items-start mb-4">
                <ion-icon name="folder-open-outline" class="text-3xl text-blue-400"></ion-icon>
                <div class="flex gap-3">
                  <a href="${repo.html_url}" target="_blank"><ion-icon name="logo-github" class="text-xl hover:text-white transition"></ion-icon></a>
                </div>
              </div>
              <h3 class="text-xl font-bold mb-2 group-hover:text-blue-400 transition">${repo.name}</h3>
              <p class="text-gray-400 text-sm mb-6">${repo.description || "Building something amazing with modern tech."}</p>
            </div>
            <div class="flex items-center gap-4 text-xs font-mono text-gray-500">
               <span class="flex items-center gap-1"><span class="w-3 h-3 rounded-full bg-blue-500"></span> ${repo.language || 'Code'}</span>
               <span>⭐ ${repo.stargazers_count}</span>
            </div>
          </div>`;
      });
    } catch (e) {
      console.error("GitHub Fetch Failed");
    }
  };
  fetchGitHub();

  /* =========================
     Mobile Menu Logic
  ========================= */
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
});

const themeToggle = document.getElementById('themeToggle');
const themeToggleMobile = document.getElementById('themeToggleMobile');
const body = document.body;

// Function to toggle theme
const toggleTheme = () => {
  // 1. Toggle a 'light-mode' class on the body
  body.classList.toggle('bg-gray-900');
  body.classList.toggle('bg-white');
  body.classList.toggle('text-gray-100');
  body.classList.toggle('text-gray-900');

  // 2. Change the icon (Optional)
  const isDark = body.classList.contains('bg-gray-900');
  themeToggle.innerHTML = isDark ? '⏾' : '☀';
  themeToggleMobile.innerHTML = isDark ? '⏾' : '☀';
};

themeToggle.addEventListener('click', toggleTheme);
themeToggleMobile.addEventListener('click', toggleTheme);