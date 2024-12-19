<template>
  <div class="flex flex-col items-center">
    <!-- Фильтр по продолжительности -->
    <div class="relative  text-left mb-8 flex justify-center items-center">
      <input
        v-model="selectedDuration"
        type="number"
        placeholder="Введите продолжительность"
        class="border p-2 w-64 rounded-[10px]"
      />
      <button
        @click="filterByDuration"
        class="bg-[#EFEB00] text-black px-4 py-2 rounded mt-2 hover:opacity-50 hover:duration-500 mb-[6px]"
      >
        Фильтровать
      </button>
    </div>

    <!-- Карточки тренировок -->
    <div class="w-full flex flex-wrap justify-center gap-4">
      <div v-for="(training, index) in filteredTrainings" :key="index">
        <TrainingCard
          :training="training"
          @open-modal="openModal(index)"
          @delete-training="deleteTraining(index)"
        />
      </div>
    </div>

    <!-- Модальное окно -->
    <TrainingModal
      :visible="modalVisible"
      :training="selectedTraining"
      @submit="handleSubmit"
      @close="closeModal"
    />
  </div>
</template>

<script>
import TrainingCard from './TrainingCard.vue';
import TrainingModal from './TrainingModal.vue';
import { useToast } from "vue-toastification";
import { useTrainingStore } from '../assets/Pinia/TrainingPinia';

export default {
  components: {
    TrainingCard,
    TrainingModal,
  },
  data() {
    return {
      modalVisible: false,
      selectedTraining: null,
      modalAction: '',
      plusCardIndex: 0,
      selectedDuration: null, // Выбранная продолжительность для фильтрации
      filteredTrainings: [], // Отфильтрованные тренировки
    };
  },
  setup() {
    const toast = useToast();
    const trainingStore = useTrainingStore();
    return { toast, trainingStore };
  },
  watch: {
    // При изменении списка тренировок в сторе обновляем отфильтрованные тренировки
    'trainingStore.trainings': {
      handler(newTrainings) {
        this.updateFilteredTrainings();
      },
      immediate: true, // Вызываем сразу при монтировании компонента
    },
  },
  methods: {
    openModal(index) {
      this.plusCardIndex = index;
      this.selectedTraining = this.trainingStore.trainings[index];
      this.modalAction = this.selectedTraining ? 'edit' : 'create';
      this.modalVisible = true;
    },
    closeModal() {
      this.modalVisible = false;
      this.selectedTraining = null;
      this.modalAction = '';
    },
    handleSubmit(formData) {
      if (formData instanceof FormData) {
        const name = formData.get('name');
        const date = formData.get('date');
        const time = formData.get('time');
        const duration = formData.get('duration');
        const background = formData.get('background');

        if (!name || !date || !time || !duration || !background) {
          this.toast.error('Пожалуйста, заполните все поля формы!');
          return;
        }

        if (!(background instanceof File)) {
          this.toast.error('Выберите корректный файл!');
          return;
        }

        const dateObj = new Date(date);
        if (isNaN(dateObj.getTime())) {
          this.toast.error('Некорректная дата!');
          return;
        }

        if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(time)) {
          this.toast.error('Некорректное время!');
          return;
        }

        if (Number(duration) <= 0) {
          this.toast.error('Продолжительность должна быть больше 0!');
          return;
        }

        const trainingData = {
          name,
          date,
          time,
          duration: Number(duration),
          background: URL.createObjectURL(background), // Создаем URL для предпросмотра
        };

        if (this.modalAction === 'edit') {
          const index = this.trainingStore.trainings.findIndex(t => t === this.selectedTraining);
          this.trainingStore.editTraining(index, trainingData);
          this.toast.success('Тренировка успешно отредактирована!', {
            position: "bottom-right",
          });
        } else {
          this.trainingStore.addTraining(trainingData); // Добавляем новую тренировку
          this.toast.success('Тренировка успешно добавлена!', {
            position: "bottom-right",
          });
        }

        this.closeModal();
      }
    },
    deleteTraining(index) {
      this.trainingStore.deleteTraining(index);
      this.toast.success('Тренировка успешно удалена!', {
        position: "bottom-right",
      });
    },
    filterByDuration() {
      // Метод для фильтрации по продолжительности
      this.updateFilteredTrainings();
    },
    updateFilteredTrainings() {
      // Обновляем отфильтрованные тренировки
      if (this.selectedDuration) {
        this.filteredTrainings = this.trainingStore.trainings.filter(training => {
          return training && training.duration === parseInt(this.selectedDuration);
        });
      } else {
        this.filteredTrainings = this.trainingStore.trainings; // Показываем все тренировки, если фильтр не задан
      }
    },
  },
};
</script>