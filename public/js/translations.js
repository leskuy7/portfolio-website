// Translations object for TR/EN language support
const translations = {
    tr: {
        // Navbar
        navHome: 'Ana Sayfa',
        navAbout: 'Hakkımda',
        navSkills: 'Yetenekler',
        navProjects: 'Projeler',
        navContact: 'İletişim',
        
        // Hero Section
        heroGreeting: 'Merhaba, Ben',
        heroName: 'Yüksel',
        heroTitle: 'Full Stack Geliştirici & UI/UX Tasarımcı',
        heroDesc: 'Modern web teknolojileri ile kullanıcı dostu ve estetik dijital deneyimler tasarlıyorum.',
        heroBtn1: 'Projelerimi Gör',
        heroBtn2: 'İletişime Geç',
        
        // About Section
        aboutTitle: 'Hakkımda',
        aboutSubtitle: 'Kariyer yolculuğum ve tutkularım',
        aboutHeading: 'Yaratıcı Çözümler Üreten Bir Geliştiriciyim',
        aboutDesc: '4 yıldır web geliştirme alanında çalışıyorum. Node.js, React ve modern web teknolojileri konusunda uzmanlaştım. Karmaşık problemleri basit ve etkili kod yapılarıyla çözmekten keyif alıyorum.',
        aboutSkill1: 'Clean Code Prensipleri',
        aboutSkill2: 'Responsive Tasarım',
        aboutSkill3: 'SEO Optimizasyonu',
        aboutSkill4: 'Cross-Browser Uyumluluk',
        
        // Skills Section
        skillsTitle: 'Uzmanlık Alanlarım',
        skillBackend: 'Backend Geliştirme',
        skillBackendDesc: 'Node.js, Express, MongoDB ve SQL veritabanları ile güçlü altyapılar.',
        skillFrontend: 'Frontend Geliştirme',
        skillFrontendDesc: 'React, HTML5, CSS3, Bootstrap ve Tailwind ile modern arayüzler.',
        skillMobile: 'Mobil Uyumluluk',
        skillMobileDesc: 'Her cihazda kusursuz çalışan responsive tasarımlar.',
        
        // Portfolio Section
        portfolioTitle: 'Projelerim',
        portfolioSubtitle: 'Son zamanlarda üzerinde çalıştığım bazı işler',
        project1Title: 'E-Ticaret Platformu',
        project1Desc: 'MERN Stack kullanılarak geliştirilmiş, tam özellikli bir e-ticaret uygulaması.',
        project2Title: 'Görev Yönetim Uygulaması',
        project2Desc: 'Takımların verimli çalışması için geliştirilmiş proje yönetim aracı.',
        project3Title: 'Kişisel Blog',
        project3Desc: 'Next.js ve Markdown ile oluşturulmuş, yüksek performanslı blog sitesi.',
        sampleProject: 'Örnek Proje',
        
        // Contact Section
        contactTitle: 'İletişime Geç',
        contactSubtitle: 'Projeleriniz veya sorularınız için bana ulaşın',
        contactName: 'Adınız Soyadınız',
        contactEmail: 'E-posta Adresiniz',
        contactSubject: 'Konu',
        contactMessage: 'Mesajınız',
        contactBtn: 'Gönder',
        
        // Footer
        footer: '© 2026 Tüm Hakları Saklıdır | Yüksel Yılmaz'
    },
    en: {
        // Navbar
        navHome: 'Home',
        navAbout: 'About',
        navSkills: 'Skills',
        navProjects: 'Projects',
        navContact: 'Contact',
        
        // Hero Section
        heroGreeting: 'Hello, I\'m',
        heroName: 'Yüksel',
        heroTitle: 'Full Stack Developer & UI/UX Designer',
        heroDesc: 'I design user-friendly and aesthetic digital experiences with modern web technologies.',
        heroBtn1: 'View My Projects',
        heroBtn2: 'Get In Touch',
        
        // About Section
        aboutTitle: 'About Me',
        aboutSubtitle: 'My career journey and passions',
        aboutHeading: 'A Developer Creating Creative Solutions',
        aboutDesc: 'I have been working in web development for 4 years. I specialize in Node.js, React, and modern web technologies. I enjoy solving complex problems with simple and effective code structures.',
        aboutSkill1: 'Clean Code Principles',
        aboutSkill2: 'Responsive Design',
        aboutSkill3: 'SEO Optimization',
        aboutSkill4: 'Cross-Browser Compatibility',
        
        // Skills Section
        skillsTitle: 'My Expertise',
        skillBackend: 'Backend Development',
        skillBackendDesc: 'Strong infrastructure with Node.js, Express, MongoDB and SQL databases.',
        skillFrontend: 'Frontend Development',
        skillFrontendDesc: 'Modern interfaces with React, HTML5, CSS3, Bootstrap and Tailwind.',
        skillMobile: 'Mobile Compatibility',
        skillMobileDesc: 'Responsive designs that work flawlessly on every device.',
        
        // Portfolio Section
        portfolioTitle: 'My Projects',
        portfolioSubtitle: 'Some of the recent work I\'ve been doing',
        project1Title: 'E-Commerce Platform',
        project1Desc: 'A fully-featured e-commerce application developed using MERN Stack.',
        project2Title: 'Task Management App',
        project2Desc: 'Project management tool developed for teams to work efficiently.',
        project3Title: 'Personal Blog',
        project3Desc: 'High-performance blog site built with Next.js and Markdown.',
        sampleProject: 'Sample Project',
        
        // Contact Section
        contactTitle: 'Get In Touch',
        contactSubtitle: 'Reach out to me for your projects or questions',
        contactName: 'Your Name',
        contactEmail: 'Your Email',
        contactSubject: 'Subject',
        contactMessage: 'Your Message',
        contactBtn: 'Send',
        
        // Footer
        footer: '© 2026 All Rights Reserved | Yüksel Yılmaz'
    }
};

// Language switching function
function setLanguage(lang) {
    localStorage.setItem('language', lang);
    const elements = document.querySelectorAll('[data-translate]');
    
    elements.forEach(el => {
        const key = el.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translations[lang][key];
            } else {
                el.textContent = translations[lang][key];
            }
        }
    });
    
    // Update language toggle button
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
        langBtn.textContent = lang === 'tr' ? 'EN' : 'TR';
    }
}

// Get saved language or default to Turkish
function getSavedLanguage() {
    return localStorage.getItem('language') || 'tr';
}
