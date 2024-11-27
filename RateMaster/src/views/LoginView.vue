<script setup>
import TheFooter from '@/components/TheFooter.vue';
import TheNavbar from '@/components/TheNavbar.vue';
import NavButton from '@/components/NavButton.vue';
</script>

<template>
    <TheNavbar />
    <section class="login-section" v-if="true">
      <div class="container">
            <div class="card login-card">
              <div class="row g-0">

              <!-- Imagem -->
                <div class="col-md-6 col-lg-6 d-none d-md-block">
                  <img src="../assets/img/Login.jpg" alt="login form" class="img-fluid login-image rounded-start" />
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




    <section v-if="false">
      <div class="container" id="container">
        <div class="form-container sign-up">
            <form>
                <h1>Create Account</h1>
                <div class="social-icons">
                    <a href="#" class="icon"><i class="fa-brands fa-google-plus-g"></i></a>
                    <a href="#" class="icon"><i class="fa-brands fa-facebook-f"></i></a>
                    <a href="#" class="icon"><i class="fa-brands fa-github"></i></a>
                    <a href="#" class="icon"><i class="fa-brands fa-linkedin-in"></i></a>
                </div>
                <span>or use your email for registeration</span>
                <input type="text" placeholder="Name">
                <input type="email" placeholder="Email">
                <input type="password" placeholder="Password">
                <button>Sign Up</button>
            </form>
        </div>
        <div class="form-container sign-in">
            <form>
                <h1>Sign In</h1>
                <div class="social-icons">
                    <a href="#" class="icon"><i class="fa-brands fa-google-plus-g"></i></a>
                    <a href="#" class="icon"><i class="fa-brands fa-facebook-f"></i></a>
                    <a href="#" class="icon"><i class="fa-brands fa-github"></i></a>
                    <a href="#" class="icon"><i class="fa-brands fa-linkedin-in"></i></a>
                </div>
                <span>or use your email password</span>
                <input type="email" placeholder="Email">
                <input type="password" placeholder="Password">
                <a href="#">Forget Your Password?</a>
                <button>Sign In</button>
            </form>
        </div>
        <div class="toggle-container">
            <div class="toggle">
                <div class="toggle-panel toggle-left">
                    <h1>Welcome Back!</h1>
                    <p>Enter your personal details to use all of site features</p>
                    <button class="hidden" id="login">Sign In</button>
                </div>
                <div class="toggle-panel toggle-right">
                    <h1>Hello, Friend!</h1>
                    <p>Register with your personal details to use all of site features</p>
                    <button class="hidden" id="register">Sign Up</button>
                </div>
            </div>
        </div>
    </div>
    </section>
    <TheFooter />
</template>



<style scoped>

.container{
  padding: 100px;
}

.login-section{
  background-color:#f5f5f5;
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


/*
.container{
    background-color: #fff;
    border-radius: 30px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.35);
    position: relative;
    overflow: hidden;
    width: 768px;
    max-width: 100%;
    min-height: 480px;
}

.container p{
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.3px;
    margin: 20px 0;
}

.container span{
    font-size: 12px;
}

.container a{
    color: #333;
    font-size: 13px;
    text-decoration: none;
    margin: 15px 0 10px;
}

.container button{
    background-color: #512da8;
    color: #fff;
    font-size: 12px;
    padding: 10px 45px;
    border: 1px solid transparent;
    border-radius: 8px;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    margin-top: 10px;
    cursor: pointer;
}

.container button.hidden{
    background-color: transparent;
    border-color: #fff;
}

.container form{
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 40px;
    height: 100%;
}

.container input{
    background-color: #eee;
    border: none;
    margin: 8px 0;
    padding: 10px 15px;
    font-size: 13px;
    border-radius: 8px;
    width: 100%;
    outline: none;
}

.form-container{
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;
}

.sign-in{
    left: 0;
    width: 50%;
    z-index: 2;
}

.container.active .sign-in{
    transform: translateX(100%);
}

.sign-up{
    left: 0;
    width: 50%;
    opacity: 0;
    z-index: 1;
}

.container.active .sign-up{
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    animation: move 0.6s;
}

@keyframes move{
    0%, 49.99%{
        opacity: 0;
        z-index: 1;
    }
    50%, 100%{
        opacity: 1;
        z-index: 5;
    }
}

.social-icons{
    margin: 20px 0;
}

.social-icons a{
    border: 1px solid #ccc;
    border-radius: 20%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0 3px;
    width: 40px;
    height: 40px;
}

.toggle-container{
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: all 0.6s ease-in-out;
    border-radius: 150px 0 0 100px;
    z-index: 1000;
}

.container.active .toggle-container{
    transform: translateX(-100%);
    border-radius: 0 150px 100px 0;
}

.toggle{
    background-color: #512da8;
    height: 100%;
    background: linear-gradient(to right, #5c6bc0, #512da8);
    color: #fff;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateX(0);
    transition: all 0.6s ease-in-out;
}

.container.active .toggle{
    transform: translateX(50%);
}

.toggle-panel{
    position: absolute;
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 30px;
    text-align: center;
    top: 0;
    transform: translateX(0);
    transition: all 0.6s ease-in-out;
}

.toggle-left{
    transform: translateX(-200%);
}

.container.active .toggle-left{
    transform: translateX(0);
}

.toggle-right{
    right: 0;
    transform: translateX(0);
}

.container.active .toggle-right{
    transform: translateX(200%);
}
*/
</style>
