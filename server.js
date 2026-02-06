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
        title: 'E-Ticaret Platformu',
        subtitle: 'Modern ve Ölçeklenebilir Alışveriş Deneyimi',
        description: 'MERN (MongoDB, Express, React, Node.js) yığını kullanılarak geliştirilen bu kapsamlı e-ticaret çözümü, kullanıcı dostu arayüzü ve güçlü yönetim paneli ile öne çıkıyor. Gerçek zamanlı stok takibi, güvenli ödeme sistemleri entegrasyonu ve gelişmiş arama özellikleri barındırıyor.',
        image: 'https://placehold.co/1200x600/png?text=E-Commerce+Project',
        technologies: ['React', 'Node.js', 'MongoDB', 'Redux', 'Stripe API']
    },
    '2': {
        title: 'Görev Yönetim Uygulaması',
        subtitle: 'Takım İşbirliğini Artıran Çözüm',
        description: 'Kurumsal takımlar için geliştirilen bu proje yönetim aracı, görev atama, sürükle-bırak panolar (Kanban), ve detaylı raporlama özellikleri sunuyor. Socket.io ile anlık bildirimler ve güncellemeler sağlanıyor.',
        image: 'https://placehold.co/1200x600/png?text=Task+App+Project',
        technologies: ['Node.js', 'Express', 'Socket.io', 'PostgreSQL', 'EJS']
    },
    '3': {
        title: 'Kişisel Blog',
        subtitle: 'Hızlı ve SEO Dostu İçerik Platformu',
        description: 'Next.js ve Static Site Generation (SSG) teknikleri kullanılarak hazırlanan bu blog, ultra hızlı sayfa yükleme süreleri ve mükemmel SEO performansı sunuyor. İçerikler Markdown dosyaları üzerinden kolayca yönetilebiliyor.',
        image: 'https://placehold.co/1200x600/png?text=Blog+Project',
        technologies: ['Next.js']
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
        res.status(404).send('Proje bulunamadı');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
