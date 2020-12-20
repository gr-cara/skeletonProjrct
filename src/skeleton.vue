<template>
    <div>
        <div class="skeleton">
            <div class="skeleton-head"></div>
            <div class="skeleton-body">
                <div class="skeleton-name"></div>
                <div class="skeleton-title"></div>
                <div class="skeleton-content"></div>
            </div>
        </div>
        <div class="skeleton">
            <div class="skeleton-head"></div>
            <div class="skeleton-body">
                <div class="skeleton-name"></div>
                <div class="skeleton-title"></div>
                <div class="skeleton-content"></div>
            </div>
        </div>
        <div class="skeleton">
            <div class="skeleton-head"></div>
            <div class="skeleton-body">
                <div class="skeleton-name"></div>
                <div class="skeleton-title"></div>
                <div class="skeleton-content"></div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'skeleton'
    };
</script>

<style scoped>
    .skeleton {
        padding: 15px;
    }
    .skeleton .skeleton-head,
    .skeleton .skeleton-name,
    .skeleton .skeleton-title,
    .skeleton .skeleton-content,
    .skeleton .skeleton-content {
        background: rgb(194, 207, 214);
    }
    .skeleton-head {
        width: 33px;
        height: 33px;
        border-radius: 50%;
        float: left;
    }
    .skeleton-body {
        margin-left: 50px;
    }
    .skeleton-name{
        width: 150px;
        height: 30px;
        margin-bottom: 10px;
    }
    .skeleton-title {
        width: 100%;
        height: 30px;
    }
    .skeleton-content {
        width: 100%;
        height: 30px;
        margin-top: 10px;
    }
</style>