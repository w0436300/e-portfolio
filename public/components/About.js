app.component('about-section', {
    template: `
    <div id="about" class="container-fluid bg-light py-6 my-6 mt-0 vh-100 d-flex align-items-center">
        <div class="container ">
            <div class="row">
                <div class="col-lg-7 mx-auto d-flex flex-column justify-content-center">
                    <h1 class="display-1 mb-4">I'm <span class="text-primary">{{ name }}</span><br> Developer and Designer</h1>
                    <div class="col-lg-7 text-secondary d-flex flex-column justify-content-left" >
                        <h4>Crafting Creative and Delightful Digital Experiences through Code and Design.
                        Full Stack Developer and Designer. 
                        <br>I create web pages with UI / UX user interface,</h4>
                    </div>
                    <div class="social-links-container icon">
                        <a class="share-link btn btn-success btn-md-square rounded-circle mb-2 me-2" href=""><i class="fa fas fa-share-alt"></i></a>
                        <a class="share-link btn btn-success btn-md-square rounded-circle mb-2 me-2" href=""><i class="fab fa-facebook-f"></i></a>
                        <a class="share-link btn btn-success btn-md-square rounded-circle mb-2 me-2" href=""><i class="fab fa-twitter"></i></a>
                        <a class="share-link btn btn-success btn-md-square rounded-circle mb-2 me-2" href=""><i class="fab fa-instagram"></i></a>
                    </div>
                </div>
                <div class="fun-mouse col-lg-5 mx-auto">
                    <div class="row text-center">
                        <div class="d-flex justify-content-center align-items-center">
                        <p>Move your mouse across this area...</p>
                        <button v-if="!unlocked" @click="unlockAudio" class = " mb-3 border-0 round-button"><i class="text-dark fa fa-music"></i></button>
                        </div>
                        <div class="col" v-for="rect in rectangles" :key="rect.id">
                        
                            <div class="rectangle" 
                                 @mousemove="onMousemove($event, rect)" 
                                 :style="{ backgroundColor: \`hsl(\${rect.hue}, 100%, 80%)\` }"
                                 
                                 >
                                 
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            unlocked: false,
            name: 'Claire',
            rectangles: [
                { id: 1, hue: 10, sound: './public/audios/do.mp4' },
                { id: 2, hue: 20, sound: './public/audios/re.wav' },
                { id: 3, hue: 200, sound: './public/audios/mi.wav' },
                { id: 4, hue: 100, sound: './public/audios/fa.wav' },
                { id: 5, hue: 79, sound: './public/audios/sol.wav' },
                { id: 6, hue: 43, sound: './public/audios/la.wav' },
                { id: 7, hue: 88, sound: './public/audios/si.wav' },
                { id: 8, hue: 99, sound: './public/audios/do.wav' }
            ]
        };
    },
    methods: {
        unlockAudio() {
            this.rectangles.forEach(rect => {
                const audio = new Audio(rect.sound);
                audio.play().then(() => {}).catch(() => {});
            });
            this.unlocked = true;
        },
        onMousemove(e, rect) {
            rect.hue = e.clientX % 360;
            this.playSound(rect.sound);
        },
        playSound(soundPath) {
            const audio = new Audio(soundPath);
            audio.play();
        }
    }
});
