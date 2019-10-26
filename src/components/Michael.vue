<template>
  <p v-if="msgType === 'to'" class="to">{{msg}}</p>
  <p v-else class="from">{{msg}}</p>
</template>

<script>
export default {
  name: "Michael",
  props: {
    msgType: String,
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.to {
  max-width: 255px;
  word-wrap: break-word;
  margin-bottom: 12px;
  line-height: 24px;
  position: relative;
  padding: 10px 20px;
  border-radius: 25px;
  text-align: end;
  color: #ffffff;
  background: #ff94ce;
  align-self: flex-end;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  &:before, &:after {
    content:"";
		position:absolute;
    bottom:-2px;
    height:20px;
  }
  &:before {
		right:-7px;
		border-right:20px solid #ff94ce;
		border-bottom-left-radius: 16px 14px;
		transform:translate(0, -2px);
	}
	&:after {
		right:-56px;
		width:26px;
		background:transparent;
		border-bottom-left-radius: 10px;
		transform:translate(-30px, -2px);
	}
}
.from {
  max-width: 255px;
  word-wrap: break-word;
  margin-bottom: 12px;
  line-height: 24px;
  position: relative;
  padding: 10px 20px;
  border-radius: 25px;
  text-align: start;
  background: #ffffff;
  color: black;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  &:before, &after {
    content:"";
		position:absolute;
    bottom:-2px;
    height:20px;
  }
  &:before {
		left:-7px;
		border-left:20px solid #ffffff;
		background:transparent;
		border-bottom-right-radius: 16px 14px;
		transform:translate(0, -2px);
	}
	&:after {
		left:4px;
		width:26px;
		border-bottom-right-radius: 10px;
		transform:translate(-30px, -2px);
	}
}
</style>