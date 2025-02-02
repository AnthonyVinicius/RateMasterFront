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
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-12 col-lg-10">
        <div class="card border-0 shadow-sm overflow-hidden">
          <div class="row g-0">

            <div class="col-lg-6 d-none d-lg-block bg-light">
              <img src="../assets/img/Login.jpg" alt="login" class="w-100 h-100 object-fit-cover" />
            </div>


            <div class="col-lg-6">
              <div class="card-body p-4 p-lg-5">
                <div class="text-center mb-4">
                  <h2 class="h3 fw-bold mb-2">Bem-vindo de volta</h2>
                  <p class="text-muted">Faça login na sua conta</p>
                </div>

                <form @submit.prevent="login">

                  <div class="mb-3">
                    <label class="form-label">Email</label>
                    <input type="email" class="form-control" v-model="email" placeholder="seu@email.com" required />
                  </div>


                  <div class="mb-4">
                    <label class="form-label">Senha</label>
                    <div class="input-group">
                      <input :type="showPassword ? 'text' : 'password'" class="form-control" v-model="password"
                        placeholder="Digite sua senha" required />
                      <button class="btn btn-outline-secondary" type="button" @click="toggleShowPassword">
                        <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                      </button>
                    </div>
                  </div>


                  <div v-if="errMsg" class="alert alert-danger text-center mb-3">
                    {{ errMsg }}
                  </div>


                  <div class="d-grid mb-3">
                    <CustomButton class="button btn-lg">Entrar</CustomButton>
                  </div>

                  <p class="text-center mb-3">
                    Não possui uma conta?
                    <RouterLink to="/registerUser" class="text-decoration-none">Cadastre-se aqui</RouterLink>
                  </p>

                  <div class="text-center">
                    <a href="/terms" class="small text-muted me-2">Termos de uso</a>
                    <a href="/privacy" class="small text-muted">Política de Privacidade</a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  border-radius: 1rem;
}

.object-fit-cover {
  object-fit: cover;
}

a {
  color: #0d6efd;
}

a:hover {
  color: #0a58ca;
}

.form-control {
  padding: 0.75rem 1rem;
}

.input-group .btn {
  padding-left: 1rem;
  padding-right: 1rem;
}

@media (max-width: 991.98px) {
  .card-body {
    padding: 2rem !important;
  }
}
</style>