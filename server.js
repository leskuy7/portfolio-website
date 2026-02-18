const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

// Set View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static Files 'Markdown', 'GraphQL', 'Vercel'
app.use(express.static(path.join(__dirname, 'public')));

// Project Data
const projects = {
    '1': {
        title: 'Market Stok Takip Sistemi',
        subtitle: 'Kapsamlı Stok ve Satış Yönetim Paneli',
        description: 'Marketler için özel olarak geliştirilmiş bu web tabanlı uygulama, anlık stok takibi, barkodlu satış sistemi, detaylı raporlama ve kullanıcı yetkilendirme özellikleri sunar. Responsive tasarımı ve PWA desteği sayesinde hem masaüstü hem de mobil cihazlarda sorunsuz çalışır.',
        image: 'https://placehold.co/1200x600/png?text=Market+Stok+Takip',
        technologies: ['Node.js', 'Express', 'MongoDB', 'JWT', 'HTML/CSS', 'PWA'],
        liveUrl: 'https://market-i8nk.onrender.com/',
        githubUrl: 'https://github.com/leskuy7/market'
    },
    '2': {
        title: 'Abonelik Takip Sistemi',
        subtitle: 'Kisel Abonelik ve Harcama Yönetimi',
        description: 'Tüm dijital aboneliklerinizi tek bir yerden yönetmenizi sağlayan modern bir web uygulaması. Ödeme tarihleri, harcama analizleri ve e-posta bildirimleri ile bütçenizi kontrol altında tutun. Güvenli kimlik doğrulama ve kullanıcı dostu arayüz sunar.',
        image: 'https://placehold.co/1200x600/png?text=Abonelik+Takip',
        technologies: ['Node.js', 'Express', 'PostgreSQL', 'Prisma', 'JWT', 'React'],
        githubUrl: 'https://github.com/leskuy7/abonelik',
        liveUrl:"https://frontend-ten-pink-85.vercel.app"
    }
};

// Routes
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Ana Sayfa',
        page: 'home'
    });
});

app.get('/project/:id', (req, res) => {
    const project = projects[req.params.id];
    if (project) {
        res.render('project-detail', {
            project: project
        });
    } else {
        res.status(404).render('404');
    }
});

// 404 - Catch all unmatched routes
app.use((req, res) => {
    res.status(404).render('404');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
