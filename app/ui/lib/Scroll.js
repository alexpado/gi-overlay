export default class Scroll {

    constructor(node) {
        this.node       = node;
        this.scrollable = node.querySelector('.scrollable');
        this.timeout    = -1;

        this.scrollable.addEventListener('scroll', () => this.onScroll());

        // Initialize
        this.onScroll();
    }

    onScroll() {

        const rh = this.scrollable.scrollHeight;
        const vh = this.scrollable.offsetHeight;
        const st = this.scrollable.scrollTop;

        const scrollbarHeight = Math.round((vh / rh) * 10_000) / 100;
        const scrollbarTop    = Math.round((st / rh) * 10_000) / 100;

        this.node.style.setProperty('--scroll-height', `${scrollbarHeight}%`);
        this.node.style.setProperty('--scroll-top', `${scrollbarTop}%`);

        if (vh >= rh) {
            this.node.style.setProperty('--display', 'none');
        } else {
            this.node.style.setProperty('--display', 'block');
        }

        this.animate();
    }

    animate() {
        if (this.timeout > -1) {
            clearTimeout(this.timeout);
            this.timeout = -1;
        }

        this.node.classList.add('scroll');

        this.timeout = setInterval(() => this.node.classList.remove('scroll'), 1000);
    }

}
