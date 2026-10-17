// Scene timings are in milliseconds. Edit wording in index.html.
document.addEventListener("DOMContentLoaded", () => {
    const scenes = [...document.querySelectorAll(".scene")];
    const begin = document.getElementById("beginButton");
    const music = document.getElementById("invitationMusic");
    const petals = document.getElementById("petals");
    const later = (ms, fn) => setTimeout(fn, ms);

    function show(id) {
        scenes.forEach(scene => scene.classList.remove("active", "open", "play"));
        const scene = document.getElementById(id);
        scene.classList.add("active");
        return scene;
    }

    function addPetal() {
        const petal = document.createElement("span");
        const size = 7 + Math.random() * 10;
        const duration = 7 + Math.random() * 7;
        petal.className = "petal";
        petal.style.left = Math.random() * 100 + "vw";
        petal.style.width = size + "px";
        petal.style.height = size * 1.45 + "px";
        petal.style.setProperty("--drift", (-120 + Math.random() * 240) + "px");
        petal.style.animationDuration = duration + "s";
        petals.appendChild(petal);
        later(duration * 1000, () => petal.remove());
    }

    setInterval(addPetal, 430);
    for (let i = 0; i < 12; i++) later(i * 130, addPetal);

    begin.addEventListener("click", () => {
        begin.disabled = true;
        // A user tap lets mobile browsers start audio.
        music.currentTime = 0;
        music.play().catch(() => {
            // Show native controls if the browser blocks playback.
            music.controls = true;
        });
        const doors = show("doorScene");
        later(1700, () => doors.classList.add("open"));
        later(7600, () => {
            const envelope = show("envelopeScene");
            later(900, () => envelope.classList.add("play"));
        });
        later(13200, () => show("danceScene"));
        later(18200, () => show("day27"));
        later(22500, () => show("day28"));
        later(26800, () => show("day29"));
        later(31100, () => show("attireTitle"));
        later(33600, () => show("attireLadies"));
        later(45600, () => show("attireGentlemen"));
        later(57600, () => show("thanks"));
    });
});
