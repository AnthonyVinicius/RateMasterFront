<script>

import Footer from '@/components/Footer.vue';
import Navbar from '@/components/Navbar.vue';
import Button from '@/components/Button.vue';

export default {
  name: 'Reviews',
  components: {
    Navbar,
    Button,
    Footer
  }
}
</script>

<template>
  <div class="login">
    <Navbar />
    <section class="vh-100 login-section">
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col col-xl-10">
            <div class="card login-card">
              <div class="row g-0">
                <div class="col-md-6 col-lg-5 d-none d-md-block">
                  <img src="../assets/Login.jpg" alt="login form" class="img-fluid login-image" />
                </div>
                <div class="col-md-6 col-lg-7 d-flex align-items-center">
                  <div class="card-body p-4 p-lg-5 text-black">
                    <form>
                      <div class="d-flex align-items-center mb-3 pb-1">
                        <i class="fas fa-cubes fa-2x me-3 logo-icon"></i>
                        <span class="h1 fw-bold mb-0">Logo</span>
                      </div>
                      <h5 class="fw-normal mb-3 pb-3 login-header">Sign into your account</h5>
                      <div data-mdb-input-init class="form-outline mb-4">
                        <input type="email" id="form2Example17" class="form-control form-control-lg" />
                        <label class="form-label" for="form2Example17">Email address</label>
                      </div>
                      <div data-mdb-input-init class="form-outline mb-4">
                        <input type="password" id="form2Example27" class="form-control form-control-lg" />
                        <label class="form-label" for="form2Example27">Password</label>
                      </div>
                      <div class="pt-1 mb-4">
                        <Button text="Login" class="button" />
                      </div>
                      <a class="small text-muted" href="#!">Forgot password?</a>
                      <p class="mb-5 pb-lg-2 no-account">Don't have an account? <a href="#!">Register here</a></p>
                      <a href="#!" class="small text-muted">Terms of use.</a>
                      <a href="#!" class="small text-muted">Privacy policy</a>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<style>
.login-section {
  background-color: #f5f5f5;
}

.login-card {
  border-radius: 1rem;
}

.login-image {
  border-radius: 1rem 0 0 1rem;
}

.logo-icon {
  color: #ff6219;
}

.login-header {
  letter-spacing: 1px;
}

.no-account a {
  color: #393f81;
}

.no-account {
  color: #393f81;
}

img {
  width: 100%;
  height: 100%;
}
</style>
