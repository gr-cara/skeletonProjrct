<template>
    <div class="i-spaeking">
        <!-- 小i课堂 -->
        <div class="i-spaeking-title">小i有话说</div>
        <div class="i-spaeking-content">
            {{text}}
        </div>
        <img class="i-i" src="https://static.tope365.com/report/images/study/i_class_i.webp" alt="">  
        <img class="i-bg" src="https://static.tope365.com/report/images/study/i_class_balkground.webp" alt=""> 
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
    .i-spaeking{
        width: 100%;
        min-height: 13rem;
        margin: 0 auto;
        position: relative;
        font-weight: 600;
        background: #fff;
        .i-spaeking-title{
            padding: 1rem 1.8rem;
            letter-spacing: .1rem;
        }
        .i-spaeking-content{
            font-size:0.68rem;
            font-family:'PingFangSC-Semibold';
            line-height:1.15rem;
            width: 11rem;
            margin: 0rem 1.2rem -2.8rem auto;
        }
        .i-i{
            height: 6rem;
            margin-left: 2rem;
        }
        .i-bg{
            width: 100%;
        }
    }
</style>