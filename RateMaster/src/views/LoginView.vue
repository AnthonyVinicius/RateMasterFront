<script setup>
import CustomButton from '@/components/CustomButton.vue';
import { auth } from '@/firebase.js';
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const email = ref("");
const password = ref("");
const errMsg = ref("");
const showPassword = ref(false);

const login = async () => {
  errMsg.value = "";

  try {
    const userFromDB = await signInWithEmailAndPassword(auth, email.value, password.value);
    console.log(userFromDB)

    if (userFromDB) {
      router.push('/');
    }
  } catch (error) {

    switch (error.code) {
      case "auth/invalid-email":
        errMsg.value = "E-mail inválido.";
        break;
      case "auth/user-not-found":
        errMsg.value = "Nenhuma conta com este e-mail foi encontrada.";
        break;
      case "auth/wrong-password":
        errMsg.value = "Senha inválida.";
        break;
      default:
        errMsg.value = "Erro ao tentar login. Tente novamente.";
    }
  }
};

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value;
};
</script>


<template>
    <div class="container d-flex justify-content-center align-items-center  pt-2 pb-2">
      <div class="card login-card">
        <div class="row g-0">
          <div class="col-md-6 col-lg-6 d-none d-md-block">
            <img src="../assets/img/Login.jpg" alt="login form" class="img-fluid login-image rounded-start"
              loading="lazy" />
          </div>
          <div class="col-md-6 col-lg-6 d-flex">
            <div class="card-body p-4 p-lg-5">
              <form @submit.prevent="login">
                <div class="mb-2 pb-1">
                  <h1 class="h1 fw-bold login-title">RateMaster</h1>
                </div>
                <h5 class="fw-normal pb-3 login-header">Faça login na sua conta.</h5>
                <div>
                  <div class="form-outline mb-1">
                    <input type="email" class="form-control form-control-lg" placeholder="Digite seu email"
                      v-model="email" required />
                  </div>
                  <div class="form-outline mb-2 position-relative">
                    <input :type="showPassword ? 'text' : 'password'" class="form-control form-control-lg"
                      placeholder="Digite sua senha" v-model="password" required />
                    <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'" class="toggle-password"
                      @click="toggleShowPassword" title="Mostrar/Ocultar senha"></i>

                  </div>
                </div>
                <CustomButton @click="login" class="button">
                  <span>Entrar</span>
                </CustomButton>
                <p v-if="errMsg" class="text-danger text-center">{{ errMsg }}</p>
                <p class="mb-3 mt-3 pb-lg-2 no-account">Não possui uma conta? <RouterLink to="/registerUser">Cadastre-se
                    aqui.</RouterLink>
                </p>
                <a class="small text-muted">Termos de uso</a>
                <a class="small text-muted">Política de Privacidade</a>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<style scoped>
.container {
  margin-top: 50px;
  padding: 20px;
}

.login-card {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
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

.button {
  width: 100%;
}

button:hover {
  transform: scale(1.01);
}

.toggle-password {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 1.2rem;
  color: #aaa;
}

.toggle-password:hover {
  color: #000;
}
</style>