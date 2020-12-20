<template>
    <div>
        <header class="text-center">
            <div class="back" @click="back">
                <img src="../../assets/images/study/button_return.png" alt="">
            </div>
            新手上路
        </header>
        <div class="novice-content">
            <div class="novice-item" v-for="(item, index) in list" :key="index" @click="openDetail(item.guideType)">
                <span>{{item.titleContent}}</span>
                <i class="iconfont iconyoujiantou blue"></i>
            </div>
            <div v-if="isNull" class="data-null">暂无数据！</div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                list: [],
                isNull:false
            }
        },
        methods: {
            back(){
                if(typeof commInteract !='undefined' && commInteract){
                    commInteract.closeWin();
                }  
            },
            openDetail(id){
                this.$router.push({
                    path:'/noviceDetail',
                    query:{
                        guideType:id
                    }
                })
            },
            getList(){
                this.axios.get(this.URL.url+'/front/promotional_newbie/searchAllTitle').then(response=>{
                    if (response.status === this.SUCCESS.success) {
                        if(response.data.code == 200){
                            this.list = response.data.data.list;
                            if(this.list.length == 0){
                                this.isNull = true
                            }else{
                                this.isNull = false
                            }
                        }
                    }
                })
            }
        },
        created() {
            this.getList()
        },
    }
</script>

<style lang="scss" scoped>
    .blue{
        color: #3CACF3;
    }
    header{
        position: fixed;
        width: 100%;
        background: #fff;
        font-size: .9rem;
        line-height: 2.5rem;
        top: 0;
        z-index: 2;
        .back{
            position: absolute;
            width: 1.5rem;
            left: 1rem;
            top: .4rem;
            img{
              width: 100%;  
            }
        }
    }
    img{
        vertical-align: inherit;
    }
    .novice-content{
        position: absolute;
        top: 2.5rem;
        width: 100%;
        min-height: calc(100% - 2.5rem);
        background: #B8E5FB;
        box-sizing: border-box;
        padding: 0 .73rem 1rem;
        .novice-item{
            font-size:0.75rem;
            background:rgba(255,255,255,1);
            box-shadow:0rem 0rem 0rem 0rem rgba(210,233,255,0.33);
            border-radius:1rem;
            margin-top: .73rem;
            padding: 1.1rem .75rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            i{
                font-size: 1rem;
            }
        }
        .data-null{
            font-size: .8rem;
            text-align: center;
            padding: 2rem 0;
        }
    }
</style>