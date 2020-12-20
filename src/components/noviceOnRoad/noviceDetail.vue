<template>
    <div>
        <header class="text-center">
            <div class="back" @click="back">
                <img src="../../assets/images/study/button_return.png" alt="">
            </div>
            新手上路
        </header>
        <div class="content">
            <div class="title">
                <div>
                    <img src="../../assets/images/icon_decorate_right.png" width="100%" alt="">
                </div>
                <span>{{data.titleContent}}</span>
                <div>
                    <img src="../../assets/images/icon_decorate_left.png" width="100%" alt="">
                </div>
            </div>
            <div class="content-text" v-html="data.articleContent">

            </div>
        </div>
        
        
    </div>
</template>

<script>
    export default {
        data() {
            return {
                guideType:'',
                list:[],
                data:{}
            }
        },
        methods: {
            back(){
               this.$router.go(-1)
            },
            getList(){
                this.axios.get(this.URL.url+'/front/promotional_newbie/searchAll').then(response=>{
                    if (response.status === this.SUCCESS.success) {
                        if(response.data.code == 200){
                            this.list = response.data.data.list;
                            this.formatData()
                        }
                    }
                })
            },
            formatData(){
                let _new = this.list.filter((elem,index)=>{
                    return elem.guideType == this.guideType
                })
                this.data = _new[0]
            }
        },
        created() {
            this.guideType = this.$route.query.guideType;

            this.getList();
        },
    }
</script>

<style lang="scss" scoped>
    header{
        position: fixed;
        width: 100%;
        background: #fff;
        font-size: .9rem;
        line-height: 2.5rem;
        top: 0;
        z-index: 2;
        border-bottom: 1px solid #EAEDF1;
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
    .content{
        margin-top:3rem;
        .title{
            display: flex;
            text-align: center;
            justify-content: center;
            font-size:0.75rem;
            font-weight:bold;
            color:rgba(60,172,243,1);
            span{
                margin:0 .2rem;
            }
            div{
                width: 1.5rem;
            }
        }
        .content-text{
           font-size:0.6rem; 
           color: #666666;
           padding: 0 .73rem;
        }
    }
    
</style>