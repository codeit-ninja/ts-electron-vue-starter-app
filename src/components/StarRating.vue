<template class="float-end">
    <i class="bi-star-fill" v-for="star in stars" :key="star"></i>
    <i class="bi-star-half" v-for="halfStar in halfStars" :key="halfStar"></i>
    <i class="bi-star" v-for="emptyStar in emptyStars" :key="emptyStar"></i>
    <small class="ms-2">{{$props.rating}}</small>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    props: {
        rating: {
            type: Number,
            required: true
        }
    },
    setup(props) {
        const cijfer = ref(Math.round(props.rating) / 2);
        const stars = ref<number[]>([]);
        const halfStars = ref<number[]>([]);
        const emptyStars = ref<number[]>([]);

        for(let i = 0;i < Math.floor(cijfer.value);i++) stars.value.push(i);
        if(cijfer.value % 1 != 0) halfStars.value.push(0);
        for(let i = 0;i < 5 - stars.value.length - halfStars.value.length;i++) emptyStars.value.push(i);

        return {
            cijfer,
            stars,
            halfStars,
            emptyStars
        }
    }
})
</script>
<style scoped>
[class^="bi-star"] {
    color: #ffc107;
}
</style>