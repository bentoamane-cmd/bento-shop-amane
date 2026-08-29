/* ==========================================================================
   お弁当屋 ○○ | main.js
   Bootstrap の Collapse / Modal コンポーネントを利用しています。
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

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
            var price = card.dataset.price || '';
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
       メニュータブ（menu.html でカテゴリー切り替えを行う場合に使用）
       .menu-tab に data-target="カテゴリー名" を、
       商品カードに data-category="カテゴリー名" を設定して使います。
    ------------------------------------------------- */
    var menuTabs = document.querySelectorAll('.menu-tab');

    if (menuTabs.length) {
        var menuItems = document.querySelectorAll('[data-category]');

        menuTabs.forEach(function (tab) {
            tab.addEventListener('click', function () {
                menuTabs.forEach(function (t) { t.classList.remove('is-active'); });
                tab.classList.add('is-active');

                var target = tab.dataset.target;

                menuItems.forEach(function (item) {
                    var show = target === 'all' || item.dataset.category === target;
                    item.closest('.col-12, .col-md-6, .col-lg-4') ?
                        (item.closest('.col-12, .col-md-6, .col-lg-4').style.display = show ? '' : 'none') :
                        (item.style.display = show ? '' : 'none');
                });
            });
        });
    }

});
