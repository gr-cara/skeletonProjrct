<template>
    <div>
        
        <!-- scroll header -->
        <header-scroll v-if="scroll == true || tabSelect == 1" @status="tabSwitch" :status='tabSelect' :studentID='studentID'></header-scroll>
        <!-- no scroll header -->
        <header-noscroll v-if="tabSelect == 0" @status="tabSwitch" :status='tabSelect' :studentID='studentID'></header-noscroll>
        
        <keep-alive>
            <router-view @tabIndex="setTabIndex"></router-view>  
        </keep-alive>
        
    </div>
</template>

<script>
    import '../../assets/css/studyReport.css'
    import HeaderScroll from './components/HeaderScroll'
    import HeaderNoscroll from './components/HeaderNoscroll'
    export default {
        inject:['reload'],
        data() {
            return {
                studentID:'',
                scroll:false,
                scrollTop:'',
                tabSelect:0,
            }
        },
        components:{
            HeaderScroll,HeaderNoscroll
        },
        beforeRouteLeave(to,from,next){
            if(to.path == '/studyReport/listenReport' || '/studyReport/voiceReport' || '/voiceDetail'){
                
            }else{
                localStorage.removeItem('tabSelect')
            }
            next();
        },
        watch:{
            scrollTop(value){
                if(value > 400){
                    this.scroll = true;
                }else{
                    this.scroll = false;
                }
            },
            $route (to, from) {
                //console.log(from)
        　　}
        },
        methods:{
            setTabIndex(index){
                this.tabSelect = index;
                localStorage.setItem('tabSelect',index);
            },
            tabSwitch(value){
                this.tabSelect = value;
                localStorage.setItem('tabSelect',value);
            },
            //页面滚动
            pageScroll(){
                let that = this;
                window.addEventListener('scroll',function(){ 
                    that.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                    //alert(document.body.scrollTop)
                });
                
            },
        },
        /* beforeRouteLeave (to, from, next) {
            // 导航离开该组件的对应路由时调用
            // 可以访问组件实例 `this`
            localStorage.removeItem('tabSelect');
            next()
        }, */
        created() {
            this.studentID = this.$route.query.studentID;
            this.tabSelect = localStorage.getItem('tabSelect') ? localStorage.getItem('tabSelect') : 0;
        },
        mounted() {
            this.pageScroll()
        },
        activated(){
            this.reload();
        }
    }
    
</script>

<style scoped>
    
</style>

