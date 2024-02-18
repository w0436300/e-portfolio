app.component('contact-form', {
    template: `
    <div class="container-fluid contact vh-100 d-flex align-items-center pt-4 py-5 ">
        <div class="container">
            <div class="text-center ">
                    <small class="d-inline-block fw-bold text-uppercase mt-4 mb-3 text-light">GET IN TOUCH</small>
                    <h1 class="display-5 mb-3 text-light">Contact Me</h1>
            </div>
            <div class="p-5  contact-form">
                <div class="row g-5">
                    <div class="col-md-7 col-lg-8">
                        <h4 class="mb-4 text-center text-light">Send me your message</h4>
                        <form @submit.prevent="onSubmit">
                            <input type="text" v-model="contact.name" class="w-100 form-control p-3 mb-4 border-primary bg-light" placeholder="Your Name">
                            <input type="email" v-model="contact.email" class="w-100 form-control p-3 mb-4 border-primary bg-light" placeholder="Enter Your Email">
                            <textarea v-model="contact.message" class="w-100 form-control mb-4 p-3 border-primary bg-light" rows="4" placeholder="Your Message"></textarea>
                            <div class="d-flex justify-content-between">
                                <button class="w-50 btn btn-primary form-control p-3 border-primary bg-success rounded-pill me-5" type="submit">Submit Now</button>
                                <input class="w-50 btn btn-primary form-control p-3 border-primary bg-success rounded-pill" type="reset" value="Clear Form">
                            </div>
                        </form>
                    </div>
                    <div class="col-md-5 col-lg-4">
                        <h4 class="mb-4 text-center text-light">Talk to me</h4>
                        <div class="row ">
                            <div class="contact-border  col-4 col-md-12 col-lg-12">
                                <div class="d-inline-flex w-100 border bg-light border-primary p-2 rounded mb-4">
                                    <i class="fab fa-github fa-2x text-primary me-4"></i>
                                    <div class="hide-text-small">
                                        <h4>GitHub</h4>
                                        <a href="https://github.com/yourusername" target="_blank" class="text-dark">Claire</a>
                                    </div>
                                </div>
                            </div>  
                            <div class="col-4 col-md-12 col-lg-12">
                                <div class="d-inline-flex w-100 border bg-light border-primary p-2 rounded mb-4">
                                    <i class="fab fa-linkedin fa-2x text-primary me-4"></i>
                                    <div class="hide-text-small">
                                        <h4>LinkedIn</h4>
                                        <a href="https://linkedin.com/in/yourusername" target="_blank" class="text-dark">Claire</a>
                                    </div>
                                </div>
                            </div> 
                            <div class="col-4 col-md-12 col-lg-12">
                                <div class="d-inline-flex w-100 border bg-light border-primary p-2 rounded">
                                    <i class="fab fa-facebook-messenger fa-2x text-primary me-4"></i>
                                    <div class="hide-text-small">
                                        <h4>Messenger</h4>
                                        <a href="https://m.me/yourusername" target="_blank" class="text-dark">Claire</a>
                                    </div>
                                </div>
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
            contact: {
                name: '',
                email: '',
                message: ''
            }
        }
    },
    methods: {
        onSubmit() {
            if (this.contact.name === '' || this.contact.email === '' || this.contact.message === '') {
                alert('Please fill out every field in the form');
                return;
            }
            console.log('Form submitted:', this.contact);

            this.contact.name = '';
            this.contact.email = '';
            this.contact.message = '';
        }
    }
});


