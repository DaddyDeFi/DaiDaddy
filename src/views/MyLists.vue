<template>
  <div>
    <Nav />
    <MyCDPs />
    <footer>
      <MadeBy />
    </footer>
  </div>
</template>

<script>
// @ is an alias to /src
import MyCDPs from "@/components/MyCDPs.vue";

export default {
  name: "list",
  components: {
    MyCDPs
  }
};
</script>
