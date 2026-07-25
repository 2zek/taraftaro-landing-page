/* =============================================
   TARAFTARO — LIGHTWEIGHT i18n ENGINE
   Zero dependencies · TR / EN
   Auto-detects locale → falls back to EN
   Persists choice in localStorage
   ============================================= */

const I18N = (() => {

  /* ─────────────────────────────────────────────
     TRANSLATIONS
  ───────────────────────────────────────────── */
  const translations = {

    /* ══════════════════════════════════════════
       TURKISH
    ══════════════════════════════════════════ */
    tr: {

      /* ── Meta ── */
      'meta.title':       'Taraftaro | Kulüp ve Taraftar Ekosistemi — Tüm Branşlar Tek Dijital Kimlikte',
      'meta.description': 'Kulübünle taraftar arasındaki dijital köprü. Futbol, basketbol, voleybol ve tüm branşlarda canlı tribün coşkusu, maç içi mikro-tahminler ve doğrulanmış taraftar topluluğu.',

      /* ── Navbar ── */
      'nav.why_us':       'Neden Biz?',
      'nav.how_it_works': 'Nasıl Çalışır?',
      'nav.features':     'Özellikler',
      'nav.faq':          'S.S.S.',
      'nav.contact':      'İletişim',
      'nav.download':     'Ücretsiz İndir',
      'nav.aria':         'Ana navigasyon',
      'nav.mobile_aria':  'Mobil menü',
      'nav.logo_aria':    'Taraftaro ana sayfa',
      'nav.menu_aria':    'Menüyü aç/kapat',

      /* ── Hero ── */
      'hero.title':           'Tek Dijital Kimlik –',
      'hero.title_gradient':  'Tüm Sporlar, Tek Topluluk',
      'hero.desc':            'Futbol, basketbol, voleybol ve daha fazlası. <strong>Gerçek taraftar sesleri</strong>, <strong>%100 doğrulanmış anketler</strong> ve <strong>canlı tribün</strong> ile maçları anbean yaşa. Dünyanın dört bir yanındaki fanları tek platformda birleştiriyoruz.',
      'hero.cta_primary':     'Hemen Ücretsiz İndir',
      'hero.cta_secondary':   'Nasıl Çalışır?',
      'hero.stat1_val':       'Tek Dijital Kimlik',
      'hero.stat1_label':     'Tüm branşlarda kulübünün yanındasın',
      'hero.stat2_val':       '%100 Doğrulanmış',
      'hero.stat2_label':     'Gerçek taraftar sesi & resmi anketler',
      'hero.stat3_val':       'Canlı Tribün',
      'hero.stat3_label':     'Maç anında anlık reaksiyon & etkileşim',
      'hero.mockup_alt':      'Taraftaro uygulama ekranı',

      /* ── Comparison ── */
      'cmp.label':            'Farkımız Ne?',
      'cmp.title':            'Klasik Skor Siteleri',
      'cmp.title_vs':         'vs.',
      'cmp.desc':             'Pasif izleyici olmayın. Tek bir dijital kimlikle tüm sporlarda her maç gününü yaşayın.',
      'cmp.th_experience':    'Deneyim',
      'cmp.th_classic':       'Klasik Skor Siteleri',
      'cmp.th_social':        'Sosyal Medya (Twitter/X)',
      'cmp.th_taraftaro':     'TARAFTARO',

      'cmp.f1_name':          'Tüm Branşlar (Futbol, Basketbol vb.) Tek Kimlikte',
      'cmp.f1_classic':       'Dağınık',
      'cmp.f1_social':        'Karışık',
      'cmp.f1_brand':         'Tek Dijital Kimlik',

      'cmp.f2_name':          'Maç Anında Canlı Tepki (Alkış / Islık / Coşku)',
      'cmp.f2_classic':       'Sadece skora bakarsın',
      'cmp.f2_social':        'Kavga ve trol dolu',
      'cmp.f2_brand':         'Dijital Tribün Coşkusu',

      'cmp.f3_name':          'Kendi İdeal 11\'ini / Kadronu Kurup Paylaşmak',
      'cmp.f3_classic':       'Yok',
      'cmp.f3_social':        'Zor ve meşakkatli',
      'cmp.f3_brand':         'Saha Üzerinde Tek Tıkla',

      'cmp.f4_name':          'Maç İçi Anlık Mikro-Tahminler Yapmak',
      'cmp.f4_classic':       'Yok',
      'cmp.f4_social':        'Yok',
      'cmp.f4_brand':         'Anlık Canlı Görevler',

      'cmp.f5_name':          'Maç Sonu Oyuncuları ve Teknik Heyeti Notlamak',
      'cmp.f5_classic':       'Yok',
      'cmp.f5_social':        'Botlar notu bozar',
      'cmp.f5_brand':         'Taraftar İndeksi',

      'cmp.f6_name':          'Takımının Rengiyle Uygulama Kullanmak (ClubTheme)',
      'cmp.f6_classic':       'Herkes aynı soğuk ekranda',
      'cmp.f6_social':        'Karışık ve kaotik',
      'cmp.f6_brand':         'Tamamen Senin Takımın',

      'cmp.f7_name':          'Kayıt Olmadan Hemen Maça Katılmak (Misafir Modu)',
      'cmp.f7_classic':       'Var',
      'cmp.f7_social':        'Üyelik Şart',
      'cmp.f7_brand':         'Misafir Olarak Anında Gir',

      /* Mobile comparison cards */
      'cmp.m_f1_title':       'Tüm Branşlar (Futbol, Basketbol vb.) Tek Kimlikte',
      'cmp.m_f1_brand':       'Tek Dijital Kimlik',
      'cmp.m_f1_classic':     'Dağınık',
      'cmp.m_f1_social':      'Karışık',

      'cmp.m_f2_title':       'Maç Anında Canlı Tepki (Alkış / Islık / Coşku)',
      'cmp.m_f2_brand':       'Dijital Tribün Coşkusu',
      'cmp.m_f2_classic':     'Sadece Skor',
      'cmp.m_f2_social':      'Kaos ve Trol',

      'cmp.m_f3_title':       'Kendi İdeal Kadronu Kurup Oylatmak',
      'cmp.m_f3_brand':       'Saha Üzerinde Tek Tıkla',
      'cmp.m_f3_classic':     'Yok',
      'cmp.m_f3_social':      'Meşakkatli',

      'cmp.m_f4_title':       'Maç İçi Anlık Canlı Tahminler',
      'cmp.m_f4_brand':       'Anlık Canlı Görevler',
      'cmp.m_f4_classic':     'Yok',
      'cmp.m_f4_social':      'Yok',

      'cmp.m_f5_title':       'Oyuncuları ve Hoca Kararlarını Notlamak',
      'cmp.m_f5_brand':       'Taraftar İndeksi',
      'cmp.m_f5_classic':     'Yok',
      'cmp.m_f5_social':      'Botlar Bozar',

      'cmp.m_f6_title':       'Takımının Rengi ve Temasıyla Kullanmak',
      'cmp.m_f6_brand':       'Tamamen Senin Takımın',
      'cmp.m_f6_classic':     'Soğuk Standart',
      'cmp.m_f6_social':      'Karışık',

      /* ── How it Works ── */
      'hiw.label':      'Nasıl Çalışır?',
      'hiw.title':      '3 Adımda',
      'hiw.title_grad': 'Spor & Kulüp Ekosistemi',
      'hiw.desc':       'Kayıt şartı olmadan gir, kulübünü seç ve maç coşkusunu anında paylaş.',

      'hiw.step1_title': 'Kulübünü Seç (ClubTheme)',
      'hiw.step1_desc':  'Fenerbahçe, Galatasaray, Beşiktaş, Trabzonspor... Takımını seçtiğinde tüm branş haberleri, renkler ve arayüz doğrudan kulübüne bürünür.',

      'hiw.step2_title': 'Dijital Tribünde Coş',
      'hiw.step2_desc':  'Tüm branşlardaki canlı maç anında binlerce taraftarla eş zamanlı alkış, tezahürat ve ıslık butonlarıyla stadyum ve salon enerjisini ekranına taşı.',

      'hiw.step3_title': 'Spor Zekanı Göster',
      'hiw.step3_desc':  'Maç içi mikro-tahminleri bil, oyuncuları notla. Futbol ve spor zekası karneni Instagram\'da arkadaşlarına paylaşarak rozetler kazan.',

      /* ── Features ── */
      'feat.label':      'Özellikler',
      'feat.title':      'Kulübünün Tüm Branşlarında',
      'feat.title_grad': 'Etkileşimli Ekosistem',
      'feat.desc':       'Taraftaro sadece skor vermez; seni maça ve kulübüne bağlayan benzersiz interaktif modüller sunar.',

      'feat.f1_title': 'Dijital Tribün',
      'feat.f1_tag':   'Canlı Coşku',
      'feat.f1_desc':  'Futboldan basketbola canlı maç esnasında binlerce taraftarla eş zamanlı tezahürat yap, alkışla ve tribün barını yükselt.',

      'feat.f2_title': 'Taraftarın 11\'i & Kadrolar',
      'feat.f2_desc':  'Saha ve salon üzerinde ideal kadronu ve taktiğini oluştur, oylamaya sunarak XP ve Sadakat Puanı (SP) kazan.',

      'feat.f3_title': 'Canlı Mikro-Tahminler',
      'feat.f3_desc':  'Maç anında ekrana düşen \'Frikik gol olur mu?\', \'Üçlük girer mi?\' gibi anlık canlı görevleri bildikçe ödülleri topla.',

      'feat.f4_title': 'Taraftar İndeksi & Barometre',
      'feat.f4_desc':  'Maç sonu oyuncuları ve teknik heyeti 1-10 arası puanla, taraftar kamuoyunu kulübün ve medyanın referansına dönüştür.',

      'feat.f5_title': 'Kulübe Özel Güvenli Akış',
      'feat.f5_tag':   'Safe Space',
      'feat.f5_desc':  'Trol ve botlardan arındırılmış, sadece kendi kulübünün haberleri ve doğrulanmış renktaşlarıyla seviyeli taraftar alanı.',

      'feat.f6_title': 'Doğrulanmış Kulüp Anketleri',
      'feat.f6_tag':   'Doğrulanmış',
      'feat.f6_desc':  'Forma, transfer ve yönetim kararlarında rakip taraftarların sabote edemediği, sadece gerçek taraftarların oy hakkı olduğu altyapı.',

      'feat.phone_alt': 'Taraftaro Uygulama Ekranı',

      /* ── Showcase ── */
      'sc.label':      'Uygulama Ekranları',
      'sc.title':      'Taraftaro Ekosistemini',
      'sc.title_grad': 'Keşfet & Yaşa',
      'sc.desc':       'Tüm branşlarda canlı maç akışı, taraftar indeksi ve mikro-tahmin ekranları parmaklarının ucunda.',
      'sc.prev_aria':  'Önceki ekran',
      'sc.next_aria':  'Sonraki ekran',
      'sc.dots_aria':  'Ekran navigasyonu',

      'sc.slide0_caption':  'Gecikmesiz Canlı Maç Akışı — Canlı skorlar, zaman tüneli olayları ve anlık istatistikler.',
      'sc.slide1_caption':  'Taraftar İndeksi & Notlama Karnesi — Maç sonu oyuncuları ve teknik heyeti değerlendir.',
      'sc.slide2_caption':  'Taraftarın 11\'i & Taktik Diziliş — Saha ve salon üzerinde kendi kadronu kur ve paylaş.',
      'sc.slide3_caption':  'Dijital Tribün Coşkusu — Gol, smaç ve kritik anlarda binlerce taraftarla eş zamanlı alkışla.',
      'sc.slide4_caption':  'Safe Space & Doğrulanmış Anketler — Bot ve trollerden arındırılmış kulübe özel alan.',

      'sc.dot0_aria': 'Canlı Maç Akışı',
      'sc.dot1_aria': 'Taraftar İndeksi',
      'sc.dot2_aria': 'Taraftarın 11i',
      'sc.dot3_aria': 'Dijital Tribün',
      'sc.dot4_aria': 'Safe Space',

      /* ── FAQ ── */
      'faq.label':      'Merak Edilenler',
      'faq.title':      'Sıkça Sorulan',
      'faq.title_grad': 'Sorular',

      'faq.q1': 'Taraftaro sadece futbol için mi?',
      'faq.a1': 'Hayır! Taraftaro kulüplerin tüm branşlarını (Futbol, Basketbol, Voleybol vb.) ve altyapı akademilerini tek bir dijital taraftar kimliğinde birleştiren bütünsel bir spor platformudur.',

      'faq.q2': 'Uygulamayı kullanmak için kayıt şart mı?',
      'faq.a2': 'Hayır! Kayıtsız Giriş modu sayesinde hiçbir form doldurmadan anında uygulamayı açabilir, maç skoru takip edebilir, canlı sohbete katılabilir ve tahmin yapabilirsin. Puanların cihazına tanımlanır, dilediğinde ücretsiz hesabına aktarılır.',

      'faq.q3': 'Dijital Tribün\'de canlı tepki nasıl verilir?',
      'faq.a3': 'Canlı maç anında tezahürat, alkış ve ıslık butonlarıyla tüm taraftarlar aynı anda reaksiyon verir. Tribün gücü barı canlı olarak yükselir ve combo patlamaları oluşur.',

      'faq.q4': 'Taraftar İndeksi spor medyasında nasıl kullanılıyor?',
      'faq.a4': 'Maç sonlarında taraftarların verdiği oyuncu puanları ve teknik direktör güven oranları toplanarak kulübün gerçek nabzı ölçülür; spor yorumcuları ve TV yayınları için resmi referans veri oluşturur.',

      'faq.q5': 'Rakip troller ve botlar anketleri sabote edebilir mi?',
      'faq.a5': 'Hayır! Taraftaro\'nun doğrulanmış kulüp anket altyapısı sayesinde anketlerde sadece ilgili kulübün aktif ve doğrulanmış taraftarları oy kullanabilir.',

      'faq.q6': 'Kazanılan XP ve Sadakat Puanları (SP) ne işe yarar?',
      'faq.a6': 'Yaptığın doğru tahminler ve katıldığın anketlerle seviye atlar, profil unvanları (\'Maçın Kahini\', \'Taktik Dehası\') ve kilitli özellik erişimleri (Seviye 5+ Dijital Tribün oda erişimi) kazanırsın.',

      /* ── Download / CTA ── */
      'dl.label':      'Sıfır Kayıt Zorunluluğu',
      'dl.title':      'Kulübünün Maç Günlerini Kaçırma.',
      'dl.desc':       'Misafir girişiyle tek tıkla katılabileceğin kulüp ve taraftar ekosistemi uygulamasını hemen ücretsiz indir.',
      'dl.appstore':   'App Store\'dan',
      'dl.appstore_btn': 'İndir',
      'dl.appstore_aria': 'App Store\'dan indir',
      'dl.googleplay': 'Google Play\'den',
      'dl.googleplay_btn': 'İndir',
      'dl.googleplay_aria': 'Google Play\'den indir',

      /* ── Contact ── */
      'ct.title':       'Bize',
      'ct.title_grad':  'Ulaşın',
      'ct.desc':        'Sorularınız, iş birliği teklifleriniz veya geri bildirimleriniz için doğrudan mesajınızı iletin.',
      'ct.label_name':  'Ad Soyad',
      'ct.ph_name':     'Ahmet Yılmaz',
      'ct.label_email': 'E-posta',
      'ct.ph_email':    'ahmet@email.com',
      'ct.label_subject': 'Konu',
      'ct.ph_subject':  'Nasıl yardımcı olabiliriz?',
      'ct.label_msg':   'Mesajınız',
      'ct.ph_msg':      'Mesajınızı buraya yazın...',
      'ct.submit':      'Mesajı Gönder',
      'ct.success':     'Mesajınız alındı, en kısa sürede geri döneceğiz.',

      /* ── Footer ── */
      'ft.tagline':     'Kulüp ve taraftar arasındaki dijital köprü.\nDijital tribünde yerini al.',
      'ft.follow_us':   'Bizi Takip Edin',
      'ft.logo_aria':   'Taraftaro ana sayfa',
      'ft.nav_aria':    'Footer navigasyonu',
      'ft.col_app':     'Uygulama',
      'ft.app_why':     'Neden Biz?',
      'ft.app_how':     'Nasıl Çalışır?',
      'ft.app_feat':    'Özellikler',
      'ft.app_screens': 'Ekranlar',
      'ft.app_dl':      'İndir',
      'ft.col_support': 'Destek',
      'ft.col_contact': 'İletişim',
      'ft.sup_faq':     'S.S.S.',
      'ft.sup_contact': 'İletişim',
      'ft.sup_email':   'E-posta',
      'ft.phone':       '+90 (537) 376 9304',
      'ft.address':     'İstanbul, Türkiye',
      'ft.privacy':     'Gizlilik Politikası',
      'ft.terms':       'Kullanım Şartları',
      'ft.user_agreement': 'Kullanıcı Sözleşmesi',
      'ft.copyright':   'tarafından geliştirildi. Tüm hakları saklıdır.',

      /* ── Lang switcher ── */
      'lang.tr': 'Türkçe',
      'lang.en': 'English',
    },

    /* ══════════════════════════════════════════
       ENGLISH
    ══════════════════════════════════════════ */
    en: {

      /* ── Meta ── */
      'meta.title':       'Taraftaro | Club & Fan Ecosystem — All Sports, One Digital Identity',
      'meta.description': 'The digital bridge between clubs and fans. Live stadium energy, in-match micro-predictions, and verified fan community across football, basketball, volleyball, and more.',

      /* ── Navbar ── */
      'nav.why_us':       'Why Us?',
      'nav.how_it_works': 'How It Works',
      'nav.features':     'Features',
      'nav.faq':          'FAQ',
      'nav.contact':      'Contact',
      'nav.download':     'Download Free',
      'nav.aria':         'Main navigation',
      'nav.mobile_aria':  'Mobile menu',
      'nav.logo_aria':    'Taraftaro home',
      'nav.menu_aria':    'Toggle menu',

      /* ── Hero ── */
      'hero.title':           'One Digital Identity –',
      'hero.title_gradient':  'All Sports, One Community',
      'hero.desc':            'Football, basketball, volleyball and more. <strong>Real fan voices</strong>, <strong>100% verified polls</strong> and a <strong>live digital stand</strong> — experience every moment of every match. We unite fans from around the world on one platform.',
      'hero.cta_primary':     'Download Free Now',
      'hero.cta_secondary':   'How It Works',
      'hero.stat1_val':       'One Digital Identity',
      'hero.stat1_label':     'Stand by your club across all sports',
      'hero.stat2_val':       '100% Verified',
      'hero.stat2_label':     'Real fan voice & official polls',
      'hero.stat3_val':       'Live Stand',
      'hero.stat3_label':     'Instant reactions & interactions during matches',
      'hero.mockup_alt':      'Taraftaro app screen',

      /* ── Comparison ── */
      'cmp.label':            'What Sets Us Apart?',
      'cmp.title':            'Classic Score Sites',
      'cmp.title_vs':         'vs.',
      'cmp.desc':             'Don\'t be a passive viewer. Experience every match day across all sports with a single digital identity.',
      'cmp.th_experience':    'Experience',
      'cmp.th_classic':       'Classic Score Sites',
      'cmp.th_social':        'Social Media (Twitter/X)',
      'cmp.th_taraftaro':     'TARAFTARO',

      'cmp.f1_name':          'All Sports (Football, Basketball, etc.) Under One Identity',
      'cmp.f1_classic':       'Scattered',
      'cmp.f1_social':        'Chaotic',
      'cmp.f1_brand':         'One Digital Identity',

      'cmp.f2_name':          'Live Reactions During Matches (Cheer / Boo / Hype)',
      'cmp.f2_classic':       'Just scores',
      'cmp.f2_social':        'Full of fights & trolls',
      'cmp.f2_brand':         'Digital Stand Energy',

      'cmp.f3_name':          'Build & Share Your Ideal XI / Squad',
      'cmp.f3_classic':       'Not available',
      'cmp.f3_social':        'Hard and tedious',
      'cmp.f3_brand':         'One Tap on the Pitch',

      'cmp.f4_name':          'In-Match Instant Micro-Predictions',
      'cmp.f4_classic':       'Not available',
      'cmp.f4_social':        'Not available',
      'cmp.f4_brand':         'Live Real-Time Challenges',

      'cmp.f5_name':          'Rate Players & Coaching Staff After Matches',
      'cmp.f5_classic':       'Not available',
      'cmp.f5_social':        'Bots skew results',
      'cmp.f5_brand':         'Fan Index',

      'cmp.f6_name':          'Use the App in Your Team\'s Colors (ClubTheme)',
      'cmp.f6_classic':       'Same cold screen for everyone',
      'cmp.f6_social':        'Chaotic and messy',
      'cmp.f6_brand':         'Fully Your Team',

      'cmp.f7_name':          'Join Matches Instantly Without Registration (Guest Mode)',
      'cmp.f7_classic':       'Available',
      'cmp.f7_social':        'Membership required',
      'cmp.f7_brand':         'Instant Guest Entry',

      /* Mobile comparison cards */
      'cmp.m_f1_title':   'All Sports Under One Identity',
      'cmp.m_f1_brand':   'One Digital Identity',
      'cmp.m_f1_classic': 'Scattered',
      'cmp.m_f1_social':  'Chaotic',

      'cmp.m_f2_title':   'Live Reactions During Matches',
      'cmp.m_f2_brand':   'Digital Stand Energy',
      'cmp.m_f2_classic': 'Scores Only',
      'cmp.m_f2_social':  'Chaos & Trolls',

      'cmp.m_f3_title':   'Build & Share Your Ideal Squad',
      'cmp.m_f3_brand':   'One Tap on the Pitch',
      'cmp.m_f3_classic': 'Not available',
      'cmp.m_f3_social':  'Tedious',

      'cmp.m_f4_title':   'In-Match Live Micro-Predictions',
      'cmp.m_f4_brand':   'Live Real-Time Challenges',
      'cmp.m_f4_classic': 'Not available',
      'cmp.m_f4_social':  'Not available',

      'cmp.m_f5_title':   'Rate Players & Coaching Decisions',
      'cmp.m_f5_brand':   'Fan Index',
      'cmp.m_f5_classic': 'Not available',
      'cmp.m_f5_social':  'Bots Skew It',

      'cmp.m_f6_title':   'Use Your Team\'s Colors & Theme',
      'cmp.m_f6_brand':   'Fully Your Team',
      'cmp.m_f6_classic': 'Cold Standard',
      'cmp.m_f6_social':  'Chaotic',

      /* ── How it Works ── */
      'hiw.label':      'How It Works',
      'hiw.title':      'In 3 Steps',
      'hiw.title_grad': 'Sport & Club Ecosystem',
      'hiw.desc':       'Jump in without registration, pick your club, and share the excitement instantly.',

      'hiw.step1_title': 'Pick Your Club (ClubTheme)',
      'hiw.step1_desc':  'Fenerbahçe, Galatasaray, Beşiktaş, Trabzonspor... Once you choose your team, all branch news, colours and interface transform into your club\'s identity.',

      'hiw.step2_title': 'Roar in the Digital Stand',
      'hiw.step2_desc':  'During live matches across all sports, sync chants, cheers and boos with thousands of fans simultaneously — bring stadium energy straight to your screen.',

      'hiw.step3_title': 'Show Your Sports IQ',
      'hiw.step3_desc':  'Nail in-match micro-predictions, rate players. Share your football & sports IQ card with friends on Instagram and earn badges.',

      /* ── Features ── */
      'feat.label':      'Features',
      'feat.title':      'Across All Your Club\'s Sports',
      'feat.title_grad': 'Interactive Ecosystem',
      'feat.desc':       'Taraftaro doesn\'t just show scores — it offers unique interactive modules that connect you to the match and your club.',

      'feat.f1_title': 'Digital Stand',
      'feat.f1_tag':   'Live Energy',
      'feat.f1_desc':  'From football to basketball, sync chants, cheers and boos with thousands of fans in real time and raise the stand power bar.',

      'feat.f2_title': 'Fan XI & Squads',
      'feat.f2_desc':  'Build your ideal squad and tactics on the pitch or court, put it to a vote, and earn XP and Loyalty Points (LP).',

      'feat.f3_title': 'Live Micro-Predictions',
      'feat.f3_desc':  'Collect rewards by answering real-time in-match challenges like \'Will the free kick go in?\' or \'Will the triple land?\'',

      'feat.f4_title': 'Fan Index & Barometer',
      'feat.f4_desc':  'Rate players and coaching staff 1–10 after each match, turning fan sentiment into official reference data for clubs and media.',

      'feat.f5_title': 'Club-Exclusive Safe Feed',
      'feat.f5_tag':   'Safe Space',
      'feat.f5_desc':  'A clean fan space free from trolls and bots — only your club\'s news and verified supporters of the same colours.',

      'feat.f6_title': 'Verified Club Polls',
      'feat.f6_tag':   'Verified',
      'feat.f6_desc':  'Infrastructure that prevents rival fans from sabotaging — only active, verified supporters of the relevant club can vote.',

      'feat.phone_alt': 'Taraftaro App Screen',

      /* ── Showcase ── */
      'sc.label':      'App Screens',
      'sc.title':      'Explore & Experience',
      'sc.title_grad': 'the Taraftaro Ecosystem',
      'sc.desc':       'Live match feeds, fan index and micro-prediction screens for all sports — right at your fingertips.',
      'sc.prev_aria':  'Previous screen',
      'sc.next_aria':  'Next screen',
      'sc.dots_aria':  'Screen navigation',

      'sc.slide0_caption': 'Real-Time Live Match Feed — Live scores, timeline events and instant stats.',
      'sc.slide1_caption': 'Fan Index & Rating Report — Evaluate players and coaching staff after the match.',
      'sc.slide2_caption': 'Fan XI & Tactical Formation — Build and share your own squad on the pitch or court.',
      'sc.slide3_caption': 'Digital Stand Energy — Cheer simultaneously with thousands of fans on goals and key moments.',
      'sc.slide4_caption': 'Safe Space & Verified Polls — A club-exclusive space free from bots and trolls.',

      'sc.dot0_aria': 'Live Match Feed',
      'sc.dot1_aria': 'Fan Index',
      'sc.dot2_aria': 'Fan XI',
      'sc.dot3_aria': 'Digital Stand',
      'sc.dot4_aria': 'Safe Space',

      /* ── FAQ ── */
      'faq.label':      'Got Questions?',
      'faq.title':      'Frequently Asked',
      'faq.title_grad': 'Questions',

      'faq.q1': 'Is Taraftaro only for football?',
      'faq.a1': 'No! Taraftaro is a holistic sports platform that unites all of a club\'s branches (Football, Basketball, Volleyball, etc.) and youth academies under one digital fan identity.',

      'faq.q2': 'Do I need to register to use the app?',
      'faq.a2': 'No! With Guest Mode, you can open the app instantly without filling in any form, follow live scores, join live chat, and make predictions. Your points are tied to your device and can be transferred to a free account whenever you like.',

      'faq.q3': 'How do I react live in the Digital Stand?',
      'faq.a3': 'During a live match, all fans react at the same time using chant, cheer and boo buttons. The Stand Power bar rises in real time and combo explosions are triggered.',

      'faq.q4': 'How is the Fan Index used in sports media?',
      'faq.a4': 'Player ratings and manager confidence scores collected after matches are aggregated to measure the club\'s real pulse, creating official reference data for sports commentators and TV broadcasts.',

      'faq.q5': 'Can rival trolls and bots sabotage the polls?',
      'faq.a5': 'No! Thanks to Taraftaro\'s verified club poll infrastructure, only active and verified fans of the relevant club can vote in polls.',

      'faq.q6': 'What are XP and Loyalty Points (LP) used for?',
      'faq.a6': 'Level up with correct predictions and poll participation to earn profile titles (\'Match Oracle\', \'Tactical Genius\') and unlock premium features (Level 5+ Digital Stand room access).',

      /* ── Download / CTA ── */
      'dl.label':           'Zero Registration Required',
      'dl.title':           'Don\'t Miss Your Club\'s Match Days.',
      'dl.desc':            'Download the club and fan ecosystem app for free right now — join instantly with guest login.',
      'dl.appstore':        'Download on the',
      'dl.appstore_btn':    'App Store',
      'dl.appstore_aria':   'Download on the App Store',
      'dl.googleplay':      'Get it on',
      'dl.googleplay_btn':  'Google Play',
      'dl.googleplay_aria': 'Get it on Google Play',

      /* ── Contact ── */
      'ct.title':         'Get in',
      'ct.title_grad':    'Touch',
      'ct.desc':          'Send us a message for your questions, partnership proposals, or feedback.',
      'ct.label_name':    'Full Name',
      'ct.ph_name':       'John Smith',
      'ct.label_email':   'Email',
      'ct.ph_email':      'john@email.com',
      'ct.label_subject': 'Subject',
      'ct.ph_subject':    'How can we help?',
      'ct.label_msg':     'Your Message',
      'ct.ph_msg':        'Write your message here...',
      'ct.submit':        'Send Message',
      'ct.success':       'Your message has been received. We\'ll get back to you shortly.',

      /* ── Footer ── */
      'ft.tagline':     'The digital bridge between clubs and fans.\nTake your place in the digital stand.',
      'ft.follow_us':   'Follow Us',
      'ft.logo_aria':   'Taraftaro home',
      'ft.nav_aria':    'Footer navigation',
      'ft.col_app':     'App',
      'ft.app_why':     'Why Us?',
      'ft.app_how':     'How It Works',
      'ft.app_feat':    'Features',
      'ft.app_screens': 'Screens',
      'ft.app_dl':      'Download',
      'ft.col_support': 'Support',
      'ft.col_contact': 'Contact',
      'ft.sup_faq':     'FAQ',
      'ft.sup_contact': 'Contact',
      'ft.sup_email':   'Email',
      'ft.phone':       '+90 (537) 376 9304',
      'ft.address':     'Istanbul, Turkey',
      'ft.privacy':     'Privacy Policy',
      'ft.terms':       'Terms of Use',
      'ft.user_agreement': 'User Agreement',
      'ft.copyright':   'developed by. All rights reserved.',

      /* ── Lang switcher ── */
      'lang.tr': 'Türkçe',
      'lang.en': 'English',
    },
  };

  /* ─────────────────────────────────────────────
     LOCALE DETECTION
     Priority: localStorage → browser locale → geo (IP)
     TR country code → 'tr', everything else → 'en'
  ───────────────────────────────────────────── */
  const SUPPORTED = ['tr', 'en'];
  const STORAGE_KEY = 'taraftaro_lang';

  function detectBrowserLang() {
    const raw = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
    // Accept 'tr', 'tr-TR', 'tr-CY' etc.
    const code = raw.split('-')[0];
    return SUPPORTED.includes(code) ? code : 'en';
  }

  async function detectGeoLang() {
    try {
      // Using a lightweight, free, no-key API
      const res = await fetch('https://ipapi.co/country_code/', { cache: 'force-cache' });
      if (!res.ok) return detectBrowserLang();
      const country = (await res.text()).trim().toUpperCase();
      return country === 'TR' ? 'tr' : 'en';
    } catch {
      return detectBrowserLang();
    }
  }

  async function resolveInitialLang() {
    // 1. Explicit user choice wins
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED.includes(saved)) return saved;

    // 2. Browser locale (instant)
    const browserLang = detectBrowserLang();

    // 3. If browser says TR, trust it immediately
    if (browserLang === 'tr') return 'tr';

    // 4. Otherwise try geo detection to catch TR users with EN browser
    const geoLang = await detectGeoLang();
    return geoLang;
  }

  /* ─────────────────────────────────────────────
     TRANSLATE
  ───────────────────────────────────────────── */
  function t(lang, key) {
    return (translations[lang] && translations[lang][key]) ?? key;
  }

  /* ─────────────────────────────────────────────
     APPLY LANGUAGE TO DOM
  ───────────────────────────────────────────── */
  function applyLang(lang) {
    const dict = translations[lang];
    if (!dict) return;

    // textContent keys
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (dict[key] !== undefined) {
        // Allow simple HTML in translations (for <strong> tags in hero desc)
        if (el.dataset.i18nHtml !== undefined) {
          el.innerHTML = dict[key];
        } else {
          el.textContent = dict[key];
        }
      }
    });

    // placeholder keys
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const key = el.dataset.i18nPh;
      if (dict[key] !== undefined) el.placeholder = dict[key];
    });

    // aria-label keys
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const key = el.dataset.i18nAria;
      if (dict[key] !== undefined) el.setAttribute('aria-label', dict[key]);
    });

    // data-caption keys (showcase slides)
    document.querySelectorAll('[data-i18n-caption]').forEach(el => {
      const key = el.dataset.i18nCaption;
      if (dict[key] !== undefined) el.dataset.caption = dict[key];
    });

    // alt keys
    document.querySelectorAll('[data-i18n-alt]').forEach(el => {
      const key = el.dataset.i18nAlt;
      if (dict[key] !== undefined) el.alt = dict[key];
    });

    // <title> and <meta description>
    document.title = dict['meta.title'] || document.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', dict['meta.description'] || '');

    // html lang attribute
    document.documentElement.lang = lang;

    // Update caption text visible in the DOM (showcase)
    const captionEl = document.getElementById('caption-text');
    if (captionEl) {
      const activeSlide = document.querySelector('.showcase-slide.active');
      if (activeSlide) captionEl.textContent = activeSlide.dataset.caption || '';
    }

    // Update active state on lang switcher buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
      btn.setAttribute('aria-pressed', btn.dataset.lang === lang ? 'true' : 'false');
    });
  }

  /* ─────────────────────────────────────────────
     SET LANGUAGE (public API)
  ───────────────────────────────────────────── */
  function setLang(lang) {
    if (!SUPPORTED.includes(lang)) return;
    localStorage.setItem(STORAGE_KEY, lang);
    applyLang(lang);
  }

  /* ─────────────────────────────────────────────
     INIT
  ───────────────────────────────────────────── */
  async function init() {
    const lang = await resolveInitialLang();
    applyLang(lang);

    // Wire up footer lang switcher buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => setLang(btn.dataset.lang));
    });
  }

  return { init, setLang, t };

})();

document.addEventListener('DOMContentLoaded', () => I18N.init());
