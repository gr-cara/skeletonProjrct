<template>
    <div class="chart-nothing">
        <img src="../../../assets/images/study/kong.png" alt="">
        <div>{{text}}</div>
    </div>
</template>

<script>
    export default {
        props:['text'],
        data() {
            return {
               
            }
        },
    }
</script>

<style lang="scss" scoped>
    .chart-nothing{
        text-align: center;
        img{
            width: 7rem;
            margin-bottom: .8rem;
        }
        div{
            font-size: .78rem;
            color: #8E67D8;
        }
    }
</style>