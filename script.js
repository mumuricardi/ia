document.addEventListener('DOMContentLoaded', function() {

    // --- FILTRO DE BUSCA (Mantido e funcional com o novo design) ---
    const buscaInput = document.getElementById('buscaDoenca');
    const cards = document.querySelectorAll('#doencas .card');

    buscaInput.addEventListener('input', function() {
        const termoBusca = buscaInput.value.toLowerCase();
        cards.forEach(card => {
            const tituloCard = card.querySelector('h3').textContent.toLowerCase();
            if (tituloCard.includes(termoBusca)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // --- ACORDEÃO APRIMORADO (Fecha outros ao abrir um) ---
    const botoesAccordion = document.querySelectorAll('.accordion-button');

    botoesAccordion.forEach(botao => {
        botao.addEventListener('click', function() {
            const estaAtivo = this.classList.contains('active');

            // Fecha todos os acordeões abertos
            botoesAccordion.forEach(b => {
                b.classList.remove('active');
                b.nextElementSibling.style.maxHeight = null;
            });

            // Se o botão clicado não estava ativo, abre-o
            if (!estaAtivo) {
                this.classList.add('active');
                const content = this.nextElementSibling;
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });
    
    // --- BOTÃO 'VOLTAR AO TOPO' ---
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    window.onscroll = function() {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            scrollTopBtn.style.display = "block";
        } else {
            scrollTopBtn.style.display = "none";
        }
    };

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({top: 0, behavior: 'smooth'});
    });
    
    // --- ANIMAÇÃO DE FADE-IN E MENU ATIVO AO ROLAR (Intersection Observer API) ---
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        root: null, // Observa em relação à viewport
        rootMargin: '0px',
        threshold: 0.4 // 40% da seção precisa estar visível
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Animação de fade-in
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }

            // Destaque do link no menu
            if (entry.isIntersecting) {
                const targetId = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${targetId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});