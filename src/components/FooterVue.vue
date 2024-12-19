<template>
  <footer class="bg-[#313131] py-5">
    <div class="flex justify-center">
      <div class="w-full container mx-auto">
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <div>
              <a href="#"><img src="../assets/images/logo 1.svg" alt="Logo"></a>
            </div>
          </div>
          <div class="flex justify-center items-center">
            <ul class="flex space-x-12 justify-center text-center items-center text-white">
              <a href=""><li class="text-xl medium hover:underline decoration-[#EFEB00] decoration-2 hover:underline-offset-8">Услуги</li></a>
              <a href=""><li class="text-xl medium hover:underline decoration-[#EFEB00] decoration-2 hover:underline-offset-8">Акции</li></a>
              <a href=""><li class="text-xl medium hover:underline decoration-[#EFEB00] decoration-2 hover:underline-offset-8">Расписание</li></a>
              <a href=""><li class="text-xl medium hover:underline decoration-[#EFEB00] decoration-2 hover:underline-offset-8">Тренировки</li></a>
            </ul>
          </div>
        </div>
      </div>
    </div> 
  </footer>
</template>

<script>
    export default{
        name: 'FooterVue',
        data(){

        },
    }
</script>