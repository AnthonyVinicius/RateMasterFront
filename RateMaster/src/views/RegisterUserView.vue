<script setup>
import CustomButton from '@/components/CustomButton.vue';
import DAOService from '@/services/DAOService';
import { auth } from '@/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const daoUser = new DAOService('user');
const daoShop = new DAOService('shop');
const router = useRouter();

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const showPassword = ref(false);
const userType = ref("individual");

const trimInputs = () => {
  email.value = email.value.trim();
  password.value = password.value.trim();
  confirmPassword.value = confirmPassword.value.trim();
  name.value = name.value.trim();
};

const register = async () => {
  trimInputs();

  if (password.value !== confirmPassword.value) {
    alert("As senhas não coincidem. Por favor, verifique.");
    return;
  }

  if (!email.value || !password.value || !confirmPassword.value) {
    alert("Por favor, preencha todos os campos obrigatórios.");
    return;
  }

  if (userType.value === "individual" && !name.value) {
    alert("Por favor, preencha o nome para Pessoa Física.");
    return;
  }

  if (userType.value === "business" && !name.value) {
    alert("Por favor, preencha o nome da empresa para Pessoa Jurídica.");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
    const { uid, email: createdEmail } = userCredential.user;

    const dao = userType.value === "individual" ? daoUser : daoShop;
    const additionalData = userType.value === "individual" ? { name: name.value } : { name: name.value };

    await dao.insert({
      uid,
      email: createdEmail,
      userType: userType.value,
      ...additionalData,
    });

    alert("Cadastro realizado com sucesso!");
    router.push('/');
  } catch (error) {
    console.error(error);
    alert(error.message);
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

            <div class="col-lg-6">
              <div class="card-body p-4 p-lg-5">
                <div class="text-center mb-4">
                  <h2 class="h3 fw-bold mb-2">Criar Conta</h2>
                  <p class="text-muted">Junte-se ao RateMaster hoje</p>
                </div>

                <form @submit.prevent="register">

                  <div class="mb-3">
                    <label class="form-label">Tipo de Conta</label>
                    <select v-model="userType" class="form-select">
                      <option value="individual">Pessoa Física</option>
                      <option value="business">Pessoa Jurídica</option>
                    </select>
                  </div>


                  <div class="mb-3">
                    <label class="form-label">Email</label>
                    <input type="email" class="form-control" v-model="email" placeholder="seu@email.com" required />
                  </div>


                  <div class="mb-3">
                    <label class="form-label">Senha</label>
                    <div class="input-group">
                      <input :type="showPassword ? 'text' : 'password'" class="form-control" v-model="password"
                        placeholder="Digite sua senha" required />
                      <button class="btn btn-outline-secondary" type="button" @click="toggleShowPassword">
                        <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                      </button>
                    </div>
                  </div>


                  <div class="mb-3">
                    <label class="form-label">Confirmar Senha</label>
                    <div class="input-group">
                      <input :type="showPassword ? 'text' : 'password'" class="form-control" v-model="confirmPassword"
                        placeholder="Confirme sua senha" required />
                      <button class="btn btn-outline-secondary" type="button" @click="toggleShowPassword">
                        <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                      </button>
                    </div>
                  </div>


                  <div class="mb-3">
                    <label class="form-label">
                      {{ userType === 'individual' ? 'Nome Completo' : 'Nome da Empresa' }}
                    </label>
                    <input type="text" class="form-control" v-model="name"
                      :placeholder="userType === 'individual' ? 'Seu nome completo' : 'Nome da empresa'" required />
                  </div>


                  <div class="mb-4">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="termsCheck" required />
                      <label class="form-check-label" for="termsCheck">
                        Eu concordo com os <a href="/terms">Termos de uso</a> e a
                        <a href="/privacy">Política de privacidade</a>
                      </label>
                    </div>
                  </div>


                  <div class="d-grid mb-3">
                    <CustomButton class="button btn-lg">Criar Conta</CustomButton>
                  </div>


                  <p class="text-center mb-0">
                    Já possui uma conta?
                    <RouterLink to="/login" class="text-decoration-none">Entrar</RouterLink>
                  </p>
                </form>
              </div>
            </div>


            <div class="col-lg-6 d-none d-lg-block bg-light">
              <img src="../assets/img/evaluation-feedback-customer-smiley-response.jpg" alt="Register"
                class="w-100 h-100 object-fit-cover" />
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

.form-control,
.form-select {
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