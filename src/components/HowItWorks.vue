<template>
    <div class="container">
        <h2 class="howitworksh">
            How it works
        </h2>
        <a-row type="flex" align="center" :gutter="80">
            <a-col :span="12" class="img-container" style="align-items: flex-end;">
                <img src="img/sellMichael.png" class="hiw-michael">
                <a-row type="flex" justify="center" style="width: 75%;">
                    <div style="width: 234px;">
                        <router-link class="btn pink-button ant-btn ant-btn-primary ant-btn-block ant-btn-lg" to="/listing?open=true">Sell</router-link>
                    </div>
                </a-row>
            </a-col>
            <a-col :span="12" class="img-container" style="align-items: flex-start;">
                <img src="img/buyMichael.png" class="hiw-michael">
                <a-row type="flex" justify="center" style="width: 75%;">
                    <div style="width: 234px;">
                        <router-link class="btn pink-button ant-btn ant-btn-primary ant-btn-block ant-btn-lg" to="/buy">Buy</router-link>
                    </div>
                </a-row>
            </a-col>
        </a-row>
    </div>
</template>

<script>
export default {
  name: "HowItWorks"
};
</script>

<style scoped lang="scss">
    .container {
        padding: 80px;
        box-sizing: border-box;
        align-items: center;
    }
    .howitworksh {
        font-weight: 600;
        font-size: 50px;
        line-height: 68px;
        color: #FF94CE;
        text-align: center;
        margin-bottom: 1.5em;
    }
    .hiw-michael {
        max-width: 75%;
        height: auto;
        object-fit: contain;
    }
    .img-container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .btn {
        margin-top: 2rem;
    }

</style>