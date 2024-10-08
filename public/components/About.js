app.component('about-section', {

    template: `
    <div id="about" class="container-fluid bg-light py-6 my-6 mt-0 vh-100 d-flex align-items-center">
        <div class="container">
            <div class="row">
                <div class="col-12 mx-auto position-relative">
                    
                    <div class="text-on-image">
                        <img class="img-fluid personal-photo" style="width:auto; height:500px;" src="./public/img/photo.png" alt="Photo">
                        <div class="overlay-content text-start">
                            <h1 class="display-1 mb-4">I'm <span class="text-primary custom-primary"></span></h1>
                            <h4><span class="typed-text"></span></h4>
                            <div class="social-links-container icon">
                                <a class="share-link btn btn-success btn-md-square rounded-circle mb-2 me-2 custom-btn" target="_blank" href="https://github.com/w0436300"><i class="fab fa-github"></i></a>
                                <a class="share-link btn btn-success btn-md-square rounded-circle mb-2 me-2 custom-btn" target="_blank" href="https://www.linkedin.com/in/claire-w-b05712193/"><i class="fab fa-linkedin"></i></a>
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
        };
    },
    mounted() {
        new Typed('.text-primary', {
            strings: ["Claire","Xinping", "a Developer", "a Designer"],
            typeSpeed: 70,
            backSpeed: 50,
            loop: true,
        });
        new Typed('.typed-text', {
            strings: ["Crafting Creative and Delightful Digital Experiences through Code and Design.<br>I create web pages with UI / UX user interface."],
            startDelay : 1 ,
            typeSpeed: 15,
            loop: false,
            showCursor: false, 
            onComplete: function(self) {
                const links = document.querySelectorAll('.social-links-container a');

                links.forEach((link, index) => {
                    setTimeout(() => {
                        link.style.display = 'inline-block';
                    }, index * 200); 
                });
            }
        });
    }
});
