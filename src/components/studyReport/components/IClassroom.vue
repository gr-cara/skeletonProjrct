<template>
    <div class="i-classroom">
        <!-- 小i课堂 -->
        <div class="i-classroom-title">小i小课堂</div>
        <div class="i-classroom-content">
            {{text}}
        </div>  
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
    .i-classroom{
        width: 95%;
        min-height: 13rem;
        margin: 0 auto;
        background: url('https://static.tope365.com/report/images/study/i_class.webp') 0 0 no-repeat;
        background-size: 100% 100%;
        position: relative;
        font-weight: 600;
        .i-classroom-title{
            padding: 1rem 1.8rem;
            letter-spacing: .1rem;
        }
        .i-classroom-content{
            font-size:0.52rem;
            font-family:'PingFangSC-Semibold';
            line-height:0.73rem;
            width: 11rem;
            margin: 0rem 1.2rem 1rem auto;
            padding-bottom: 4rem;
        }
    }
</style>