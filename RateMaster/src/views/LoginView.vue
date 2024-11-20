<script setup>
import TheFooter from '@/components/TheFooter.vue';
import TheNavbar from '@/components/TheNavbar.vue';
import NavButton from '@/components/NavButton.vue';
</script>

<template>
    <TheNavbar />
    <section class="login-section">
      <div class="container py-5">
            <div class="card login-card">
              <div class="row g-0">

              <!-- Imagem -->
                <div class="col-md-6 col-lg-6 d-none d-md-block">
                  <img src="../assets/Login.jpg" alt="login form" class="img-fluid login-image rounded-start" />
                </div>

                <div class="col-md-6 col-lg-6 d-flex">
                  <div class="card-body p-4 p-lg-5">

                    <form>
                    <!-- RateMaster -->
                      <div class="mb-2 pb-1">
                        <h1 class="h1 fw-bold login-title">RateMaster</h1>
                      </div>

                    <!-- Sign In -->
                      <h5 class="fw-normal pb-3 login-header">Sign into your account</h5>
                      
                      <div>
                    
                        <div class="form-outline">
                          <input type="email" id="email" class="form-control form-control-lg" placeholder="Enter your email" required />
                        </div>
                        
                    
                        <div class="form-outline">
                          <input type="password" id="password" class="form-control form-control-lg" placeholder="Enter your password" required />
                        </div>
                      
                    
                        <div class="d-flex justify-content-between m-3">
                          
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked>
                            <label class="form-check-label" for="flexCheckChecked">Remember Me</label>
                          </div>

                          <RouterLink to="/forgot-password">Forgot password?</RouterLink>

                        </div>
                      </div>


                      <NavButton text="Sign In" class="button" />

                      <p class="mb-3 mt-3 pb-lg-2 no-account"> Don't have an account? <RouterLink to="/registerUser">Register here</RouterLink></p>

                      <RouterLink to="/terms" class="small text-muted">Terms of use</RouterLink>

                      <RouterLink to="/privacy" class="small text-muted"> Privacy policy</RouterLink>
                    </form>

                  </div>
                </div>
              </div>
            </div>
          </div>
    </section>
    <TheFooter />
</template>



<style scoped>

.login-section{
  background-color:#f5f5f5;;
}
.login-card {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.login-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.login-header {
  letter-spacing: 1px;
  color: #333;
}

 a {
  color: #E74C3C;
  text-decoration: none;
}

 a:hover {
  color: #1e90ff;
  text-decoration: underline;
}

.button{
  width: 100%;
}

button:hover {
  transform: scale(1.01);
}

</style>
