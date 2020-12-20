<template>
    <div>
        <div class="border-green">
            {{parentData}}
        </div>
        <child-component v-model="parentData"></child-component>
        <child-component2 v-model='parentData'></child-component2>
    </div>
</template>

<script>
    import ChildComponent from './component'
    import ChildComponent2 from "./component/demo2";
    export default {
        components:{
            ChildComponent,ChildComponent2
        },
        data() {
            return {
                parentData: 'hello'
            }
        },
    }
</script>

<style lang="scss" scoped>
    .border-green{
        border: 1px solid green;
    }
</style>