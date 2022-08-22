<script>
    export default {}
</script>

<style>
    .page {
        display: flex;
        position: relative;
        flex-direction: column;
        background-color: #F5F5F5;
        width: 100%;
        min-height: calc(100vh - constant(safe-area-inset-bottom));
        min-height: calc(100vh - env(safe-area-inset-bottom));
        padding-bottom: constant(safe-area-inset-bottom);
        padding-bottom: env(safe-area-inset-bottom);
    }

    .button {
        position: relative;
        background-color: #eee;
        border-radius: 15rpx;
        font-size: 30rpx;
        color: #333;
        width: 92%;
        height: 90rpx;
        line-height: 90rpx;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
        margin-bottom: 30rpx;
        -webkit-transition-duration: 0.4s;
        transition-duration: 0.4s;
        text-decoration: none;
        overflow: hidden;
        cursor: pointer;
    }

    .button::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: radial-gradient(circle, #ccc 10%, transparent 10%);
        transform: scale(10);
        opacity: 0;
        transition: all .6s;
    }

    .button:active::after {
        transform: scale(0);
        opacity: .5;
        transition: 0s;
    }
</style>
