require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const { Resend } = require('resend');
const path = require('path');

const translations = require('./data/translations');
const projects = require('./data/projects');

const app = express();
const port = process.env.PORT || 3000;

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// i18n Middleware — dil seçimini çerezden oku, t() fonksiyonunu tüm view'lara aktar
app.use((req, res, next) => {
    const lang = req.cookies.lang === 'en' ? 'en' : 'tr';
    const t = (key) => (translations[lang] && translations[lang][key]) || translations['tr'][key] || key;
    res.locals.t = t;
    res.locals.lang = lang;
    next();
});

// Helper: Proje verisini mevcut dile göre çözümle
function resolveProject(rawProject, t) {
    return {
        title: t(rawProject.titleKey),
        subtitle: t(rawProject.subtitleKey),
        description: t(rawProject.detailDescKey),
        cardDesc: t(rawProject.cardDescKey),
        image: rawProject.image,
        cardImage: rawProject.cardImage,
        technologies: rawProject.technologies,
        liveUrl: rawProject.liveUrl,
        githubUrl: rawProject.githubUrl
    };
}

// Routes
app.get('/', (req, res) => {
    const t = res.locals.t;
    res.render('index', {
        page: 'home',
        projects: projects,
        meta: {
            title: t('metaTitle'),
            description: t('metaDesc'),
            ogImage: 'https://placehold.co/1200x630/png?text=Yuksel+Yilmaz+Portfolio',
            ogUrl: 'https://yukselyilmaz.com'
        }
    });
});

app.get('/project/:id', (req, res) => {
    const rawProject = projects[req.params.id];
    if (rawProject) {
        const t = res.locals.t;
        const project = resolveProject(rawProject, t);
        res.render('project-detail', {
            project: project,
            meta: {
                title: project.title + ' - Yüksel Yılmaz',
                description: project.description,
                ogImage: project.image,
                ogUrl: `https://yukselyilmaz.com/project/${req.params.id}`
            }
        });
    } else {
        res.status(404).render('404');
    }
});

// ===== İletişim Formu (Resend) =====
const resend = new Resend(process.env.RESEND_API_KEY);

app.post('/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ success: false, error: 'Tüm alanlar zorunludur.' });
    }
    try {
        const { data, error } = await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>', // Resend'in test domaini
            to: process.env.CONTACT_TO || 'yksel124@gmail.com', // Kendi e-posta adresiniz
            replyTo: email,
            subject: `Portfolio İletişim: ${subject}`,
            html: `<h3>Portfolio İletişim Formu</h3>
                   <p><strong>Ad:</strong> ${name}</p>
                   <p><strong>E-posta:</strong> ${email}</p>
                   <p><strong>Konu:</strong> ${subject}</p>
                   <hr><p>${message.replace(/\n/g, '<br>')}</p>`
        });

        if (error) {
            console.error('Resend API hatası:', error);
            return res.status(500).json({ success: false, error: `E-posta gönderilemedi: ${error.message}` });
        }

        res.json({ success: true });
    } catch (err) {
        console.error('Mail gönderim hatası:', err.message);
        res.status(500).json({ success: false, error: `E-posta gönderilemedi: ${err.message}` });
    }
});

// Dil değiştirme rotası
app.get('/set-lang/:lang', (req, res) => {
    const lang = req.params.lang === 'en' ? 'en' : 'tr';
    res.cookie('lang', lang, { maxAge: 365 * 24 * 60 * 60 * 1000, httpOnly: false });
    res.redirect('back');
});

// 404
app.use((req, res) => {
    res.status(404).render('404', {
        meta: {
            title: '404 - Yüksel Yılmaz',
            description: '',
            ogImage: '',
            ogUrl: ''
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log(`RESEND_API_KEY: ${process.env.RESEND_API_KEY ? '✓ set' : '✗ MISSING'}`);
    console.log(`CONTACT_TO: ${process.env.CONTACT_TO ? '✓ set' : '✗ MISSING'}`);
});
