<template>
  <div
    class="bg-image-card flex flex-col justify-between items-center w-[350px] h-[260px] rounded-[25px] relative"
    :style="{ backgroundImage: `url(${training ? training.background : ''})` }"
  >
    <!-- Псевдоэлемент для затемнения фона -->
    <div class="overlay"></div>

    <!-- Карточка с плюсом -->
    <div v-if="!training" class="flex items-center justify-center w-full h-full z-10">
      <a href="#" @click.prevent="openModal">
        <button><img src="../assets/images/plus (1).svg" alt="Добавить тренировку"></button>
      </a>
    </div>

    <!-- Карточка с данными -->
    <div v-else class="w-full h-full flex flex-col justify-between items-center z-10">
      <h1 class="border border-[#EFEB00] bg-[#EFEB00] w-[200px] h-[30px] text-black text-center rounded-b-[25px] text-xl z-10">
        {{ training.name || 'Без названия' }}
      </h1>
      <div class="mb-5 flex items-start flex-col justify-start w-full px-5 z-10">
        <span>
          <h2 class="text-white text-[32px] z-10">{{ formattedDate }}</h2>
          <span class="flex items-end gap-1 z-10">
            <h1 class="text-[#EFEB00] text-[64px] text-end m-0 z-10">{{ training.time || '00:00' }}</h1>
            <h3 class="text-white text-[24px] m-0 z-10">{{ training.duration || 0 }} минут</h3>
          </span>
        </span>
      </div>
      <a href="#"><button class="border border-[#EFEB00] bg-[#EFEB00] w-[210px] h-[50px] text-black text-center rounded-t-[25px] text-xl z-10 hover:opacity-50 hover:duration-500">Записаться</button></a>
      <div class="absolute ms-[280px] mt-2 flex flex-col opacity-0 transition-opacity duration-500 hover:opacity-100 z-10">
        <a href="#" @click.prevent="openModal('edit')"><button class="hover:opacity-50 duration-500 z-10"><img src="../assets/images/Group 2.svg" alt="редактирование"></button></a>
        <a href="#" @click.prevent="deleteTraining"><button class="hover:opacity-50 duration-500 z-10"><img src="../assets/images/Group 1.svg" alt="удаление"></button></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    training: {
      type: Object,
      default: null,
    },
  },
  computed: {
    formattedDate() {
      if (!this.training || !this.training.date) return 'Неизвестная дата';
      const date = new Date(this.training.date);
      const daysOfWeek = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
      const day = date.getDate();
      const month = date.toLocaleString('ru', { month: 'long' });
      const dayOfWeek = daysOfWeek[date.getDay()];
      return `${day} ${month}, ${dayOfWeek}`;
    },
  },
  methods: {
    openModal() {
      this.$emit('open-modal');
    },
    deleteTraining() {
      this.$emit('delete-training', this.training);
    },
  },
};
</script>

<style scoped>
.bg-image-card {
  background-size: cover;
  background-position: center;
  position: relative;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Полупрозрачный черный фон */
  border-radius: 25px; /* Округление, чтобы совпадало с карточкой */
  z-index: 0; /* Помещаем затемнение под остальные элементы */
}

/* Все остальные элементы находятся выше затемнения */
.z-10 {
  z-index: 10;
}
</style>