class TopClick {
    constructor() {
        let btn = document.getElementById("to-top-button");
        btn.addEventListener("click", (e: Event) => this.go());
    }

    private go() {
        window.scroll({
            top: 0,
            behavior: "smooth",
        });
    }
}

export default TopClick;