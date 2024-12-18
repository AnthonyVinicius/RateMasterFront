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
    <div class="container-fluid d-flex justify-content-center align-items-center min-vh-100">
      <div class="card register-card w-100" style="max-width: 900px;">
        <div class="row g-0">
          <div class="col-lg-6 d-flex">
            <div class="card-body p-4">
              <form @submit.prevent="register">
                <h1 class="h1 fw-bold register-title text-center">RateMaster</h1>
                <h5 class="fw-normal pb-3 register-header text-center">Criar uma nova conta</h5>
  
                <div class="mb-3">
                  <label class="form-label">Tipo de Conta</label>
                  <select v-model="userType" class="form-select">
                    <option value="individual">Pessoa Física</option>
                    <option value="business">Pessoa Jurídica</option>
                  </select>
                </div>
  
                <div class="form-outline mb-3">
                  <input
                    type="email"
                    class="form-control form-control-lg"
                    placeholder="Digite seu email"
                    v-model="email"
                    required
                  />
                </div>
                <div class="form-outline mb-3 position-relative">
                  <input
                    :type="showPassword ? 'text' : 'password'"
                    class="form-control form-control-lg"
                    placeholder="Digite sua senha"
                    v-model="password"
                    required
                  />
                  <i
                    :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"
                    class="toggle-password"
                    @click="toggleShowPassword"
                  ></i>
                </div>
                <div class="form-outline mb-3 position-relative">
                  <input
                    :type="showPassword ? 'text' : 'password'"
                    class="form-control form-control-lg"
                    placeholder="Confirme sua senha"
                    v-model="confirmPassword"
                    required
                  />
                  <i
                    :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"
                    class="toggle-password"
                    @click="toggleShowPassword"
                  ></i>
                </div>
  
                <div v-if="userType === 'individual'">
                  <div class="form-outline mb-3">
                    <input
                      type="text"
                      class="form-control form-control-lg"
                      placeholder="Digite seu nome"
                      v-model="name"
                      required
                    />
                  </div>
                </div>
  
                <div v-if="userType === 'business'">
                  <div class="form-outline mb-3">
                    <input
                      type="text"
                      class="form-control form-control-lg"
                      placeholder="Nome da Empresa"
                      v-model="name"
                      required
                    />
                  </div>
                </div>
  
                <div class="form-check mb-3">
                  <input class="form-check-input" type="checkbox" id="termsCheck" required />
                  <label class="form-check-label" for="termsCheck">
                    Eu concordo com o <a to="/terms">Termos de uso</a> e
                    <a to="/privacy">Política de privacidade</a>.
                  </label>
                </div>
  
                <CustomButton class="button">Cadastrar-se</CustomButton>
                <p class="mt-3 text-center">
                  Já possui uma conta?
                  <RouterLink to="/login">Entrar</RouterLink>
                </p>
              </form>
            </div>
          </div>
          <div class="col-lg-6 d-none d-lg-block">
            <img
              src="../assets/img/evaluation-feedback-customer-smiley-response.jpg"
              alt="register form"
              class="img-fluid register-image rounded-end"
            />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .container-fluid {
    padding: 20px;
  }
  
  .register-card {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }
  
  .register-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .register-header {
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
  
