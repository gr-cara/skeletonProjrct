<template>
    <div class="encourage-tips auto">
        <img src="https://static.tope365.com/report/images/study/point.webp" alt="">
        <div v-html="tip">
            
        </div>
    </div>
</template>

<script>
    export default {
        props:['tip']
    }
</script>

<style lang="scss" scoped>
    .encourage-tips{
        display: flex;
        margin: 2rem auto 5rem;
    }
    .encourage-tips img{
        height: 2.5rem;;
    }
    .encourage-tips div{
        margin: .3rem 0 0 1rem;
        font-size:0.68rem;
        font-weight:600;
        line-height: 1.2rem;
    }
</style>