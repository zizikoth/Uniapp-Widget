<template>
    <view class="search-bar-box" :style="{'background-color':color}">
        <view class="search-bar-input">
            <input :enableNative="'{{false}}'" style="font-size: 28rpx;width: 100%;" type="text" bindinput="searchList"
                confirm-type="search" :placeholder="hint" v-model="value" @confirm="search" @input="change" />
        </view>
        <view class="search-bar-search" @click="search">
            <view class="iconfont icon-search" />
        </view>
    </view>
</template>

<script>
    export default {
        name: "search-bar",
        props: {
            hint: {
                type: String,
                default: "请输入搜索关键字...",
            },
            color: {
                type: String,
                default: '#f5f5f5'
            }
        },
        data() {
            return {
                value: "",
            };
        },
        methods: {
            change(e) {
                this.$emit("change", e.detail.value);
            },
            search() {
                this.$emit("search", this.value);
            },
            reset() {
                this.value = ""
            }
        },
    };
</script>

<style>
    .search-bar-box {
        display: flex;
        width: 100%;
        height: 60rpx;
        align-items: center;
        justify-content: space-between;
        flex-direction: row;
        border-radius: 60rpx;
    }

    .search-bar-input {
        display: flex;
        width: calc(100% - 130rpx);
        height: 60rpx;
        line-height: 60rpx;
        margin-left: 30rpx;
        font-size: 28rpx;
        align-items: center;
        color: #333;
    }

    .search-bar-search {
        display: flex;
        width: 100rpx;
        height: 100%;
        align-items: center;
        justify-content: center;
    }

    @font-face {
        font-family: 'iconfont';
        src: url('data:font/woff2;charset=utf-8;base64,d09GMgABAAAAAALoAA0AAAAABsgAAAKUAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP0ZGVE0cGh4GYACCQhEICoE0gUgLCgABNgIkAxAEIAWFAgcxG+gFUZTsyT7ZzwPbmPZgEQiNbQxmri0Pw7UnVisvimKHfPXwNR6+xtr7u3uHiCYPEU801SidRCSSYDqRUkmETNKomXz+62zvZyhRB6qXJHMcxrfdefwtwVVjPApjsBiDYmKcrUKqskLddUDvZmXWj0Pe9/+Ab+z5vxzf8hOZ/F1uLpx52Iu2naVjAgWWnrWXTdFelmCsETc4bzqYASVrJwS8PB7r4bM3+5avHWhGL0hCloWChFLEvQrpNv2BO/D++GOjnqSSyTkb57cMn68QdXGxFslvIgIA4wgZX2MYgXmJwLCDcVAUwdcWzDH9E0BUCUAkQAL8OAH8xKiRQAH1CMyBEwAFANGcu479bqkW2wC8H1nh1eg6CTyIH5wcX2JWoL6jV4tvoT6AmYC4MiyPsPzc0b3B3Yl6Cjk43Qo7zqKiIMvmZAXFjnGzMo016v8clJ2zmApyPrpX3XcL3VMI8v08rp8f/MQu14dZbHzir+4TBAsWUWl3COoK0RfPPZIQCASCs3YznIen//Vgj4rmutpK7fk3GwD1EgiaWL+TAsjPTBkohQKisIL+1RwCCY0aUQPQ6YcAXU4IhHprCCR1LhDI6t0IUNR7EKCiyZMAVfVeEWg0G/MINOmKe1mUBkwAR4R2KZG02ieydiNUsCdR0etFVLX7Eo32/Ac1mYhLXCxyDsvMjOA9wFowGhRNDAfn/ADGD7AVEEJxnogtudKm4yzwP1rc4PEhuCe3WNXlgiFpWFl1b6SOCq32HuSWOl6y2pUsxgpCYTHqCfckEnOdzkiYuL/SyAVMwqF89rqXlrlYi/E3UPkFkfxX7+eAS4xNzhSlSNmQBU/1sFDmy8zPqfixRhnKqtFIpwsiRGGk6tW4rdsI') format('woff2'),
            url('data:font/woff;charset=utf-8;base64,d09GRgABAAAAAAScAA0AAAAABsgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAAEgAAAABoAAAAck9DiX0dERUYAAARgAAAAHgAAAB4AKQAKT1MvMgAAAaAAAABGAAAAYD2HSiFjbWFwAAAB+AAAAD4AAAFCAA/q/Wdhc3AAAARYAAAACAAAAAj//wADZ2x5ZgAAAkQAAACsAAAAtFsc4YZoZWFkAAABMAAAADAAAAA2IU//UWhoZWEAAAFgAAAAHQAAACQHoQOFaG10eAAAAegAAAAPAAAAEAwAAEFsb2NhAAACOAAAAAoAAAAKAFoAAG1heHAAAAGAAAAAHwAAACABDwBHbmFtZQAAAvAAAAFGAAACgl6CAQJwb3N0AAAEOAAAAB8AAAAx34h563jaY2BkYGAA4ry2+vR4fpuvDNwsDCBwXyx2NZx2/L+P+TCzA5DLwcAEEgUAJFEKlnjaY2BkYGBu+N/AEMPCAALMhxkYGVABCwBVbwMvAAAAeNpjYGRgYGBhsGYA0QwMTEDMBYQMDP/BfAYADpABVwB42mNgYWFgnMDAysDA1Ml0hoGBoR9CM75mMGLkAIoysDIzYAUBaa4pDAeeBz0PYm7438DAwHyHAUgyMCIpUWBgBAB2Fg0lAAB42mNhgAAWCHYEAADBAE4AeNpjYGBgZoBgGQZGBhCwAfIYwXwWBgUgzQKEQP7zoP//IaTERqhKBkY2BhiTgZEJSDAxoAJGhmEPAJfjB/MAAAAAAAAAAAAAAFoAAHjaY2BkcPy/j/kwswODFQMDq7odo6mJupq6mhI7GzubiLiYuJixkbkdox4jO5uyEkjCxNzM3MwIJCEqAlQiJs8sZmTHyLxzhp6RpXl84sPEOHNLS/O4xMKoIB5ObkkeV5+EoAA9AwO9gKD9QIahsT4XIycL0zJOKRFGnsUWHZ6FMB2PQAxVNkkJTlYFA32Qcn99AwN9/6AElzojTmlOJpaNXEJSDAwMAB7xJMZ42n2QzUrDQBSFz/RPbUHEgutZFUFIf5alu0LduXBR1206SVuSTJhMC126deUDuPUxfACfQXDlg3garwgVmpDLN+fec2YmAC7xCYWfp41rYYVT3AlXcIJYuEr9UbhGfhGuo4U34Qb1D+EmbtRIuIW2emaCqp1x1SnT9qxwgZFwBed4EK5St8I18pNwHVd4FW5QfxduYoov4RY6aokxHAxm8KwLaMyxY10hZG6GqKweGDsz82ah5zu9Cm0W2Yziv6m/1j3jYmyQMNpxaeJNMnNHLUdaU6Y5FBzZtzT6CNCjbFyxspnuB72j9lvaszLi8J4FtjzmgKqnUfNztKekicQYXiEha+Rlb00lpB4w1mTG/f6VYhsPvI905GyqJ9zWJInVubNrE3oOL8s9cgzR5RsdpAfl4VOOeZ8Pu91IAoLQpvgGD2pwhwAAeNpjYGKAAC4wyciADljAokyMTGzF+aXFpfkADEkCzAAAAAAB//8AAgABAAAADAAAABYAAAACAAEAAwADAAEABAAAAAIAAAAAeNpjYGBgZACCq0vUOUD0fbHY1TAaADp5BaQAAA==') format('woff');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
    }

    .iconfont {
        font-family: "iconfont" !important;
        font-size: 40rpx;
        color: #666666;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .icon-search:before {
        content: "\e752";
    }
</style>
