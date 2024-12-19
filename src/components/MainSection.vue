<template>
    <div class="py-10 w-full flex items-center justify-center bg-[#313131]">
        <h1 class="text-2xl text-[#EFEB00]">Карточки тренировок</h1>
     </div>
    <main class="flex justify-center items-center flex-col bg-[#414141]">

        <div class="py-10 flex container justify-center items-center">
            <div class="flex flex-row flex-wrap gap-x-4 gap-y-10 cards justify-center items-center">
                <TrainingList />
            </div>
        </div>
  </main>
</template>

<script>
import TrainingList from './TrainingList.vue';


export default{
    name: 'MainSection',
    data(){
        
    },
    components:{
        TrainingList,

    }
}
</script>

<style>
    .bg-image-card{
        background-image: url('../assets/images/bg-main.png'); 
    }

    .cards div:first-child{
        
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 2rem;
        justify-content: center;
        align-items: center;
    
    }
</style>