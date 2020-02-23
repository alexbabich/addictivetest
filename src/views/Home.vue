<template>
  <div class="home">
    <div class="default-text" v-for="(item, i) in defaulttext" :key="i">
      <!-- v-if - если ничего не приходит то не отображать элемент -->
      <img v-if="item.image" :src="item.image" :alt="item.image" />
      <!-- v-html - для перестраховки если будут использоваться теги для форматирования текста -->
      <p v-if="item.text" v-html="$t(`${item.text}`)"></p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data () {
    return {
      defaulttext: [
        {
          image: 'https://picsum.photos/id/237/200/300',
          text: 'lorem1'
        },
        {
          image: 'https://picsum.photos/id/238/200/300',
          text: 'lorem2'
        },
        {
          image: 'https://picsum.photos/id/239/200/300',
          text: 'lorem3'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
  .default-text {
    display: flex;
    align-items: center;
    padding: 20px;
    margin: auto;
    flex-direction: column;
    @media screen and (min-width: 768px) {
      padding: 20px 40px;
      max-width: 600px;
      flex-direction: initial;
      &:nth-child(even)  {
        flex-direction: row-reverse;
      }
    }
    img {
      width: 100%;
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25), 0 8px 16px -8px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.03);
      max-height: 300px;
      object-fit: cover;
      @media screen and (min-width: 768px) {
        margin: 0 20px;
      }
    }
  }
</style>
