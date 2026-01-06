// Translation system for smileworld website
const translations = {
    en: {
        "nav-home": "Home",
        "nav-about": "About",
        "nav-journey": "Journey",
        "nav-shop": "Shop",
        "nav-memorial": "Memorial",
        "hero-title": "smileworld",
        "hero-subtitle": "Where fun meets a friendly world",
        "hero-description": "smileworld is a Minecraft server focused on fair play, friendly community, and stable gameplay. Join us and enjoy your time.",
        "hero-cta": "Go to Shop",
        "shop-title": "Donate to smileworld Server",
        "server-info": "Server Information",
        "server-ip": "IP Address:",
        "server-status": "Status:",
        "server-version": "Minecraft 1.16.5",
        "server-features": "Why Choose Our Server?",
        "server-admin-title": "Professional Team",
        "server-admin-desc": "Our administration is always ready to help. Experienced moderators ensure a comfortable game.",
        "server-anticheat-title": "Fair Play Without Cheats",
        "server-anticheat-desc": "Zero tolerance for cheaters. Powerful anti-cheat system protects the server.",
        "server-community-title": "Friendly Community",
        "server-community-desc": "New players are always welcome. Make friends and enjoy the game together.",
        "server-online-title": "Stable Online 24/7",
        "server-online-desc": "The server runs around the clock without interruptions.",
        "donation-prices": "Donation Prices:",
        "special-offers": "Special Offers:",
        "purchase-info": "Purchase on site:",
        "disclaimer": "* All purchases are processed automatically.",
        "tier-hero-desc": "Basic donation rank",
        "tier-titan-desc": "Enhanced donation rank",
        "tier-avenger-desc": "Powerful donation rank",
        "tier-overlord-desc": "Server overlord",
        "tier-master-desc": "Game magister",
        "tier-imperator-desc": "Server imperator",
        "tier-dragon-desc": "Server dragon",
        "tier-dhelp-desc": "Dragon helper",
        "tier-cobra-desc": "Server cobra",
        "tier-god-desc": "Server god",
        "purchase-btn": "Buy",
        "footer-copyright": "© 2026 smileworld. All rights reserved.",
        "footer-privacy": "Privacy",
        "footer-support": "Support",
        "footer-contact": "Contact"
    },

    ru: {
        "nav-home": "Главная",
        "nav-about": "О нас",
        "nav-journey": "Путь",
        "nav-shop": "Магазин",
        "nav-memorial": "Мемориал",
        "hero-title": "smileworld",
        "hero-subtitle": "Лучший Minecraft сервер для комфортной игры",
        "hero-description": "smileworld — это сервер с честной игрой, дружелюбным сообществом и стабильной работой 24/7.",
        "hero-cta": "Перейти в магазин",
        "shop-title": "Донат на сервере smileworld",
        "server-info": "Информация о сервере",
        "server-ip": "IP Адрес:",
        "server-status": "Статус:",
        "server-version": "Версия:",
        "server-features": "Почему выбирают наш сервер?",
        "server-admin-title": "Профессиональная команда",
        "server-admin-desc": "Администрация всегда готова помочь игрокам.",
        "server-anticheat-title": "Честная игра без читов",
        "server-anticheat-desc": "Мощная анти-чит система и нулевая терпимость.",
        "server-community-title": "Дружелюбное сообщество",
        "server-community-desc": "Новички всегда найдут поддержку и друзей.",
        "server-online-title": "Стабильный онлайн 24/7",
        "server-online-desc": "Сервер работает без перерывов.",
        "donation-prices": "Цены на донат:",
        "special-offers": "Специальные предложения:",
        "purchase-info": "Покупка на сайте:",
        "disclaimer": "* Все покупки обрабатываются автоматически.",
        "tier-hero-desc": "Базовый донат ранг",
        "tier-titan-desc": "Улучшенный донат ранг",
        "tier-avenger-desc": "Мощный донат ранг",
        "tier-overlord-desc": "Владыка сервера",
        "tier-master-desc": "Мастер игры",
        "tier-imperator-desc": "Император сервера",
        "tier-dragon-desc": "Дракон сервера",
        "tier-dhelp-desc": "Помощник дракона",
        "tier-cobra-desc": "Кобра сервера",
        "tier-god-desc": "Бог сервера",
        "purchase-btn": "Купить",
        "footer-copyright": "© 2026 smileworld. Все права защищены.",
        "footer-privacy": "Конфиденциальность",
        "footer-support": "Поддержка",
        "footer-contact": "Контакты"
    },

    zh: {
        "nav-home": "首页",
        "nav-shop": "商店",
        "hero-title": "smileworld",
        "hero-subtitle": "友好的 Minecraft 服务器",
        "hero-description": "smileworld 是一个公平、稳定、友好的 Minecraft 服务器。",
        "hero-cta": "前往商店",
        "shop-title": "smileworld 服务器捐赠",
        "purchase-btn": "购买",
        "footer-copyright": "© 2026 smileworld"
    },

    uk: {
        "nav-home": "Головна",
        "nav-shop": "Магазин",
        "hero-title": "smileworld",
        "hero-subtitle": "Комфортний Minecraft сервер",
        "hero-description": "smileworld — чесна гра, стабільна робота та дружнє ком'юніті.",
        "hero-cta": "Перейти до магазину",
        "shop-title": "Донат на сервері smileworld",
        "purchase-btn": "Купити",
        "footer-copyright": "© 2026 smileworld"
    }
};

// Current language
let currentLanguage = localStorage.getItem('language') || 'ru';

// Change language
function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);

    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    changeLanguage(currentLanguage);
});
