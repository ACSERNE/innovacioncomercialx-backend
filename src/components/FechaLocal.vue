<template>
  <span>{{ local }}</span>
</template>

<script setup>
import { toLocal } from '../utils/useFechaLocal.js';

const props = defineProps({
  fecha: { type: String, required: true }
});

const local = toLocal(props.fecha);
</script>
