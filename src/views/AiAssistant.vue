<template>
  <div>
    <!-- Кнопка -->
    <button
      @click="isOpen = !isOpen"
      class="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-pink-500 text-white text-3xl shadow-lg hover:scale-110 transition z-50"
    >
      ✨
    </button>

    <!-- Окно чата -->
    <div
      v-if="isOpen"
      class="fixed bottom-24 right-6 w-96 bg-white rounded-xl shadow-2xl z-50 overflow-hidden"
    >
      <div class="bg-pink-500 text-white p-4 font-bold">
        AI Стилист
      </div>

      <div class="h-80 overflow-y-auto p-4 bg-gray-50">
        <div
          v-for="(msg, index) in messages"
          :key="index"
          class="mb-3"
        >
          <div
            :class="
              msg.role === 'user'
                ? 'bg-pink-100 ml-auto'
                : 'bg-white'
            "
            class="p-3 rounded-lg max-w-[80%]"
          >
            {{ msg.text }}
          </div>
        </div>
      </div>

      <div class="p-3 border-t flex gap-2">
        <input
          v-model="message"
          @keyup.enter="sendMessage"
          placeholder="Задайте вопрос..."
          class="flex-1 border rounded-lg px-3 py-2"
        />

        <button
          @click="sendMessage"
          class="bg-pink-500 text-white px-4 rounded-lg"
        >
          →
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const isOpen = ref(false)
const message = ref('')

const messages = ref([
  {
    role: 'assistant',
    text: 'Здравствуйте! Я AI-консультант Glow-Up. Чем могу помочь?'
  }
])

const sendMessage = async () => {
  if (!message.value.trim()) return

  messages.value.push({
    role: 'user',
    text: message.value
  })

  const userMessage = message.value
  message.value = ''

  try {
    const res = await axios.post(
      'http://127.0.0.1:8001/api/ai',
      {
        message: userMessage
      }
    )

    messages.value.push({
      role: 'assistant',
      text: res.data.answer
    })
  } catch (e) {
    messages.value.push({
      role: 'assistant',
      text: 'Ошибка соединения с сервером.'
    })
  }
}
</script>