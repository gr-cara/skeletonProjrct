<template>
    <div class="nothing">
        <div class="content">
            <div class="nothingImg">
                <img src="https://static.tope365.com/report/images/xinxiang_quesheng.webp" alt="">
            </div>
        <p>暂无数据</p>
        </div>
    </div>
</template>

<script>
export default {
    name:'nothing'
}
</script>

<style lang="scss" scoped>
.nothing{
  position: relative;
    .content{
        padding-top: 1rem;
        text-align: center;
        .nothingImg{
            width: 4rem;
            margin: 0 auto;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
    p{
        font-size:.6rem;
        font-weight:400;
        margin-top:.3rem;
        color:rgba(102,102,102,1);
        line-height:1.8rem;
    }
}
</style>
