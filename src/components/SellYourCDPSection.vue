<template>
    <a-row class="container" type="flex" align="center">
        <a-col :span="12"  style="padding: 0 100px;">
            <div style="max-width: 500px">
                <h2 class="title">Sell your CDP</h2>
                <p class="subtitle">
                    DAI daddy is an autonomous, open-source platform for buying and selling collateralised debt positions
                </p>
            </div>
            <br />
            <a-row style="max-width: 500px" type="flex" align="center" :gutter="16">
                <a-col :span="12">
                    <router-link to="/listing?open=true" class="pink-button ant-btn ant-btn-primary ant-btn-block ant-btn-lg">Sell</router-link>
                </a-col>
                <a-col :span="12">
                    <router-link to="/buy" class="pink-button ant-btn ant-btn-primary ant-btn-block ant-btn-lg">Buy</router-link>
                </a-col>
            </a-row>
        </a-col>
        <a-col :span="12" style="display: flex; justify-content: center;">
            <div style="max-width: 420px">
                <p class="heading-2">
                    Do you need ETH now? Have a CDP that you can’t afford to pay off? Find yourself a
                    <span class="hashtag">#daidaddy</span>
                </p>
            </div>
        </a-col>
    </a-row>
</template>

<script>
export default {
  name: "SellYourCDP"
};
</script>

<style scoped lang="scss">
    .container {
        padding: 20px 80px;
        box-sizing: border-box;
        align-items: center;
        text-align: left;
    }

    .title {
        font-weight: 600;
        font-size: 50px;
        line-height: 68px;
        color: #1B0E33;
    }

    .subtitle {
        font-size: 25px;
        line-height: 34px;
        color: #1B0E33;
    }

    .heading-2 {
        font-size: 30px;
        color: #1B0E33;
    }

    .hashtag {
        color: #FFC1CC;
    }

</style>