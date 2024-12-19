<template>
    <div class="flex justify-center items-center bg-cover bg-center bg-no-repeat bg-fixed w-full h-screen background-image">
        <div class="mb-4">
        <div class="mt-10 flex items-center justify-center flex-col">
            <h1 class="bold text-5xl text-[#EFEB00]">ДОБАВИТЬ ТРЕНИРОВКУ</h1>
            <a href=""><button  class="mt-[150px] border border-[#EFEB00] bg-[#EFEB00] w-[250px] h-[70px] rounded-[50px] bold text-xl hover:opacity-50 hover:duration-500">Добавить</button></a>
        </div>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'MainScreen',
        data(){

        }
    }
</script>

<style scoped>
.background-image {
  background-image: url('../assets/images/bg-main.png'); 
}
</style>