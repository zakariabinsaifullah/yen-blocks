document.addEventListener('DOMContentLoaded', function () {
    const MOBILE_BREAKPOINT = 768;

    const lists = document.querySelectorAll('.wp-block-yen-blocks-list');

    lists.forEach(list => {
        const header = list.querySelector('.list-header');
        if (!header) return;

        header.addEventListener('click', function () {
            if (window.innerWidth <= MOBILE_BREAKPOINT) {
                list.classList.toggle('is-open');
            }
        });
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth > MOBILE_BREAKPOINT) {
            lists.forEach(list => list.classList.remove('is-open'));
        }
    });
});
