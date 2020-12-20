<template>
    <div class="voice-modal">
        <div class="voice-content">
            
            <img class="small-i" src="https://static.tope365.com/report/images/study/popup_i.webp" alt="" srcset="">
            <img class="close" src="https://static.tope365.com/report/images/study/popup_close.webp" alt="" srcset="">
            <div class="no-tip">不再提示</div>
            <div class="text">
                小 i 很久没有收到你的配音作品了，你也没有领取过配音的奖励金币哦~尝试一下配音模式吧~练口语、拿金币喽！
            </div>
            <div class="flex space-between">
                <div class="ignore text-center">忽略</div>
                <div class="dubbing text-center">去配音</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
    .voice-modal{
        position: fixed;
        background: rgba(0,0,0,.6);
        width: 100%;
        height: 100%;
        overflow: hidden;
        top: 0;
        left: 0;
        z-index: 11;
        .voice-content{
            position: relative;
            width: 75%;
            margin: 0 auto;
            padding: 1.5rem 1rem 1rem;
            background: #fff;
            border-radius: 1rem;
            top: 50%;
            margin-top: -5rem;
            .small-i{
                width: 4rem;
                position: absolute;
                top: -4.81rem;
                left: 36%;
            }
            .close{
                width: 2rem;
                position: absolute;
                right: 1rem;
                top: -2.4rem;
            }
            .no-tip{
                position: absolute;
                font-size: .6rem;
                color: rgba(0,0,0,.4);
                right: .8rem;
                top: .2rem;
                font-weight: 600;
            }
            .text{
                font-size: .78rem;
                color: rgba(0,0,0,.5);
            }
            .flex{
                margin-top: 1rem;
                .ignore,.dubbing{
                    width: 6rem;
                    padding: .4rem 0 .8rem;
                    color: #ffd;
                    font-size: .9rem;
                }
                .ignore{
                    background: url('https://static.tope365.com/report/images/study/popup_unselect.webp') 0 0 no-repeat;
                    background-size: 100% 100%;
                }
                .dubbing{
                    background: url('https://static.tope365.com/report/images/study/popup_select.webp') 0 0 no-repeat;
                    background-size: 100% 100%;
                }
            }
        }
    }
</style>