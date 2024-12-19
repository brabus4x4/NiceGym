import { defineStore } from 'pinia';

export const useTrainingStore = defineStore('training', {
  state: () => ({
    // Загружаем данные из localStorage, если они есть
    trainings: JSON.parse(localStorage.getItem('trainings')) || [
   
      null, // Карточка с плюсом
    ],
  }),
  actions: {
    // Сохранение данных в localStorage
    saveToLocalStorage() {
      console.log('Сохраняем данные в localStorage:', this.trainings); // Логируем данные
      localStorage.setItem('trainings', JSON.stringify(this.trainings));
    },

    // Добавить новую тренировку
    addTraining(training) {
      this.trainings.splice(this.trainings.length - 1, 0, training); // Вставляем перед последней карточкой (с плюсом)
      this.saveToLocalStorage(); // Сохраняем в localStorage
    },

    // Редактировать тренировку
    editTraining(index, updatedTraining) {
      this.trainings.splice(index, 1, updatedTraining);
      this.saveToLocalStorage(); // Сохраняем в localStorage
    },

    // Удалить тренировку
    deleteTraining(index) {
      this.trainings.splice(index, 1);
      this.saveToLocalStorage(); // Сохраняем в localStorage
    },
  },
});