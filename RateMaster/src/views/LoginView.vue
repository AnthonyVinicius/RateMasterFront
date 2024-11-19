<script setup>
import TheFooter from '@/components/TheFooter.vue';
import TheNavbar from '@/components/TheNavbar.vue';
import NavButton from '@/components/NavButton.vue';
</script>

<template>
  <div class="login">
    <TheNavbar />
    <section class="vh-100 login-section">
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col col-xl-10">
            <div class="card login-card">
              <div class="row g-0">
                <div class="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="../assets/Login.jpg"
                    alt="login form"
                    class="img-fluid login-image"
                  />
                </div>
                <div class="col-md-6 col-lg-7 d-flex align-items-center">
                  <div class="card-body p-4 p-lg-5 text-black">
                    <form>
                      <div class="d-flex align-items-center mb-3 pb-1">
                        <i class="fas fa-cubes fa-2x me-3 logo-icon"></i>
                        <span class="h1 fw-bold mb-0">RateMaster</span>
                      </div>
                      <h5 class="fw-normal mb-3 pb-3 login-header">
                        Sign into your account
                      </h5>
                      <div class="form-outline mb-4">
                        <input
                          type="email"
                          id="email"
                          class="form-control form-control-lg"
                          placeholder="Enter your email"
                          required
                        />
                        <label class="form-label" for="email">Email address</label>
                      </div>
                      <div class="form-outline mb-4">
                        <input
                          type="password"
                          id="password"
                          class="form-control form-control-lg"
                          placeholder="Enter your password"
                          required
                        />
                        <label class="form-label" for="password">Password</label>
                      </div>
                      <div class="pt-1 mb-4">
                        <NavButton text="Login" class="button" />
                      </div>
                      <RouterLink class="small text-muted" to="/forgot-password">Forgot password?</RouterLink>
                      <p class="mb-5 pb-lg-2 no-account">
                        Don't have an account?
                        <RouterLink to="/register" class="link-primary">Register here</RouterLink>
                      </p>
                      <RouterLink to="/terms" class="small text-muted">Terms of use</RouterLink>
                      <RouterLink to="/privacy" class="small text-muted"> Privacy policy</RouterLink>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <TheFooter />
  </div>
</template>



<style scoped>
.login-section {
  background-color: #f5f5f5;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-card {
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.login-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 1rem 0 0 1rem;
}

.logo-icon {
  color: #ff6219;
}

.login-header {
  letter-spacing: 1px;
  color: #333;
}

.no-account a {
  color: #393f81;
  text-decoration: none;
}

.no-account a:hover {
  color: #1e90ff;
  text-decoration: underline;
}

button,
a {
  transition: all 0.3s ease-in-out;
}

button:hover,
a:hover {
  transform: scale(1.05);
}
</style>

