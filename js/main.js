/* ==========================================================================
   お弁当屋 ○○ | main.js
   Bootstrap の Collapse / Modal コンポーネントを利用しています。
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

    /* -------------------------------------------------
       商品カード画像：カード本体にも画像を直接表示
    ------------------------------------------------- */
    document.querySelectorAll('.product-card').forEach(function (card) {
        var imageWrap = card.querySelector('.product-image');
        var placeholder = imageWrap ? imageWrap.querySelector('.image-placeholder') : null;
        var imageSrc = card.dataset.image || '';
        var name = card.dataset.name || '商品画像';

        if (!imageWrap) {
            return;
        }

        var img = imageWrap.querySelector('img.product-card-image');

        if (!img && imageSrc) {
            img = document.createElement('img');
            img.className = 'product-card-image';
            img.alt = name;
            imageWrap.appendChild(img);
        }

        if (img) {
            img.src = imageSrc;
            img.alt = name;
            img.style.display = 'block';
        }

        if (placeholder) {
            placeholder.style.display = imageSrc ? 'none' : 'flex';
        }
    });

    /* -------------------------------------------------
       スマホメニュー：リンクをタップしたら自動で閉じる
    ------------------------------------------------- */
    var mobileNavEl = document.getElementById('mobileNav');

    if (mobileNavEl) {
        var mobileNavCollapse = bootstrap.Collapse.getOrCreateInstance(mobileNavEl, { toggle: false });

        mobileNavEl.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                mobileNavCollapse.hide();
            });
        });
    }


    /* -------------------------------------------------
       商品モーダル：クリックされたカードの情報を反映
    ------------------------------------------------- */
    var imageModalEl = document.getElementById('imageModal');

    if (imageModalEl) {
        var modalImage = document.getElementById('modalImage');
        var modalName = document.getElementById('modalName');
        var modalPrice = document.getElementById('modalPrice');
        var modalDescription = document.getElementById('modalDescription');

        imageModalEl.addEventListener('show.bs.modal', function (event) {
            var triggerButton = event.relatedTarget;
            if (!triggerButton) {
                return;
            }

            var card = triggerButton.closest('.product-card');
            if (!card) {
                return;
            }

            var imageSrc = card.dataset.image || '';
            var name = card.dataset.name || '';
            var priceElement = card.querySelector('.product-price');
            var price = priceElement ? priceElement.textContent.trim() : '';
            var description = card.dataset.description || '';

            modalImage.src = imageSrc;
            modalImage.alt = name;
            modalName.textContent = name;
            modalPrice.textContent = price;
            modalDescription.textContent = description;

            /* 画像が未設定（プレースホルダー）の場合は img を非表示にする */
            modalImage.style.display = imageSrc ? 'block' : 'none';
        });
    }


    /* -------------------------------------------------
       カテゴリタブ（menu.html）
       タブはページ内リンク（#bento など）でカテゴリー見出しへスクロール。
       画面内に入っているカテゴリーに応じてタブの active 表示を切り替えます。
    ------------------------------------------------- */
    var menuTabs = document.querySelectorAll('.menu-tab');
    var menuSections = document.querySelectorAll('.menu-category-section');

    if (menuTabs.length && menuSections.length) {

        var setActiveTab = function (id) {
            menuTabs.forEach(function (tab) {
                var isMatch = tab.getAttribute('href') === '#' + id;
                tab.classList.toggle('is-active', isMatch);
            });
        };

        /* タブをクリックした瞬間はそのタブをすぐアクティブに */
        menuTabs.forEach(function (tab) {
            tab.addEventListener('click', function () {
                setActiveTab(tab.getAttribute('href').replace('#', ''));
            });
        });

        /* スクロールに合わせて自動で切り替え */
        if ('IntersectionObserver' in window) {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        setActiveTab(entry.target.id);
                    }
                });
            }, {
                rootMargin: '-45% 0px -50% 0px',
                threshold: 0
            });

            menuSections.forEach(function (section) {
                observer.observe(section);
            });
        }
    }

});
