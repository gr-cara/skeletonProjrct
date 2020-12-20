<template>
    <div class="vidio-content">
        <header class="text-center box-shadow">
            <div class="back" @click="back">
                <img src="https://static.tope365.com/report/images/study/button_return.webp" alt="">
            </div>
            语音报告
        </header>
        <div class="video-report">
            <video ref="video" :src="mp3Url" controls="controls" :poster="coverUrl"/>
            <div class="content">
                <div class="title">{{ebookName}}</div>
                <div class="time">{{createTime}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import URL from "../../assets/js/url"
    import SUCCESS from "../../assets/js/success"
    export default {
        data() {
            return {
                studentEbookID:'',
                coverUrl: "http://book-video.ieng365.com/thumbnail/2/3u97nirefl_1518080790049.JPG",
                createTime: "2019-07-24 17:53:44",
                downloadPath: "http://book-video.ieng365.com/orals/null/ikjjmtlhbd_1554976541860.zip",
                ebookName: "Fun at the Beach",
                htmlUrl: null,
                isFavorite: 0,
                isPublish: 1,
                isThumbUp: 0,
                level: 2,
                mp3Url: "http://videopy.ipeiyinla.com//9630/oral/2039/20190615175334_final.mp4",
                oralID: 2039,
                oralName: "Fun at the Beach",
                oralVersion: 5,
                pwd: "kQDLQiZZuwNhNWHt",
                readNum: 15,
                thumbUpNum: 0
            }
        },
        methods:{
            back(){
               this.$router.go(-1)
            },
        },
        created(){
            this.studentEbookID = this.$route.query.studentEbookID
            //student_ebook/view/848158
            this.axios.get(URL.url+'/student_ebook/view/'+this.studentEbookID).then(response=>{
                if (response.status === SUCCESS.success) {
                    if(response.data.code == 200){
                      this.mp3Url= response.data.data.mp3Url;
                      this.ebookName= response.data.data.ebookName;
                      this.createTime=response.data.data.createTime
                    }
                }
            })
        }
    }
</script>

<style lang="scss" scoped>
    .vidio-content{
        background: #fff;
        header{
            position: fixed;
            width: 100%;
            background: #fff;
            color: #71BDFF;
            font-size: .9rem;
            line-height: 3rem;
            top: 0;
            .back{
                position: absolute;
                width: 2rem;
                left: 1rem;
                top: .5rem;
                img{
                    width: 100%;  
                }
            }
        }
        video{
            width: 20rem;
            margin-top: 3rem;
        }
        img{
            vertical-align: inherit;
        }
        .content{
            width: 80%;
            margin: 0 auto;
            .title{
                font-size: .68rem;
                line-height: 2rem;
            }
            .time{
                font-size: .5rem;
                color: rgb(110, 108, 108);
            }
        }
    }
</style>