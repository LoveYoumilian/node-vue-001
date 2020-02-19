<template>
  <m-card :icon="icon" :title="title">
    <div class="nav jc-between">
      <div
        class="nav-item"
        :class="{'active':active===i}"
        v-for="(item,i) in categories"
        :key="i"
        @click="$refs.list.swiper.slideTo(i)"
      >
        <div class="nav-link">{{item.name}}</div>
      </div>
    </div>
    <div class="pt-3">
      <swiper
        ref="list"
        :options="{autoHeight: true}"
        @slide-change="()=>active=$refs.list.swiper.realIndex"
      >
        <swiper-slide v-for="(item,i) in categories" :key="i">
            <slot name='items' :category='item'></slot>
        </swiper-slide>
      </swiper>
    </div>
  </m-card>
</template>

<script>
export default {
  props: {
    icon: { type: String, required: true },
    title: { type: String, required: true },
    categories: { type: Array, required: true }
  },
  data() {
    return {
      active: 0
    };
  }
};
</script>

<style>
</style>