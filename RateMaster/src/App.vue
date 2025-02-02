<script setup>
import {RouterView} from 'vue-router'
import BaseLayout from '@/components/BaseLayout.vue';
import { configure, defineRule } from 'vee-validate';
import { required, max, between, min } from '@vee-validate/rules';

//definir regras do vee
defineRule('required', required);
defineRule('max', max);
defineRule('min', min);
defineRule('between', between);
defineRule('email', value =>{
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailRegex.test(value) || 'O campo deve ser um email válido.';
})

configure({
  generateMessage: (ctx) => {
    const messages = {
      required: `O campo ${ctx.field} é obrigatório.`,
      max: `O campo ${ctx.field} deve ter no máximo ${ctx.rule.params[0]} caracteres`,
      min: `O campo ${ctx.field} deve ter no mínimo ${ctx.rule.params[0]} caracteres`,
      email: `O campo ${ctx.field} deve ser um email válido`
    };
    return messages[ctx.rule.name || `O campo ${ctx.field} é inválido`]
  }
});

</script>

<template>
  <BaseLayout>
  <div class="body">
    <link rel="shortcut icon" href="/RateMaster/src/assets/favicon.ico">
    <RouterView />
  </div>
  </BaseLayout>


</template>

