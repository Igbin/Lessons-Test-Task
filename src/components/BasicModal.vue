<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal">
        <header class="modal-header">
          <slot name="header"></slot>
          <button
            type="button"
            class="btn-close"
            @click="close"
          >
            x
          </button>
        </header>
        <section class="modal-body">
          <slot name="body"></slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer"></slot>
          <button
            type="button"
            class="close-modal-button"
            @click="close"
          >
            Close
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'BasicModal',
  methods: {
    close() {
      this.$emit('close');
    },
  },
}
</script>

<style scoped lang="scss">
.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity .5s ease;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;

  .modal {
    height: 50%;
    width: 40%;
    min-width: 460px;
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    border-radius: 15px;

    .modal-header,
    .modal-footer {
      padding: 15px;
      display: flex;
    }

    .modal-header {
      position: relative;
      font-weight: bold;
      justify-content: space-between;

      .btn-close {
        position: absolute;
        top: 0;
        right: 0;
        border: none;
        font-size: 20px;
        padding: 10px;
        cursor: pointer;
        font-weight: bold;
        color: #4AAE9B;
        background: transparent;
      }
    }

    .modal-footer {
      flex-direction: column;
      justify-content: flex-end;
      flex: 1;

      .close-modal-button {
        @include basic-button;

        margin: 0 auto;
      }
    }

    .modal-body {
      position: relative;
      padding: 10px;
      overflow: auto;
    }
  }
}
</style>