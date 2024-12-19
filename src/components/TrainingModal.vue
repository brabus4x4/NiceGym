<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal-content w-[650px] h-[650px] bg-[#313131] flex flex-col items-center justify-center">
      <h2 class="text-2xl font-bold mb-4 text-[#EFEB00]">
        {{ isEditing ? 'Редактировать тренировку' : 'Создать новую тренировку' }}
      </h2>
      <form @submit.prevent="submitForm">
        <label class="block mb-4">
          <input
            placeholder="Название:"
            v-model="formData.name"
            type="text"
            required
            class="border p-2 w-full rounded-[10px]"
          />
        </label>
        <label class="block mb-8">
          <span class="text-[#EFEB00] font-medium">Дата:</span>
          <input
            placeholder=""
            v-model="formData.date"
            type="date"
            required
            class="border p-2 w-full rounded-[10px]"
          />
        </label>
        <label class="block mb-8">
          <span class="text-[#EFEB00] font-medium">Время:</span>
          <input
            placeholder=""
            v-model="formData.time"
            type="time"
            required
            class="border p-2 w-full rounded-[10px]"
          />
        </label>
        <label class="block mb-8">
          <input
            placeholder="Продолжительность (минуты):"
            v-model="formData.duration"
            type="number"
            required
            class="border p-2 w-full rounded-[10px]"
          />
        </label>
        <label class="block mb-6">
          <span class="text-[#EFEB00] font-medium">Задний фон (выберите файл):</span>
          <input
            placeholder=""
            type="file"
            @change="handleFileChange"
            accept="image/*"
            class="border p-2 w-full rounded-[10px] bg-white"
          />
        </label>
        <button
          type="submit"
          class="bg-[#EFEB00] text-black px-4 py-2 rounded hover:opacity-50 hover:duration-500"
        >
          {{ isEditing ? 'Сохранить' : 'Создать' }}
        </button>
        <button
          @click="closeModal"
          class="bg-[#414141] text-white px-4 py-2 rounded ml-2 hover:opacity-50 hover:duration-500"
        >
          Отмена
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    training: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      formData: {
        name: '',
        date: '',
        time: '',
        duration: '',
        background: '', // URL изображения или путь
      },
      isEditing: false,
      file: null, // Выбранный файл
    };
  },
  watch: {
    training(newVal) {
      if (newVal) {
        this.isEditing = true;
        this.formData = { ...newVal }; // Копируем данные тренировки
      } else {
        this.isEditing = false;
        this.formData = {
          name: '',
          date: '',
          time: '',
          duration: '',
          background: '',
        };
      }
    },
  },
  methods: {
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.file = file; // Сохраняем файл
        this.formData.background = URL.createObjectURL(file); // Создаем временный URL для предпросмотра
      }
    },
    submitForm() {
      if (!this.formData.name || !this.formData.date || !this.formData.time || !this.formData.duration || !this.file) {
        alert('Пожалуйста, заполните все поля формы!');
        return;
      }

      const formDataWithFile = new FormData();
      formDataWithFile.append('name', this.formData.name);
      formDataWithFile.append('date', this.formData.date);
      formDataWithFile.append('time', this.formData.time);
      formDataWithFile.append('duration', this.formData.duration);
      formDataWithFile.append('background', this.file); // Добавляем файл

      this.$emit('submit', formDataWithFile);
      this.closeModal();
    },
    closeModal() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal-content {
  padding: 20px;
  border-radius: 5px;
}
</style>